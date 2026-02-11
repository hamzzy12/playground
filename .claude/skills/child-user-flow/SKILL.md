# 미션놀이터 - 아이 사용자 플로우

아이 사용자의 전체 사용 흐름을 정의한 기획 문서. Figma 프레임 `미션놀이터_아이사용자` (node-id: `612:2096`) 기반.

## Figma 참조

- **프레임**: 미션놀이터_아이사용자
- **Node ID**: `612:2096`
- **Figma 링크**: https://www.figma.com/design/LspCuVvapxePLY7XoLFjwz/미션놀이터?node-id=612-2096

---

## 1. 진입 및 회원가입

### 1-1. 초대코드 진입
```
회원 or 초대받은유저 → 초대코드입력 → 회원가입 프로세스 → 회원가입완료
```
- **컴포넌트**: `src/app/components/LoginScreen.tsx` (라우트: `/`)
- 초대코드를 입력하여 회원가입 프로세스로 진입

### 1-2. 회원가입 프로세스
```
회원가입 프로세스 → 회원가입완료 → 메인화면
```
- **컴포넌트**:
  - `src/app/components/InvitationScreen.tsx` (라우트: `/invitation`) - 초대 수락 화면
  - `src/app/components/InvitationSignupScreen.tsx` (라우트: `/invitation-signup`) - 초대 회원가입
  - `src/app/components/SignupCompletePopup.tsx` - 가입완료 팝업 ("같이 놀 준비가 되셨나요?")
- 회원가입 완료 후 확인 클릭 시 `/home`으로 이동
- **나가기** 선택 시 프로세스 종료

### 1-3. 회원유무 분기
- 기존 회원: 로그인으로 이동 (`LoginScreen.tsx`)
- 비회원: 회원가입 프로세스로 이동

---

## 2. 로그인 후 미션 처리

### 2-1. 제안 미션 확인 (회원 or 초대받은회원)
```
회원or초대받은회원 → 제안미션확인 → 부모,아이 리스트에 미션생성
```
- **컴포넌트**: `src/app/components/HomeScreen.tsx` (라우트: `/home`)
  - 미션 탭 (`activeTab === 'mission'`) 에서 미션 카드 목록 표시
- 부모가 생성한 미션이 아이의 미션 리스트에 표시됨

### 2-2. 제안 미션 수정/거절 요청
```
제안미션확인 → 부모에게 수정 or 거절전달
```
- 제안된 미션을 부모에게 수정 요청하거나 거절 의사 전달

### 2-3. 미션 제안 (미션생성유무)
```
미션생성유무 → 부모에게 (초대/신규회원 or 미션제안/기존회원)
            → 미션제안
            → 성공 시 받는보상입력
            → 부모에게 전달알림
```
- **컴포넌트**:
  - `src/app/components/MissionProposeScreen.tsx` (라우트: `/mission-propose`) - 미션 제안 화면
  - `src/imports/MissionProposeModal.tsx` - 미션 제안 모달
  - `src/app/components/IconSelectModal.tsx` - 아이콘 선택 모달
- 아이가 부모에게 미션을 제안
- 성공 시 받을 보상(칭찬코인) 입력
- 완료 시 부모에게 알림 전달

---

## 3. 홈화면 기능

**메인 컴포넌트**: `src/app/components/HomeScreen.tsx` (라우트: `/home`)

### 3-1. 동네친구들과 경쟁하기
```
홈화면 → 랭킹
```
- **컴포넌트**: `src/app/components/RankingScreen.tsx` (라우트: `/ranking`)
- 하단 네비게이션 "랭킹전" 클릭 시 이동
- 미션 연속 성공순위 랭킹 화면

### 3-2. 미션 제안하기
```
미션제안하기 → 미션여정을 만듦 → 성공 시 받는보상입력 → 부모에게전달
```
- **컴포넌트**:
  - `src/app/components/HomeScreen.tsx` - 햄버거 메뉴 > "미션제안하기" 클릭
  - `src/app/components/MissionProposeScreen.tsx` (라우트: `/mission-propose`)
  - `src/imports/MissionProposeModal.tsx` - 미션 제안 모달
  - `src/app/components/IconSelectModal.tsx` - 아이콘 선택 모달
- 아이가 직접 미션을 기획하여 부모에게 제안
- 미션 여정(단계) 구성 + 성공 보상 입력 후 부모에게 전달

### 3-3. 미션 리스트 확인
```
미션리스트 확인 → 미션인증 → 보상받음 (성공/실패) → 부모에게 바라는점 or 여러 답변전송
```
- **컴포넌트**:
  - `src/app/components/HomeScreen.tsx` - 미션 탭 > 미션 카드 목록
  - `src/app/components/MissionCard.tsx` - 미션 카드 개별 컴포넌트
  - `src/app/components/InProgressMissionScreen.tsx` (라우트: `/mission-in-progress`) - 진행중 미션 화면
  - `src/app/components/MissionCelebrationPopup.tsx` - 미션완료 축하 화면 (별3개 + 코인 +1)
  - `src/app/components/MissionCompletePopup.tsx` - 미션완료 확인 팝업
- 미션 카드 클릭 시 상태별 동작:

| 현재 상태 | 클릭 시 동작 | 관련 컴포넌트 |
|----------|------------|--------------|
| `active` | `in_progress`로 변경 → 진행중 미션 화면 이동 | `InProgressMissionScreen` |
| `in_progress` | 미션완료 축하 화면 표시 | `MissionCelebrationPopup` |
| `challenge_success` | 미션완료 팝업 표시 → `completed`로 변경 | `MissionCompletePopup` |
| `completed` | 미션완료 팝업 표시 (확인용) | `MissionCompletePopup` |

### 3-4. 나의 성장스토리
```
나의 성장스토리 → 메뉴
              ├── 성장스냅 (육각형)
              └── 카테고리별 레벨
```
- **컴포넌트**: 미구현 (하단 네비게이션에 "성장보고서" 버튼 존재)
- 성장스냅: 육각형 차트로 감정/능력 시각화
- 카테고리별 레벨: 미션 카테고리별 달성 레벨

### 3-5. 보상보관함
- 홈화면 하단에서 접근 가능
- **컴포넌트**: `src/app/components/HomeScreen.tsx` - 교환 상점 탭 (`activeTab === 'shop'`)
- 교환 상점에서 보상(칭찬코인) 사용 가능

| 상품 상태 | 클릭 시 동작 | 관련 컴포넌트 |
|----------|------------|--------------|
| `available` | 교환 확인 팝업 | `ExchangeConfirmPopup` |
| `soldout` | 품절 팝업 | `SoldOutPopup` |
| `shipping` | 배송중 팝업 | `ShippingPopup` |
| `delivered` | 배송완료 팝업 | `DeliveredPopup` |

---

## 전체 플로우 요약

```
아이 진입
├── 초대코드 입력 → 회원가입 → 메인화면
│   ├── LoginScreen.tsx (/)
│   ├── InvitationScreen.tsx (/invitation)
│   ├── InvitationSignupScreen.tsx (/invitation-signup)
│   └── SignupCompletePopup.tsx (팝업)
├── 로그인
│   ├── 제안미션 확인 → 부모,아이 리스트에 미션생성
│   ├── 부모에게 수정/거절 전달
│   └── 미션 제안 → MissionProposeScreen.tsx (/mission-propose) → 보상입력 → 부모에게 전달
└── 홈화면 (HomeScreen.tsx, /home)
    ├── 미션 탭 (activeTab: mission)
    │   ├── 미션 카드 목록 → MissionCard.tsx
    │   ├── 미션 진행 → InProgressMissionScreen.tsx (/mission-in-progress)
    │   ├── 미션 완료 축하 → MissionCelebrationPopup.tsx
    │   └── 미션 완료 확인 → MissionCompletePopup.tsx
    ├── 교환상점 탭 (activeTab: shop) = 보상보관함
    │   ├── 상품 교환 → ExchangeConfirmPopup.tsx
    │   ├── 품절 → SoldOutPopup.tsx
    │   ├── 배송중 → ShippingPopup.tsx
    │   └── 배송완료 → DeliveredPopup.tsx
    ├── 햄버거 메뉴
    │   ├── 미션제안하기 → MissionProposeScreen.tsx (/mission-propose)
    │   ├── 만든개발자 → DeveloperInfoPopup.tsx
    │   ├── 알림 (미구현)
    │   └── 로그아웃 → navigate('/')
    ├── 프로필 → ProfileSelectModal.tsx
    ├── 랭킹 → RankingScreen.tsx (/ranking)
    ├── 성장보고서 (미구현)
    └── 동네친구들과 경쟁하기 → RankingScreen.tsx (/ranking)
```

---

## 실제 라우팅 (App.tsx 기준)

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `LoginScreen` | 로그인/초대코드 입력 |
| `/invitation` | `InvitationScreen` | 초대 수락 화면 |
| `/invitation-signup` | `InvitationSignupScreen` | 초대 회원가입 |
| `/home` | `HomeScreen` | 아이 홈화면 (미션목록 + 교환상점) |
| `/mission-propose` | `MissionProposeScreen` | 미션 제안 화면 |
| `/mission-in-progress` | `InProgressMissionScreen` | 진행중 미션 화면 |
| `/ranking` | `RankingScreen` | 랭킹 화면 |

## 아이 전용 컴포넌트 파일 경로

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| HomeScreen | `src/app/components/HomeScreen.tsx` | 아이 홈 (미션탭/교환상점탭) |
| MissionCard | `src/app/components/MissionCard.tsx` | 미션 카드 개별 컴포넌트 |
| InProgressMissionScreen | `src/app/components/InProgressMissionScreen.tsx` | 진행중 미션 화면 |
| MissionProposeScreen | `src/app/components/MissionProposeScreen.tsx` | 미션 제안 화면 |
| MissionCelebrationPopup | `src/app/components/MissionCelebrationPopup.tsx` | 미션완료 축하 (별3개 + 코인 +1) |
| MissionCompletePopup | `src/app/components/MissionCompletePopup.tsx` | 미션완료 확인 팝업 |
| ExchangeConfirmPopup | `src/app/components/ExchangeConfirmPopup.tsx` | 상품 교환 확인 팝업 |
| SoldOutPopup | `src/app/components/SoldOutPopup.tsx` | 품절 팝업 |
| ShippingPopup | `src/app/components/ShippingPopup.tsx` | 배송중 팝업 |
| DeliveredPopup | `src/app/components/DeliveredPopup.tsx` | 배송완료 팝업 |
| ProfileSelectModal | `src/app/components/ProfileSelectModal.tsx` | 프로필/테두리 선택 |
| DeveloperInfoPopup | `src/app/components/DeveloperInfoPopup.tsx` | 만든개발자 정보 팝업 |
| SignupCompletePopup | `src/app/components/SignupCompletePopup.tsx` | 가입완료 팝업 |
| RankingScreen | `src/app/components/RankingScreen.tsx` | 랭킹 화면 |
| IconSelectModal | `src/app/components/IconSelectModal.tsx` | 미션 아이콘 선택 |
| MissionProposeModal | `src/imports/MissionProposeModal.tsx` | 미션 제안 모달 |

## HomeScreen 탭 구조

```
HomeScreen
├── 메인 탭 (탭바: imgGroup162 SVG, 394x57)
│   ├── 미션 (activeTab: 'mission')
│   │   ├── 서브 탭 (missionSubTab, 240x37)
│   │   │   ├── 미션 목록 (missionSubTab: 'list') ← 기본값
│   │   │   │   └── 미션 카드 목록 → MissionCard.tsx
│   │   │   │       ├── active → 클릭 시 in_progress로 변경 → InProgressMissionScreen
│   │   │   │       ├── in_progress → 클릭 시 MissionCelebrationPopup
│   │   │   │       ├── challenge_success → 클릭 시 MissionCompletePopup → completed
│   │   │   │       └── completed → 클릭 시 MissionCompletePopup (확인용)
│   │   │   └── 미션 관리 (missionSubTab: 'manage')
│   │   │       ├── 미션 만들기 버튼 → navigate('/mission-propose', {state:{from:'home-manage'}})
│   │   │       └── 미션 카드 목록 (MissionContext 연동)
│   │   │           ├── 수정하기 → navigate('/mission-edit')
│   │   │           └── 토글 스위치 (missionEnabled)
│   │   └── 오늘의 미션 헤더 (list 서브탭에서만 표시)
│   └── 소원 상점 (activeTab: 'shop') = 보상보관함
│       ├── available 카드 → ExchangeConfirmPopup → shipping으로 변경
│       ├── soldout 카드 → SoldOutPopup
│       ├── shipping 카드 → ShippingPopup
│       └── delivered 카드 → DeliveredPopup
├── 햄버거 메뉴 (4개 항목)
│   ├── 미션제안하기 → navigate('/mission-propose')
│   ├── 만든개발자 → DeveloperInfoPopup
│   ├── 알림 → 네이버 카페 링크 (새 탭)
│   └── 로그아웃 → navigate('/')
├── 프로필 버튼 → ProfileSelectModal
└── 하단 네비게이션 (텍스트 라벨 기반, imgGroup60 활성 인디케이터)
    ├── 미션홈 (활성, text-white)
    ├── 랭킹전 → navigate('/ranking') (text-white/30)
    └── 성장보고서 (미구현, text-white/30)
```

## 주요 상태 관리

- **MissionContext** (`src/app/context/MissionContext.tsx`): 미션 CRUD, 상태 변경
- **미션 상태 흐름**: `active` → `in_progress` → `completed` (또는 `challenge_success` → `completed`)
- **교환상점 상태 흐름**: `available` → `shipping` → `delivered` → `soldout`
- **프로필**: `selectedProfileImg`, `selectedBorderColor`로 프로필/테두리 관리

## 부모 플로우와의 차이점

| 항목 | 아이 (HomeScreen) | 부모 (ParentHomeScreen) |
|------|-------------------|----------------------|
| 라우트 | `/home` | `/parent-home` |
| 미션 탭 | 미션 목록 / 미션 관리 (서브탭 2개) | 미션 목록 / 미션 관리 / 응원하기 (서브탭 3개) |
| 교환상점 | 소원 상점 (상품 교환/구매) | 교환 상점 (상품 올리기/수정/품절채우기/보상주기) |
| 미션 생성 | 미션 제안 (부모에게 제안) | 미션 직접 생성 (아이에게 할당) |
| 햄버거 메뉴 | 4개 (미션제안하기 포함) | 4개 (모드 변경 포함) |
| 미션 진행 | InProgressMissionScreen에서 직접 수행 | 미션 관리 탭에서 관리/수정 |
| 미션 완료 | MissionCelebrationPopup (축하 연출) | 응원하기 탭에서 칭찬/격려 |
| 하단 네비 | 텍스트 라벨 (imgGroup60 활성 인디케이터) | 텍스트 라벨 (imgGroup60 활성 인디케이터) |
| 탭바 디자인 | imgGroup162 SVG (394x57) | imgMainTabMission/Shop SVG (394x57) |
