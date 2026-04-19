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

## 기술 스택

- React 18 + TypeScript + Vite 6
- Tailwind CSS 4
- React Router DOM
- Supabase (인증, DB, Realtime)
- Motion (Framer Motion)
- Radix UI, shadcn/ui
