# 2026-04-23 — Phase 1 그룹 미션 버그 수정

**작업 범위**: 2026-04-21 `docs/2026-04-21-group-mission.md` 로 완료 선언한 Phase 1 구현을 코드 레벨로 재점검했을 때 드러난 논리적 오류 / 잔여 버그를 정리하고 수정. 테스트 중 추가로 발견되는 이슈는 아래 "추가 발견" 섹션에 계속 붙여 나간다.

**관련 문서**:
- `docs/2026-04-21-group-mission.md` — Phase 1 설계 / 1차 구현 기록
- `docs/roadmap.md` — Phase 1.x 잔여 과제

---

## 🔴 우선순위 1 — 블로커 (2인 테스트 진입 자체를 막음)

### BUG-1. LoginScreen → InvitationScreen 에서 초대코드 state 유실

- **위치**: `src/app/components/InvitationScreen.tsx:13`
- **증상**: `LoginScreen` 에서 초대코드를 입력하고 "초대받고 들어가기" → `/invitation` 으로 state(`{ inviteCode, groupId }`)와 함께 이동하지만, `InvitationScreen.handleAccept` 는 `navigate("/invitation-signup")` 만 호출하고 state 를 이어 넘기지 않는다.
- **결과**: `InvitationSignupScreen.tsx:41` 의 `inviteCode` 가 undefined 가 되어(딥링크 `?code=` 가 없으면) `handleSignup` 의 `if (inviteCode)` 블록이 통째로 스킵. **그룹 합류가 일어나지 않는다.** 이후 `/home` 에서 영원히 `/group-onboarding` 으로 튕김.
- **수정 방향**: `navigate("/invitation-signup", { state: location.state })` 로 state 포워딩. `useLocation` 추가.
- [x] 수정 (2026-04-23, `InvitationScreen.tsx`)
- [ ] 검증: 로그인 화면에서 유효한 초대코드 입력 → /invitation → "도전하기" → /invitation-signup 에 state.inviteCode 존재 확인 → 가입 후 `profiles.group_id`, `group_members` 레코드 생성 확인.

### BUG-2. 초대 가입 후 `useGroupStore` 동기화 누락 (C-2의 실제 재현)

- **위치**: `src/app/components/InvitationSignupScreen.tsx:60~74` + `src/app/App.tsx:34~43` (`AppInitializer`)
- **증상**: `handleSignup` 이 `updateProfile(user.id, { group_id })` 만 호출하고 `useGroupStore.setCurrent / fetchForUser` 를 다시 호출하지 않는다. `AppInitializer.useEffect(..., [userId])` 는 **userId 변화에만** 반응하므로 이미 null 그룹으로 1회 실행된 상태를 갱신할 수 없다.
- **재현 시나리오**:
  1. Google OAuth 완료 → `AppInitializer` 가 `fetchForUser(userId)` 실행 (group_id=null)
  2. `InvitationSignupScreen` 에서 프로필 + 그룹 합류 처리
  3. `SignupCompletePopup` → `/home` → `HomeScreen.tsx:139~143` 가 `currentGroup==null` 로 `/group-onboarding` 으로 replace → GroupOnboardingScreen 역시 null 로 그대로 머뭄.
- **2026-04-21 doc C-2 가 "신규 가입은 userId 변경이라 문제 없을 것" 이라 결론 냈지만**, OAuth 는 InvitationSignupScreen **이전에** 완료되므로 userId 는 이미 존재하고 effect 는 재실행되지 않는다. 가정이 틀렸다.
- **수정 방향**: `handleSignup` 에서 `markUsed` 직후 `await useGroupStore.getState().setCurrent(codeData.group_id)` 호출. (또는 `fetchForUser(user.id)` 재호출)
- [x] 수정 (2026-04-23, `InvitationSignupScreen.tsx` — `useGroupStore.getState().setCurrent(group_id)` 호출. BUG-4 와 묶여 `markUsed` 호출은 제거됨)
- [ ] 검증: 두 번째 계정으로 가입 플로우 완주 → `/home` 바로 진입 (onboarding 튕김 없음) → 그룹 미션 탭에서 미션 보임.

### BUG-3. MissionProposeScreen → home 복귀 시 missionSubTab 값이 옛 스키마

- **위치**: `src/app/components/MissionProposeScreen.tsx:91, 95`
- **증상**: `navigate('/home', fromManage ? { state: { missionSubTab: 'manage' } } : undefined)` 로 옛 값 `'manage'` 를 넘긴다. Phase 1 에서 `MissionSubTab = "group" | "mine"` 으로 바뀌면서 `'manage'` 는 더이상 유효한 값이 아니다. TypeScript 는 `state: any` 로 통과시켜 못 잡는다.
- **결과**: `HomeScreen.tsx:146~150` 이 `setMissionSubTab("manage")` 를 호출 → 슬라이드 애니메이션은 "mine" 위치(120px)로 이동, 텍스트 하이라이트는 어느 탭도 아님, 콘텐츠는 그룹 미션(=false 분기). **탭과 콘텐츠 불일치.**
- **수정 방향**: `'manage'` → `'mine'` 으로 두 줄 교체.
- [x] 수정 (2026-04-23, `MissionProposeScreen.tsx`)
- [ ] 검증: "내 미션" 탭에서 "미션 만들기" → 생성 완료 → 홈 복귀 시 "내 미션" 탭이 선택된 상태로 표시되는지.

### BUG-4. 초대코드 "다회용" 기획 ↔ `markUsed` 구현 모순

- **위치**: `src/app/services/inviteCodeService.ts:22~56` + `src/app/components/InvitationSignupScreen.tsx:68`
- **기획 결정**: 로드맵 "초대코드 정책 — 그룹당 1개, **다회용**, 만료 없음"
- **현 구현**: 가입 시 `markUsed(code, user.id)` 가 `used_by = userId` 를 덮어쓴다. `validate` / `getActiveForGroup` 은 `used_by IS NULL` 인 코드만 활성으로 본다 → 첫 사용 후 **해당 링크/코드는 죽음**. `getOrCreate` 는 새 코드를 발급하지만 이미 뿌린 링크/코드는 되살릴 수 없다.
- **영향**: A 가 초대코드를 톡방에 뿌려 B 가 가입 → C 가 같은 코드로 들어오려 하면 "유효하지 않은 초대코드" 에러.
- **수정 방향 (결정 필요)**:
  - (안 1) 다회용 유지: `markUsed` 호출 제거, `used_by` 컬럼 폐기 또는 의미 변경. `validate` 의 `is("used_by", null)` 조건 제거. ← **채택**
  - (안 2) 사용 이력만 로깅: `invite_code_uses` 별도 테이블에 (code, user_id, used_at) 추가. `invite_codes.used_by` 는 제거.
  - (안 3) 기획을 "일회용"으로 바꾸기. 이 경우 링크 공유 UX 재설계 필요.
- [x] 기획 결정 — 안 1 (다회용 유지, 최소 변경)
- [x] 수정 (2026-04-23):
  - `inviteCodeService.validate`: `.is("used_by", null)` 제거
  - `inviteCodeService.getActiveForGroup`: `.is("used_by", null)` 제거
  - `inviteCodeService.markUsed` 함수 자체 제거
  - `InvitationSignupScreen.handleSignup`: `markUsed` 호출 제거
  - DB `invite_codes.used_by` 컬럼 / `"Anyone authenticated can use unused code"` UPDATE 정책은 legacy 로 당분간 방치 (다음 스키마 변경 시 정리)
- [ ] 검증: 같은 코드로 2~3명 연속 가입 가능한지.

---

## 🟡 우선순위 2 — 정리 & UX 개선

### BUG-5. `/mission-in-progress` 데드 코드

- **위치**: `src/app/App.tsx:75` + `src/app/components/InProgressMissionScreen.tsx:44~52`
- **증상**: `InProgressMissionScreen.handleComplete` 가 `console.log` 만 찍고 실제 `updateParticipation` 호출이 없다. 홈에서 이 경로로 `navigate` 하는 코드도 없다 (완료 팝업은 `HomeScreen` 에서 직접 `MissionCompletePopup` 으로 처리). Phase 1 스키마 변경 때 정리되지 않은 잔여.
- **수정 방향**: 라우트 + 화면 삭제. (혹은 "메시지 + 사진 업로드" 를 `note` 입력 UI 로 재활용해 Phase 1.x 잔여 과제 "참여자 메모 입력" 에 투입)
- [x] 결정 (2026-04-28: **삭제** 로 결정 — 참여자 메모는 `MissionCompletePopup` 에 입력란 추가로 별도 처리)
- [x] 처리 (2026-04-28, 커밋 `2de2d18` — `App.tsx` 의 `/mission-in-progress` 라우트 + `InProgressMissionScreen.tsx` 파일 삭제)

### BUG-6. `MissionCard` 참여자 0명 배지 표기

- **위치**: `src/app/components/molecules/MissionCard.tsx:86`
- **증상**: `typeof participantCount === "number" && ...` 이어서 0일 때도 "참여 0" 배지가 렌더. 미참여 미션에 공허한 배지.
- **수정 방향**: `participantCount && participantCount > 0` 조건으로 변경.
- [x] 수정 (2026-04-28, 커밋 `2de2d18` — `MissionCard.tsx` 의 `participantCount` 렌더 조건에 `participantCount > 0` 추가)

### BUG-7. `groupService.create` 미사용 `_creatorId` 인자

- **위치**: `src/app/services/groupService.ts:26`
- **증상**: 서버가 `auth.uid()` 로 덮어쓰므로 `_creatorId` 는 쓰이지 않는다. 호출자가 "userId 가 load-bearing" 이라고 오해 가능.
- **수정 방향**: 인자 제거 + `useGroupStore.create` 시그니처도 `(name)` 으로 정리.
- [x] 수정 (2026-04-28, 커밋 `2de2d18` — `groupService.create(name)` / `useGroupStore.create(name)` / `GroupCreateScreen` 호출부 정리)

---

## 🟢 우선순위 3 — 성능 / 폴리싱 (로드맵 Phase 4 로 밀어도 됨)

### BUG-8. Realtime `subscribeAll` 전체 구독

- **위치**: `src/app/services/participationService.ts:109~121` + `src/app/stores/missionStore.ts:164~172`
- **증상**: 다른 그룹의 `mission_participants` 이벤트도 모두 수신해 `fetchByGroup(groupId)` 재실행. RLS 가 차단해 잘못된 데이터는 안 보이지만 불필요한 왕복.
- 2026-04-21 doc D-1/D-2 에 이미 인지.
- **수정 방향**: 디바운싱 또는 payload 기반 local patch. Phase 4 로.
- [ ] 보류

### BUG-9. `todayISO()` 로컬 타임존

- **위치**: `src/app/components/HomeScreen.tsx:55~61`
- **증상**: 로컬 타임존 기준 YYYY-MM-DD 를 서버 DATE 와 비교. 자정 경계에서 다른 타임존 사용자끼리 같은 순간을 다른 날로 인식할 수 있음.
- **실무 리스크 낮음** (가족/친구 단위, 국내) — 알림만 남김.
- [ ] 보류

---

## 작업 플로우

1. 🔴 우선순위 1(BUG-1~4) 부터 수정 → 2인 테스트 진입 가능 상태 확보
2. 브라우저에서 실제 플로우 돌리며 추가 이슈 발견 → 아래 "추가 발견" 섹션에 BUG-10, BUG-11 … 로 누적
3. 🟡 우선순위 2 정리
4. Phase 1.x 잔여 과제(`roadmap.md` 참고)로 이동

---

## 추가 발견 (테스트 중 계속 갱신)

### BUG-11. `/invitation` 화면이 옛 "미션 초대" 더미 UI (그룹 정보 없음)

- **위치**: `src/app/components/InvitationScreen.tsx` (재작성)
- **발견 경로**: 2026-04-23 테스트. `/invitation` 에 "상대방의 제안", "구몬학습지 풀기" 같은 하드코딩 텍스트만 있고 실제 초대된 그룹 정보(그룹명/멤버수)가 전혀 표시되지 않음. Phase 0 기획(미션 단위 초대) 잔재.
- **해결**: `?code=` 쿼리로 받은 초대코드를 `inviteCodeService.validate` 로 검증 → `groupService.getById` / `getMembers` 로 그룹명 + 멤버수 표시 → 참여하기 버튼으로 `addMember` + `updateProfile({group_id})` + `useGroupStore.setCurrent` 실행 후 `/home`.
- **화면 변경**:
  - "초대받은 그룹 / {그룹명}" 헤더
  - "현재 참여 멤버 N명" 카드
  - "{그룹명} 에 참여하시겠습니까?" 안내
  - 버튼: "참여하기" / "나중에" (이전: "도전하기" / "거절하기")
- [x] 수정 (2026-04-23, `InvitationScreen.tsx` 전체 재작성)
- [ ] 검증: `/invitation?code=XXXX` 접근 시 올바른 그룹명/멤버수 표시. 참여 시 DB 반영 + 홈 이동.

### BUG-13. InvitationScreen 의 그룹 preview 가 RLS 에 막힘 (PGRST116)

- **위치**: `src/app/components/InvitationScreen.tsx` + `src/app/services/inviteCodeService.ts` + `supabase/schema.sql`
- **발견 경로**: 2026-04-23 테스트. `/invitation?code=PSYQKDFV` 진입 시
  - `GET /rest/v1/groups?id=eq.XXX` → 406 `PGRST116` (0 rows)
  - `GET /rest/v1/group_members?group_id=eq.XXX` → 200 `[]` (빈 배열)
- **원인**: 수신자(B)는 아직 그룹 멤버가 아니므로 RLS 정책 `USING (is_group_member(id))` / `USING (is_group_member(group_id))` 이 모두 차단. 보려면 멤버여야 하고, 멤버가 되려면 봐야 하는 닭-달걀.
- **해결**: `preview_invite(code)` SECURITY DEFINER RPC 로 초대코드 제시자에게만 최소 필드(group_id, group_name, member_count) 노출. `inviteCodeService.preview` 메서드 추가. `InvitationScreen` 은 `preview` 한 번만 호출 (기존 validate + getById + getMembers 3회 → 1회).
- [x] 수정 (2026-04-23):
  - `schema.sql` 에 `preview_invite(TEXT)` RPC + EXECUTE GRANT 추가
  - `inviteCodeService.preview` 메서드 추가
  - `InvitationScreen` 을 `preview` 호출 기반으로 정리
  - **Supabase SQL Editor 에서 RPC SQL 실행 필요**
- [ ] 검증: `/invitation?code=PSYQKDFV` 에서 "우리 가족" 그룹명 + 멤버 수 정상 표시.

### BUG-14. `GroupOnboardingScreen` "초대코드로 참여하기" 버튼이 입력 UI 없음

- **위치**: `src/app/components/GroupOnboardingScreen.tsx`
- **발견 경로**: 2026-04-23 테스트. 로그인 후 그룹 없어 `/group-onboarding` 진입 → "초대코드로 참여하기" 클릭 → `/invitation` 으로 그냥 이동 (?code= 없음) → InvitationScreen 에서 "초대코드가 없습니다" 에러. 로그인 후 초대코드를 입력할 수 있는 UI 자체가 부재.
- **해결**: 온보딩 화면에 `mode: "choose" | "enter-code"` 상태 도입. "초대코드로 참여하기" 클릭 시 코드 입력란 + 참여/뒤로 버튼으로 전환. validate 통과 시 `/invitation?code=XXX` 로 이동.
- [x] 수정 (2026-04-23, `GroupOnboardingScreen.tsx` 재작성)
- [ ] 검증: 그룹 없는 상태에서 로그인 → 온보딩 → "초대코드로 참여하기" → 입력 후 "참여하기" → /invitation 에서 그룹 정보 표시 → 참여 → /home.

### BUG-12. 로그인 전 초대코드 플로우 재설계

- **위치**: `LoginScreen.tsx`, `App.tsx`, `ProtectedRoute.tsx`, `GroupMembersScreen.tsx`
- **문제**: 기존 플로우는 로그인 전에 `/invitation` 으로 바로 이동 → 이 화면이 비로그인 상태에서 `groupService.getById` / `getMembers` 를 못 부름 (RLS 가 authenticated 제한). 그리고 `/invitation-signup` 의 "관계/이름 입력" 은 옛 부모/자식 스키마 잔재.
- **전략 변경** (사용자 요청): 로그인 전 초대코드 입력 → `sessionStorage` 에 code 보존 → Google OAuth 로 유도 → OAuth 복귀 후 LoginScreen 이 sessionStorage 읽어 `/invitation?code=XXX` 로 이동. `/invitation` 은 ProtectedRoute 로 이동시켜 authenticated 컨텍스트 보장.
- **변경 내역**:
  - `App.tsx`: `/invitation` 을 `<ProtectedRoute>` 로 감쌈
  - `LoginScreen.handleInviteSubmit`: `validate` 통과 시 `sessionStorage.setItem("pendingInviteCode", code)` 후 `signInWithGoogle()` 호출
  - `LoginScreen.useEffect`: 로그인 완료 감지하면 sessionStorage 체크. 있으면 `/invitation?code=XXX`, 없으면 `/home`
  - `ProtectedRoute`: `/invitation` 경로에 비로그인으로 직접 방문 시(딥링크) code 를 sessionStorage 에 보존하고 `/` 로 리다이렉트 — LoginScreen 의 useEffect 가 로그인 후 자동 복귀
  - `GroupMembersScreen` 딥링크: `/invitation-signup?code=XXX` → `/invitation?code=XXX`
  - `/invitation-signup` 라우트는 legacy 로 당분간 유지 (이름/관계 입력 화면 — 향후 정리 대상)
- [x] 수정 (2026-04-23, 5개 파일)
- [ ] 검증 (시나리오는 아래 테스트 섹션 참고)

### BUG-10. 로그인 전 초대코드 검증이 42501 로 차단 (anon GRANT 부재)

- **위치**: `src/app/services/inviteCodeService.ts:validate` + `supabase/schema.sql:436` (GRANT 섹션)
- **발견 경로**: 2026-04-23 테스트. 로그인 화면 하단 초대코드 입력 → "초대받고 들어가기" → `GET /rest/v1/invite_codes?...` 가 `401 / {"code":"42501","message":"permission denied for table invite_codes"}` 로 실패.
- **원인**: `schema.sql:436` 은 `authenticated` 에만 테이블 GRANT 를 부여한다. `LoginScreen.handleInviteSubmit` 은 Google OAuth **이전에** 호출되므로 Supabase 클라이언트가 `anon` role 로 요청 → GRANT 없어서 Postgres 레벨에서 차단 (RLS 이전 단계). RLS 정책은 추가로 `TO authenticated` 제한이라 우회 여지 없음.
- **진단 쿼리 결과 (2026-04-23)**:
  - ① 코드 `PSYQKDFV` DB 에 존재 (used_by=null)
  - ② `information_schema.table_privileges` 에 `anon` 행 전무
  - ③ RLS 정책 3개 모두 `{authenticated}`
- **해결**: SECURITY DEFINER RPC `validate_invite_code(p_code)` 추가. `code`, `group_id` 만 노출, `anon` / `authenticated` 양쪽에 EXECUTE 권한. 클라이언트는 `supabase.rpc("validate_invite_code")` 로 전환.
- **대안 (채택 안 함)**: `GRANT SELECT ON invite_codes TO anon` — 전체 테이블 노출이라 코드 무차별 탐색 여지.
- [x] 수정 (2026-04-23):
  - `schema.sql` 하단에 `validate_invite_code` RPC 정의 + EXECUTE GRANT
  - `inviteCodeService.validate` RPC 호출로 교체 (반환 타입도 `{ code, group_id }` 로 좁힘)
  - **Supabase SQL Editor 에서 RPC SQL 실행 필요** (기존 프로젝트에 반영)
- [ ] 검증: 로그인 전 상태에서 LoginScreen 의 초대코드 검증 정상 동작.

---

# 2026-04-24 후속 작업

BUG-1~4, BUG-10~14 수정 후 2인 플로우로 "그룹 합류" 까지 정상 동작 확인 (`commit 0c47a6b`). 이후 아래 개선을 이어서 처리.

### BUG-15. GroupOnboardingScreen placeholder 에 실제 초대코드 노출

- **위치**: `src/app/components/GroupOnboardingScreen.tsx` 초대코드 입력 필드
- **문제**: BUG-14 수정 시 placeholder 를 "예: PSYQKDFV" 로 두었는데, PSYQKDFV 가 테스트 그룹의 실제 활성 코드라 사용자에게 "예시처럼 보이지만 실제 동작함" 의 혼란 + 코드 노출.
- **해결**: placeholder 를 invite code alphabet (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`) 내 더미 8자리 `ABCDEFGH` 로 교체. 실 코드와 구분되도록.
- [x] 수정 (2026-04-24, 커밋 `0c47a6b` 에 포함 — 기록만 이 섹션에 남김)

### FEAT-1. 그룹 탈퇴 UI (로드맵 Phase 4 항목 앞당김)

- **위치**: `src/app/services/groupService.ts` + `src/app/components/GroupMembersScreen.tsx`
- **배경**: 로드맵상 Phase 4 "그룹 탈퇴 UI" 로 밀려 있었으나 현재 2인 테스트 사이클에서 "다른 그룹으로 이동" 을 테스트하려면 필수. `supabase/schema.sql` 의 RLS 정책 `"Users can leave a group"` (`USING (user_id = auth.uid())`) 은 이미 존재하므로 UI 만 붙이면 됨.
- **구현**:
  - `groupService.leave(groupId, userId)` — `group_members` row DELETE. proposer 로 남긴 `missions` / `mission_participants` 는 의도적으로 미삭제 (재합류 시 복구).
  - `GroupMembersScreen` 하단에 빨간 border "그룹 탈퇴" 버튼 + 확인 모달.
  - 탈퇴 플로우: `leave` → `profiles.group_id = NULL` → `useGroupStore.clear()` + `useMissionStore.clear()` → `/group-onboarding` 이동. `AppInitializer` 의 `useEffect(..., [currentGroupId])` 가 변화 감지하여 Realtime 구독 자동 해제.
- **엣지 케이스 (미처리)**:
  - 그룹 생성자 탈퇴 허용 — 다른 멤버가 있으면 그룹 유지, 없으면 orphan. Phase 4 cleanup job 로 이동.
  - 마지막 남은 멤버 탈퇴 시 빈 groups row 남음 — 동일.
- [x] 구현 (2026-04-24)
- [ ] 검증: 1) 혼자인 그룹에서 탈퇴 → 온보딩 이동 + DB row 확인 / 2) 2인 그룹에서 한 쪽만 탈퇴 → 나머지는 정상 사용 가능

### FEAT-2. 홈 서브탭 순서 교체 (내 미션 ↔ 그룹 미션)

- **위치**: `src/app/components/HomeScreen.tsx`
- **변경**: 왼쪽 "그룹 미션" / 오른쪽 "내 미션" → 왼쪽 "내 미션" / 오른쪽 "그룹 미션" 으로 배치 교체. `MissionSubTab` 타입 값(`"group" | "mine"`)은 유지해 `MissionProposeScreen` 복귀 시 state 전달 로직 등 외부 호환성 보존. 슬라이딩 하이라이트 애니메이션 `x` 값 로직만 반전.
- [x] 수정 (2026-04-24)

### FEAT-3. 미션 카드 UI 통합 + ⋮ 메뉴

- **위치**: `src/app/components/HomeScreen.tsx` + `src/app/components/molecules/MissionCard.tsx`
- **배경**: 이전까지 "내 미션" 탭은 "내가 제안한 미션" 을 custom inline UI (수정/토글 버튼) 로 렌더링하고, "그룹 미션" 탭은 `MissionCard` 로 렌더링해 두 탭 간 UI 이질감이 컸음. 미션 관리 기능(수정)을 카드 컨텍스트 메뉴로 옮겨 UI 를 통일.
- **구현**:
  - **"내 미션" 탭 의미 변경**: `proposerId === me` → **내가 오늘 인스턴스에 참여한 미션** (`participations.some(p => p.userId === me && p.instanceDate === resolveInstanceDate(m))`)
  - **렌더링 통일**: custom inline UI 제거, "내 미션" 탭도 `renderMissionCard` 재사용. 빈 상태 안내 문구 추가 ("아직 참여 중인 미션이 없어요")
  - **⋮ 메뉴 prop (`MissionCard.onMenuClick`)**: 모든 카드에 세로 ⋮ 버튼 렌더. 클릭 시 팝오버 오픈 + 외부 클릭 닫기(fixed overlay). 팝오버 내용은 권한 분기 — 제안자 본인(`onMenuClick` 주입): "수정하기" 활성 → `/mission-edit` 이동. 비제안자: "수정 권한이 없어요" 안내 (RLS 상 UPDATE 는 `proposer_id = auth.uid()` 제한과 일치)
  - **사용하지 않게 된 것 정리**: HomeScreen 의 `imgBarYellow`, `imgEditBtn`, `imgToggleOn/Off` imports 및 `useMissionStore.toggleEnabled` 구독 제거. store/service 의 `toggleEnabled` 는 향후 사용 여지로 남김.
- **MissionCard 구조 조정**: 외곽 div 의 `overflow-hidden` 을 내부 Main Background 로 이동. 그대로 두면 팝오버가 카드 밖으로 나갔을 때 잘림.
- [x] 구현 (2026-04-24)
- [ ] 검증: 1) 그룹 탭의 모든 카드에 ⋮ 노출 / 2) 제안자 본인 카드 ⋮ → 수정하기 → `/mission-edit` / 3) 타인 카드 ⋮ → 안내 표시 / 4) 내 미션 탭이 "참여한 미션" 만 표시되는지

### BUG-16. ⋮ 글리프가 ONE_Mobile_POP_OTF 에 없어 렌더링 실패 (폰트 fallback 차단)

- **위치**: `src/app/components/molecules/MissionCard.tsx` + `src/styles/theme.css:123~125` 전역 font-family `!important` 규칙
- **증상**: FEAT-3 구현 후 ⋮ 가 시각적으로 보이지 않음. 색상 변경 (`text-[#492607]` → `font-bold` → inline `style={{ color }}`) 여러 시도 모두 무효.
- **진단** (Explore 에이전트로 분석):
  - `theme.css:123~125` 의 `font-family: 'ONE_Mobile_POP_OTF', sans-serif !important` 전역 규칙이 모든 요소에 강제 적용
  - ONE_Mobile_POP_OTF (한글/숫자 중심 폰트) 가 U+22EE(VERTICAL ELLIPSIS) 글리프를 포함하지 않음
  - 정상이라면 브라우저가 폰트 체인을 따라 `sans-serif` 로 fallback 해야 하나, `!important` + 폰트 로딩 타이밍 영향으로 fallback 이 막힘 → **글리프 자체가 렌더되지 않는 상태**
  - 색상 문제가 아니라 "글자가 그려지지 않음" 이 근본 원인. Tailwind arbitrary value 나 inline style 과 무관
- **해결**: 유니코드 글리프 의존을 제거하고 `lucide-react` 의 `EllipsisVertical` SVG 아이콘으로 교체 (lucide-react 는 이미 설치됨, 의존성 추가 없음). SVG 는 `currentColor` 기반이라 버튼의 `color` 값이 그대로 아이콘 색으로 적용.
- **교훈**: 전역 `font-family !important` + 커스텀 폰트 조합에서 특수 유니코드(수학기호/화살표/점 등) 사용 금지. 필요하면 SVG / 아이콘 라이브러리로.
- [x] 수정 (2026-04-24)

---

## 남은 회귀 포인트 / 다음 확인 대상

- ~~**"미션 만들기" 버튼 복귀 탭**~~: 2026-04-28 커밋 `2de2d18` 에서 처리 완료 — 복귀 탭을 `'mine'` → `'group'` 으로 변경하고 `fromManage` state 분기 자체를 제거.
- ~~**"내 미션" 탭의 "미션 만들기" 버튼 유지 여부**~~: 2026-04-28 커밋 `2de2d18` 에서 결정 — **유지**, 대신 햄버거 메뉴의 "미션제안하기" 항목을 제거하고 메뉴 항목 4개로 재정렬.
