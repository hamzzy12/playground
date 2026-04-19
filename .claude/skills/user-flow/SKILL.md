---
name: user-flow
description: 미션놀이터 사용자 플로우. 인증, 그룹 참여, 미션 제안/수락, 상점, 랭킹 등 "현재 동작하는" 흐름을 정의. 화면 구현이나 플로우 변경 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 미션놀이터 사용자 플로우

이 문서는 **현재 앱이 어떻게 동작하는지**를 기술합니다. 앞으로 만들 기능(미구현/기획 결정 대기)은 `docs/roadmap.md` 참고.

---

## 1. 인증 및 그룹 참여

### 1-1. 로그인 (`LoginScreen` / `/`)
- **Google OAuth**: `useAuthStore().signInWithGoogle()` → Supabase 인증 → `/home` 자동 이동
- **초대코드 입력**: `inviteCodeService.validate(code)` → `/invitation` → `/invitation-signup`
- **자동 리다이렉트**: 이미 로그인된 유저는 세션 복원 즉시 `/home`으로 이동

### 1-2. 초대 → 가입 플로우
1. (초대코드는 현재 DB에 수동 입력 — UI는 로드맵 Phase 1)
2. 새 멤버가 초대코드 입력 → `/invitation` → `/invitation-signup`
3. 이름/관계 입력 → `groupService.addMember()` + `profileService.update({ group_id })` + `inviteCodeService.markUsed()`
4. 가입 완료 팝업 → `/home`

### 1-3. 인증 시스템 (Zustand)

**스토어**: `src/app/stores/authStore.ts`, `src/app/stores/profileStore.ts`

- `authStore`: `supabase.auth.*` 상태 (세션/user/loading)
- `profileStore`: `profiles` 테이블 row

```typescript
// types/profile.ts
interface Profile {
  id: string;
  name: string;
  profile_img: string | null;
  border_color: string | null;
  coins: number;         // DB/앱 모델 모두 coins (UI 라벨은 "포인트")
  group_id: string | null;
  created_at: string;
  updated_at: string;
}
```

**기능**:
- `useAuthStore`: `signInWithGoogle()`, `signOut()`
- `useProfileStore`: `fetch(userId)`, `update(userId, updates)`, `clear()`
- 세션 복원/변경 구독은 `initAuth()` (`App.tsx`의 `AppInitializer`에서 호출)

---

## 2. 미션 시스템

### 2-1. 데이터 구조

```typescript
// types/mission.ts
type MissionStatus = 'pending' | 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  bgColor: string;          // 상태별 자동 계산
  barColor: string;
  status: MissionStatus;
  frequency?: '1회' | '매일' | '매주' | '매월';
  dueDate?: string;
  iconSrc?: string;
  enabled?: boolean;
  creatorId?: string;       // DB proposer_id 매핑
  assigneeId?: string;      // DB accepter_id 매핑
}
```

### 2-2. 현재 동작
- `HomeScreen` 미션 목록은 `proposer_id = 나 OR accepter_id = 나`인 미션만 표시 (`missionService.fetchByUser`)
- 미션 생성 시 기본 `accepter_id = proposer_id = 본인` (자기 자신에게 할당)
- 미션 상태 변경은 낙관적 업데이트 후 DB 반영
- Realtime: `missions` 테이블 전체 변경을 구독, 발생 시 `fetch(userId)` 재실행

### 2-3. 미션 상태 흐름

```
active (미진행)
  ↓ 시작 (카드 클릭)
in_progress (진행중)
  ├→ challenge_success → completed (완료)
  └→ gave_up (포기)
```

> `pending` 상태는 enum에 있으나 현재 생성 기본값은 `active`. `pending` 활용은 로드맵 Phase 1.

색상 테이블은 `mission-playground-components` 스킬 참고.

### 2-4. 미션 스토어

**`src/app/stores/missionStore.ts`**

| 함수 | 설명 |
|------|------|
| `useMissionStore((s) => s.missions)` | 미션 목록 구독 |
| `fetch(userId)` | 사용자 기준 재조회 |
| `add(userId, input)` | 미션 생성 |
| `updateStatus(id, status)` | 상태 변경 (낙관적) |
| `update(id, updates)` | 내용 수정 |
| `remove(id)` | 삭제 |
| `toggleEnabled(id, enabled)` | 활성/비활성 토글 |
| `subscribeMissions(userId)` | Realtime 구독 (초기화 시 호출) |

---

## 3. 홈 화면 (`HomeScreen` / `/home`)

### 3-1. 탭 구조

```
HomeScreen
├── 미션 탭
│   ├── 미션 목록 서브탭 (list)
│   │   └── 내 미션 카드 (상태별 버튼 자동 변경)
│   └── 미션 관리 서브탭 (manage)
│       ├── 미션 만들기 버튼 → /mission-propose
│       └── 미션 카드 + 수정/토글 버튼
├── 소원 상점 탭
│   └── ShopItem 목록 (※ 현재 정적 예시, DB 미연동 — 로드맵 Phase 2)
├── 상단 헤더
│   ├── 프로필 + 코인
│   └── 햄버거 메뉴 (미션제안 / 만든개발자 / 알림(외부링크) / 로그아웃)
└── 하단 네비게이션
    ├── 미션홈
    ├── 랭킹 (/ranking)
    └── 성장보고서 (/growth-report)
```

### 3-2. 미션 카드 클릭 핸들러 (현재 동작)
```typescript
switch (mission.status) {
  case 'active':
    updateMissionStatus(mission.id, 'in_progress');
    break;
  case 'in_progress':
    navigate('/mission-in-progress', { state: { mission } });
    break;
  case 'challenge_success':
  case 'completed':
    // MissionCompletePopup 열기
    break;
}
```

### 3-3. 로그아웃
햄버거 메뉴 → `signOut()` → `/`로 이동.
다른 화면에서는 ProtectedRoute가 세션 소실을 감지해 `/`로 리다이렉트.

---

## 4. 상점 시스템 (현재 정적)

### 4-1. DB 테이블 (스키마만 존재)

```typescript
// products 테이블 row
interface ProductRow {
  id: string;
  group_id: string | null;
  seller_id: string;
  buyer_id: string | null;
  title: string;
  coin_price: number;
  icon_src: string | null;
  status: 'available' | 'soldout' | 'shipping' | 'delivered';
  delivery_date: string | null;
}
```

### 4-2. 현재 동작
- `HomeScreen` 상점 탭에 `ShopItem` 5개가 **하드코딩**으로 표시
- 클릭하면 `ExchangeConfirmPopup` 등 팝업은 동작하지만 DB 변경 없음
- 실제 구매/코인 차감/등록 로직은 미구현 (로드맵 Phase 2)

---

## 5. 랭킹 (`RankingScreen` / `/ranking`)

- DB: `ranking_view` 뷰 존재 (profiles + completed 미션 카운트 집계)
- **현재 구현**: 정적 예시 데이터 기반 UI. DB 쿼리 미연동 (로드맵 Phase 3)

---

## 6. 성장 보고서 (`GrowthReportScreen` / `/growth-report`)

- **현재 구현**: UI만, DB 연동 미완 (로드맵 Phase 3)

---

## 7. 라우트 전체 구조

### 공개 라우트
- `/` (LoginScreen)
- `/invitation` (InvitationScreen)
- `/invitation-signup` (InvitationSignupScreen)

### 인증 보호 라우트 (`ProtectedRoute` 래핑)
- `/home` (HomeScreen)
- `/mission-propose` (MissionProposeScreen)
- `/mission-in-progress` (InProgressMissionScreen)
- `/mission-edit` (MissionEditScreen)
- `/ranking` (RankingScreen)
- `/growth-report` (GrowthReportScreen)

미인증 접근 시 `/`로 리다이렉트.

---

## 8. 데이터베이스 (Supabase)

| 테이블 | 용도 |
|--------|------|
| `profiles` | 멤버 프로필 (이름, coins, group_id) |
| `groups` | 그룹 정보 |
| `group_members` | 그룹-멤버 관계 (M:N) |
| `missions` | 미션 (proposer_id, accepter_id, group_id, 상태, 보상) |
| `products` | 상점 상품 (seller_id, buyer_id, coin_price) |
| `invite_codes` | 초대코드 (creator_id, group_id, used_by) |

### 뷰
- `ranking_view`: 랭킹 집계 (id, name, profile_img, border_color, completed_count)

### RLS 헬퍼
- `is_group_member(UUID)`: 사용자가 해당 그룹의 멤버인지 확인 (`SECURITY DEFINER`)

상세 스키마는 `supabase/schema.sql` 참고.
