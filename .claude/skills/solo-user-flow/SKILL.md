# 미션놀이터 - 나혼자(솔로) 사용자 플로우

혼자 사용하는 유저의 전체 사용 흐름을 정의한 기획 문서. 부모/아이 모드의 기능을 통합하여 한 사람이 미션 생성·수행·관리·응원을 모두 수행한다.

---

## 1. 인증 및 진입

### 1-1. 로그인

**컴포넌트**: `src/app/components/LoginScreen.tsx` (라우트: `/`)

- **Google OAuth**: `signInWithGoogle()` → 역할 자동 판별 → `/solo-home` 이동
- **초대코드 없이 가입**: 초대코드 없이 가입 시 기본 역할 `solo`
- **자동 리다이렉트**: 로그인 후 `profile.role === "solo"` → `/solo-home`

```typescript
const route =
  profile.role === "parent" ? "/parent-home" :
  profile.role === "child" ? "/home" :
  "/solo-home";  // ← 솔로 사용자
```

### 1-2. 초대 회원가입

**컴포넌트**: `src/app/components/InvitationSignupScreen.tsx` (라우트: `/invitation-signup`)

- 초대코드가 없거나 `role_for`가 지정되지 않은 경우 → `role: "solo"`
- 가입 완료 후 → `/solo-home` 이동

### 1-3. 라우트 보호

**컴포넌트**: `src/app/components/ProtectedRoute.tsx`

`role: "solo"` 사용자가 다른 역할의 페이지에 접근하면 `/solo-home`으로 리다이렉트.

> **개발 환경**: `import.meta.env.DEV`일 때 인증 우회.

### 1-4. 모드 변경

**컴포넌트**: `src/app/components/ModeChangePopup.tsx`

햄버거 메뉴에서 모드 전환 가능. 솔로모드 ↔ 부모모드 간 전환.

```
모드변경 팝업
├── 싱글모드 → navigate("/solo-home")  ← 현재
└── 부모모드 → navigate("/parent-home")
```

---

## 2. 미션 관리 (MissionContext)

**컴포넌트**: `src/app/context/MissionContext.tsx`

솔로 모드에서는 `creator_id`와 `assignee_id`가 동일 (자신이 만들고 자신이 수행).

### 2-1. 미션 상태별 색상

| 상태 | 배경색 | 바 색상 | 의미 |
|------|--------|---------|------|
| `active` | `#f2e1be` | `#FEB700` | 미진행 (노랑) |
| `in_progress` | `#f5eaf8` | `#C07FE5` | 진행중 (보라) |
| `gave_up` | `#f5e8e8` | `#E57F7F` | 포기 (빨강) |
| `challenge_success` | `#e8f0f6` | `#7FC0E5` | 도전성공 (파랑) |
| `completed` | `#e8f6ed` | `#5EE2A0` | 미션완료 (초록) |

### 2-2. 미션 정렬

```typescript
const MISSION_STATUS_PRIORITY = {
  'active': 1, 'in_progress': 2, 'gave_up': 3, 'challenge_success': 4, 'completed': 5
};
```

초기 로드 시에만 정렬하고, 이후 `missionOrder` 상태로 순서 유지.

### 2-3. 실시간 동기화

Supabase Realtime으로 `missions` 테이블 변경 구독. 다른 기기에서 변경하면 즉시 반영.

---

## 3. 솔로 홈 화면 (SoloHomeScreen)

**컴포넌트**: `src/app/components/SoloHomeScreen.tsx` (라우트: `/solo-home`)

### 3-1. 상태 관리

```typescript
const { missions, updateMissionStatus } = useMissions();

const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
const [subTab, setSubTab] = useState<'list' | 'manage' | 'cheer'>('list');
const [missionEnabled, setMissionEnabled] = useState<Record<string, boolean>>({});
const [missionOrder, setMissionOrder] = useState<string[]>([]);
const [cheerMessage, setCheerMessage] = useState('');
const [sentMessages, setSentMessages] = useState<string[]>([...]);
const [isMissionProposeOpen, setIsMissionProposeOpen] = useState(false);
const [editingMission, setEditingMission] = useState<MissionData | null>(null);
```

### 3-2. 탭 구조

```
SoloHomeScreen
├── 메인 탭
│   ├── 미션 (activeTab: 'mission')
│   │   ├── 미션 목록 (subTab: 'list')
│   │   │   ├── "오늘의 미션" 헤더 (동적 날짜)
│   │   │   └── SoloMissionCard 목록 (MissionContext, 상태별 정렬)
│   │   │       ├── active → in_progress (updateMissionStatus)
│   │   │       ├── in_progress → SoloMissionCompletePopup (축하 + 코인 +1)
│   │   │       ├── challenge_success → MissionCompletePopup → completed
│   │   │       └── completed → MissionCompletePopup (확인)
│   │   ├── 미션 관리 (subTab: 'manage')
│   │   │   ├── 미션 만들기 → MissionProposeModal
│   │   │   └── 미션 카드 (수정하기 + 토글 스위치)
│   │   │       └── 수정하기 클릭 → MissionEditModal
│   │   └── 응원하기 (subTab: 'cheer')
│   │       ├── 응원 메시지 입력 (Enter 전송)
│   │       └── 최근 보낸 메시지 목록
│   └── 소원 상점 (activeTab: 'shop')
│       ├── 상품 올리기 → ProductCreatePopup
│       └── 상품 카드 (일반/품절)
│           └── 품절 → "품절상품 채우기" 버튼
├── 햄버거 메뉴 (4개 항목)
│   ├── 모드 변경 → ModeChangePopup (싱글/부모 전환)
│   ├── 만든개발자 → DeveloperInfoPopup
│   ├── 알림 → 네이버 카페 (외부 링크)
│   └── 로그아웃 → navigate('/')
└── 하단 네비게이션
    ├── 미션홈 (활성)
    ├── 랭킹전 → navigate('/solo-ranking')
    └── 성장보고서 → navigate('/growth-report')
```

### 3-3. 미션 카드 클릭 핸들러

솔로 모드의 핵심 차이점: `in_progress` 클릭 시 **InProgressMissionScreen이 아닌 SoloMissionCompletePopup**을 직접 표시한다.

```typescript
const handleMissionButtonClick = (mission) => {
  if (mission.status === 'active') {
    updateMissionStatus(mission.id, 'in_progress');           // 미진행 → 진행중
  } else if (mission.status === 'in_progress') {
    setShowSoloCelebration(true);                              // 진행중 → 축하 팝업 (솔로 전용)
  } else if (mission.status === 'challenge_success') {
    setShowCompletePopup(true);                                // 도전성공 → 완료 팝업
  } else if (mission.status === 'completed') {
    setShowCompletePopup(true);                                // 완료 → 확인 팝업
  }
};
```

### 3-4. 솔로 미션완료 축하 (SoloMissionCompletePopup)

**컴포넌트**: `src/app/components/SoloMissionCompletePopup.tsx`

솔로 전용 축하 화면. 별 3개 + 빛줄기 + 코인 +1 연출 + "정말 잘했어! 또 하나 해볼까?" 메시지.

```typescript
// "선물 받기" 클릭 시
onConfirm={() => {
  updateMissionStatus(completingMissionId, 'completed');
  setShowSoloCelebration(false);
}}
```

> **아이 모드와의 차이**: 아이는 `in_progress` → `InProgressMissionScreen` 이동 후 인증 과정을 거침. 솔로는 바로 축하 팝업으로 완료 처리.

### 3-5. 미션 관리 탭 (`subTab: 'manage'`)

- **미션 만들기**: `MissionProposeModal` 열기 (인라인 모달, 전체 화면)
- **미션 수정**: 카드 클릭 → `MissionEditModal` 열기 (인라인 모달, 전체 화면)
- **토글 스위치**: 로컬 `missionEnabled` 상태 (커스텀 토글 디자인)
  - ON: `bg-[#e59114]`, 노브 `bg-[#fff0da] border-[#916626]`
  - OFF: `bg-[#b4b3b3]`, 노브 `bg-[#e5e5e5] border-[#919191]`

```typescript
// 토글 스위치 - 솔로만의 커스텀 디자인
<div className={`... ${missionEnabled[id] ? 'bg-[#e59114]' : 'bg-[#b4b3b3]'}`}>
  <div className="... shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.25)]" />
</div>
<div className={`... ${missionEnabled[id] ? 'left-[38px] bg-[#fff0da]' : 'left-0 bg-[#e5e5e5]'}`} />
```

### 3-6. 응원하기 탭 (`subTab: 'cheer'`)

자기 자신에게 보내는 응원 메시지. 로컬 상태로 관리.

- 입력: Enter로 전송 (한글 조합 완료 체크: `isComposing`)
- 메시지 카드: `imgRectangle58` (배경) + `imgRectangle59` (그림자)

### 3-7. 소원 상점 탭 (`activeTab: 'shop'`)

- **상품 올리기**: `ProductCreatePopup` 열기
- **상품 카드**: 하드코딩 (일반 1개, 품절 1개)
- **품절 오버레이**: `imgShopSoldout` + "품절상품 채우기" 버튼

### 3-8. 서브탭 디자인

솔로 모드는 3개 서브탭 (미션 목록 / 미션 관리 / 응원하기) → 부모 모드와 동일.

```
서브탭 (361px × 37px)
├── 미션 목록 (120px, left: 16px)
├── 미션 관리 (120px, left: 136px)
└── 응원하기 (120px, left: 257px)
```

활성 인디케이터: `bg-[#b9915e] border-2 border-[#f0c58f]`, transition-all 적용.

---

## 4. 솔로 랭킹 (SoloRankingScreen)

**컴포넌트**: `src/app/components/SoloRankingScreen.tsx` (라우트: `/solo-ranking`)

### 4-1. 특징

- 타이틀: "2월 미션연속 성공순위"
- 포디움 (상위 3명): 프로필 이미지 + 이름 + 메달 배지
- 랭킹 리스트: 100명 샘플 데이터 (`SAMPLE_RANKINGS`)
- 내 순위 바: 하단 고정, 현재 순위 "-" (미참여 상태)

### 4-2. 랭킹 카드 색상

| 순위 | 배경색 |
|------|--------|
| 1위 | `#fff9d4` (금) |
| 2위 | `#eeece8` (은) |
| 3위 | `#f2d2be` (동) |
| 4위~ | `#f2e1be` (기본) |

### 4-3. 하단 네비게이션

솔로 랭킹에서의 네비게이션:
- 미션홈 → `/solo-home` (비활성)
- 랭킹전 → 현재 (활성)
- 성장보고서 → `/growth-report` (비활성)

---

## 5. 성장보고서

**컴포넌트**: `src/app/components/GrowthReportScreen.tsx` (라우트: `/growth-report`)

하단 네비게이션 "성장보고서" 탭에서 접근. 미션 완료율(85%), 재도전 횟수, 연속 성공, 포기 횟수, 성공 미션 개수를 표시.

---

## 전체 플로우 요약

```
솔로 진입
├── 로그인 (LoginScreen, /)
│   ├── Google OAuth → role: "solo" → /solo-home
│   └── 초대코드 없이 가입 → /invitation-signup → role: "solo" → /solo-home
│
├── 인증 가드 (ProtectedRoute)
│   ├── 비로그인 → / 리다이렉트
│   ├── 역할 불일치 → /solo-home 리다이렉트
│   └── DEV 모드 → 인증 우회
│
└── 솔로 홈 (SoloHomeScreen, /solo-home)
    ├── 프로필 (김쭈니, 코인: 5)
    ├── 미션 탭
    │   ├── 미션 목록 (MissionContext 연동, 상태별 정렬)
    │   │   ├── active → in_progress
    │   │   ├── in_progress → SoloMissionCompletePopup (축하 + completed)
    │   │   ├── challenge_success → MissionCompletePopup → completed
    │   │   └── completed → MissionCompletePopup (확인)
    │   ├── 미션 관리
    │   │   ├── 미션 만들기 → MissionProposeModal (인라인)
    │   │   ├── 미션 수정 → MissionEditModal (인라인)
    │   │   └── 토글 스위치 (커스텀 디자인, 로컬 상태)
    │   └── 응원하기
    │       ├── 응원 메시지 입력 (Enter 전송)
    │       └── 최근 보낸 메시지 목록
    ├── 소원 상점 탭
    │   ├── 상품 올리기 → ProductCreatePopup
    │   └── 상품 카드 (일반/품절)
    ├── 햄버거 메뉴
    │   ├── 모드 변경 → ModeChangePopup (싱글/부모 전환)
    │   ├── 만든개발자 → DeveloperInfoPopup
    │   ├── 알림 → 네이버 카페 (외부 링크)
    │   └── 로그아웃 → navigate('/')
    ├── 하단 네비게이션
    │   ├── 미션홈 (활성)
    │   ├── 랭킹전 → /solo-ranking
    │   └── 성장보고서 → /growth-report
    └── 실시간 동기화
        └── Supabase Realtime → missions 테이블 구독
```

---

## 라우팅 (App.tsx 기준)

| 경로 | 컴포넌트 | 보호 | 설명 |
|------|----------|------|------|
| `/` | `LoginScreen` | 공개 | 로그인/초대코드 입력 |
| `/invitation-signup` | `InvitationSignupScreen` | 공개 | 초대 회원가입 |
| `/solo-home` | `SoloHomeScreen` | ProtectedRoute | 솔로 홈화면 |
| `/solo-ranking` | `SoloRankingScreen` | ProtectedRoute | 솔로 랭킹 화면 |
| `/growth-report` | `GrowthReportScreen` | ProtectedRoute | 성장보고서 |
| `/mode-change` | `ModeChangePopup` | ProtectedRoute | 모드 변경 |

---

## 솔로 전용 컴포넌트

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| SoloHomeScreen | `src/app/components/SoloHomeScreen.tsx` | 솔로 홈 (3탭: 미션목록/관리/응원 + 상점) |
| SoloRankingScreen | `src/app/components/SoloRankingScreen.tsx` | 솔로 랭킹 (포디움 + 100명 목록) |
| SoloMissionCompletePopup | `src/app/components/SoloMissionCompletePopup.tsx` | 솔로 미션완료 축하 (별+코인+1) |
| MissionEditModal | `src/imports/MissionEditModal.tsx` | 미션 수정 모달 (인라인 전체화면) |
| MissionProposeModal | `src/imports/MissionProposeModal.tsx` | 미션 생성 모달 (인라인 전체화면) |
| ProductCreatePopup | `src/app/components/ProductCreatePopup.tsx` | 상품 올리기 팝업 |
| MissionCompletePopup | `src/app/components/MissionCompletePopup.tsx` | 미션완료 확인 팝업 |
| ModeChangePopup | `src/app/components/ModeChangePopup.tsx` | 싱글/부모 모드 전환 |
| DeveloperInfoPopup | `src/app/components/DeveloperInfoPopup.tsx` | 만든개발자 정보 팝업 |
| GrowthReportScreen | `src/app/components/GrowthReportScreen.tsx` | 성장보고서 화면 |

---

## 3모드 비교

| 항목 | 솔로 (SoloHomeScreen) | 아이 (HomeScreen) | 부모 (ParentHomeScreen) |
|------|----------------------|-------------------|----------------------|
| 라우트 | `/solo-home` | `/home` | `/parent-home` |
| 미션 서브탭 | 3개 (목록/관리/응원) | 2개 (목록/관리) | 3개 (목록/관리/응원) |
| 미션 생성 | MissionProposeModal (인라인) | /mission-propose (라우트) | MissionProposeModal (인라인) |
| 미션 수정 | MissionEditModal (인라인) | /mission-edit (라우트) | MissionEditPopup (인라인) |
| in_progress 클릭 | SoloMissionCompletePopup (즉시 완료) | InProgressMissionScreen (미션 수행) | — (관리만) |
| 축하 팝업 | SoloMissionCompletePopup | MissionCelebrationPopup | — |
| 교환상점 | 상품 올리기 + 일반/품절 | 교환/품절/배송중/배송완료 | 올리기/수정/품절채우기/보상주기 |
| 랭킹 라우트 | `/solo-ranking` | `/ranking` | `/ranking` |
| 햄버거 메뉴 | 모드변경/만든개발자/알림/로그아웃 | 미션제안/만든개발자/알림/로그아웃 | 모드변경/만든개발자/알림/로그아웃 |
| 토글 디자인 | 커스텀 (div 기반) | SVG 이미지 (imgToggleOn/Off) | SVG 이미지 (imgToggleOn/Off) |
| 프로필 | 하드코딩 (김쭈니, 코인 5) | AuthContext 연동 (profile) | 아이 선택 드롭다운 |
| 로그아웃 | navigate("/") | signOut() + navigate("/") | signOut() + navigate("/") |

---

## 핵심 컨텍스트

| 컨텍스트 | 경로 | 솔로 관점 역할 |
|----------|------|---------------|
| AuthContext | `src/app/context/AuthContext.tsx` | 인증, 프로필 (`role: "solo"`), Google OAuth |
| MissionContext | `src/app/context/MissionContext.tsx` | 미션 CRUD (creator = assignee = 자신), 실시간 동기화 |

---

## 데이터베이스 (Supabase)

| 테이블 | 솔로 관련 필드 | 용도 |
|--------|---------------|------|
| `profiles` | `role = 'solo'` | 솔로 프로필 |
| `missions` | `creator_id = assignee_id` | 자신이 만들고 자신이 수행 |
| `invite_codes` | `role_for` 미지정 | 초대코드 없이 가입 |
