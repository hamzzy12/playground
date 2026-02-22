# 미션놀이터 - 부모 사용자 플로우

부모 사용자의 전체 사용 흐름을 정의한 기획 문서. Figma 프레임 `미션놀이터_부모사용자` (node-id: `612:2095`) 기반.

## Figma 참조

- **프레임**: 미션놀이터_부모사용자
- **Node ID**: `612:2095`
- **Figma 링크**: https://www.figma.com/design/LspCuVvapxePLY7XoLFjwz/미션놀이터?node-id=612-2095

---

## 1. 인증 및 회원가입

### 1-1. 인증 시스템 (AuthContext)

**컴포넌트**: `src/app/context/AuthContext.tsx`

Supabase 기반 인증 시스템으로, Google OAuth를 통해 로그인한다.

```typescript
interface Profile {
  id: string;
  name: string;
  role: UserRole;     // 'parent' | 'child' | 'solo'
  profile_img: string | null;
  border_color: string | null;
  coins: number;
  created_at: string;
  updated_at: string;
}
```

**제공 기능**:
- `signInWithGoogle()` — Google OAuth 로그인
- `signOut()` — 로그아웃 (상태 초기화)
- `updateProfile(updates)` — 프로필 업데이트 (이름, 역할 등)
- `refreshProfile()` — 프로필 새로고침

**인증 흐름**:
```
앱 시작 → supabase.auth.getSession()
       → 세션 있으면 → fetchProfile(userId) → 프로필 로드
       → 세션 없으면 → loading = false
       → onAuthStateChange 리스너로 실시간 상태 감시
```

### 1-2. 라우트 보호 (ProtectedRoute)

**컴포넌트**: `src/app/components/ProtectedRoute.tsx`

역할 기반 라우트 가드. 인증되지 않은 사용자는 로그인 페이지로, 역할이 맞지 않으면 해당 홈으로 리다이렉트한다.

```
인증 안 됨 → Navigate("/")
역할 불일치 → parent → "/parent-home"
           → child  → "/home"
           → solo   → "/solo-home"
```

> **개발 환경**: `import.meta.env.DEV`일 때 인증을 우회하여 자유롭게 접근 가능.

### 1-3. 로그인 진입

**컴포넌트**: `src/app/components/LoginScreen.tsx` (라우트: `/`)

- **Google 로그인**: `signInWithGoogle()` → OAuth 콜백 → 역할별 자동 이동
- **초대코드 입력**: Supabase `invite_codes` 테이블 검증 → `/invitation` 이동
- **자동 리다이렉트**: 이미 로그인된 유저는 역할에 따라 자동 이동

```typescript
// 역할별 자동 이동 로직
useEffect(() => {
  if (!loading && user && profile) {
    const route =
      profile.role === "parent" ? "/parent-home" :
      profile.role === "child" ? "/home" :
      "/solo-home";
    navigate(route, { replace: true });
  }
}, [user, profile, loading, navigate]);
```

### 1-4. 초대 회원가입

**컴포넌트**: `src/app/components/InvitationSignupScreen.tsx` (라우트: `/invitation-signup`)

- 초대코드의 `role_for` 필드에 따라 역할 결정 (`parent` / `child` / `solo`)
- 이름 입력 + 관계 선택 후 프로필 업데이트
- 초대코드가 있으면 `families` 테이블에 가족 관계 생성

```typescript
// 역할 결정
const role = inviteState?.roleFor === "child" ? "child"
  : inviteState?.roleFor === "parent" ? "parent"
  : "solo";

// 가족 관계 생성 (초대코드 기반)
const familyInsert = role === "child"
  ? { parent_id: codeData.creator_id, child_id: user.id }
  : { parent_id: user.id, child_id: codeData.creator_id };
```

---

## 2. 미션 관리 시스템 (MissionContext)

**컴포넌트**: `src/app/context/MissionContext.tsx`

Supabase 백엔드와 연동된 미션 CRUD 시스템. 부모-자녀 간 실시간 동기화를 지원한다.

### 2-1. 미션 데이터 구조

```typescript
type MissionStatus = 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  bgColor: string;        // 상태별 자동 결정
  barColor: string;       // 상태별 자동 결정
  status: MissionStatus;
  frequency?: '1회' | '매일' | '매주' | '매월';
  dueDate?: string;
  iconSrc?: string;
  enabled?: boolean;
  creatorId?: string;
  assigneeId?: string;
}
```

### 2-2. 미션 상태별 색상

| 상태 | 배경색 | 바 색상 | 의미 |
|------|--------|---------|------|
| `active` | `#f2e1be` | `#FEB700` | 미진행 (노랑) |
| `in_progress` | `#f5eaf8` | `#C07FE5` | 진행중 (보라) |
| `gave_up` | `#f5e8e8` | `#E57F7F` | 포기 (빨강) |
| `challenge_success` | `#e8f0f6` | `#7FC0E5` | 도전성공 (파랑) |
| `completed` | `#e8f6ed` | `#5EE2A0` | 미션완료 (초록) |

### 2-3. CRUD 기능

| 함수 | 설명 | 업데이트 방식 |
|------|------|--------------|
| `addMission()` | 미션 생성 (Supabase insert → fetchMissions) | 서버 반영 후 리로드 |
| `updateMission()` | 미션 수정 (title, subtitle, reward 등) | 서버 반영 후 리로드 |
| `deleteMission()` | 미션 삭제 | 낙관적 업데이트 |
| `updateMissionStatus()` | 상태 변경 (active → completed 등) | 낙관적 업데이트 |
| `toggleMissionEnabled()` | 활성/비활성 토글 | 낙관적 업데이트 |

### 2-4. 실시간 동기화

Supabase Realtime으로 `missions` 테이블 변경을 구독. 부모가 미션을 생성하면 자녀 화면에 즉시 반영된다.

```typescript
const channel = supabase
  .channel('missions-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'missions' },
    () => fetchMissions()
  )
  .subscribe();
```

### 2-5. 개발 환경 지원

`import.meta.env.DEV`일 때 로그인 없이도 로컬 상태로 미션 추가/관리 가능 (`crypto.randomUUID()`로 ID 생성).

---

## 3. 부모 홈 화면 (ParentHomeScreen)

**컴포넌트**: `src/app/components/ParentHomeScreen.tsx` (라우트: `/parent-home`)

### 3-1. 상태 관리

```typescript
const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
const [subTab, setSubTab] = useState<'list' | 'manage' | 'cheer'>('list');
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isChildSelectOpen, setIsChildSelectOpen] = useState(false);
const [selectedChild, setSelectedChild] = useState(profile?.name ?? '아이');
const [shopProducts, setShopProducts] = useState<ShopProduct[]>([...]);
const [cheerHistory, setCheerHistory] = useState<string[]>([...]);
```

### 3-2. 탭 구조

```
ParentHomeScreen
├── 메인 탭
│   ├── 미션 (activeTab: 'mission')
│   │   ├── 미션 목록 (subTab: 'list')     → 미션 카드 목록 (상태별 색상)
│   │   ├── 미션 관리 (subTab: 'manage')   → 미션 만들기 + 수정 + 토글
│   │   └── 응원하기 (subTab: 'cheer')     → 응원 메시지 입력/목록
│   └── 교환 상점 (activeTab: 'shop')
│       ├── 상품 올리기 → ProductCreatePopup
│       ├── 일반 카드 클릭 → ProductEditPopup
│       ├── 품절 카드 → ProductRefillPopup
│       └── 배송완료 카드 → ProductRewardPopup
├── 아이 선택 드롭다운 (헤더 "아이 : 김쭈니" 클릭)
│   ├── 자녀 목록
│   └── 아이추가 버튼
├── 햄버거 메뉴
│   ├── 모드 변경 → ModeChangePopup (싱글모드/부모모드 전환)
│   ├── 만든개발자 → DeveloperInfoPopup
│   ├── 알림 → 네이버 카페 링크 (새 탭)
│   └── 로그아웃 → signOut() + navigate('/')
└── 하단 네비게이션
    ├── 미션홈 (활성)
    ├── 하루일기 (비활성)
    └── 성장보고서 → navigate('/growth-report')
```

### 3-3. 미션 목록 탭 (`subTab: 'list'`)

MissionContext의 `missions` 데이터를 `MissionCard` 형태로 변환하여 표시.

```typescript
const missionCardData: Mission[] = missions.map(m => ({
  id: m.id,
  title: m.title,
  description: m.subtitle,
  reward: m.reward,
  backgroundColor: m.bgColor,   // 상태별 자동 결정
  bottomBarColor: m.barColor,
  status: m.status,
}));
```

- 스크롤 영역: `top: 319px`, `height: 464px`
- 카드 높이: 162px (간격 포함)
- 하드코딩된 3개 카드 (구몬학습지, 태권도, 학교 숙제) + 동적 데이터

### 3-4. 미션 관리 탭 (`subTab: 'manage'`)

- **미션 만들기**: `MissionProposeModal` 열기 → `handleCreateMission()` → `addMission()`
- **미션 카드 목록**: 각 미션에 토글 스위치 (활성/비활성) 포함
- **미션 수정**: 카드 클릭 → `MissionEditPopup` 열기 → `updateMission()` / `deleteMission()`

```typescript
// 미션 생성
const handleCreateMission = async (title, description, reward, frequency) => {
  await addMission({ title, subtitle: description, reward, frequency });
  setIsMissionProposeOpen(false);
};

// 토글 스위치
<button onClick={(e) => {
  e.stopPropagation();
  toggleMissionEnabled(mission.id, !enabled);
}}>
```

### 3-5. 응원하기 탭 (`subTab: 'cheer'`)

- 응원 메시지 입력 (Enter로 전송)
- 최근 보낸 메시지 목록 (로컬 상태)
- 카드 높이: 79px (간격 포함)

### 3-6. 교환 상점 탭 (`activeTab: 'shop'`)

```typescript
interface ShopProduct {
  id: string;
  name: string;
  price: number;
  iconSrc: string | null;
  status: 'available' | 'soldout' | 'shipping' | 'delivered';
}
```

| 상품 상태 | 동작 | 컴포넌트 |
|-----------|------|----------|
| `available` | 클릭 → 수정 | `ProductEditPopup` |
| `soldout` | "품절상품 채우기" 버튼 | `ProductRefillPopup` |
| `shipping` | "배송중" 표시 | — |
| `delivered` | "보상주기" 버튼 | `ProductRewardPopup` |

---

## 4. 모드 변경

**컴포넌트**: `src/app/components/ModeChangePopup.tsx`

햄버거 메뉴에서 접근. 싱글모드(`/solo-home`)와 부모모드(`/parent-home`) 간 전환.

```
모드변경 팝업
├── 싱글모드 → navigate("/solo-home")
└── 부모모드 → navigate("/parent-home")
```

---

## 5. 성장보고서

**컴포넌트**: `src/app/components/GrowthReportScreen.tsx` (라우트: `/growth-report`)

하단 네비게이션 "성장보고서" 탭에서 접근. 부모/아이 관점의 성장 리포트 제공.

---

## 전체 플로우 요약

```
부모 진입
├── 로그인 (LoginScreen, /)
│   ├── Google OAuth → 역할 자동 판별 → /parent-home
│   └── 초대코드 입력 → /invitation → /invitation-signup
│       └── 역할 결정 (role_for) + 가족 관계 생성 (families 테이블)
│
├── 인증 가드 (ProtectedRoute)
│   ├── 비로그인 → / 리다이렉트
│   ├── 역할 불일치 → 역할별 홈 리다이렉트
│   └── DEV 모드 → 인증 우회
│
└── 부모 홈 (ParentHomeScreen, /parent-home)
    ├── 아이 변경 → 드롭다운 (자녀 목록 + 아이추가)
    ├── 미션 탭
    │   ├── 미션 목록 → 상태별 색상 카드 (MissionContext 연동)
    │   ├── 미션 관리
    │   │   ├── 미션 만들기 → MissionProposeModal → addMission()
    │   │   ├── 미션 수정 → MissionEditPopup → updateMission()
    │   │   ├── 미션 삭제 → deleteMission()
    │   │   └── 미션 토글 → toggleMissionEnabled()
    │   └── 응원하기 → 메시지 입력/목록
    ├── 교환상점 탭
    │   ├── 상품 올리기 → ProductCreatePopup
    │   ├── 상품 수정 → ProductEditPopup
    │   ├── 품절상품 채우기 → ProductRefillPopup
    │   └── 보상주기 → ProductRewardPopup
    ├── 햄버거 메뉴
    │   ├── 모드 변경 → ModeChangePopup (싱글/부모 전환)
    │   ├── 만든개발자 → DeveloperInfoPopup
    │   ├── 알림 → 네이버 카페 (외부 링크)
    │   └── 로그아웃 → signOut() + navigate('/')
    ├── 하단 네비게이션
    │   ├── 미션홈 (현재)
    │   ├── 하루일기 (비활성)
    │   └── 성장보고서 → /growth-report
    └── 실시간 동기화
        └── Supabase Realtime → missions 테이블 구독
```

---

## 라우팅 (App.tsx 기준)

| 경로 | 컴포넌트 | 보호 | 설명 |
|------|----------|------|------|
| `/` | `LoginScreen` | 공개 | 로그인/초대코드 입력 |
| `/invitation` | `InvitationScreen` | 공개 | 초대 수락 화면 |
| `/invitation-signup` | `InvitationSignupScreen` | 공개 | 초대 회원가입 |
| `/parent-home` | `ParentHomeScreen` | ProtectedRoute | 부모 홈화면 |
| `/growth-report` | `GrowthReportScreen` | ProtectedRoute | 성장보고서 |
| `/ranking` | `RankingScreen` | ProtectedRoute | 랭킹 화면 |
| `/mission-edit` | `MissionEditPopup` | ProtectedRoute | 미션 수정 |
| `/product-refill` | `ProductRefillPopup` | ProtectedRoute | 품절상품 채우기 |
| `/product-reward` | `ProductRewardPopup` | ProtectedRoute | 보상주기 |
| `/mode-change` | `ModeChangePopup` | ProtectedRoute | 모드 변경 |

---

## 부모 전용 컴포넌트

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| ParentHomeScreen | `src/app/components/ParentHomeScreen.tsx` | 부모 홈 (메인탭/서브탭 시스템) |
| MissionEditPopup | `src/app/components/MissionEditPopup.tsx` | 미션 수정/삭제 팝업 |
| ProductCreatePopup | `src/app/components/ProductCreatePopup.tsx` | 상품 올리기 팝업 |
| ProductEditPopup | `src/app/components/ProductEditPopup.tsx` | 상품 수정/삭제 팝업 |
| ProductRefillPopup | `src/app/components/ProductRefillPopup.tsx` | 품절상품 채우기 팝업 |
| ProductRewardPopup | `src/app/components/ProductRewardPopup.tsx` | 보상주기 (날짜 피커) 팝업 |
| ModeChangePopup | `src/app/components/ModeChangePopup.tsx` | 싱글/부모 모드 전환 |
| GrowthReportScreen | `src/app/components/GrowthReportScreen.tsx` | 성장보고서 화면 |
| ProtectedRoute | `src/app/components/ProtectedRoute.tsx` | 인증 가드 |
| ProfileSelectModal | `src/app/components/ProfileSelectModal.tsx` | 프로필/테두리 선택 |
| DeveloperInfoPopup | `src/app/components/DeveloperInfoPopup.tsx` | 만든개발자 정보 팝업 |
| MissionCompletePopup | `src/app/components/MissionCompletePopup.tsx` | 미션완료 확인 팝업 |
| SignupCompletePopup | `src/app/components/SignupCompletePopup.tsx` | 가입완료 팝업 |
| MissionProposeModal | `src/imports/MissionProposeModal.tsx` | 미션 생성 모달 |
| AlertPopup | `src/imports/AlertPopup.tsx` | 알림 팝업 |

---

## 핵심 컨텍스트

| 컨텍스트 | 경로 | 역할 |
|----------|------|------|
| AuthContext | `src/app/context/AuthContext.tsx` | 인증, 프로필, Google OAuth |
| MissionContext | `src/app/context/MissionContext.tsx` | 미션 CRUD, 상태 관리, 실시간 동기화 |

---

## 데이터베이스 (Supabase)

**스키마**: `supabase/schema.sql`

| 테이블 | 부모 관련 필드 | 용도 |
|--------|---------------|------|
| `profiles` | `role = 'parent'` | 부모 프로필 |
| `families` | `parent_id` | 부모-자녀 관계 |
| `missions` | `creator_id` | 부모가 생성한 미션 |
| `products` | `creator_id` | 부모가 등록한 보상 상품 |
| `cheer_messages` | `sender_id` | 부모가 보낸 응원 메시지 |
| `invite_codes` | `creator_id`, `role_for` | 부모가 생성한 초대코드 |
