---
name: mission-playground-components
description: 미션놀이터 UI 컴포넌트 가이드. 미션 카드, 팝업, 상점, 랭킹 등 컴포넌트 구현 시 참고. 상태별 색상, Props 인터페이스, 디자인 규칙 포함.
user-invocable: true
disable-model-invocation: false
---

# 미션놀이터 컴포넌트 가이드

그룹 미션 기반 보상 앱의 UI 컴포넌트 구현 가이드.

## 핵심 컴포넌트

### 1. 미션 카드 (MissionCard)

미션 상태별 배경색/바 색상/버튼이 자동 변경되는 카드 컴포넌트.

```typescript
interface MissionCardProps {
  title: string;
  subtitle: string;
  rewardText: string;        // 보상 포인트 표시
  status: MissionStatus;
  proposerName: string;      // 제안자 이름
  onButtonClick?: () => void;
}
```

**상태별 색상**:
| 상태 | 배경색 | 바 색상 |
|------|--------|---------|
| `pending` | `#fef3c7` | `#f59e0b` |
| `active` | `#f2e1be` | `#FEB700` |
| `in_progress` | `#f5eaf8` | `#C07FE5` |
| `gave_up` | `#f5e8e8` | `#E57F7F` |
| `challenge_success` | `#e8f0f6` | `#7FC0E5` |
| `completed` | `#e8f6ed` | `#5EE2A0` |

---

### 2. 미션 완료 팝업 (MissionCompletePopup)

**용도**: 미션 완료 확인 알림

```typescript
interface MissionCompletePopupProps {
  onClose?: () => void;
  onConfirm?: () => void;
  missionTitle?: string;
}
```

---

### 3. 미션 축하 팝업 (MissionCelebrationPopup)

**용도**: 미션 완료 시 축하 연출 (별 애니메이션 + 포인트 획득 표시)

```typescript
interface MissionCelebrationPopupProps {
  onConfirm?: () => void;
  reward?: number;           // 획득 포인트
}
```

**특징**:
- 393px 모바일 컨테이너
- 별 반짝이 + 빛줄기 효과
- 포인트 획득 애니메이션

---

### 4. 미션 제안 모달 (MissionProposeModal)

**용도**: 새 미션 제안 (제목, 설명, 보상 포인트, 빈도 설정)

---

### 5. 미션 수정 모달 (MissionEditModal)

**용도**: 기존 미션 수정/삭제

---

### 6. 상점 관련 팝업

| 컴포넌트 | 용도 |
|----------|------|
| `ProductCreatePopup` | 상품 등록 |
| `ProductEditPopup` | 상품 수정/삭제 |
| `ExchangeConfirmPopup` | 상품 구매 확인 (포인트 차감) |
| `SoldOutPopup` | 품절 알림 |
| `ShippingPopup` | 배송/준비중 알림 |
| `DeliveredPopup` | 전달 완료 알림 |

---

### 7. 프로필 선택 (ProfileSelectModal)

**용도**: 프로필 이미지 + 테두리 색상 선택

캐릭터 4종 + 테두리 색상 4종:
```typescript
const borderColors = {
  b1: "#37e59a",  // 초록
  b2: "#ffb0ef",  // 핑크
  b3: "#ffe550",  // 노랑
  b4: "#ff7878",  // 빨강
};
```

---

### 8. 랭킹 화면 (RankingScreen)

**용도**: 그룹 내 미션 수행 순위

- 포디움 (상위 3명): 프로필 이미지 + 이름 + 메달
- 랭킹 리스트: 순위별 색상 구분
  - 1위: `#fff9d4` (금)
  - 2위: `#eeece8` (은)
  - 3위: `#f2d2be` (동)
  - 4위~: `#f2e1be` (기본)

---

## 공통 디자인 규칙

- **모바일 기준**: 393px × 852px
- **폰트**: `ONE_Mobile_POP_OTF`
- **스타일링**: Tailwind CSS 클래스
- **애니메이션**: Motion (Framer Motion) 사용
- **`absolute contents` 조합 금지**: 레이아웃 깨짐 발생
