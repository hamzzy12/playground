# 미션놀이터 로드맵

> **이 문서는 무엇을 *언제* 만들지를 정합니다.** 앱이 *어떻게 동작*하는지에 대한 레퍼런스는 `.claude/skills/user-flow/SKILL.md`를 보세요.

---

## 제품 비전

**Jira 같은 그룹 미션 관리 앱.** 차별점은 두 축:
1. **감성 UI** — 모바일 앱 톤(393×852 픽셀 아트, ONE_Mobile_POP 폰트, Motion 애니메이션)
2. **게이미피케이션** — 보상 코인 / 랭킹 / (향후) 배지·스트릭

타겟 사용처: 가족·친구·소규모 팀이 서로 미션을 주고받으며 보상으로 코인을 교환하는 일상 도구.

---

## 현재 진행 상황 (2026-04-22 기준)

### ✅ 완료

**Phase 0 — 인프라 & 기본 미션**
- Supabase 프로젝트 연결, DB 스키마, RLS, Realtime publication
- Google OAuth, 초대코드 가입, 세션 유지(localStorage), ProtectedRoute
- Zustand 스토어(auth/profile/mission) + 서비스 레이어 분리
- 미션 기본 CRUD, Realtime 재조회, 프로필 이미지/테두리 선택
- 개발 환경(`.env.example`, README, pre-commit)

**Phase 1 — 그룹 기반 미션 시스템 (1차 2026-04-21 완료, 상세: [docs/2026-04-21-group-mission.md](./2026-04-21-group-mission.md))**
- 데이터 모델 재설계: `missions.accepter_id/status` 폐기 + `mission_participants` 신설 (1 미션 : N 참여자, 반복 미션은 `instance_date` 단위)
- 서비스/스토어: `participationService` 신설, `groupService` / `inviteCodeService` 확장, `useGroupStore` 신설
- HomeScreen 서브탭 "그룹 미션 / 내 미션" 재구성, `MissionCard` 가 본인 참여 상태 반영
- 그룹 생성(`/group-create`) · 멤버(`/group-members`) · 온보딩(`/group-onboarding`) 화면 신설
- 초대코드 발급/복사 + 딥링크(`/invitation-signup?code=XXX`)
- 참여자 상태 모달(`MissionParticipantsModal`) — "미션 × 날짜" 단위
- Realtime 구독을 `group_id` 필터로 좁힘 (missions 테이블 한정)

### ⚠️ 부분 구현 / Phase 1.x 남은 과제

- **반복 미션 일자별 카드**: 현재 "오늘" 인스턴스 1건만 렌더. 최근 5일 + 과거 참여 입력 UI 미구현 (DB/서비스는 `instance_date` 임의 지정 가능)
- **참여 취소 / 메모 입력 UI**: `removeParticipation` 액션과 `updateNote` 는 있으나 UI 진입점 없음
- **상점 탭**: 여전히 하드코딩 (Phase 2)
- **랭킹 뷰**: `ranking_view` 는 `mission_participants.completed` 기준으로 재작성됐지만 `RankingScreen` 은 정적 데이터
- **프로필 코인**: 표시만, 증감 로직 없음 (Phase 2)

### ❌ 미구현

- 그룹 탈퇴 UI (Phase 4)
- 상점 DB 연동 + 코인 경제 (Phase 2)
- 랭킹/리포트 DB 연동 (Phase 3)
- 알림 기능 (현재 메뉴는 외부 링크만)
- 로딩/에러 상태 UI 통합 (Phase 4)
- 자동화 테스트
- 배포 (Vercel 등)

---

## Phase 1 — 그룹 기반 미션 시스템 완성 ⭐ 핵심 (2026-04-21 1차 완료)

**목표**: "본인 미션만 보임" → "그룹 멤버끼리 제안/수락하는 미션 보드"로 전환.

**상세 기록**: [docs/2026-04-21-group-mission.md](./2026-04-21-group-mission.md) — 기획 결정 배경, 데이터 모델, 화면 변경, 검증 내역

### 기획 결정 (확정)
| 항목 | 결정 |
|---|---|
| 미션 가시성 | 그룹 전체 공개, 누구나 수락 |
| 참여 모델 | 수락 시 조인 — `mission_participants` 테이블 (1 미션 : N 참여자, 반복은 `instance_date` 단위) |
| `pending` 상태 | 참여 row 없음 = pending. 수락 시 `in_progress` row 생성. `missions.status` 컬럼은 폐기 |
| 반복 / 다수 수행 | 반복 미션은 일자별 독립 row. 1회성도 다수 수락 허용 |
| `rejected` 상태 | 도입 안 함 (수락 안 누르면 거절과 동일) |
| 초대 공유 | 코드 문자열 복사 + 딥링크(`/invitation-signup?code=XXX`) 병행 |
| 초대코드 정책 | 그룹당 활성 1개, 다회용, 만료 없음 |

### 백엔드 ✅
- [x] `missionService.fetchByGroup(groupId)` / `fetchByProposer(userId)` / `subscribeByGroup(groupId)` 추가, `updateStatus` 삭제
- [x] `participationService` **신설** — `join` / `updateStatus` / `updateNote` / `remove` / `fetchByGroup` / `subscribeAll`
- [x] `groupService.create(name, creatorId)` — 그룹 생성 + 첫 멤버 등록 + `profiles.group_id` 갱신
- [x] `groupService.getById` / `getMembers` 추가
- [x] `inviteCodeService.create` / `getActiveForGroup` / `getOrCreate` (그룹당 1개 멱등 발급)
- [x] DB 스키마 리셋: `missions` 에서 `accepter_id` / `status` 제거, `mission_participants` 테이블 + RLS + Realtime, `ranking_view` 재작성
- [x] Realtime: `missions` 는 `filter: group_id=eq.${groupId}`, `mission_participants` 는 전체 + RLS 차단

### 프론트엔드 ✅ (일부 ⚠️)
- [x] HomeScreen 서브탭 "그룹 미션 / 내 미션" 재구성
- [x] `MissionCard` 가 본인 참여 상태에 따라 색/버튼 변경, 참여자 수 배지 표시
- [x] `MissionParticipantsModal` — `ProductIconSelectModal` 스타일 재사용, "미션 × 날짜" 단위
- [x] 미션 수락 / 완료 플로우 (수락 버튼 → in_progress → 완료 팝업)
- [x] `GroupOnboardingScreen` / `GroupCreateScreen` / `GroupMembersScreen`
- [x] 초대코드 발급/복사 + 딥링크 복사
- [x] `InvitationSignupScreen` 에 `?code=` 쿼리파라미터 자동 입력
- [x] 햄버거 메뉴에 "내 그룹" 항목
- [ ] **반복 미션 일자별 카드** — 최근 5일치 + 과거 참여 입력 UI (현재 "오늘" 1건만)
- [ ] **참여 취소 / 참여자 메모 입력** UI 진입점

### Phase 1.x — 남은 과제 (우선순위 순)
1. **2인 테스트** — 그룹 초대/수락, Realtime 동기화 (A: 그룹 생성 → 초대코드 공유 → B: 가입 → A/B 양쪽에서 미션 제안·수락·완료가 실시간으로 반영되는지)
2. **UI 깨짐 수정** — 모달(`MissionParticipantsModal` 등) · 참여자 수 배지 위치 등 시각적 깨짐
3. 반복 미션 5일치 카드 + 과거 일자 참여 UI
4. 참여자 메모(`note`) 입력 — `MissionCompletePopup` 에 입력란 추가
5. 참여 취소 버튼 — 참여자 모달의 본인 row 에 노출
6. `/invitation` 기존 플로우 회귀 검증 (신규 스키마 호환)
7. (낮음) `groups` 테이블 RLS 미스터리 원인 규명 — 현재 `create_group_with_owner` RPC 로 우회 중. 2026-04-22 로그 참고

---

## Phase 2 — 상점 + 코인 경제

**목표**: 미션 보상으로 받은 코인을 실제로 *쓸 수 있게* 만든다. 게이미피케이션의 1차 동기 부여.

### 기획 결정 필요
- **상품 등록 권한**: 모든 멤버 vs 특정 멤버(예: 그룹 생성자)만
- **코인 지급 타이밍**: ① 미션 완료 즉시 자동 / ② 제안자 승인 후 / ③ 양쪽 합의
- **음수 잔액 허용?**: 빚 개념 vs 잔액 부족 시 구매 차단
- **상품 가격 상한**: 현재 DB는 `0~99`. 그대로 둘지

### 백엔드
- `productService.ts` 신설 (CRUD + 구매)
- `productStore.ts` 신설
- 코인 이동을 위한 **Supabase RPC 함수** 작성 (원자성 보장):
  ```sql
  -- transfer_coins(from_user_id, to_user_id, amount)
  -- buy_product(buyer_id, product_id) — 코인 차감 + status 전환을 트랜잭션으로
  ```
- `products` Realtime publication 활성화 (`schema.sql`에 이미 포함)

### 프론트엔드
- `HomeScreen` 상점 탭을 store 연동으로 교체 (현재 하드코딩 제거)
- 상품 등록 화면 — `ProductCreatePopup` 활용
- 구매 확인 → 코인 차감 → `shipping` 전환
- 전달 완료 / 다시 채우기 플로우 (`status` 전이)
- 미션 완료 시 코인 애니메이션(획득 연출)

---

## Phase 3 — 랭킹 + 리포트 (게이미피케이션 1단)

**목표**: 그룹 내 활동을 시각화해서 동기 부여 + 비교/경쟁 요소.

### 기획 결정 필요
- **랭킹 기준**: 완료 수 / 연속 성공 / 코인 잔액 / 가중 점수 — 어떤 메트릭이 본 메인?
- **랭킹 범위**: 그룹 내 전용? 전체 사용자 대상 글로벌 랭킹도?
- **시즌 개념**: 누적 영구 랭킹 vs 주간/월간 리셋
- **리포트 기간**: 일/주/월 단위 토글?

### 백엔드
- `ranking_view`는 존재 — 그대로 사용하거나 그룹 필터 추가 뷰 작성
- 리포트용 집계 쿼리 또는 새 뷰 (예: `growth_report_view`)
- (시즌 도입 시) `seasons` 테이블

### 프론트엔드
- `RankingScreen` DB 연동 (현재 정적 데이터 → 뷰 쿼리)
- `GrowthReportScreen` DB 연동
- 랭킹 정렬/필터, 포디움 애니메이션 강화
- 차트 라이브러리 도입 검토 (이미 `recharts` 의존성 있음)

---

## Phase 4 — UX 폴리싱 & 품질

**목표**: "동작하긴 하지만 거친" 곳들을 매끈하게.

### 백엔드
- 에러 응답을 사용자 친화 메시지로 매핑하는 레이어
- (옵션) Edge Function으로 알림 트리거

### 프론트엔드
- 모든 비동기 동작에 로딩/에러 상태 (`useMissionStore.loading` 등 활용)
- 토스트/스낵바 컴포넌트 통합 (현재 `sonner` 의존성 있음)
- 알림 기능 — 햄버거 메뉴 "알림"이 현재 외부 링크만. 인앱 알림으로 교체
- Atomic Design 이전 완성: `HomeScreen`, `LoginScreen` 등 평면 화면을 templates/organisms로 분해
- 접근성 (키보드 포커스, ARIA, 색 대비)
- 반응형/태블릿 대응 검토 (현재 393×852 고정)

### 배포
- Vercel 또는 Cloudflare Pages 연결
- Supabase에 프로덕션 도메인 등록 (Site URL, Redirect URL)
- 환경 변수 분리 (개발/프로덕션 Supabase 프로젝트)

---

## Phase 5 — 게이미피케이션 확장 (선택)

**목표**: 차별점 강화. Jira와 진짜로 달라지는 지점.

- **배지/업적**: 첫 미션 완료, 100코인 달성, 7일 연속 등
- **스트릭(streak) 시스템**: 연속 며칠 활동 추적
- **주간/월간 챌린지**: 전체 그룹 공통 목표
- **커스텀 테마**: 프로필 테두리 외에 배경/효과음 등
- **이벤트성 미션 템플릿**: 명절/생일 등 시즌별 추천 미션

---

## 의존성 / 우선순위 메모

- **Phase 1 → 2 → 3** 순서 권장 (그룹 미션 → 보상 사용처 → 시각화)
- Phase 4(폴리싱)는 Phase 1·2와 병행 가능
- Phase 5는 1~3 안정화 후

## 변경 이력
- 2026-04-22: 브라우저 수동 테스트 후 1인 플로우 통과 기록, Phase 1.x 리스트에 2인 테스트 + UI 깨짐 수정 + RLS 미스터리 추가. 스키마에 role GRANT, 프로필 백필, `create_group_with_owner` SECURITY DEFINER RPC 추가 (2026-04-21 개발 일지 하단 참고).
- 2026-04-22: Phase 1 1차 구현 완료 반영 — 기획 결정 확정, 백엔드/프론트엔드 체크리스트 갱신, Phase 1.x 잔여 과제 분리. 상세 개발 일지 링크 추가.
- 2026-04-20: 최초 작성. Phase 0 완료, Phase 1부터 진행 예정.
