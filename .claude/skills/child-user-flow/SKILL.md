# 미션놀이터 - 아이 사용자 플로우

아이 사용자의 전체 사용 흐름을 정의한 기획 문서. Figma 프레임 `미션놀이터_아이사용자` (node-id: `612:2096`) 기반.

## Figma 참조

- **프레임**: 미션놀이터_아이사용자
- **Node ID**: `612:2096`
- **Figma 링크**: https://www.figma.com/design/LspCuVvapxePLY7XoLFjwz/미션놀이터?node-id=612-2096

---

## 1. 인증 및 회원가입

### 1-1. 인증 시스템 (AuthContext)

**컴포넌트**: `src/app/context/AuthContext.tsx`

Supabase 기반 인증 시스템. Google OAuth로 로그인하고, 프로필(역할·이름·코인)을 관리한다.

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
- `updateProfile(updates)` — 프로필 업데이트
- `refreshProfile()` — 프로필 새로고침

### 1-2. 라우트 보호 (ProtectedRoute)

**컴포넌트**: `src/app/components/ProtectedRoute.tsx`

역할 기반 라우트 가드. 아이 사용자(`role: 'child'`)는 `/home`으로 자동 리다이렉트된다.

```
인증 안 됨 → Navigate("/")
역할 불일치 → child  → "/home"
           → parent → "/parent-home"
           → solo   → "/solo-home"
```

> **개발 환경**: `import.meta.env.DEV`일 때 인증을 우회하여 자유롭게 접근 가능.

### 1-3. 로그인 진입

**컴포넌트**: `src/app/components/LoginScreen.tsx` (라우트: `/`)

- **Google 로그인**: `signInWithGoogle()` → OAuth 콜백 → 역할별 자동 이동
- **초대코드 입력**: Supabase `invite_codes` 테이블 검증 → `/invitation` 이동
- **자동 리다이렉트**: 이미 로그인된 유저는 역할에 따라 자동 이동

```typescript
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

**초대코드 검증**:
```typescript
const { data, error } = await supabase
  .from("invite_codes")
  .select("*")
  .eq("code", inviteCode.trim())
  .is("used_by", null)
  .single();
// 유효 → navigate("/invitation", { state: { inviteCode, roleFor } })
```

### 1-4. 초대 회원가입

**컴포넌트**: `src/app/components/InvitationSignupScreen.tsx` (라우트: `/invitation-signup`)

- 초대코드의 `role_for` 필드에 따라 역할 결정 (`child` / `parent` / `solo`)
- 이름 입력 + 관계 선택 → `updateProfile({ name, role })`
- 초대코드가 있으면 `families` 테이블에 가족 관계 생성

```typescript
// 아이 역할일 때 가족 관계 생성
const familyInsert = role === "child"
  ? { parent_id: codeData.creator_id, child_id: user.id }  // 부모가 초대
  : { parent_id: user.id, child_id: codeData.creator_id };  // 아이가 초대

// 초대코드 사용 처리
await supabase.from("invite_codes")
  .update({ used_by: user.id, family_id: familyData?.id })
  .eq("code", inviteState.inviteCode);
```

**가입 완료 후 역할별 리다이렉트**:
```typescript
// SignupCompletePopup 확인 클릭 시
const route = role === "parent" ? "/parent-home" : role === "child" ? "/home" : "/solo-home";
navigate(route);
```

---

## 2. 미션 관리 시스템 (MissionContext)

**컴포넌트**: `src/app/context/MissionContext.tsx`

Supabase 백엔드 연동 미션 CRUD 시스템. 부모-자녀 간 실시간 동기화를 지원한다.

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
  creatorId?: string;     // 미션 생성자 (부모 또는 아이)
  assigneeId?: string;    // 미션 수행자 (아이)
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

### 2-3. 미션 상태 우선순위 (정렬)

```typescript
const MISSION_STATUS_PRIORITY: Record<MissionStatus, number> = {
  'active': 1,           // 미진행 (최상위)
  'in_progress': 2,      // 진행중
  'gave_up': 3,          // 포기
  'challenge_success': 4, // 도전성공
  'completed': 5,        // 미션완료 (최하위)
};
```

HomeScreen에서 미션 카드는 이 우선순위에 따라 정렬되며, `missionOrder` 상태로 순서를 유지한다.

### 2-4. CRUD 기능 (아이 관점)

| 함수 | 아이의 사용 | 업데이트 방식 |
|------|------------|--------------|
| `updateMissionStatus()` | 미션 상태 변경 (active → in_progress → completed) | 낙관적 업데이트 |
| `addMission()` | 미션 제안 (MissionProposeScreen에서) | 서버 반영 후 리로드 |

### 2-5. 실시간 동기화

Supabase Realtime으로 `missions` 테이블 변경 구독. 부모가 미션을 생성/수정하면 아이 화면에 즉시 반영된다.

```typescript
const channel = supabase
  .channel('missions-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'missions' },
    () => fetchMissions()
  )
  .subscribe();
```

---

## 3. 아이 홈 화면 (HomeScreen)

**컴포넌트**: `src/app/components/HomeScreen.tsx` (라우트: `/home`)

### 3-1. 상태 관리

```typescript
const { profile, signOut } = useAuth();
const { missions, updateMissionStatus } = useMissions();

const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
const [missionSubTab, setMissionSubTab] = useState<'list' | 'manage'>('list');
const [missionEnabled, setMissionEnabled] = useState<Record<string, boolean>>({});
const [missionOrder, setMissionOrder] = useState<string[]>([]);
const [selectedProfileImg, setSelectedProfileImg] = useState<string | null>(null);
const [selectedBorderColor, setSelectedBorderColor] = useState<string | null>(null);
```

### 3-2. 탭 구조

```
HomeScreen
├── 메인 탭 (imgMainTabMission / imgMainTabShop SVG)
│   ├── 미션 (activeTab: 'mission')
│   │   ├── 미션 목록 (missionSubTab: 'list') ← 기본값
│   │   │   ├── "오늘의 미션" 헤더 (동적 날짜 표시)
│   │   │   └── MissionCard 목록 (MissionContext 연동, 상태별 정렬)
│   │   │       ├── active → 클릭 시 in_progress로 변경
│   │   │       ├── in_progress → 클릭 시 InProgressMissionScreen 이동
│   │   │       ├── challenge_success → 클릭 시 MissionCompletePopup → completed
│   │   │       └── completed → 클릭 시 MissionCompletePopup (확인용)
│   │   └── 미션 관리 (missionSubTab: 'manage')
│   │       ├── 미션 만들기 → navigate('/mission-propose', {state:{from:'home-manage'}})
│   │       └── 미션 카드 목록
│   │           ├── 수정하기 → navigate('/mission-edit')
│   │           └── 토글 스위치 (로컬 missionEnabled 상태)
│   └── 소원 상점 (activeTab: 'shop')
│       ├── available → ExchangeConfirmPopup → shipping으로 변경
│       ├── soldout → SoldOutPopup
│       ├── shipping → ShippingPopup
│       └── delivered → DeliveredPopup
├── 프로필 버튼 (좌상단, 프로필 이미지 + 이름 + 코인)
│   └── 클릭 → ProfileSelectModal (캐릭터 4종 + 테두리 색상 4종)
├── 코인 표시 (profile?.coins)
├── 햄버거 메뉴 (4개 항목)
│   ├── 미션제안하기 → navigate('/mission-propose')
│   ├── 만든개발자 → DeveloperInfoPopup
│   ├── 알림 → 네이버 카페 링크 (새 탭)
│   └── 로그아웃 → signOut() + navigate('/')
└── 하단 네비게이션
    ├── 미션홈 (활성)
    ├── 랭킹전 → navigate('/ranking')
    └── 성장보고서 → navigate('/growth-report')
```

### 3-3. 미션 카드 컴포넌트 (인라인)

HomeScreen 내부에 정의된 `MissionCard` 컴포넌트. 상태별 배경색/바 색상/버튼 이미지를 자동 변경한다.

```typescript
interface MissionCardProps {
  bgColor: string;
  barColor: string;
  shadowColor: string;
  title: string;
  subtitle: string;
  rewardText: string;
  iconSrc: string;
  buttonSrc: string;              // active 상태 버튼
  inProgressButtonSrc: string;    // in_progress 상태 버튼
  gaveUpButtonSrc: string;        // gave_up 상태 버튼
  challengeSuccessButtonSrc: string; // challenge_success 상태 버튼
  completedButtonSrc: string;     // completed 상태 버튼
  svgPath: string;                // 하단 바 SVG 경로
  status?: MissionStatus;
  onButtonClick?: () => void;
}
```

### 3-4. 미션 카드 클릭 핸들러

```typescript
const handleMissionButtonClick = (mission) => {
  if (mission.status === 'active') {
    updateMissionStatus(mission.id, 'in_progress');        // 미진행 → 진행중
  } else if (mission.status === 'in_progress') {
    navigate('/mission-in-progress', { state: { mission } }); // 진행중 → 미션 수행 화면
  } else if (mission.status === 'challenge_success') {
    setShowCompletePopup(true);                             // 도전성공 → 완료 팝업
  } else if (mission.status === 'completed') {
    setShowCompletePopup(true);                             // 완료 → 확인 팝업
  }
};
```

### 3-5. 미션 정렬

미션 카드는 `MISSION_STATUS_PRIORITY`에 따라 정렬되고, `missionOrder` 상태로 순서를 유지한다 (새 미션 추가 시에만 재정렬).

```typescript
useEffect(() => {
  const hasNewMission = missionIds.some(id => !missionOrder.includes(id));
  if (missionOrder.length === 0 || hasNewMission) {
    const sortedIds = [...missions]
      .sort((a, b) => MISSION_STATUS_PRIORITY[a.status] - MISSION_STATUS_PRIORITY[b.status])
      .map(m => m.id);
    setMissionOrder(sortedIds);
  }
}, [missions, missionOrder]);
```

### 3-6. 탭 복원 (location.state)

다른 화면에서 돌아올 때 이전 탭 상태를 복원한다.

```typescript
useEffect(() => {
  const state = location.state as { completedMissionId?: string; missionSubTab?: string };
  if (state?.completedMissionId) {
    updateMissionStatus(state.completedMissionId, 'completed');
  }
  if (state?.missionSubTab) {
    setMissionSubTab(state.missionSubTab);
  }
  window.history.replaceState({}, document.title); // 중복 처리 방지
}, [location.state]);
```

### 3-7. 프로필 선택

```typescript
const PROFILE_MAP: Record<string, string> = {
  p1: imgRectangle31,  // 캐릭터 1
  p2: imgRectangle33,  // 캐릭터 2
  p3: imgRectangle34,  // 캐릭터 3
  p4: imgRectangle32,  // 캐릭터 4
};

const borderMap: Record<string, string> = {
  b1: "#37e59a",  // 초록
  b2: "#ffb0ef",  // 핑크
  b3: "#ffe550",  // 노랑
  b4: "#ff7878",  // 빨강
};
```

### 3-8. 소원 상점 (ShopItem)

HomeScreen 내부에 정의된 `ShopItem` 컴포넌트. 상태별 오버레이를 표시한다.

```typescript
interface ShopItemProps {
  title: string;
  price: string;
  iconSrc: string;
  status?: 'available' | 'soldout' | 'shipping' | 'delivered';
  statusImageSrc?: string;
  onClick?: () => void;
}
```

| 상품 상태 | 클릭 시 동작 | 관련 팝업 |
|----------|------------|----------|
| `available` | 교환 확인 → shipping으로 변경 | `ExchangeConfirmPopup` |
| `soldout` | 품절 알림 | `SoldOutPopup` |
| `shipping` | 배송중 알림 | `ShippingPopup` |
| `delivered` | 배송완료 알림 | `DeliveredPopup` |

### 3-9. 스크롤 영역 애니메이션

`motion.div`로 탭/서브탭에 따라 스크롤 영역의 top 위치가 애니메이션으로 변경된다.

```typescript
<motion.div
  animate={{ top: activeTab === 'mission' ? (missionSubTab === 'list' ? 370 : 315) : 265 }}
  transition={isInitialRender ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
>
```

### 3-10. 오늘의 미션 헤더

미션 목록 서브탭에서만 표시. 동적 날짜 포맷 사용.

```typescript
const getTodayDateString = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayNames[today.getDay()];
  return `${month}월 ${date}일(${day}) 오늘의 미션`;
};
```

---

## 4. 성장보고서

**컴포넌트**: `src/app/components/GrowthReportScreen.tsx` (라우트: `/growth-report`)

하단 네비게이션 "성장보고서" 탭에서 접근. 미션 통계를 시각화한다.

### 표시 항목

| 항목 | 설명 | 현재 값 (하드코딩) |
|------|------|-------------------|
| 미션 완료율 | 프로그레스 바 + 퍼센트 | 85% |
| 어제 대비 변화 | 상승/하락 표시 | +5 상승 |
| 재도전 횟수 | 포기 후 재시도한 횟수 | 12회 |
| 연속 미션 성공 | 연속으로 성공한 미션 수 | 12회 |
| 포기 횟수 | 미션 포기 횟수 | 2회 |
| 성공 미션 개수 | 총 완료한 미션 수 | 135개 |

### 하단 네비게이션

성장보고서 탭이 활성 상태. 미션홈(`/home`) 및 랭킹전(`/ranking`)으로 이동 가능.

---

## 전체 플로우 요약

```
아이 진입
├── 로그인 (LoginScreen, /)
│   ├── Google OAuth → 역할 자동 판별 → /home
│   └── 초대코드 입력 → /invitation → /invitation-signup
│       └── 역할 결정 (role_for: "child") + 가족 관계 생성
│
├── 인증 가드 (ProtectedRoute)
│   ├── 비로그인 → / 리다이렉트
│   ├── 역할 불일치 → 역할별 홈 리다이렉트
│   └── DEV 모드 → 인증 우회
│
└── 아이 홈 (HomeScreen, /home)
    ├── 프로필 → ProfileSelectModal (캐릭터 4종 + 테두리 4색)
    ├── 코인 표시 (profile?.coins)
    ├── 미션 탭
    │   ├── 미션 목록 (MissionContext 연동, 상태별 정렬)
    │   │   ├── active → in_progress (updateMissionStatus)
    │   │   ├── in_progress → InProgressMissionScreen (/mission-in-progress)
    │   │   ├── challenge_success → MissionCompletePopup → completed
    │   │   └── completed → MissionCompletePopup (확인)
    │   └── 미션 관리
    │       ├── 미션 만들기 → /mission-propose
    │       ├── 수정하기 → /mission-edit
    │       └── 토글 스위치 (로컬 상태)
    ├── 소원 상점 탭
    │   ├── available → ExchangeConfirmPopup → shipping
    │   ├── soldout → SoldOutPopup
    │   ├── shipping → ShippingPopup
    │   └── delivered → DeliveredPopup
    ├── 햄버거 메뉴
    │   ├── 미션제안하기 → /mission-propose
    │   ├── 만든개발자 → DeveloperInfoPopup
    │   ├── 알림 → 네이버 카페 (외부 링크)
    │   └── 로그아웃 → signOut() + navigate('/')
    ├── 하단 네비게이션
    │   ├── 미션홈 (활성)
    │   ├── 랭킹전 → /ranking
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
| `/home` | `HomeScreen` | ProtectedRoute | 아이 홈화면 |
| `/mission-propose` | `MissionProposeScreen` | ProtectedRoute | 미션 제안 화면 |
| `/mission-in-progress` | `InProgressMissionScreen` | ProtectedRoute | 진행중 미션 화면 |
| `/mission-edit` | `MissionEditPopup` | ProtectedRoute | 미션 수정 |
| `/ranking` | `RankingScreen` | ProtectedRoute | 랭킹 화면 |
| `/growth-report` | `GrowthReportScreen` | ProtectedRoute | 성장보고서 |

---

## 아이 전용 컴포넌트

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| HomeScreen | `src/app/components/HomeScreen.tsx` | 아이 홈 (미션탭/소원상점탭) |
| InProgressMissionScreen | `src/app/components/InProgressMissionScreen.tsx` | 진행중 미션 수행 화면 |
| MissionProposeScreen | `src/app/components/MissionProposeScreen.tsx` | 미션 제안 화면 |
| MissionCelebrationPopup | `src/app/components/MissionCelebrationPopup.tsx` | 미션완료 축하 (별3개 + 코인 +1) |
| MissionCompletePopup | `src/app/components/MissionCompletePopup.tsx` | 미션완료 확인 팝업 |
| ExchangeConfirmPopup | `src/app/components/ExchangeConfirmPopup.tsx` | 상품 교환 확인 팝업 |
| SoldOutPopup | `src/app/components/SoldOutPopup.tsx` | 품절 팝업 |
| ShippingPopup | `src/app/components/ShippingPopup.tsx` | 배송중 팝업 |
| DeliveredPopup | `src/app/components/DeliveredPopup.tsx` | 배송완료 팝업 |
| GrowthReportScreen | `src/app/components/GrowthReportScreen.tsx` | 성장보고서 화면 |
| ProfileSelectModal | `src/app/components/ProfileSelectModal.tsx` | 프로필/테두리 선택 |
| DeveloperInfoPopup | `src/app/components/DeveloperInfoPopup.tsx` | 만든개발자 정보 팝업 |
| SignupCompletePopup | `src/app/components/SignupCompletePopup.tsx` | 가입완료 팝업 |
| RankingScreen | `src/app/components/RankingScreen.tsx` | 랭킹 화면 |
| ProtectedRoute | `src/app/components/ProtectedRoute.tsx` | 인증 가드 |
| IconSelectModal | `src/app/components/IconSelectModal.tsx` | 미션 아이콘 선택 |
| MissionProposeModal | `src/imports/MissionProposeModal.tsx` | 미션 제안 모달 |

---

## 핵심 컨텍스트

| 컨텍스트 | 경로 | 아이 관점 역할 |
|----------|------|---------------|
| AuthContext | `src/app/context/AuthContext.tsx` | 인증, 프로필(이름·코인), Google OAuth, signOut |
| MissionContext | `src/app/context/MissionContext.tsx` | 미션 상태 변경, 실시간 동기화 |

---

## 부모 플로우와의 차이점

| 항목 | 아이 (HomeScreen) | 부모 (ParentHomeScreen) |
|------|-------------------|----------------------|
| 라우트 | `/home` | `/parent-home` |
| 미션 서브탭 | 2개 (미션 목록 / 미션 관리) | 3개 (미션 목록 / 미션 관리 / 응원하기) |
| 서브탭 너비 | 240px (120px × 2) | 361px (120px × 3) |
| 교환상점 | 소원 상점 (상품 교환/구매) | 교환 상점 (상품 올리기/수정/품절채우기/보상주기) |
| 미션 생성 | 미션 제안 (부모에게 제안) | 미션 직접 생성 (아이에게 할당) |
| 미션 진행 | InProgressMissionScreen에서 직접 수행 | 미션 관리 탭에서 관리/수정 |
| 미션 완료 | MissionCelebrationPopup (축하 연출) | 응원하기 탭에서 칭찬/격려 |
| 햄버거 메뉴 | 미션제안하기 / 만든개발자 / 알림 / 로그아웃 | 모드변경 / 만든개발자 / 알림 / 로그아웃 |
| 프로필 | 좌상단 (이미지+이름+코인) | 아이 선택 드롭다운 |
| 코인 표시 | 헤더에 코인 잔액 표시 | 없음 |
| 미션 정렬 | `MISSION_STATUS_PRIORITY` 기반 정렬 | 생성순 (created_at desc) |
| 토글 | 로컬 `missionEnabled` 상태 | MissionContext `toggleMissionEnabled()` |
| 스크롤 | motion.div 애니메이션 (탭별 top 변경) | absolute 고정 위치 |

---

## 데이터베이스 (Supabase)

**스키마**: `supabase/schema.sql`

| 테이블 | 아이 관련 필드 | 용도 |
|--------|---------------|------|
| `profiles` | `role = 'child'`, `coins` | 아이 프로필, 코인 잔액 |
| `families` | `child_id` | 부모-아이 관계 |
| `missions` | `assignee_id` | 아이에게 할당된 미션 |
| `invite_codes` | `role_for = 'child'`, `used_by` | 아이 초대코드 |
