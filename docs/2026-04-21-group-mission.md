# Phase 1 — 그룹 기반 미션 시스템

**작업일**: 2026-04-21
**범위**: `docs/roadmap.md` Phase 1 착수 ~ 1차 구현 완료

## 배경

Phase 0(인프라/인증/미션 기본 CRUD)까지는 완료였으나, 미션이 `proposer_id` 또는 `accepter_id = 본인` 인 것만 조회되어 "그룹 미션 보드" 가치가 성립하지 않던 상태. Phase 1 의 목표는 "본인 미션만 보임" → "그룹 멤버끼리 제안/수락하는 공용 보드" 전환.

## 기획 결정 내역

착수 전 로드맵이 지정한 6개 항목에 대한 논의 결과.

### 1. 미션 가시성 — 그룹 공개, 누구나 수락

- **결정**: 미션은 그룹 전체에 공개. 누구나 수락 가능.
- **추가 논의**: 하나의 미션에 여러 명이 참여하되 **각자 독립된 상태**를 가져야 함. 이로 인해 1 미션 : N 참여자 모델(뒤 "데이터 모델" 참조) 도입.

### 2. `pending` 상태 분리 — 도입 ✅

- 수락 전 = 참여 row 없음 (= pending 의미).
- 수락 시 `mission_participants` row 생성, `status = 'in_progress'`.
- `missions` 테이블의 status 컬럼 자체 폐기.

### 3. 동일 미션 다수 수행 — 반복 미션은 일자별 참여 허용

- **결정**: 반복 미션(`frequency` = 매일/매주/매월)은 **일자별로 참여 row 가 별도**. 한 사람이 매일 다른 상태를 가질 수 있음.
- **과거 참여**: 깜박하고 기록 못한 날 보충 가능해야 함 → 과거 날짜에도 참여 row 생성 허용. 범위 = 미션 생성일 ~ 오늘.
- **인스턴스 생성 방식**: **on-demand**. 스케줄러 없이, 사용자가 수락하는 순간 해당 (mission, user, date) row 생성.
- **일자 UI**: 기본 최근 5일, 이전은 "더 보기" 페이지네이션 (**구현 보류** — 아래 "미완료" 참조).

### 4. `rejected` 상태 — 도입 안 함

- 수락 시 조인 모델이라 "명시적 거절"이 불필요 (수락 안 누르면 끝).
- 나중에 "관심 없어요" 필요해지면 별도 `mission_dismissals` 테이블로 (status enum 확장 금지).
- `gave_up` 은 **참여 중 포기** 용도로 유지.

### 5. 초대 공유 — 코드 문자열 + 딥링크 병행

- 코드 복사 버튼 + 초대 링크(`/invitation-signup?code=XXX`) 복사 버튼 두 개.
- 딥링크 도달 시 `useSearchParams().get('code')` 로 초대코드 자동 입력.
- 카카오·SMS SDK / QR 은 Phase 4 폴리싱.

### 6. 초대코드 정책 — 그룹당 1개, 다회용, 만료 없음

- `invite_codes` 에 활성 코드 1개가 원칙. `inviteCodeService.getOrCreate` 가 멱등적으로 반환.
- `expires_at` / `max_uses` 컬럼 도입 안 함.

## 추가 결정

- **기존 DB 데이터 이관**: 리셋 허용. 별도 마이그레이션 스크립트 없이 `schema.sql` 을 authoritative 소스로 유지. 프로덕션 진입 전이라 안전.
- **제안자 자동 참여**: 제안자도 "수락" 눌러야 참여. 부모-자식 관계에서 자식에게만 해당되는 미션을 자연스럽게 표현.
- **1회성 미션도 수락 누적 허용**: 한 명이 수락해도 잠금 안 됨. 반복 미션과 일관성 유지.
- **그룹 없는 사용자 첫 진입**: 로그인 후 `/group-onboarding` 으로 라우팅. "새 그룹 만들기" vs "초대코드로 참여" 선택.

## 데이터 모델

```
missions            (미션 템플릿 = 그룹에 공개되는 단일 레코드)
  ├── id
  ├── group_id      (nullable, 그룹 삭제 시 SET NULL)
  ├── proposer_id
  ├── title / subtitle / reward / frequency / due_date / icon_src / enabled
  └── (status / accepter_id 는 이 모델에 없음 ← 변경점)

mission_participants (참여 = 사용자 × 인스턴스 단위)
  ├── id
  ├── mission_id FK
  ├── user_id FK
  ├── instance_date DATE   -- 반복: 해당 일자, 1회성: NULL
  ├── status ENUM (in_progress | completed | gave_up)
  ├── note                 -- 참여자 메모 ("오늘 설거지 다 함")
  ├── accepted_at / completed_at
  └── UNIQUE (mission_id, user_id, instance_date)
         + 부분 인덱스 WHERE instance_date IS NULL (NULL 중복 차단)
```

주의: Postgres `UNIQUE` 는 NULL 을 "서로 다른 값"으로 취급하므로 1회성 미션 중복 방지를 위한 부분 인덱스(`idx_mp_unique_onetime`)가 필수.

### RLS

- `missions`: 제안자 OR 그룹 멤버만 SELECT. INSERT/UPDATE/DELETE 는 제안자 한정.
- `mission_participants`: 같은 그룹 미션의 참여자끼리 SELECT. INSERT/UPDATE/DELETE 는 본인 row 만.
- `is_group_member(group_id)` SECURITY DEFINER 함수로 재귀 회피.

### Realtime

- publication 대상: `missions` + `mission_participants` + `products`.
- `missions` 는 `filter: group_id=eq.<groupId>` 로 좁혀 구독.
- `mission_participants` 는 Realtime filter 단일 컬럼 제약 때문에 전체 구독 + RLS 로 차단.

### ranking_view

```sql
CREATE OR REPLACE VIEW ranking_view AS
SELECT p.*, COUNT(mp.id) AS completed_count
FROM profiles p
LEFT JOIN mission_participants mp
  ON mp.user_id = p.id AND mp.status = 'completed'
GROUP BY p.id ORDER BY completed_count DESC;
```

반복 미션은 일자별 완료 row 가 쌓여 자연스럽게 누적 카운트 → 활동량 메트릭으로 기능.

## 화면 변경

- `HomeScreen` 미션 서브탭: `list / manage` → **`그룹 미션 / 내 미션`**.
  - 그룹 미션: 모든 그룹 공개 미션 + 본인 참여 상태에 따라 카드 색/버튼 변경.
  - 내 미션: 내가 제안한 미션만 (수정/삭제/토글 가능).
- `MissionCard`:
  - `myStatus`(ParticipationStatus | null) + `participantCount` props.
  - 참여자 배지 클릭 → `MissionParticipantsModal`.
  - 버튼 클릭 → 미참여면 수락 / 진행중이면 완료 팝업 / 완료·포기면 참여자 모달.
- `MissionParticipantsModal` (신규): `ProductIconSelectModal` 의 나무 프레임 + 검은 오버레이 스타일 재사용. "미션 × 특정 날짜" 단위로 참여자 + 상태 + 메모 표시.
- `GroupOnboardingScreen` (신규): 그룹 없는 사용자 랜딩.
- `GroupCreateScreen` (신규): 이름 입력 → 그룹 생성 → 본인 첫 멤버 등록 → `profiles.group_id` 갱신.
- `GroupMembersScreen` (신규): 멤버 리스트 + 초대코드 + 코드/링크 복사 버튼. 햄버거 메뉴 "내 그룹"에서 진입.
- `InvitationSignupScreen`: `?code=XXX` 딥링크 자동 입력 지원.

## 구현된 서비스/스토어

- `participationService.ts` **신설**: `fetchByGroup`, `join`, `updateStatus`, `updateNote`, `remove`, `subscribeAll`.
- `groupService`: `create`/`addMember`/`getById`/`getMembers`.
- `inviteCodeService`: `create`/`validate`/`markUsed`/`getActiveForGroup`/`getOrCreate`.
- `missionService`: `fetchByGroup`/`fetchByProposer`/`create`/`update`/`delete`/`toggleEnabled`/`subscribeByGroup`. (`updateStatus` 폐기)
- `useGroupStore` 신설: `currentGroup` + `members` + `fetchForUser`/`create`/`setCurrent`.
- `useMissionStore` 확장: `missions[]` + `participations[]` + `join`/`updateParticipation`/`removeParticipation`.
- `AppInitializer`: 로그인 → 프로필 + 그룹 로드 → 그룹 확정 시 그룹 미션 + 참여 로드 + Realtime 구독.

## Phase 1 범위 안에서 보류된 것

### A. 기획 결정 후속 — Phase 1.x 에서 이어갈 것

#### A-1. 반복 미션의 과거 5일 일자별 카드 UI

현재 반복 미션은 "오늘(today)" 인스턴스 1건만 렌더. 사용자 요청인 "최근 5일치 일자별 row + 페이지네이션 + 과거 참여 기록" 은 UX 결정이 더 필요해 분리:

- 한 카드 안에 5 row 나열 vs 미션별 "기록 보기" 상세 뷰로 분리 중 택 1.
- 백엔드는 이미 `instance_date` 임의 지정 가능하므로 UI 만 추가.

#### A-2. 참여 취소(수락 철회) UI

- `missionStore.removeParticipation` 액션은 있지만 진입점 없음. 실수로 수락한 경우 되돌릴 방법 부재.
- 참여자 모달에서 본인 row 에만 "취소" 버튼 노출하는 방안.

#### A-3. 참여자 메모(`note`) 입력 UI

- DB 컬럼과 서비스 메서드(`updateNote`) 존재. 모달은 note 를 **표시**만 하고 **입력**은 안 됨.
- `MissionCompletePopup` 에 한 줄 입력란 추가하면 완료 시점에 메모가 같이 저장되는 자연스러운 흐름.

### B. 다른 Phase 로 이동

#### B-1. 미션 완료 시 코인 증감 → Phase 2

- 참여자가 `completed` 로 전환되어도 `profiles.coins` 는 변하지 않음. 상점 + 코인 경제 구축 시 `transfer_coins` RPC 와 함께 원자적으로 처리.

#### B-2. 그룹 탈퇴 UI → Phase 4

- DB 상 `group_members` 행 삭제 정책(`Users can leave a group`)은 있지만 화면 없음.

#### B-3. 로딩 / 에러 상태 UI → Phase 4

- 신규 화면(`GroupOnboardingScreen` 등)에 에러 메시지는 있으나 스피너/스켈레톤 없음. `useGroupStore.loading` / `useMissionStore.loading` 선 연결만 해둔 상태.

#### B-4. 상점 탭 DB 연동 → Phase 2

- HomeScreen 상점 탭이 여전히 하드코딩 예시. Phase 1 에서는 손대지 않음.

### C. 검증이 필요한 잠재 이슈

#### C-1. `/invitation` 플로우 회귀 검증

- 기존 `InvitationScreen` / `InvitationSignupScreen` 의 가입 플로우가 새로운 스키마(특히 `missions.status` 제거)에서도 동작하는지 실기기 확인 필요. 코드 자체는 `invite_codes` / `groupService.addMember` / `profiles.group_id` 만 만지므로 문제 없을 가능성 높음.
- `/invitation` 과 `/group-onboarding` 의 역할 분리: `/invitation` = 코드 입력 전용 (기존 유지), `/group-onboarding` = "만들기 vs 참여하기" 분기.

#### C-2. 기존 로그인 사용자의 그룹 변화 감지

- `AppInitializer` 는 `userId` 변화에만 반응. 같은 사용자가 초대코드로 그룹에 새로 합류하면 `profiles.group_id` 는 갱신되지만, 앱이 `fetchForUser` 를 자동 재호출하지 않음.
- 현재 플로우(`InvitationSignupScreen` 에서 `SignupCompletePopup` → `/home`)는 신규 가입(=userId 변경)이라 문제 없음. 그러나 "로그인 상태에서 다른 그룹 합류" 시나리오가 생기면 명시적 `fetchForUser` 호출이 필요.

### D. 성능 / 최적화 (Phase 4 이후)

#### D-1. `mission_participants` Realtime 전체 구독

- postgres_changes filter 가 단일 컬럼만 지원해서 `mission_id IN (...)` 류 필터링 불가. 전체 구독 + RLS 차단 방식. 규모 커지면 불필요한 이벤트 수신.
- 해결책: Edge Function 으로 fan-out, 또는 mission_id 리스트 단위 개별 채널 구독.

#### D-2. Realtime 이벤트 → 전체 재조회

- `subscribeGroupMissions` 콜백이 `fetchByGroup` 을 매번 통째로 호출. 여러 건 연속 변경 시 중복 호출 발생.
- 디바운싱 또는 diff 적용(수신 payload 의 `new` / `old` 를 기반으로 local state 패치).

#### D-3. 그룹 이름 / 입력 검증

- 그룹 이름 `maxLength=30` 외 공백/특수문자 제약 없음. 프로파니티 필터 미적용. Phase 4.

#### D-4. 자동화 테스트 부재

- Phase 0~1 전 구간에 테스트 0개. Phase 4 품질 관리 항목.

## 검증

- `npx tsc --noEmit`: ✅
- `npx eslint` (건드린 파일 한정): ✅ (0 경고).
- `npm run dev` Vite 부팅: ✅.
- **실기기 수동 테스트는 아직** — `schema.sql` 재실행 후 회귀 테스트 필요.

## 사용자 테스트 전 실행

```sql
-- Supabase SQL Editor
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON SCHEMA public TO service_role;
-- 그 다음 supabase/schema.sql 전체 붙여넣고 Run
```

테스트 플로우:

1. Google 로그인 → `/group-onboarding` 진입 (그룹 없음)
2. `/group-create` 에서 "우리 가족" 입력 → 생성 → `/group-members` 이동 (초대코드 자동 발급)
3. 코드 복사 또는 링크 복사 → 다른 Google 계정으로 `/invitation-signup?code=XXX` 접속 → 가입
4. 한쪽에서 미션 제안 → 다른 쪽에서 `그룹 미션` 탭에서 수락 → 완료 팝업까지
5. 참여자 배지 클릭 → `MissionParticipantsModal` 열림
