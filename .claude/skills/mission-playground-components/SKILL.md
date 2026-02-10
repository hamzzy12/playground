---
name: mission-playground-components
description: 미션놀이터 앱의 팝업 컴포넌트, 교환상점, 랭킹 기능 가이드. Figma MCP를 사용하여 디자인을 React 컴포넌트로 변환하고, 홈화면의 미션/상점/랭킹 기능을 구현할 때 참고한다.
---

# 미션놀이터 컴포넌트 가이드

미션놀이터 앱의 팝업 컴포넌트, 교환상점 및 랭킹 기능 구현 가이드.

## 생성된 컴포넌트 목록

### 1. MissionCompletePopup

**경로**: `/src/app/components/MissionCompletePopup.tsx`

**용도**: 미션완료 확인 팝업 (알림 스타일)

**Props**:
```typescript
interface MissionCompletePopupProps {
  onClose?: () => void;
  onConfirm?: () => void;
  missionTitle?: string;
}
```

**트리거**: HomeScreen에서 `completed` 상태 미션 카드 클릭

---

### 2. MissionCelebrationPopup

**경로**: `/src/app/components/MissionCelebrationPopup.tsx`

**용도**: 미션완료 축하 화면 (별3개 + 코인 +1 애니메이션)

**Props**:
```typescript
interface MissionCelebrationPopupProps {
  onConfirm?: () => void;
  reward?: number;
}
```

**트리거**: InProgressMissionScreen에서 "미션완료" 버튼 클릭

**특징**:
- 393px 모바일 컨테이너로 빛줄기 제한
- 별반짝이 효과 가운데 배치
- 코인 옆 +1 이미지 표시

---

### 3. ExchangeConfirmPopup

**경로**: `/src/app/components/ExchangeConfirmPopup.tsx`

**용도**: 상품 교환 확인 팝업 ("상품으로 교환할건가요?")

**Props**:
```typescript
interface ExchangeConfirmPopupProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  productName?: string;
}
```

**트리거**: HomeScreen 교환상점에서 available 상태 카드 클릭

**확인 시 동작**: 상품이 `shipping` (배송중) 상태로 변경

---

### 4. SoldOutPopup

**경로**: `/src/app/components/SoldOutPopup.tsx`

**용도**: 품절 알림 팝업 ("현재 품절 됬어요")

**Props**:
```typescript
interface SoldOutPopupProps {
  onClose?: () => void;
}
```

**트리거**: HomeScreen 교환상점에서 soldout 상태 카드 클릭

---

### 5. ShippingPopup

**경로**: `/src/app/components/ShippingPopup.tsx`

**용도**: 배송중 알림 팝업 ("2026.2.10까지 배송될꺼에요")

**Props**:
```typescript
interface ShippingPopupProps {
  onClose?: () => void;
  deliveryDate?: string;
}
```

**트리거**: HomeScreen 교환상점에서 shipping 상태 카드 클릭

---

### 6. DeliveredPopup

**경로**: `/src/app/components/DeliveredPopup.tsx`

**용도**: 배송완료 알림 팝업 ("이미 받았어요")

**Props**:
```typescript
interface DeliveredPopupProps {
  onClose?: () => void;
}
```

**트리거**: HomeScreen 교환상점에서 delivered 상태 카드 클릭

---

### 7. SignupCompletePopup

**경로**: `/src/app/components/SignupCompletePopup.tsx`

**용도**: 가입완료 팝업 ("같이 놀 준비가 되셨나요?")

**Props**:
```typescript
interface SignupCompletePopupProps {
  onConfirm?: () => void;
}
```

**트리거**: InvitationSignupScreen에서 "신규가입" 버튼 클릭

**확인 시 동작**: `/home`으로 이동 (navigate)

**Figma 노드**: `265:2514` ("초대_회원가입_입력")

**특징**:
- 블랙 딤드 배경 80% (`bg-black/80`)
- 나무판 배경 (imgImage29), 주황 배너 (imgImage64), 보석 아이콘 (imgImage66)
- "같이 놀 준비가 되셨나요?" 메시지 + 노란색 "확인" 버튼

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgImage29` | `51a6e993...` | 팝업 배경 (나무판, 공용) |
| `imgImage64` | `7e075a8e...` | 아이콘 배경 (주황 배너, 공용) |
| `imgImage66` | `cd7a361b...` | 보석 아이콘 |

---

### 8. DeveloperInfoPopup

**경로**: `/src/app/components/DeveloperInfoPopup.tsx`

**용도**: 만든개발자 정보 팝업 (문의처, 공식까페 링크)

**Props**:
```typescript
interface DeveloperInfoPopupProps {
  onClose?: () => void;
}
```

**트리거**: HomeScreen 햄버거 메뉴 → "만든개발자" 클릭

**Figma 노드**: `551:2337` ("만든개발자")

**특징**:
- 블랙 딤드 배경 80% (`bg-black/80`), `overflow-hidden touch-none`으로 뒷배경 스크롤 방지
- 팝업 세로 중앙 정렬 (`items-center`) + `mt-[-100px]`으로 위로 올림
- 나무판 배경 (imgImage23, 333x669), 타이틀 배너 (imgImage14)
- "만든 개발자" 텍스트 아웃라인 (text-shadow 16방향 3px `#1a1a2e`)
- 공식까페 링크 버튼 → `https://cafe.naver.com/missionplay` (새 탭)
- 개발자 연락처: tjdwls0129@naver.com
- from 햄찌,토니,루마

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgImage23` | `41b1d4ad...` | 팝업 배경 (큰 나무판) |
| `imgImage14` | `6f18eead...` | 타이틀 배너 (공용) |
| `imgImage99` | `26a17ce8...` | 네이버 까페 아이콘 |
| `imgGroup152` | `38620efb...` | 보석 아이콘 (SVG) |

---

### 9. RankingScreen

**경로**: `/src/app/components/RankingScreen.tsx`

**용도**: 미션연속 성공순위 랭킹 화면 (전체 화면)

**라우트**: `/ranking`

**Figma 노드**: `544:1815` ("전체랭킹순위", 393x852)

**화면 구성**:

| 영역 | 위치 (top) | 높이 | 설명 |
|------|-----------|------|------|
| 헤더 (포디움) | 0px | 226px | 어두운 배경, 커튼, 별/왕관 장식, Top3 포디움 |
| 웨이브 구분선 | 194px | 32px | 헤더→리스트 전환 SVG |
| 순위 리스트 | 255px | 스크롤 | 순위 카드 목록 (103px 간격) |
| 내 순위 바 | 716px | 87px | 고정 하단 내 순위 표시 |
| 하단 네비게이션 | 803px | 49px | 미션홈/랭킹전(활성)/성장보고서 |

**포디움 배치 (Figma 절대 좌표)**:

| 순위 | 프로필 위치 | 크기 | 받침대 위치 | 이름 위치 | 뱃지 위치 |
|------|------------|------|------------|----------|----------|
| 1위 | left:163, top:83 | 66px | left:148, top:138 | left:176, top:154 | left:147, top:179 (97x35) |
| 2위 | left:60, top:114 | 54px | left:39, top:152 | left:67, top:171 | left:50, top:194 (77x28) |
| 3위 | left:278, top:114 | 54px | left:257, top:152 | left:285, top:171 | left:267, top:195 (76x27) |

**포디움 뱃지**: PNG 이미지로 구현 (숫자 포함). 기존 SVG + 텍스트 오버레이 방식에서 변경됨.

**날개 구현**: 1위 캐릭터 양옆 날개는 단일 SVG 그룹(`imgGroup150`)으로 구현. 개별 벡터를 회전하지 않고 Figma에서 그룹화된 에셋 사용.

```
위치: left:129px, top:134px, w:133.37px, h:40.13px
inset: [-2.97% 0 0 0] (상단 약간 확장)
```

**렌더링 순서 (z-order)**: 왕관/별 반짝이 장식은 프로필 이미지보다 위에 표시되어야 함. DOM 순서로 제어:
1. 날개, 스포트라이트 (뒤)
2. 프로필 이미지, 받침대, 이름, 뱃지
3. 왕관, 별 반짝이 장식 (앞) ← 프로필 뒤가 아닌 **앞**에 렌더링

**순위 카드 색상**:

| 순위 | 카드 배경 | 뱃지 SVG | 순위번호 아웃라인 |
|------|----------|---------|-----------------|
| 1위 | `#fff9d4` (노랑) | `imgRectangle40` | text-shadow 6px `#603D1D` |
| 2위 | `#eeece8` (회색) | `imgRectangle39` | text-shadow 6px `#603D1D` |
| 3위 | `#f2d2be` (분홍) | `imgRectangle38` | text-shadow 6px `#603D1D` |
| 4위~ | `#f2e1be` (베이지) | `imgRectangle37` | text-shadow 6px `#603D1D` |

**카드 구조**:
```
- 그림자: top+11px, h:82px, bg-[#45270b], rounded-[8px]
- 카드: h:87px, rounded-[8px]
  - 왼쪽 뱃지: w:64px, rotate-180, SVG 이미지
  - 순위 번호: 뱃지 위 중앙, 26px, 흰색, text-shadow 아웃라인(6px #603D1D, 16방향)
  - 프로필: left:75px, 66x66, 초록 테두리(#00da62)
  - 이름: left:152px, 20px, 갈색(#603d1d)
  - 점수: right:16px, 26px, 갈색(#603d1d)
```

**텍스트 아웃라인 구현**:

| 텍스트 | 방식 | 색상 | 크기 |
|--------|------|------|------|
| 타이틀 "2월 미션연속 성공순위" | text-shadow 16방향 | `#1a1a2e` | 3px |
| 순위 카드 번호 (1~5위) | text-shadow 16방향 | `#603D1D` | 3px |
| 포디움 이름 "이현호" | text-shadow 12방향 | `#27323f` | 2px |

> `text-shadow`로 둥근 아웃라인 구현. `-webkit-text-stroke`는 모서리가 각져서 사용하지 않음.

**내 순위 바**:
- 배경: `#875224`
- 왼쪽 순위 영역: w:77px, `#b46927`
- "내순위" 라벨 + 순위 번호 (왼쪽)
- 프로필 이미지 (left:88px) + 이름 (left:164px) + 점수 (right:26px)

**하단 네비게이션 연동**:
- HomeScreen: 랭킹 버튼 클릭 → `navigate("/ranking")` (opacity-30, 비활성 스타일)
- RankingScreen: 미션홈 버튼 클릭 → `navigate("/home")` (opacity-30, 비활성 스타일, `rounded-[8px]`)
- 랭킹전 버튼: 활성 상태 (opacity 없음), `imgRectangle41` 하이라이트 표시

**에셋 목록**:

| 변수명 | 타입 | 해시 | 용도 |
|--------|------|------|------|
| `imgVector22` | SVG | `ac37bd0c...` | 웨이브 구분선 |
| `imgRectangle37~40` | SVG | 각각 다름 | 순위 카드 뱃지 (4위~/3위/2위/1위) |
| `imgRectangle41` | SVG | `24adb075...` | 하단 네비 활성 인디케이터 |
| `imgGroup1381` | PNG | `5549a4e9...` | 포디움 1위 뱃지 (숫자 포함 이미지) |
| `imgGroup1391` | PNG | `19c5bd4e...` | 포디움 2위 뱃지 (숫자 포함 이미지) |
| `imgGroup1401` | PNG | `c268cb1f...` | 포디움 3위 뱃지 (숫자 포함 이미지) |
| `imgVector17~19` | SVG | 각각 다름 | 포디움 받침대 (1위/2위/3위) |
| `imgGroup144~145` | SVG | 각각 다름 | 스포트라이트 (좌/우) |
| `imgGroup148~149` | SVG | 각각 다름 | 무대 커튼 (우/좌) |
| `imgGroup150` | SVG | `0f08cbf7...` | 1위 날개 (단일 그룹 SVG) |
| `imgVector`, `imgVector1~2` | SVG | 각각 다름 | 왕관, 별 장식 (대/소) |

---

### 10. ParentHomeScreen 탭 시스템

**경로**: `/src/app/components/ParentHomeScreen.tsx`

**Figma 노드**: `406:1731` (미션목록), `577:2329` (교환상점)

**메인 탭 (미션 / 교환 상점)**:
- SVG 배경 2개: 미션 활성(`imgMainTabMission`), 교환상점 활성(`imgMainTabShop`)
- 위치: left:0, top:195, 394x57
- 텍스트: 22px, 아웃라인 text-shadow 16방향 3px `#45270B`
- 활성: `text-white`, 비활성: `text-white/30`

**서브 탭 (미션 목록 / 미션 관리 / 응원하기)** - 미션 탭에서만 표시:
- 상태: `subTab: 'list' | 'manage' | 'cheer'` (기본값: `'list'`)
- 배경: `bg-[#4c2b0f]`, 361x37, rounded-[8px], inset shadow
- 활성 탭 하이라이트: `bg-[#b9915e]` border-2 `border-[#f0c58f]`, w:120px, `transition-all`
  - list: left:0px, manage: left:120px, cheer: left:241px
- 텍스트: 18px, absolute 배치, `whitespace-nowrap`, 아웃라인 text-shadow 16방향 2px `#45270B`
  - "미션 목록": left:59.5px, `onClick={() => setSubTab('list')}`
  - "미션 관리": left:180px, `onClick={() => setSubTab('manage')}`
  - "응원하기": left:300.5px, `onClick={() => setSubTab('cheer')}`
  - 활성: `text-white`, 비활성: `text-white opacity-30`
- 미션 목록 카드: `subTab === 'list'` 조건으로 표시
- 미션 관리 내용: `subTab === 'manage'` 조건으로 표시

**카드 스크롤 (공통)**:
- 미션 목록: 스크롤 컨테이너 top:319, h:484 (`overflow-y-auto`), 카드 간격 160px
- 미션 관리: 스크롤 컨테이너 top:370, h:433 (`overflow-y-auto`), 카드 간격 162px
- 교환상점: 스크롤 컨테이너 top:326, h:477 (`overflow-y-auto`), 카드 간격 103px
- 모두 미션홈 하단 바(top:803) 위까지 스크롤 영역

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgMainTabMission` | `917899768a...` | 메인 탭 SVG (미션 활성) |
| `imgMainTabShop` | `5e41aca0a7...` | 메인 탭 SVG (교환상점 활성) |

---

### 11. ParentHomeScreen 교환상점

**경로**: `/src/app/components/ParentHomeScreen.tsx` (shop 탭 내부)

**용도**: 부모용 교환상점 - 상품 관리 (올리기, 품절 채우기, 보상주기)

**Figma 노드**: `577:2329` ("홈화면_부모_교환상점")

**활성 조건**: `activeTab === 'shop'`

**레이아웃 구성**:

| 요소 | 위치 | 크기 | 설명 |
|------|------|------|------|
| 상품 올리기 버튼 | left:16, top:270 | 361x52 | 노란 버튼 (`#feb700`) + 그림자 (`#45270b`, top:+5px) |
| Shop Item 1 | left:15, top:332 | 362px | 일반 상품 카드 |
| Shop Item 2 | left:15, top:435 | 362px | 품절 카드 (SVG overlay + 품절상품 채우기 버튼) |
| Shop Item 3 | left:15, top:538 | 362px | 보상주기 카드 (SVG overlay + 보상주기 버튼) |

**카드 간격**: 103px

**카드 구조**:
```
- 그림자: top+11px, h:82px, bg-[#45270b], rounded-[8px]
- 카드 배경: h:87px, SVG 이미지 (imgCardBg)
  - 뱃지: left:282, w:80px, h:87px (imgShopBadge SVG)
  - 아이콘: left:10, top:11, 66x66 (imgImage46)
  - 상품명: left:84, top:24, 20px, #291608
  - 칭찬코인: right:14, top:12, 15px
  - 가격: right:30, top:34, 26px
```

**오버레이 카드 (품절/보상주기)**:
- SVG 다크 오버레이: `imgCardOverlay` (362x87)
- 버튼: left:100, 161x47, rounded-[8px]
  - 품절상품 채우기: `bg-[#feb700]` (노란색), top:23
  - 보상주기: `bg-[#5bffc6]` (초록색), top:20

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgShopBadge` | `dc986382...` | 상점 카드 뱃지 (SVG) |
| `imgCardBg` | `1b26f984...` | 상점 카드 배경 (SVG) |
| `imgCardOverlay` | `36c759c2...` | 품절/보상 오버레이 (SVG) |
| `imgImage46` | 기존 | 상품 아이콘 |

---

### 12. ProductCreatePopup (상품올리기)

**경로**: `/src/app/components/ProductCreatePopup.tsx`

**용도**: 교환상점에 새 상품 등록하는 팝업

**Props**:
```typescript
interface ProductCreatePopupProps {
  onClose?: () => void;
  onConfirm?: (productName: string, coinPrice: number, iconSrc: string | null) => void;
}
```

**트리거**: 교환상점 탭에서 "상품 올리기" 버튼 클릭

**입력 제한**:
- 상품 이름: 최대 10자
- 필요한 코인: 최대 99

---

### 13. ProductEditPopup (상품수정)

**경로**: `/src/app/components/ProductEditPopup.tsx`

**용도**: 교환상점 상품 수정/삭제 팝업

**Props**:
```typescript
interface ProductEditPopupProps {
  onClose?: () => void;
  onConfirm?: (productName: string, coinPrice: number, iconSrc: string | null) => void;
  onDelete?: () => void;
  initialName: string;
  initialPrice: number;
  initialIconSrc: string | null;
}
```

**트리거**: 교환상점 available 상태 카드 클릭

**버튼**: "삭제하기" (onDelete) / "상품 수정" (onConfirm)

---

### 14. ProductIconSelectModal (아이콘선택)

**경로**: `/src/app/components/ProductIconSelectModal.tsx`

**용도**: 상품/미션 아이콘 선택 모달

**특징**:
- `absolute inset-0 z-50` (부모 컨테이너 내 모달)
- 선택된 아이콘: 노란색 "선택" 오버레이 (`bg-[#ffe400]`, absolute inset-0)
- 4개 아이콘 가로 배치

---

### 15. ProductRefillPopup (품절상품채우기)

**경로**: `/src/app/components/ProductRefillPopup.tsx`

**라우트**: `/product-refill`

**용도**: 품절상품 채우기 확인 팝업 ("상품이 채워졌습니다")

**Props**:
```typescript
interface ProductRefillPopupProps {
  onConfirm?: () => void;
}
```

**트리거**: 교환상점 soldout 카드의 "품절상품 채우기" 클릭

**확인 시 동작**: 상품 status를 `available`로 변경

---

### 16. ProductRewardPopup (보상주기)

**경로**: `/src/app/components/ProductRewardPopup.tsx`

**라우트**: `/product-reward`

**용도**: 보상 날짜 입력 팝업 (날짜 피커 포함)

**Props**:
```typescript
interface ProductRewardPopupProps {
  onConfirm?: (rewardDate: string) => void;
}
```

**트리거**: 교환상점 delivered 카드의 "보상주기" 클릭

**특징**: input type="date" + showPicker()로 날짜 피커 연동

**확인 시 동작**: 상품 status를 `soldout`로 변경

---

### 17. MissionEditPopup (미션수정)

**경로**: `/src/app/components/MissionEditPopup.tsx`

**라우트**: `/mission-edit`

**용도**: 미션 수정 팝업 (빈도/제목/설명/완료일/보상/아이콘)

**Props**:
```typescript
interface MissionEditPopupProps {
  onClose?: () => void;
  onConfirm?: (data: {
    title: string;
    description: string;
    frequency: string;
    targetDate: string;
    reward: number;
    iconSrc: string | null;
  }) => void;
  onDelete?: () => void;
  initialTitle: string;
  initialDescription: string;
  initialReward: number;
}
```

**버튼**: "삭제하기" (onDelete, 미션 삭제) / "미션 수정하기" (onConfirm)

**구성요소**:
- 빈도 선택: 1회/매일/매주/매월 (활성: `bg-[#ffe400]`, 비활성: `bg-[#733e14]`)
- 미션 제목: 최대 15자
- 미션 설명: 텍스트 입력
- 목표 완료일: 날짜 피커
- 보상 칭찬코인: 최대 99
- 아이콘 선택: ProductIconSelectModal 연동

---

### 18. ParentHomeScreen 미션 관리 탭

**경로**: `/src/app/components/ParentHomeScreen.tsx` (mission 탭 > manage 서브탭)

**용도**: 부모가 미션을 만들고, 수정하고, 활성화/비활성화하는 관리 화면

**Figma 노드**: `577:1946` ("홈화면_부모_미션관리")

**활성 조건**: `activeTab === 'mission' && subTab === 'manage'`

**레이아웃 구성**:

| 요소 | 위치 | 크기 | 설명 |
|------|------|------|------|
| 미션 만들기 버튼 | left:16, top:314 | 361x52 | 노란 버튼 (`#feb700`) + 그림자 (`#45270b`, top:+5px) |
| 미션 카드 1 | left:16, top:376 | 361px | 카드 + 수정하기 버튼 + 토글 |
| 미션 카드 2 | left:16, top:538 | 361px | 카드 + 수정하기 버튼 + 토글 |

**카드 간격**: 162px (376, 538, 700, ...)

**카드 구조**:
```
- 그림자: top+6px, h:146px, bg-[#45270b], rounded-[8px]
- 카드: h:146px, bg-[#f2e1be], rounded-[8px]
- 하단 바: imgBarYellow SVG (h:47px, top:99px)
- 아이콘: left:9, top:15, 66x66 (imgImage46)
- 제목: left:84, top:17, 20px
- 설명: left:84, top:51, 20px
- 보상 텍스트: top:104, pl:16, 18px
```

**수정하기 버튼**:
- 이미지 기반: `imgEditBtn` (PNG, 80x40px, "수정하기" 텍스트 포함 이미지)
- 위치: left:290, top:10 (카드 기준)
- 텍스트 오버레이 없음 (이미지 자체에 텍스트 포함)
- 클릭 시: `setEditingMission(mission)` → MissionEditPopup 오픈

**토글 스위치**:
- SVG 이미지 기반: ON(`imgToggleOn`), OFF(`imgToggleOff`)
- 위치: left:288, top:108 (카드 기준), 58x30
- 상태: `missionEnabled: Record<string, boolean>`
- `src={enabled ? imgToggleOn : imgToggleOff}`

**카드 스크롤**:
- 스크롤 컨테이너: left:0, top:370, w:393, h:433, `overflow-y-auto`
- 카드 내부 위치: top: `6 + index * 162`px (컨테이너 기준)
- 내부 높이: `missions.length * 162 + 10`px

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgEditBtn` | `799e50df...` | 수정하기 버튼 이미지 (PNG, 텍스트 포함) |
| `imgToggleOn` | `53f85dfe...` | 토글 ON 이미지 (SVG) |
| `imgToggleOff` | `4c3c0360...` | 토글 OFF 이미지 (SVG) |
| `imgBarYellow` | `3d0b785a...` | 카드 하단 바 (SVG) |
| `imgImage46` | 기존 | 미션 아이콘 |

---

### 19. ParentHomeScreen 응원하기 탭

**경로**: `/src/app/components/ParentHomeScreen.tsx` (mission 탭 > cheer 서브탭)

**용도**: 부모가 자녀에게 응원 메시지를 보내는 화면

**Figma 노드**: `577:2178` ("홈화면_부모_칭찬하기")

**활성 조건**: `activeTab === 'mission' && subTab === 'cheer'`

**상태**:
```typescript
const [cheerMessage, setCheerMessage] = useState('');
const [cheerHistory, setCheerHistory] = useState<string[]>(['오늘도 열심히 잘 했어!', '지금처럼 쭉 가자~~']);
```

**레이아웃 구성**:

| 요소 | 위치 | 크기 | 설명 |
|------|------|------|------|
| "응원 메세지 보내기" 라벨 | left:16, top:319 | - | 20px, 흰색 |
| 입력 필드 | left:16, top:359 | 362x60 | SVG 배경 (`imgCheerInput`), placeholder "오늘의 응원 한마디" |
| "최근에 보낸 메시지" 라벨 | left:16, top:434 | - | 20px, 흰색 |
| 메시지 카드 목록 | left:0, top:470 | 393x333 | 스크롤 영역 (`overflow-y-auto`) |

**입력 필드**:
- SVG 배경 위에 투명 input 오버레이
- Enter 키로 전송 → `cheerHistory`를 새 메시지 1개로 교체 (누적 아님)

**메시지 카드 구조**:
```
- 그림자: top+5px, 362x64 (imgCheerCardShadow SVG)
- 카드 배경: 362x64 (imgCheerCardBg SVG)
- 텍스트: 20px, #492607, flex 중앙 정렬
```

**카드 간격**: 79px

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgCheerInput` | `9012c968...` | 응원 입력 필드 배경 (SVG) |
| `imgCheerCardBg` | `c3f5fe25...` | 메시지 카드 배경 (SVG) |
| `imgCheerCardShadow` | `3e12aad1...` | 메시지 카드 그림자 (SVG) |

---

### 20. ParentHomeScreen 미션카드

**미션카드 하단 바**: SVG 이미지로 구현 (인라인 SVG 아님)

| 카드 | 배경색 | 하단 바 에셋 |
|------|--------|-------------|
| Card 1 (미진행) | `#f2e1be` | `imgBarYellow` (3d0b785a...) |
| Card 2 (진행중) | `#f5eaf8` | `imgBarPurple` (1b86b0b7...) |
| Card 3 (미션완료) | `#e8f6ed` | `imgBarGreen` (d87a12be...) |

---

## 컴포넌트 공통 패턴

### 팝업 기본 구조

```tsx
<div className="fixed inset-0 z-50 flex items-start justify-center" onClick={onClose}>
  {/* 배경 오버레이 */}
  <div className="absolute inset-0 bg-black/70" />

  {/* 팝업 컨테이너 */}
  <div className="relative w-[333px] h-[427px]" onClick={(e) => e.stopPropagation()}>
    {/* 팝업 배경 이미지 */}
    <img src={imgImage29} ... />

    {/* 아이콘 */}
    {/* 메시지 */}
    {/* 버튼 */}
  </div>
</div>
```

### 공통 이미지 에셋

| 변수명 | 용도 |
|--------|------|
| `imgImage29` | 팝업 배경 (나무판 이미지) |
| `imgImage64` | 아이콘 배경 (흰색 영역) |
| `imgImage65` | 체크/물음표 아이콘 |

---

## HomeScreen 상태 관리

### 추가된 State

```typescript
const [showCompletePopup, setShowCompletePopup] = useState(false);
const [completingMissionId, setCompletingMissionId] = useState<string | null>(null);
const [showExchangePopup, setShowExchangePopup] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<{ id: string; title: string; price: string } | null>(null);
const [shippingProducts, setShippingProducts] = useState<string[]>([]);
const [showSoldOutPopup, setShowSoldOutPopup] = useState(false);
const [showShippingPopup, setShowShippingPopup] = useState(false);
const [showDeliveredPopup, setShowDeliveredPopup] = useState(false);
const [showDeveloperPopup, setShowDeveloperPopup] = useState(false);
```

### 햄버거 메뉴

**HomeScreen** (자녀용, 4개 항목, 200x202 배경):

| 메뉴 항목 | 동작 |
|----------|------|
| 미션제안하기 | `navigate('/mission-propose')` (노란 버튼) |
| 만든개발자 | `setShowDeveloperPopup(true)` (팝업) |
| 알림 | (미구현) |
| 로그아웃 | `navigate('/')` |

**ParentHomeScreen** (부모용, 3개 항목, 200x154 배경):

| 메뉴 항목 | 동작 |
|----------|------|
| 만든개발자 | `setShowDeveloperPopup(true)` (팝업) |
| 알림 | (미구현) |
| 로그아웃 | `navigate('/')` |

### 미션 정렬 로직

- 초기 로드 시에만 상태 우선순위로 정렬
- 클릭으로 상태 변경 시 위치 유지
- 새로고침 시에만 재정렬 적용

```typescript
const [missionOrder, setMissionOrder] = useState<string[]>([]);

useEffect(() => {
  if (missionOrder.length === 0 && missions.length > 0) {
    const sortedIds = [...missions]
      .sort((a, b) => MISSION_STATUS_PRIORITY[a.status] - MISSION_STATUS_PRIORITY[b.status])
      .map(m => m.id);
    setMissionOrder(sortedIds);
  }
}, [missions, missionOrder.length]);
```

---

## Figma MCP 사용법

### 디자인 가져오기

1. Figma 데스크톱 앱에서 프레임 선택
2. `mcp__figma-desktop__get_design_context` 호출
3. `mcp__figma-desktop__get_screenshot` 호출로 시각적 확인

### 코드 변환 시 주의사항

- `absolute contents` 조합 사용 금지 (CLAUDE.md 규칙)
- 이미지 import는 `figma:asset/해시값.png` 형식 사용
- 새 에셋은 Figma localhost에서 다운로드 후 `/src/assets/`에 저장

```bash
curl -s -o /src/assets/해시값.png "http://localhost:3845/assets/해시값.png"
```

---

## 폰트 설정

### ONE Mobile POP 폰트 적용

**fonts.css**:
```css
@font-face {
  font-family: 'ONE_Mobile_POP_OTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

**theme.css**:
```css
*, *::before, *::after, body, html, p, span, div, button, input, textarea, label, h1, h2, h3, h4, h5, h6 {
  font-family: 'ONE_Mobile_POP_OTF', sans-serif !important;
}
```

---

## 파일 구조

```
src/app/components/
├── HomeScreen.tsx              # 자녀용 홈화면 (미션목록 + 교환상점)
├── ParentHomeScreen.tsx        # 부모용 홈화면 (미션목록 + 교환상점_부모)
├── InProgressMissionScreen.tsx # 진행중 미션 화면
├── RankingScreen.tsx           # 랭킹 화면 (미션연속 성공순위)
├── MissionCompletePopup.tsx    # 미션완료 팝업
├── MissionCelebrationPopup.tsx # 미션완료 축하 화면
├── ExchangeConfirmPopup.tsx    # 상품 교환 확인 팝업
├── SoldOutPopup.tsx            # 품절 팝업
├── ShippingPopup.tsx           # 배송중 팝업
├── DeliveredPopup.tsx          # 배송완료 팝업
├── SignupCompletePopup.tsx     # 가입완료 팝업
├── DeveloperInfoPopup.tsx     # 만든개발자 팝업
└── ProfileSelectModal.tsx     # 프로필/테두리 선택 모달

src/imports/                     # Figma에서 내보낸 컴포넌트
├── MonthlySelector.tsx          # 월선택 팝업 (구: 월선택팝업.tsx)
├── WeekdaySelector.tsx          # 요일선택 팝업 (구: 요일선택팝업.tsx)
├── MissionCreateModal.tsx       # 상품/미션 올리기 (구: 상품올리기.tsx)
├── AlertPopup.tsx               # 알림 팝업 (구: 알림팝업-22-865.tsx)
└── MissionProposeModal.tsx      # 미션 제안하기 (구: 미션제안하기.tsx)
```

> **참고**: `src/imports/` 파일명은 한글에서 영어로 변경됨. import 경로도 함께 수정 완료.

## 라우팅

| 경로 | 화면 | 설명 |
|------|------|------|
| `/` | LoginScreen | 로그인/초대코드 입력 |
| `/invitation` | InvitationScreen | 초대 수락 화면 |
| `/invitation-signup` | InvitationSignupScreen | 초대 회원가입 |
| `/home` | HomeScreen | 자녀용 홈 화면 |
| `/parent-home` | ParentHomeScreen | 부모용 홈 화면 |
| `/solo-home` | SoloHomeScreen | 혼자 사용 홈 화면 |
| `/mission-propose` | MissionProposeScreen | 미션 제안 화면 |
| `/mission-in-progress` | InProgressMissionScreen | 진행중 미션 화면 |
| `/ranking` | RankingScreen | 랭킹 화면 (HomeScreen용) |
| `/solo-ranking` | SoloRankingScreen | 랭킹 화면 (SoloHomeScreen용) |

---

### 21. ProfileSelectModal (프로필/테두리 선택)

**경로**: `/src/app/components/ProfileSelectModal.tsx`

**용도**: 프로필 캐릭터 및 테두리 색상 선택 모달

**Props**:
```typescript
interface ProfileSelectModalProps {
  onClose: () => void;
  onConfirm?: (profileId: string, borderId?: string) => void;
}
```

**트리거**: HomeScreen 좌상단 프로필 버튼 클릭 → `setShowProfileModal(true)`

**탭 시스템**:

| 탭 | 상태 | 내용 |
|---|---|---|
| 프로필 | `activeTab === "profile"` | 4개 캐릭터 통합 PNG 선택 |
| 테두리 | `activeTab === "border"` | 4개 색상 테두리 선택 |

**탭 하이라이트 구현**:
- 프로필 활성: `bg-[#b9915e] border-2 border-[#f0c58f]` (solid div, left:49px)
- 테두리 활성: `imgTabBorder` SVG 이미지 (left:194.5px)
- 비활성 탭 텍스트: `opacity-30`

**프로필 탭 - 캐릭터 목록**:

| ID | 에셋 | 해시 |
|---|---|---|
| p1 | `imgRectangle31` | `508ac9b0...` |
| p2 | `imgRectangle33` | `5e782578...` |
| p3 | `imgRectangle34` | `a5034f39...` |
| p4 | `imgRectangle32` | `c64f8226...` |

- 각 프로필은 **배경+캐릭터 통합 PNG** 1장 (별도 배경색/캐릭터 오버레이 없음)
- 선택 시 체크마크 오버레이 (`imgCheckmark`, `inset-[-3.17%]`)
- 미리보기: 선택된 프로필의 통합 PNG 표시 (left:66, top:269, 63x63)

**테두리 탭 - 색상 목록**:

| ID | 색상 | 설명 |
|---|---|---|
| b1 | `#37e59a` | 초록 |
| b2 | `#ffb0ef` | 분홍 |
| b3 | `#ffe550` | 노랑 |
| b4 | `#ff7878` | 빨강 |

- `border: 5px solid {color}`, `rounded-[8px]`, 내부 빈 사각형
- 선택 시 체크마크 오버레이 (프로필 탭과 동일)
- 미리보기: 캐릭터 이미지 (imgImage90, bg `#5bb675`) 고정 표시

**그리드 배치**: 4개 1줄, left: [49, 126, 203, 280]px, top: 403px, size: 63x63

**HomeScreen 연동**:

```typescript
// 상태
const [selectedProfileImg, setSelectedProfileImg] = useState<string | null>(null);
const [selectedBorderColor, setSelectedBorderColor] = useState<string | null>(null);

// PROFILE_MAP
const PROFILE_MAP: Record<string, string> = {
  p1: imgRectangle31, p2: imgRectangle33, p3: imgRectangle34, p4: imgRectangle32,
};

// onConfirm 콜백
onConfirm={(profileId, borderId) => {
  setSelectedProfileImg(PROFILE_MAP[profileId] ?? null);
  const borderMap: Record<string, string> = {
    b1: "#37e59a", b2: "#ffb0ef", b3: "#ffe550", b4: "#ff7878",
  };
  if (borderId) setSelectedBorderColor(borderMap[borderId] ?? null);
}}
```

**홈화면 프로필 영역 렌더링**:
- 프로필 미선택: 기존 bg `#007722` + imgImage90 캐릭터
- 프로필 선택됨: 통합 PNG (`selectedProfileImg`) 45x45 `object-cover rounded-[8px]`
- 테두리: `border: 3px solid {selectedBorderColor}` (기본값: `#00da62`)

**에셋**:

| 변수명 | 해시 | 용도 |
|---|---|---|
| `imgRectangle31` | `508ac9b0...` | 프로필 1 (통합 PNG) |
| `imgRectangle33` | `5e782578...` | 프로필 2 (통합 PNG) |
| `imgRectangle34` | `a5034f39...` | 프로필 3 (통합 PNG) |
| `imgRectangle32` | `c64f8226...` | 프로필 4 (통합 PNG) |
| `imgGroupTab` | `29e2f438...` | 탭 바 배경 (SVG) |
| `imgTabBorder` | `0920cfbb...` | 테두리 탭 활성 하이라이트 (SVG) |
| `imgCheckmark` | `db948d78...` | 선택 체크마크 (SVG) |
| `imgImage23` | `41b1d4ad...` | 나무판 배경 (PNG, 공용) |
| `imgImage14` | `6f18eead...` | 타이틀 배너 (PNG, 공용) |
| `imgImage90` | `33a8e1b3...` | 테두리 탭 미리보기 캐릭터 (PNG) |

---

### 22. SoloHomeScreen 미션 목록 (MissionContext 연동)

**경로**: `/src/app/components/SoloHomeScreen.tsx`

**용도**: 혼자 사용 홈화면의 미션 목록을 HomeScreen과 동일한 기능으로 구현

**변경 내용**: 기존 정적 미션 카드 2개를 MissionContext 기반 동적 미션 카드로 교체

**MissionContext 연동**:
- `useMissions()` 훅으로 미션 데이터 및 `updateMissionStatus` 가져오기
- `MISSION_STATUS_PRIORITY`로 초기 로드 시 정렬
- `missionOrder` state로 카드 위치 고정 (상태 변경 시 재정렬 없음)

**SoloMissionCard 컴포넌트** (파일 내 로컬 정의):
- HomeScreen의 `MissionCard`와 동일한 Props/동작
- 상태별 카드 색상:

| 상태 | 배경색 | 하단바 색상 | 버튼 이미지 |
|------|--------|------------|------------|
| active | `#f2e1be` (기본) | `#FEB700` (기본) | `imgImage50` |
| in_progress | `#f5eaf8` | `#C07FE5` | `imgImage37` |
| gave_up | `#f5e8e8` | `#E57F7F` | `imgGiveUp` |
| challenge_success | `#e8f0f6` | `#7FC0E5` | `imgChallengeSuccess` |
| completed | `#e8f6ed` | `#5EE2A0` | `imgImage38` |

**미션 카드 클릭 핸들러** (`handleMissionButtonClick`):

| 현재 상태 | 클릭 시 동작 |
|----------|------------|
| active | → `in_progress`로 상태 변경 |
| in_progress | → SoloMissionCompletePopup 축하 화면 표시 → "선물 받기" 클릭 시 `completed`로 변경 |
| challenge_success | → MissionCompletePopup 표시 → 확인 시 `completed`로 변경 |
| completed | → MissionCompletePopup 표시 (확인용) |

**추가된 State**:
```typescript
const [showCompletePopup, setShowCompletePopup] = useState(false);
const [showSoloCelebration, setShowSoloCelebration] = useState(false);
const [completingMissionId, setCompletingMissionId] = useState<string | null>(null);
const [missionOrder, setMissionOrder] = useState<string[]>([]);
```

**추가된 import**:
```typescript
import { useMissions, MISSION_STATUS_PRIORITY, MissionStatus } from "@/app/context/MissionContext";
import MissionCompletePopup from "./MissionCompletePopup";
import SoloMissionCompletePopup from "./SoloMissionCompletePopup";
import imgImage50 from "figma:asset/06750638...png";  // 미진행 버튼
import imgGiveUp from "figma:asset/8e84a045...png";   // 포기 버튼
import imgChallengeSuccess from "figma:asset/5e53b119...png"; // 도전성공 버튼
import imgImage38 from "figma:asset/8148c67e...png";  // 완료 버튼
import svgPaths from "@/imports/svg-pjyub6r4mi";      // 카드 하단바 SVG path
```

**기타 변경**:
- 날짜 헤더: 정적 "1월 25일(토)" → `getTodayDateString()` 동적 날짜
- `useLocation` 추가: 완료된 미션 state 처리 (`location.state.completedMissionId`)
- MissionCompletePopup 렌더링 추가 (팝업 영역)
- 하단 네비게이션: "하루일기" → "랭킹" 변경, 클릭 시 `/ranking`으로 이동

---

### 23. SoloMissionCompletePopup (솔로 미션완료 축하 화면)

**경로**: `/src/app/components/SoloMissionCompletePopup.tsx`

**용도**: SoloHomeScreen에서 진행중 미션 클릭 시 표시되는 미션완료 축하 팝업

**Figma 노드**: `373:2681` ("미션완료팝업")

**Props**:
```typescript
interface SoloMissionCompletePopupProps {
  onConfirm?: () => void;
}
```

**트리거**: SoloHomeScreen에서 `in_progress` 상태 미션 카드 클릭

**확인 시 동작**: 미션을 `completed` 상태로 변경 후 팝업 닫기

**화면 구성**:

| 요소 | 위치 | 설명 |
|------|------|------|
| 어두운 배경 | 전체 | `bg-[rgba(0,0,0,0.9)]` |
| 빛줄기 + 별3개 + 배너 | top:41, h:196 | `imgImage58` (stars + "미션 완료" 배너) |
| 빛 효과 | top:143, 277x186 | `imgLight2` (중앙 정렬) |
| 반짝이 장식 | 여러 위치 | `imgImage40` x5 (다양한 크기) |
| 코인 아이콘 | top:331, 102x102 | `imgImage55` (중앙 정렬) |
| +1 텍스트 | top:402, left:206 | `imgImage59` (35x31) |
| 메시지 | top:463 | "정말 잘했어! 또 하나 해볼까?" (20px, 흰색) |
| 선물 받기 버튼 | top:554, 167x50 | `bg-[#ffe400]`, rounded-[10px] |

**에셋**:

| 변수명 | 해시 | 용도 |
|--------|------|------|
| `imgImage58` | `ceca2545...` | 빛줄기 + 별3개 + 미션완료 배너 (PNG) |
| `imgLight2` | `df0e21b5...` | 빛 효과 (PNG) |
| `imgImage55` | `965fb9e3...` | 코인 아이콘 (PNG) |
| `imgImage59` | `13fd5dd1...` | +1 텍스트 (PNG) |
| `imgImage40` | `1f04a42e...` | 반짝이 장식 (PNG, 공용) |

---

### 24. SoloRankingScreen (솔로 랭킹 화면)

**경로**: `/src/app/components/SoloRankingScreen.tsx`

**라우트**: `/solo-ranking`

**용도**: SoloHomeScreen 전용 랭킹 화면 (RankingScreen 복제)

**RankingScreen과의 차이점**:
- 하단 네비 "미션홈" 클릭 → `/solo-home` (기존 RankingScreen은 `/home`)

**트리거**: SoloHomeScreen 하단 네비 "랭킹전" 클릭 → `navigate("/solo-ranking")`

**화면 구성**: RankingScreen(섹션 9)과 동일
- 포디움 (1위 이현호, 2위 김민서, 3위 박지우)
- 1~100위 순위 리스트
- 내 순위 바 (김쭈니)
- 하단 네비게이션 (미션홈/랭킹전/성장보고서)

**라우팅 등록** (App.tsx):
```tsx
import SoloRankingScreen from "@/app/components/SoloRankingScreen";
<Route path="/solo-ranking" element={<SoloRankingScreen />} />
```
