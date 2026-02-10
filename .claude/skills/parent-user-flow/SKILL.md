# 미션놀이터 - 부모 사용자 플로우

부모 사용자의 전체 사용 흐름을 정의한 기획 문서. Figma 프레임 `미션놀이터_부모사용자` (node-id: `612:2095`) 기반.

## Figma 참조

- **프레임**: 미션놀이터_부모사용자
- **Node ID**: `612:2095`
- **Figma 링크**: https://www.figma.com/design/LspCuVvapxePLY7XoLFjwz/미션놀이터?node-id=612-2095

---

## 1. 진입 및 회원가입

### 1-1. 초대코드 진입
```
회원 or 초대받은유저 → 초대코드입력 → 회원가입 프로세스
```
- **컴포넌트**: `src/app/components/LoginScreen.tsx` (라우트: `/`)
- 초대코드를 입력하여 회원가입 프로세스로 진입
- **신규가입하기** 클릭 시 회원가입 진행

### 1-2. 회원가입 프로세스
```
초대수락 → 회원가입 → 회원가입완료 팝업 → 확인클릭 → 메인화면
```
- **컴포넌트**:
  - `src/app/components/InvitationScreen.tsx` (라우트: `/invitation`) - 초대 수락 화면
  - `src/app/components/InvitationSignupScreen.tsx` (라우트: `/invitation-signup`) - 초대 회원가입
  - `src/app/components/SignupCompletePopup.tsx` - 가입완료 팝업 ("같이 놀 준비가 되셨나요?")
- 회원가입 완료 후 확인 클릭 시 `/home`으로 이동

### 1-3. 회원유무 분기
- 기존 회원: 로그인으로 이동 (`LoginScreen.tsx`)
- 비회원: 회원가입 프로세스로 이동

---

## 2. 로그인 후 미션 처리

### 2-1. 제안 미션 확인 (회원 or 초대받은회원)
```
회원or초대받은회원 → 제안미션확인 → 부모,아이 리스트에 미션생성
```
- **컴포넌트**: `src/app/components/ParentHomeScreen.tsx` (라우트: `/parent-home`)
  - 미션 탭 > **미션 목록** 서브탭 (`subTab === 'list'`)
- 로그인 후 아이가 제안한 미션을 확인
- 확인 시 부모와 아이의 미션 리스트에 미션 생성

### 2-2. 제안 미션 수정/거절
```
제안미션확인 → 아이에게 수정 or 거절전달
```
- **컴포넌트**: `src/app/components/MissionEditPopup.tsx` (라우트: `/mission-edit`)
- 제안된 미션을 수정하거나 거절하여 아이에게 전달

### 2-3. 미션 생성 (미션생성유무)
```
미션생성유무 → 아이에게 (초대/신규회원 or 미션제안/기존회원)
            → 아이상황별 추천미션 & 직접생성
            → 보상생성 (성공/실패)
            → 아이에게 전달알림
```
- **컴포넌트**:
  - `src/imports/MissionCreateModal.tsx` - 미션 만들기 모달
  - `src/app/components/ParentHomeScreen.tsx` - 미션 관리 탭 (`subTab === 'manage'`)
- 아이의 상태에 따라 분기:
  - **초대/신규회원**: 초대 또는 신규 가입 유도
  - **미션제안/기존회원**: 미션 제안 흐름
- 아이 상황별 **추천미션** 제공 또는 **직접생성** 가능
- 보상 생성 (성공/실패 조건 설정) 후 아이에게 알림 전달

---

## 3. 홈화면 기능

**메인 컴포넌트**: `src/app/components/ParentHomeScreen.tsx` (라우트: `/parent-home`)

### 3-1. 아이 변경하기
```
아이변경하기 → 프로필클릭
```
- **컴포넌트**: `src/app/components/ProfileSelectModal.tsx`
- 프로필 클릭으로 관리 대상 아이를 변경
- 프로필 캐릭터 4종 + 테두리 색상 4종 선택 가능

### 3-2. 새로운 미션 만들기
```
새로운미션 만들기 → 미션여정만듦 → 보상생성 (성공/실패) → 아이에게 전달알림
```
- **컴포넌트**:
  - `src/app/components/ParentHomeScreen.tsx` - 미션 관리 탭 > "미션 만들기" 버튼
  - `src/imports/MissionCreateModal.tsx` - 미션 생성 모달
  - `src/app/components/ProductIconSelectModal.tsx` - 아이콘 선택
- 새 미션 생성 후 미션 여정(단계) 구성
- 보상 조건 설정 (성공/실패)
- 완료 시 아이에게 알림 전달

### 3-3. 알림
- **컴포넌트**: `src/imports/AlertPopup.tsx`
- 알림 목록 확인 기능 (미구현)

### 3-4. 미션 리스트
```
미션리스트 → 아이가 인증한 미션확인 → 칭찬(자동입력) or 격려 → 성장스토리 저장
```
- **컴포넌트**:
  - `src/app/components/ParentHomeScreen.tsx` - 미션 탭 > 미션 목록 서브탭 (`subTab === 'list'`)
  - `src/app/components/ParentHomeScreen.tsx` - 미션 탭 > 응원하기 서브탭 (`subTab === 'cheer'`)
  - `src/app/components/MissionCompletePopup.tsx` - 미션완료 확인 팝업
- 아이가 인증(완료)한 미션을 확인
- **칭찬** (자동 입력) 또는 **격려** 메시지 전달 (응원하기 탭)
- 결과를 **성장스토리**로 저장

### 3-5. 성장보고서
```
성장보고서 → 부모성장보고서
          → 아이성장보고서 → 메뉴
```
- **컴포넌트**: 미구현 (하단 네비게이션에 "성장보고서" 버튼 존재)
- **부모성장보고서**: 부모 관점의 성장 리포트
- **아이성장보고서**: 아이 관점의 성장 리포트
  - 메뉴 하위 기능:
    - **성장스냅 (육각형)**: 맞춤형 감정 보고서 (아이용)
    - **카테고리별 레벨**: 미션 카테고리별 달성 레벨
    - **아이발달검사 측정하기**: 발달 검사 도구

---

## 4. 동네명장

- 홈화면 하단에서 접근 가능한 별도 기능
- (미구현, 상세 기획 추가 필요)

---

## 전체 플로우 요약

```
부모 진입
├── 초대코드 입력 → 회원가입 → 메인화면
│   ├── LoginScreen.tsx (/)
│   ├── InvitationScreen.tsx (/invitation)
│   ├── InvitationSignupScreen.tsx (/invitation-signup)
│   └── SignupCompletePopup.tsx (팝업)
├── 로그인
│   ├── 제안미션 확인 → 승인 → 미션 생성
│   │                → 수정/거절 → MissionEditPopup.tsx
│   └── 미션 직접 생성 → MissionCreateModal.tsx → 보상설정 → 알림
└── 홈화면 (ParentHomeScreen.tsx, /parent-home)
    ├── 아이 변경 → ProfileSelectModal.tsx
    ├── 미션 탭
    │   ├── 미션 목록 (subTab: list)
    │   ├── 미션 관리 (subTab: manage)
    │   │   ├── 미션 만들기 → MissionCreateModal.tsx
    │   │   └── 미션 수정 → MissionEditPopup.tsx (/mission-edit)
    │   └── 응원하기 (subTab: cheer)
    ├── 교환상점 탭
    │   ├── 상품 올리기 → ProductCreatePopup.tsx
    │   ├── 상품 수정 → ProductEditPopup.tsx
    │   ├── 품절상품 채우기 → ProductRefillPopup.tsx (/product-refill)
    │   └── 보상주기 → ProductRewardPopup.tsx (/product-reward)
    ├── 알림 → AlertPopup.tsx
    ├── 만든개발자 → DeveloperInfoPopup.tsx
    ├── 랭킹 → RankingScreen.tsx (/ranking)
    ├── 성장보고서 (미구현)
    └── 동네명장 (미구현)
```

---

## 실제 라우팅 (App.tsx 기준)

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `LoginScreen` | 로그인/초대코드 입력 |
| `/invitation` | `InvitationScreen` | 초대 수락 화면 |
| `/invitation-signup` | `InvitationSignupScreen` | 초대 회원가입 |
| `/parent-home` | `ParentHomeScreen` | 부모 홈화면 (미션목록/관리/응원/교환상점) |
| `/ranking` | `RankingScreen` | 랭킹 화면 |
| `/mission-edit` | `MissionEditPopup` | 미션 수정 |
| `/product-refill` | `ProductRefillPopup` | 품절상품 채우기 |
| `/product-reward` | `ProductRewardPopup` | 보상주기 |

## 부모 전용 컴포넌트 파일 경로

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| ParentHomeScreen | `src/app/components/ParentHomeScreen.tsx` | 부모 홈 (메인탭/서브탭 시스템) |
| MissionEditPopup | `src/app/components/MissionEditPopup.tsx` | 미션 수정/삭제 팝업 |
| ProductCreatePopup | `src/app/components/ProductCreatePopup.tsx` | 상품 올리기 팝업 |
| ProductEditPopup | `src/app/components/ProductEditPopup.tsx` | 상품 수정/삭제 팝업 |
| ProductRefillPopup | `src/app/components/ProductRefillPopup.tsx` | 품절상품 채우기 팝업 |
| ProductRewardPopup | `src/app/components/ProductRewardPopup.tsx` | 보상주기 (날짜 피커) 팝업 |
| ProductIconSelectModal | `src/app/components/ProductIconSelectModal.tsx` | 상품/미션 아이콘 선택 |
| ProfileSelectModal | `src/app/components/ProfileSelectModal.tsx` | 프로필/테두리 선택 |
| DeveloperInfoPopup | `src/app/components/DeveloperInfoPopup.tsx` | 만든개발자 정보 팝업 |
| MissionCompletePopup | `src/app/components/MissionCompletePopup.tsx` | 미션완료 확인 팝업 |
| SignupCompletePopup | `src/app/components/SignupCompletePopup.tsx` | 가입완료 팝업 |
| MissionCreateModal | `src/imports/MissionCreateModal.tsx` | 미션 생성 모달 |
| AlertPopup | `src/imports/AlertPopup.tsx` | 알림 팝업 |

## ParentHomeScreen 탭 구조

```
ParentHomeScreen
├── 메인 탭
│   ├── 미션 (activeTab: 'mission')
│   │   ├── 미션 목록 (subTab: 'list')     → 미션 카드 목록
│   │   ├── 미션 관리 (subTab: 'manage')   → 미션 만들기 + 수정 + 토글
│   │   └── 응원하기 (subTab: 'cheer')     → 응원 메시지 입력/목록
│   └── 교환 상점 (activeTab: 'shop')
│       ├── 상품 올리기 → ProductCreatePopup
│       ├── 일반 카드 클릭 → ProductEditPopup
│       ├── 품절 카드 → ProductRefillPopup
│       └── 배송완료 카드 → ProductRewardPopup
├── 햄버거 메뉴 (3개 항목)
│   ├── 만든개발자 → DeveloperInfoPopup
│   ├── 알림 (미구현)
│   └── 로그아웃 → navigate('/')
└── 하단 네비게이션
    ├── 미션홈 (활성)
    ├── 랭킹전 → navigate('/ranking')
    └── 성장보고서 (미구현)
```

## 주요 상태 관리

- **MissionContext** (`src/app/context/MissionContext.tsx`): 미션 CRUD, 상태 변경
- **현재 선택된 아이**: 프로필 전환 시 전역 상태로 관리
- **미션 상태 흐름**: 제안 → 승인/거절 → 진행중 → 인증 → 칭찬/격려 → 성장스토리
- **알림**: 미션 전달, 인증 완료, 보상 등 이벤트 기반
