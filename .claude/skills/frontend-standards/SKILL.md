---
name: frontend-standards
description: 미션놀이터 프론트엔드 표준 가이드. Atomic Design 폴더 구조(점진 이동 중), 컴포넌트 네이밍, Import/Export 패턴, Custom Hooks, 상태 관리(Zustand) 규칙을 정의. 컴포넌트 생성/수정 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 프론트엔드 표준 가이드

미션놀이터 프론트엔드 코드 작성 및 구조화 규칙.

---

## 1. 폴더 구조

### 현재 (점진 이동 중)
대부분의 화면은 `src/app/components/` 평면 구조에 있고, molecules/atoms 계층으로 점진적으로 이동하는 중입니다.

```
src/
├── app/
│   ├── App.tsx              # 라우터 + AppInitializer
│   ├── components/
│   │   ├── atoms/           # (비어있음) 최소 단위 UI
│   │   ├── molecules/       # MissionCard, ShopItem
│   │   ├── organisms/       # (비어있음) 독립적 UI 영역
│   │   ├── templates/       # (비어있음) 레이아웃 골격
│   │   └── *.tsx            # 기존 평면 화면 (HomeScreen, LoginScreen 등)
│   ├── hooks/               # Custom Hooks (useTodayDate, useMissionSort)
│   ├── constants/           # 상수 (mission, profile, styles)
│   ├── services/            # Supabase 서비스 레이어
│   ├── stores/              # Zustand 스토어 (auth, profile, mission)
│   └── types/               # 공유 타입 (mission, profile)
├── lib/                     # 외부 라이브러리 초기화 (supabase.ts)
├── imports/                 # Figma export SVG 경로
├── assets/                  # 이미지 에셋
└── styles/                  # 글로벌 CSS
```

### 이동 방침
- 신규 컴포넌트는 가능한 한 molecules/atoms 계층에 배치
- 기존 평면 화면은 필요 시 점진적으로 분해하여 templates/organisms으로 리팩토링

---

## 2. Atomic Design 계층 (목표)

### Atoms
- 최소 단위, 자체 분해 불가
- 예: 버튼, 아이콘, 배지, 토글
- **규칙**: 비즈니스 로직/스토어 사용 금지. props만으로 결정.

### Molecules
- Atoms 조합, 단일 기능 단위
- 예: `MissionCard`, `ShopItem`
- **규칙**: 스토어 직접 사용 지양. props로 주입. 자체 상태는 UI 상태만(hover, 열림 등).

### Organisms
- 독립적 UI 영역. 스토어 사용 가능.
- 예: MissionList, NavigationBar (현재 평면 화면 내부에 존재)

### Templates
- 레이아웃 골격. children/slots로 콘텐츠 주입. 데이터 페칭 없음.

### Pages (= 현재 Screen)
- 라우트 매핑 컴포넌트
- Template + Organisms 조합 + 라우트 파라미터 처리 + 스토어 연결
- **현재는 `HomeScreen.tsx` 등 평면 파일이 이 역할**

---

## 3. 상태 관리 (Zustand)

### 규칙
- 서버 상태 + 글로벌 상태는 Zustand 스토어 사용 (Context 사용 금지)
- 스토어는 **API 단위**로 분리: auth / profile / mission 각각 별도
- 컴포넌트는 `selector`로 필요한 부분만 구독

```tsx
// Good — 필요한 값만 구독
const user = useAuthStore((s) => s.user);
const missions = useMissionStore((s) => s.missions);

// Bad — 전체 구독 (모든 변경에 리렌더)
const authState = useAuthStore();
```

### 계층별 상태
| 상태 유형 | 관리 위치 | 예시 |
|-----------|-----------|------|
| 서버/글로벌 | Zustand store | user, profile, missions |
| 로컬 UI | `useState` | 탭 선택, 모달 열림, 입력값 |
| 파생 상태 | `useMemo` | 정렬된 목록, 필터 결과 |

### 스토어 상세 규칙
`.claude/skills/backend-integration/SKILL.md` 3절 참고.

---

## 4. 컴포넌트 네이밍 컨벤션

### 파일명
- PascalCase: `MissionCard.tsx`, `NavigationBar.tsx`
- 화면: `~Screen.tsx` (`HomeScreen`, `LoginScreen`)
- 팝업/모달: `~Popup.tsx`, `~Modal.tsx`

### 컴포넌트명
- 파일명과 동일한 PascalCase

### export 스타일 (현재 혼용)
- **화면/페이지 컴포넌트**: `export default` 사용 (App.tsx의 import 관례 유지)
- **molecules/atoms**: `named export` 권장 (배럴 파일에서 조합하기 용이)

```tsx
// 화면 (default)
export default function HomeScreen() { ... }

// molecules (named)
export function MissionCard(props: MissionCardProps) { ... }
```

### Props 인터페이스
- `컴포넌트명 + Props` 패턴
- 같은 파일에 정의하되 공유되면 `types/`로 이동

---

## 5. Import / Export 패턴

### Barrel Files
도메인 단위로 `index.ts`를 만들어 re-export:
- `src/app/services/index.ts` — 서비스 함수/타입
- `src/app/stores/index.ts` — 스토어 훅 + init 함수
- `src/app/components/molecules/index.ts` — molecules (미도입, 추가 권장)

### Import 순서
1. React / 외부 라이브러리
2. 내부 모듈 (services → stores → hooks → constants → types)
3. 컴포넌트 (organisms → molecules → atoms)
4. 에셋 / 스타일

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore, useMissionStore } from "@/app/stores";
import { inviteCodeService } from "@/app/services";
import type { Mission } from "@/app/types/mission";

import { MissionCard } from "@/app/components/molecules/MissionCard";

import imgCoin from "figma:asset/....png";
```

### 경로 별칭
- `@/` → `src/` (tsconfig paths)
- `figma:asset/` → `src/assets/` (Vite alias)

---

## 6. Custom Hooks

### 위치
`src/app/hooks/`

### 네이밍
- `use` + 동사/명사: `useTodayDate`, `useMissionSort`

### 규칙
- 하나의 관심사에 집중
- 반환값에 명확한 타입
- 부수효과 있으면 cleanup 반드시
- Zustand 래퍼 훅을 따로 만들지 않음 (스토어의 `useXxxStore` 자체가 훅)

---

## 7. 코딩 스타일

### React import
React 17+이지만 `import React from "react"`를 유지하는 파일이 있음. 새 파일은 필요한 훅/타입만 import해도 무방 (`import { useState } from "react"`).

### 이벤트 핸들러
- 내부 핸들러: `handle` + 동작 (`handleClick`, `handleMissionAccept`)
- Props 콜백: `on` + 동작 (`onClick`, `onMissionAccept`)

### 조건부 렌더링
```tsx
{isVisible && <Component />}
{isLoading ? <Spinner /> : <Content />}

if (isLoading) return <Spinner />;
if (error) return <ErrorView />;
return <Content />;
```

### 인라인 컴포넌트 금지
컴포넌트 내부에 다른 컴포넌트를 정의하지 않음 (렌더링마다 재생성되어 성능 저하).

### 레이아웃 제약
- 모바일 기준: `393px × 852px` 고정 크기
- 폰트: `ONE_Mobile_POP_OTF`
- **`absolute contents` 조합 금지** (레이아웃 깨짐)
