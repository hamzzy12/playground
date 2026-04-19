# 미션놀이터 (Mission Playground)

그룹 미션 기반 보상 앱. 멤버끼리 미션을 제안하고 수행하며 보상 포인트를 주고받는다.

## 핵심 개념

- **그룹**: 초대코드로 멤버를 초대하여 그룹 구성 (역할 구분 없이 동등한 멤버)
- **미션 제안/수락**: 멤버가 미션을 제안하면 다른 멤버가 수락하여 수행
- **보상 포인트**: 제안자가 포인트를 걸고, 수행자가 미션 완료 시 포인트 획득
- **상점**: 제안자가 등록한 상품을 보상 포인트로 구매

## Figma 디자인

- **Figma 링크**: https://www.figma.com/design/LspCuVvapxePLY7XoLFjwz/미션놀이터?node-id=402-2977
- **개발 방식**: Figma MCP를 사용하여 디자인을 코드로 구현

## 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite 6
- **스타일링**: Tailwind CSS 4
- **라우팅**: React Router DOM
- **백엔드**: Supabase (인증, DB, Realtime)
- **애니메이션**: Motion (Framer Motion)
- **UI 컴포넌트**: Radix UI

## 프로젝트 구조 (Atomic Design)

```
src/
├── app/
│   ├── App.tsx              # 라우터 설정
│   ├── components/
│   │   ├── atoms/           # 최소 단위 UI (버튼, 토글, 배지)
│   │   ├── molecules/       # 단일 기능 (MissionCard, ShopItem)
│   │   ├── organisms/       # 독립 UI 영역 (MissionList, NavigationBar)
│   │   ├── templates/       # 레이아웃 골격
│   │   ├── pages/           # 라우트 매핑 화면
│   │   └── *.tsx            # 기존 화면 컴포넌트 (점진적 이동 중)
│   ├── context/             # React Context (Auth, Mission)
│   ├── hooks/               # Custom Hooks (useTodayDate, useMissionSort)
│   ├── constants/           # 상수 (미션 색상, 프로필 맵)
│   ├── services/            # Supabase 서비스 레이어
│   └── types/               # 공유 TypeScript 타입
├── lib/                     # 외부 라이브러리 초기화 (supabase.ts)
├── imports/                 # Figma 컴포넌트 + SVG 경로
├── assets/                  # 이미지 에셋 (PNG/SVG)
└── styles/                  # 글로벌 CSS
```

## 사용자 플로우

### 인증
1. Google OAuth 로그인 또는 초대코드로 가입
2. 초대코드 입력 시 → 그룹 자동 합류
3. 로그인 후 홈 화면으로 이동

### 미션 플로우
1. **제안**: 멤버가 미션 생성 (제목, 설명, 보상 포인트 설정)
2. **수락**: 다른 멤버가 미션 수락
3. **수행**: 수락한 멤버가 미션 진행
4. **완료**: 미션 완료 시 보상 포인트 지급

### 상점 플로우
1. 멤버가 상품 등록 (이름, 가격 설정)
2. 다른 멤버가 보상 포인트로 상품 구매

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
- React import 필요: `import React from "react";`

## 품질 관리

- **Pre-commit Hook**: husky + lint-staged로 커밋 시 자동 검사
- **ESLint**: TypeScript 코드 린팅
- **TypeScript**: 타입 검사 (`npm run typecheck`)

## 문서화

작업한 내용은 Claude 스킬로 상세하게 문서화한다.

### 클로드 스킬

- **저장 위치**: `.claude/skills/<스킬명>/SKILL.md`

**SKILL.md 양식**:
```yaml
---
name: skill-name                  # 소문자, 숫자, 하이픈만 (최대 64자)
description: 스킬 설명             # 250자 이내. Claude가 자동 로드 판단에 사용
user-invocable: true              # false면 /메뉴에서 숨김 (배경 지식용)
disable-model-invocation: false   # true면 수동 호출만 가능 (/name)
argument-hint: "[arg]"            # 자동완성 시 힌트 (선택)
allowed-tools: Read, Grep, Glob   # 권한 없이 사용할 도구 (선택)
---

스킬 본문 (Markdown)
```

**주요 필드**:
| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | 권장 | 스킬 이름 (미지정 시 디렉토리명 사용) |
| `description` | 권장 | 용도 설명. 핵심 내용을 앞에 배치 |
| `user-invocable` | 선택 | `/`메뉴 노출 여부 (기본: true) |
| `disable-model-invocation` | 선택 | 자동 로드 비활성화 (기본: false) |
| `argument-hint` | 선택 | 자동완성 힌트 |
| `allowed-tools` | 선택 | 스킬 활성 시 허용할 도구 |
| `model` | 선택 | 스킬 실행 시 사용할 모델 |
| `paths` | 선택 | 특정 파일 패턴에서만 자동 활성화 |

**변수 치환**: `$ARGUMENTS`, `$0`, `$1`, `${CLAUDE_SKILL_DIR}` 등 사용 가능
