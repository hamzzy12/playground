---
name: mission-playground-components
description: 미션놀이터 UI 컴포넌트 가이드. 미션 카드, 상점 아이템, 각종 팝업/모달, 랭킹 컴포넌트 구현 시 참고. 상태별 색상, 실제 Props 시그니처, 디자인 규칙 포함.
user-invocable: true
disable-model-invocation: false
---

# 미션놀이터 컴포넌트 가이드

그룹 미션 기반 보상 앱의 UI 컴포넌트 구현 가이드.

---

## 1. Molecules (재사용 단위)

### MissionCard (`molecules/MissionCard.tsx`)
미션 상태별 배경/바/버튼이 자동 변경되는 카드.

```typescript
interface MissionCardProps {
  bgColor: string;                      // 상태별 배경
  barColor: string;                     // 상태별 하단 바
  shadowColor: string;                  // 카드 뒤 그림자 색
  title: string;
  subtitle: string;
  rewardText: string;                   // "보상 : 칭찬코인 +N" 형태
  iconSrc: string;                      // 좌측 아이콘
  buttonSrc: string;                    // active 기본 버튼
  inProgressButtonSrc: string;          // in_progress 버튼
  gaveUpButtonSrc: string;              // gave_up 버튼
  challengeSuccessButtonSrc: string;    // challenge_success 버튼
  completedButtonSrc: string;           // completed 버튼
  svgPath: string;                      // 버튼 배경 SVG path
  status: MissionStatus;
  onButtonClick?: () => void;
}
```

색상은 호출 측이 `constants/mission.ts`의 `getColorsForStatus(status)`로 계산해서 전달.

### ShopItem (`molecules/ShopItem.tsx`)
상점 상품 카드. 상태별 오버레이(품절/배송중/전달완료).

```typescript
interface ShopItemProps {
  title: string;
  price: string;                        // "-N" 형태
  iconSrc: string;
  status: ProductStatus;                // 'available' | 'soldout' | 'shipping' | 'delivered'
  statusImageSrc: string;
  onClick?: () => void;
}
```

---

## 2. 상태별 색상

### Mission
미션 상태별 색상 테이블. `src/app/constants/mission.ts`의 `getColorsForStatus()`가 제공:

| 상태 | 배경색 | 바 색상 | 의미 |
|------|--------|---------|------|
| `pending` | `#fef3c7` | `#f59e0b` | 수락 대기 (주황) |
| `active` | `#f2e1be` | `#FEB700` | 미진행 (노랑) |
| `in_progress` | `#f5eaf8` | `#C07FE5` | 진행중 (보라) |
| `gave_up` | `#f5e8e8` | `#E57F7F` | 포기 (빨강) |
| `challenge_success` | `#e8f0f6` | `#7FC0E5` | 도전성공 (파랑) |
| `completed` | `#e8f6ed` | `#5EE2A0` | 완료 (초록) |

> 실제 값은 `constants/mission.ts`가 단일 소스. 디자인 변경 시 해당 파일만 수정.

### Border (프로필 테두리)
```typescript
const borderColors = {
  b1: "#37e59a",  // 초록
  b2: "#ffb0ef",  // 핑크
  b3: "#ffe550",  // 노랑
  b4: "#ff7878",  // 빨강
};
```

### 랭킹 순위
- 1위: `#fff9d4` (금)
- 2위: `#eeece8` (은)
- 3위: `#f2d2be` (동)
- 4위~: `#f2e1be` (기본)

---

## 3. 팝업/모달 (평면 컴포넌트 위치)

`src/app/components/` 바로 아래 위치. 점진적으로 `molecules/`/`organisms/`로 이동 예정.

### 미션 관련
| 컴포넌트 | 용도 |
|----------|------|
| `MissionCompletePopup` | 미션 완료 확인 알림 |
| `MissionCreatedAlert` | 미션 생성 완료 알림 |
| `MissionEditPopup` | 미션 수정/삭제 (MissionEditScreen에서 사용) |

### 상점 관련
| 컴포넌트 | 용도 |
|----------|------|
| `ProductCreatePopup` | 상품 등록 |
| `ProductEditPopup` | 상품 수정/삭제 |
| `ExchangeConfirmPopup` | 상품 구매 확인 (코인 차감) |
| `SoldOutPopup` | 품절 알림 |
| `ShippingPopup` | 배송중/준비중 알림 |
| `DeliveredPopup` | 전달 완료 알림 |

### 아이콘/선택 모달
| 컴포넌트 | 용도 |
|----------|------|
| `IconSelectModal` | 미션 아이콘 선택 |
| `ProductIconSelectModal` | 상품 아이콘 선택 |
| `ProfileSelectModal` | 프로필 이미지/테두리 색상 선택 |
| `RelationshipSelectionModal` | 회원가입 시 관계 선택 |

### 기타
| 컴포넌트 | 용도 |
|----------|------|
| `SignupCompletePopup` | 가입 완료 알림 |
| `DeveloperInfoPopup` | 개발자 정보 |

---

## 4. Screen (페이지) 컴포넌트

라우트에 매핑되는 최상위 컴포넌트. `src/app/components/`.

| 컴포넌트 | 라우트 | 설명 |
|----------|--------|------|
| `LoginScreen` | `/` | Google OAuth + 초대코드 입력 |
| `InvitationScreen` | `/invitation` | 초대 수락 화면 |
| `InvitationSignupScreen` | `/invitation-signup` | 이름/관계 입력 후 그룹 합류 |
| `HomeScreen` | `/home` | 미션/상점 탭 메인 화면 |
| `MissionProposeScreen` | `/mission-propose` | 새 미션 생성 |
| `InProgressMissionScreen` | `/mission-in-progress` | 진행중 미션 수행 |
| `MissionEditScreen` | `/mission-edit` | 미션 수정/삭제 |
| `RankingScreen` | `/ranking` | 그룹 내 랭킹 |
| `GrowthReportScreen` | `/growth-report` | 성장 리포트 |

---

## 5. 공통 디자인 규칙

- **모바일 기준**: 393px × 852px (고정 크기 레이아웃)
- **폰트**: `ONE_Mobile_POP_OTF`
- **스타일링**: Tailwind CSS 4 클래스
- **애니메이션**: Motion (Framer Motion)
- **`absolute contents` 조합 금지** — 레이아웃 깨짐
- **인라인 컴포넌트 정의 금지** — 같은 파일 최상위 또는 별도 파일로 분리
