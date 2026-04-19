# 미션놀이터 (Mission Playground)

그룹 미션 기반 보상 앱. 멤버끼리 미션을 제안하고 수행하며 보상 포인트를 주고받는다.

## 핵심 개념

- **그룹**: 초대코드로 멤버를 초대하여 그룹 구성
- **미션 제안/수락**: 멤버가 미션을 제안하고, 다른 멤버가 수락하여 수행
- **보상 포인트**: 제안자가 포인트를 걸고, 수행자가 미션 완료 시 포인트 획득
- **상점**: 제안자가 등록한 상품을 보상 포인트로 구매

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
```

## 로컬 개발 환경 셋업

### 1. 환경 변수 설정
`.env.example`을 복사해서 `.env`를 만들고 값을 채웁니다.

```bash
cp .env.example .env
```

| 변수 | 값 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase 대시보드 → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | 같은 화면의 **Publishable key** (`sb_publishable_...`). **Secret key 사용 금지** (브라우저에 노출됨) |

> 같은 프로젝트를 공유하려면 팀에 `.env` 값을 안전한 채널로 전달받습니다.

### 2. (공유 프로젝트 사용 시) Google OAuth Test User 등록
앱이 OAuth "Testing" 상태이므로 등록된 Gmail만 로그인 가능합니다. 프로젝트 관리자에게 본인 Gmail을 Test User로 추가 요청하세요.

추가 절차 (관리자용): Google Cloud Console → APIs & Services → **OAuth consent screen → Audience → Test users → + Add users**

### 3. (자체 Supabase 프로젝트 사용 시) 신규 셋업
새 Supabase 프로젝트로 시작하는 경우 추가로 필요:
1. `supabase/schema.sql` 전체를 Supabase **SQL Editor → New query**에 붙여넣고 Run
2. **Authentication → Providers → Google** 활성화 + Google Cloud OAuth Client 생성/연동
3. **Authentication → URL Configuration** 에 `http://localhost:5173` 등록

상세 절차는 `docs/backend-integration-plan.md` 참고.

### 4. 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 접속.

## 기술 스택

- React 18 + TypeScript + Vite 6
- Tailwind CSS 4
- React Router DOM
- Supabase (인증, DB, Realtime)
- Motion (Framer Motion)
- Radix UI, shadcn/ui
