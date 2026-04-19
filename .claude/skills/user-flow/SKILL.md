---
name: user-flow
description: 미션놀이터 사용자 플로우. 인증, 그룹 참여, 미션 제안/수락, 상점, 랭킹 등 전체 흐름을 정의. 구현 완료 / 미구현 목표를 구분해 기재. 화면 구현이나 플로우 변경 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 미션놀이터 사용자 플로우

그룹 미션 기반 보상 앱의 전체 사용자 플로우. **구현 완료**와 **구현 목표(미완)** 를 구분.

---

## 1. 인증 및 그룹 참여

### 1-1. 로그인 (`LoginScreen` / `/`)
- **Google OAuth**: `useAuthStore().signInWithGoogle()` → Supabase 인증 → `/home` 자동 이동
- **초대코드 입력**: `inviteCodeService.validate(code)` → `/invitation` → `/invitation-signup`
- **자동 리다이렉트**: 이미 로그인된 유저는 `user` 복원 즉시 `/home`으로 이동

### 1-2. 초대 플로우
1. 기존 멤버가 초대코드 생성 *(UI 미구현 — 2-2 참고)*
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
  coins: number;         // DB/앱 모델 모두 coins (UI 라벨은 "포인트"로 표시)
  group_id: string | null;
  created_at: string;
  updated_at: string;
}
```

**기능**:
- `useAuthStore`: `signInWithGoogle()`, `signOut()`
- `useProfileStore`: `fetch(userId)`, `update(userId, updates)`, `clear()`
- 세션 복원/변경 구독은 `initAuth()` (App.tsx 초기화)

---

## 2. 미션 시스템

### 2-1. 미션 제안/수락 (목표)
```
제안자: 미션 생성 (제목, 설명, 보상 코인 설정)
  ↓
수락자: 미션 목록에서 확인 → 수락
  ↓
수행: 수락자가 미션 진행
  ↓
완료: 미션 완료 → 보상 코인 지급
```

### 2-2. 구현 현황

#### ✅ 구현 완료
- 미션 생성(`MissionProposeScreen` → `useMissionStore.add()`)
- 미션 수정/삭제(`MissionEditScreen` → `useMissionStore.update/remove()`)
- 미션 상태 변경(active ↔ in_progress → completed 등)
- 내 미션 목록(`HomeScreen`): `proposer_id = 나 OR accepter_id = 나`로 필터링
- Realtime 구독: `missions` 테이블 변경 시 자동 재조회

#### 🚧 구현 목표 (미완)
- **그룹 멤버의 미션 보기**: 현재는 본인 관련 미션만 표시. 그룹 단위 "받은/보낸 미션" 탭 필요
- **미션 수락 UI**: 다른 멤버가 제안한 미션을 목록에서 수락하는 플로우
- **그룹 생성 + 초대코드 발급 화면**: 현재 `invite_codes` 레코드는 DB에 직접 넣어야 함
- **Realtime 필터링**: 현재는 전체 구독 후 본인 필터. 그룹 단위로 좁혀야 효율적
- **보상 코인 자동 지급**: 미션 완료 시 제안자 → 수행자 coins 이동 로직

### 2-3. 미션 데이터 구조

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

### 2-4. 미션 상태 흐름

```
pending (제안됨)
  ↓ 수락
active (미진행)
  ↓ 시작
in_progress (진행중)
  ├→ challenge_success → completed (완료)
  └→ gave_up (포기)
```

색상 테이블은 `mission-playground-components` 스킬 참고.

### 2-5. 미션 스토어

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
| `subscribeMissions(userId)` | Realtime 구독 (초기화 훅에서 호출) |

---

## 3. 홈 화면 (`HomeScreen` / `/home`)

### 3-1. 탭 구조 (현재 구현)

```
HomeScreen
├── 미션 탭
│   ├── 미션 목록 서브탭 (list)
│   │   └── 내 미션 카드 (상태별 버튼 자동 변경)
│   └── 미션 관리 서브탭 (manage)
│       ├── 미션 만들기 버튼 → /mission-propose
│       └── 미션 카드 + 수정/토글 버튼
├── 소원 상점 탭
│   └── ShopItem 목록 (※ 현재 하드코딩, DB 미연동)
├── 상단 헤더
│   ├── 프로필 + 코인
│   └── 햄버거 메뉴 (미션제안/개발자/로그아웃)
└── 하단 네비게이션
    ├── 미션홈
    ├── 랭킹 (/ranking)
    └── 성장보고서 (/growth-report)
```

### 3-2. 구현 현황

#### ✅ 구현 완료
- 미션 탭 + list/manage 서브탭
- 미션 카드 클릭 → 상태 전이 (active→in_progress, challenge_success→completed 등)
- 로그아웃 → `/`로 이동
- 프로필 선택 모달 (이미지/테두리)
- 하단 네비게이션

#### 🚧 구현 목표 (미완)
- **상점 DB 연동** — 현재 `ShopItem`이 하드코딩됨. `products` 테이블과 `productService`/`productStore` 필요
- **코인 차감/지급** — 상점 구매/미션 완료 시 `profiles.coins` 업데이트
- **그룹 멤버 목록/초대 UI** — 현재 햄버거 메뉴에 없음
- **알림 기능** — 햄버거 메뉴의 "알림"은 외부 링크만 열림

### 3-3. 미션 카드 클릭 핸들러 (현재)
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

---

## 4. 상점 시스템

### 4-1. 상품 데이터 구조 (DB 기준)

```typescript
// database.types.ts — products 테이블
interface ProductRow {
  id: string;
  group_id: string | null;
  seller_id: string;       // 등록한 멤버
  buyer_id: string | null; // 구매한 멤버
  title: string;           // 상품명
  coin_price: number;      // 코인 가격
  icon_src: string | null;
  status: 'available' | 'soldout' | 'shipping' | 'delivered';
  delivery_date: string | null;
}
```

앱 모델에서는 `ShopProduct { name, price, ... }` 형태로 매핑 예정.

### 4-2. 상품 상태 흐름 (목표)
```
available → (구매, 코인 차감) → shipping → (전달) → delivered
                                                    → (다시 채우기) → available
```

### 4-3. 구현 현황
- **DB/Service/Store 전부 미구현** — `products` 테이블은 스키마에만 존재
- `HomeScreen`의 상점 탭은 정적 예시 데이터로 UI만 표시

---

## 5. 랭킹 (`RankingScreen` / `/ranking`)

그룹 내 멤버의 미션 완료 순위.

- DB: `ranking_view` 뷰 사용 (profiles + completed 미션 카운트 집계)
- 포디움(상위 3명) + 전체 목록
- **현재 구현**: 정적 데이터 기반 UI (DB 연동 미완)

---

## 6. 성장 보고서 (`GrowthReportScreen` / `/growth-report`)

미션 수행 통계.
- 미션 완료율, 연속 성공, 포기 횟수, 누적 획득 코인 등
- **현재 구현**: UI만, DB 연동 미완

---

## 7. 전체 플로우 요약

```
진입
├── 로그인 (/)
│   ├── Google OAuth → /home
│   └── 초대코드 → /invitation → /invitation-signup → 그룹 합류 → /home
│
└── 홈 (/home)
    ├── 미션 탭
    │   ├── 목록 (내 미션)
    │   └── 관리 → /mission-propose / /mission-edit / /mission-in-progress
    ├── 상점 탭 (하드코딩)
    ├── 랭킹 (/ranking) — 정적 UI
    └── 성장보고서 (/growth-report) — 정적 UI
```

### 인증 보호
`ProtectedRoute`로 감싼 라우트는 `useAuthStore.user`가 있을 때만 진입 가능:
- `/home`, `/mission-propose`, `/mission-in-progress`, `/mission-edit`, `/ranking`, `/growth-report`

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
