---
name: frontend-standards
description: 미션놀이터 프론트엔드 표준 가이드. Atomic Design 폴더 구조, 컴포넌트 네이밍, Import/Export 패턴, Custom Hooks, 상태 관리 규칙을 정의. 컴포넌트 생성/수정 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 프론트엔드 표준 가이드

미션놀이터 프론트엔드 코드 작성 및 구조화 규칙.

---

## 1. 폴더 구조 (Atomic Design)

```
src/
├── app/
│   ├── components/
│   │   ├── atoms/          # 최소 단위 UI 요소
│   │   ├── molecules/      # atoms 조합, 단일 기능 단위
│   │   ├── organisms/      # molecules 조합, 독립적 UI 영역
│   │   ├── templates/      # 페이지 레이아웃 골격 (데이터 없음)
│   │   └── pages/          # 라우트에 매핑되는 화면 컴포넌트
│   ├── hooks/              # Custom React Hooks
│   ├── constants/          # 상수, 매핑 테이블, 설정값
│   ├── services/           # Supabase 서비스 레이어
│   ├── types/              # 공유 TypeScript 인터페이스/타입
│   └── context/            # React Context Providers
├── lib/                    # 외부 라이브러리 초기화 (supabase.ts 등)
├── assets/                 # 이미지/SVG 에셋
└── styles/                 # 글로벌 CSS
```

---

## 2. Atomic Design 계층 정의

### Atoms (원자)
가장 작은 UI 단위. 자체적으로 더 쪼갤 수 없는 요소.

**예시**: 버튼, 아이콘, 배지, 토글 스위치, 레이블, 코인 표시
**규칙**:
- 비즈니스 로직 없음
- props만으로 외형/동작 결정
- Context 직접 사용 금지

```tsx
// atoms/ToggleSwitch.tsx
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
```

### Molecules (분자)
Atoms를 조합한 단일 기능 단위.

**예시**: MissionCard, ShopItem, ProfileAvatar, 검색 입력 필드
**규칙**:
- 하나의 명확한 기능 수행
- Context 직접 사용 지양 (props로 데이터 전달)
- 자체 상태는 UI 상태만 (열림/닫힘, hover 등)

```tsx
// molecules/MissionCard.tsx
interface MissionCardProps {
  title: string;
  subtitle: string;
  reward: number;
  status: MissionStatus;
  onButtonClick?: () => void;
}
```

### Organisms (유기체)
Molecules를 조합한 독립적 UI 영역. Context 사용 가능.

**예시**: MissionList, ShopList, NavigationBar, MenuDrawer
**규칙**:
- 데이터 페칭/Context 사용 가능
- 자체적으로 의미 있는 UI 영역
- 재사용 가능하되, 특정 도메인 로직 포함 가능

```tsx
// organisms/MissionList.tsx
// useMissions() 호출하여 미션 목록 렌더링
```

### Templates (템플릿)
페이지의 레이아웃 골격. 데이터 없이 구조만 정의.

**예시**: HomeTemplate (헤더 + 탭 + 콘텐츠 + 하단 네비)
**규칙**:
- children/slots로 콘텐츠 주입
- 데이터 페칭 없음
- 레이아웃 관련 스타일만

```tsx
// templates/HomeTemplate.tsx
interface HomeTemplateProps {
  header: React.ReactNode;
  tabs: React.ReactNode;
  content: React.ReactNode;
  bottomNav: React.ReactNode;
}
```

### Pages (페이지)
라우트에 1:1 매핑되는 최상위 컴포넌트.

**예시**: HomeScreen, LoginScreen, RankingScreen
**규칙**:
- Template에 Organisms를 조합하여 구성
- 라우트 파라미터/상태 처리
- Context Provider 연결

---

## 3. 컴포넌트 네이밍 컨벤션

### 파일명
- PascalCase: `MissionCard.tsx`, `NavigationBar.tsx`
- 계층 접미사 불필요 (폴더가 계층을 나타냄)
- 화면 컴포넌트: `~Screen.tsx` (예: `HomeScreen.tsx`, `LoginScreen.tsx`)
- 팝업/모달: `~Popup.tsx`, `~Modal.tsx`

### 컴포넌트명
- 파일명과 동일한 PascalCase
- `export default` 사용 금지, `named export`만 사용

```tsx
// Good
export const MissionCard: React.FC<MissionCardProps> = ({ ... }) => { ... };

// Bad
export default function MissionCard() { ... }
```

### Props 인터페이스
- `컴포넌트명 + Props` 패턴
- 같은 파일에 정의하되, 공유되면 `types/`로 이동

```tsx
interface MissionCardProps { ... }
export const MissionCard: React.FC<MissionCardProps> = ({ ... }) => { ... };
```

---

## 4. Import/Export 패턴

### Barrel Files (index.ts)
각 atomic 폴더에 `index.ts` 생성하여 re-export.

```tsx
// components/atoms/index.ts
export { ToggleSwitch } from './ToggleSwitch';
export { CoinDisplay } from './CoinDisplay';
export { StatusBadge } from './StatusBadge';
export { TabButton } from './TabButton';
```

### Import 순서
1. React/외부 라이브러리
2. 내부 모듈 (services → context → hooks → constants → types)
3. 컴포넌트 (pages → organisms → molecules → atoms)
4. 에셋/스타일

```tsx
// 1. 외부
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 2. 내부 모듈
import { useAuth } from "@/app/context/AuthContext";
import { useTodayDate } from "@/app/hooks/useTodayDate";
import { MISSION_STATUS_COLORS } from "@/app/constants/mission";
import type { Mission } from "@/app/types/mission";

// 3. 컴포넌트
import { MissionList } from "@/app/components/organisms";
import { MissionCard } from "@/app/components/molecules";

// 4. 에셋
import imgCoin from "figma:asset/coin.png";
```

### 경로 별칭
- `@/` → `src/` (tsconfig paths)
- `figma:asset/` → `src/assets/` (Vite alias)

---

## 5. Custom Hooks 규칙

### 파일 위치
`src/app/hooks/` 하위에 `use` 접두사로 생성.

### 네이밍
- `use` + 동사/명사: `useTodayDate`, `useMissionSort`, `useGroupMembers`
- 하나의 관심사에 집중

### 구조
```tsx
// hooks/useTodayDate.ts
import { useMemo } from "react";

export const useTodayDate = () => {
  return useMemo(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[today.getDay()];
    return `${month}월 ${date}일(${day}) 오늘의 미션`;
  }, []);
};
```

### 규칙
- 반환값에 명확한 타입 지정
- 부수효과(side effect)가 있으면 cleanup 반드시 포함
- Context 래퍼 훅은 context 파일에 함께 정의 (`useAuth`, `useMissions`)

---

## 6. 상태 관리 패턴

### 계층별 상태 관리

| 상태 유형 | 관리 위치 | 예시 |
|-----------|-----------|------|
| 서버 상태 | Context + Supabase Realtime | 미션 목록, 프로필, 상품 |
| 글로벌 UI | Context | 인증 상태, 현재 그룹 |
| 로컬 UI | useState/useReducer | 탭 선택, 모달 열림, 입력값 |
| 파생 상태 | useMemo | 정렬된 미션, 필터된 목록 |

### Context 사용 규칙
- 최소한의 Context만 유지 (AuthContext, MissionContext 등)
- Context에 UI 상태 저장 금지 (서버 상태 + 비즈니스 로직만)
- Provider는 `App.tsx`에서 최상위 래핑

### useState vs useReducer
- 독립적인 2-3개 상태 → `useState`
- 연관된 4개 이상 상태 또는 복잡한 전이 → `useReducer`

---

## 7. 코딩 스타일

### 컴포넌트 정의
```tsx
import React from "react";

interface Props { ... }

export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // hooks
  // handlers
  // render
  return ( ... );
};
```

### 이벤트 핸들러
- `handle` + 동작: `handleClick`, `handleMissionAccept`
- 콜백 props: `on` + 동작: `onClick`, `onMissionAccept`

### 조건부 렌더링
```tsx
// 단순 조건 - 논리 AND
{isVisible && <Component />}

// 분기 - 삼항
{isLoading ? <Spinner /> : <Content />}

// 복잡한 분기 - early return
if (isLoading) return <Spinner />;
if (error) return <ErrorView />;
return <Content />;
```

### 인라인 컴포넌트 금지
컴포넌트 내부에 다른 컴포넌트를 정의하지 않는다. 별도 파일로 분리.

```tsx
// Bad - 렌더링마다 새 컴포넌트 생성
const ParentComponent = () => {
  const ChildComponent = () => <div>...</div>;
  return <ChildComponent />;
};

// Good - 별도 파일 또는 같은 파일 최상위에 정의
const ChildComponent: React.FC<Props> = () => <div>...</div>;
const ParentComponent = () => <ChildComponent />;
```
