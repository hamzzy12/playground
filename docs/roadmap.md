# 미션놀이터 로드맵

> **이 문서는 무엇을 *언제* 만들지를 정합니다.** 앱이 *어떻게 동작*하는지에 대한 레퍼런스는 `.claude/skills/user-flow/SKILL.md`를 보세요.

---

## 제품 비전

**Jira 같은 그룹 미션 관리 앱.** 차별점은 두 축:
1. **감성 UI** — 모바일 앱 톤(393×852 픽셀 아트, ONE_Mobile_POP 폰트, Motion 애니메이션)
2. **게이미피케이션** — 보상 코인 / 랭킹 / (향후) 배지·스트릭

타겟 사용처: 가족·친구·소규모 팀이 서로 미션을 주고받으며 보상으로 코인을 교환하는 일상 도구.

---

## 현재 진행 상황 (2026-04-20 기준)

### ✅ 완료 (Phase 0 — 인프라 & 기본 미션)
- **인프라**: Supabase 프로젝트 연결, 그룹 기반 DB 스키마, RLS, Realtime publication
- **인증**: Google OAuth, 초대코드 가입, 세션 유지(localStorage), ProtectedRoute
- **상태 관리**: Zustand 스토어(auth/profile/mission) + 서비스 레이어 분리
- **미션 기본 CRUD**: 생성/수정/삭제/상태 변경 (active → in_progress → completed 등)
- **미션 Realtime**: 변경 발생 시 자동 재조회
- **프로필**: 이미지/테두리 선택 모달
- **개발 환경**: `.env.example`, README 셋업 가이드, lint+typecheck pre-commit

### ⚠️ 부분 구현
- **미션 목록**: `proposer_id` 또는 `accepter_id = 본인`만 표시. 그룹 단위 공유 X
- **Realtime 구독**: `missions` 테이블 전체를 구독 후 본인 필터(RLS가 데이터 차단). 그룹 필터로 좁혀야 효율적
- **프로필 코인**: 표시만 하고 증감 로직 없음
- **랭킹 뷰**: DB에 `ranking_view`는 존재하나 UI는 정적 데이터

### ❌ 미구현
- 그룹 생성 화면, 초대코드 발급 UI
- 그룹 멤버 목록
- 다른 멤버의 미션 보기 / 미션 수락 UI
- 상점 DB 연동 (현재 ShopItem 정적 예시)
- 코인 경제 (미션 완료 시 지급, 구매 시 차감)
- 랭킹/리포트 DB 연동
- 알림 기능 (현재 메뉴는 외부 링크만)
- 로딩/에러 상태 UI
- 배포 (Vercel 등)

---

## Phase 1 — 그룹 기반 미션 시스템 완성 ⭐ 핵심

**목표**: "본인 미션만 보임" → "그룹 멤버끼리 제안/수락하는 미션 보드"로 전환. 이게 안 되면 제품 가치 자체가 성립 안 됨.

### 기획 결정 필요 (Phase 1 시작 전)
- **미션 가시성**: ① 그룹 전체에 공개 → 누구나 수락 / ② 제안자가 특정 수락자 지정 / ③ 둘 다 지원
- **`pending` 상태 활용**: 현재 코드는 모두 `active`로 시작. "수락 대기 = pending → 수락 시 active"로 분리할지
- **동일 미션 다수 수행 허용?**: 한 번 수락되면 잠금 vs 매일/매주 반복 미션은 멀티 수행
- **미션 거절(reject) 상태 도입?**: 현재 상태 enum에 없음

### 백엔드
- `missionService.fetchByGroup(groupId)` 추가, 기존 `fetchByUser`는 사용처 확인 후 정리
- Realtime 구독에 `filter: group_id=eq.${myGroupId}` 적용
- `groupService.create(name)` — 그룹 생성 + 본인을 첫 멤버로 등록 + `profiles.group_id` 갱신
- `inviteCodeService.generate(groupId)` — 새 코드 발급 (UUID/랜덤 문자열)
- (가시성 결정에 따라) `missions.status` enum에 `rejected` 추가 — 마이그레이션 필요

### 프론트엔드
- 홈 미션 탭 재구성: "받은 미션(나에게 제안된 것)" / "보낸 미션(내가 제안한 것)" / "그룹 미션(다른 멤버 활동)" 식
- 미션 수락 UI (pending 카드의 수락/거절 버튼)
- 그룹 생성 화면 (LoginScreen 또는 신규 `/group-create`)
- 그룹 멤버 목록 화면 + 초대코드 발급 버튼
- 햄버거 메뉴에 "내 그룹" 항목 추가

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
- 2026-04-20: 최초 작성. Phase 0 완료, Phase 1부터 진행 예정.
