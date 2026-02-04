# 미션놀이터 (Mission Playground)

부모와 자녀가 함께하는 미션 기반 보상 앱. Figma Make에서 내보낸 React 프로젝트.

## Figma 디자인

- **Figma 링크**: https://www.figma.com/design/LspCuVvapxePLY7XoLFjwz/미션놀이터?node-id=402-2977
- **개발 방식**: Figma MCP를 사용하여 디자인을 코드로 구현

## 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite 6
- **스타일링**: Tailwind CSS 4
- **라우팅**: React Router DOM
- **애니메이션**: Motion (Framer Motion)
- **UI 컴포넌트**: Radix UI, shadcn/ui

## 프로젝트 구조

```
src/
├── app/
│   ├── App.tsx              # 라우터 설정
│   └── components/
│       ├── LoginScreen.tsx          # 로그인 화면
│       ├── InvitationScreen.tsx     # 초대 화면
│       ├── InvitationSignupScreen.tsx # 초대 회원가입
│       ├── HomeScreen.tsx           # 자녀 홈 화면
│       ├── ParentHomeScreen.tsx     # 부모 홈 화면
│       ├── SoloHomeScreen.tsx       # 혼자 홈 화면
│       ├── MissionCard.tsx          # 미션 카드 컴포넌트
│       └── ui/                      # shadcn/ui 컴포넌트
├── imports/                  # Figma에서 내보낸 컴포넌트
├── assets/                   # 이미지 에셋 (PNG)
└── styles/                   # CSS 스타일
```

## 라우팅

| 경로 | 화면 | 설명 |
|------|------|------|
| `/` | LoginScreen | 로그인/초대코드 입력 |
| `/invitation` | InvitationScreen | 초대 수락 화면 |
| `/invitation-signup` | InvitationSignupScreen | 초대 회원가입 |
| `/home` | HomeScreen | 자녀용 홈 화면 |
| `/parent-home` | ParentHomeScreen | 부모용 홈 화면 |
| `/solo-home` | SoloHomeScreen | 혼자 사용 홈 화면 |

## 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
```

## 코드 컨벤션

### 이미지 import
Figma Make에서 내보낸 이미지는 `figma:asset/` 경로 사용:
```tsx
import imgExample from "figma:asset/해시값.png";
```

### 컴포넌트 스타일
- Tailwind CSS 클래스 사용
- 고정 크기 레이아웃 (393px x 852px 모바일 기준)
- 폰트: `ONE_Mobile_POP_OTF`

### 네비게이션
```tsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/home");
```

## 주의사항

- `absolute contents` 조합 사용 금지 (레이아웃 깨짐 발생)
- 컴포넌트에서 props로 받던 `className`, `onLogout` 등은 라우터 기반으로 변경됨
- React import 필요: `import React from "react";`
