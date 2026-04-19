# Supabase 백엔드 통합 계획

> 새 Supabase 프로젝트(2026-04-19 생성)에 미션놀이터 프론트엔드를 연결하기 위한 작업 계획.

## 배경

- 기존 `.env`는 이전 Supabase 프로젝트(`lyyjezxvtzqlmrbigokv`)를 가리키고 있어 연결되지 않음
- 사용자가 새 Supabase 프로젝트를 생성함 → 신규 프로젝트로 재연결 필요
- 최근 리팩토링(Phase 1-5)으로 데이터 모델이 변경되었으나, `supabase/schema.sql`은 구버전 그대로 남아있음

## 현재 코드베이스 상태

### Supabase 관련 파일 (5개)

| 파일 | 역할 |
|---|---|
| `.env` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| `src/lib/supabase.ts` | `createClient()` 초기화. DEV에선 환경변수 없으면 경고만 |
| `src/lib/database.types.ts` | **신규 데이터 모델 타입** (groups 기반) |
| `src/app/context/AuthContext.tsx` | Google OAuth + `profiles` 조회 |
| `src/app/context/MissionContext.tsx` | `missions` CRUD + Realtime 구독 |
| `src/app/services/{authService,missionService}.ts` | `invite_codes`, `missions` 래퍼 |

### `schema.sql` 불일치 (재작성 필요)

| 코드(database.types.ts) | schema.sql (구버전) |
|---|---|
| `groups`, `group_members` | `families` (parent_id, child_id) |
| `profiles.group_id` | `profiles.role` (parent/child/solo) |
| `invite_codes.group_id` | `invite_codes.role_for`, `family_id` |
| `missions.proposer_id`, `accepter_id`, `group_id` | `missions.creator_id`, `assignee_id`, `family_id` |
| `products.seller_id`, `buyer_id`, `group_id` | `products.creator_id`, `family_id` |
| `ranking_view` (assignee 기준) | `ranking_view` (assignee_id 기준 — 컬럼명 다름) |

→ 그대로 실행하면 모든 쿼리가 실패함. 새 모델에 맞춰 재작성 필요.

---

## 작업 단계

### Step 1 — `.env` 업데이트
새 프로젝트 대시보드 → **Settings → API** 에서 두 값을 복사해 교체.

```env
VITE_SUPABASE_URL=https://<새프로젝트ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable key>
```

> Vite는 `VITE_` 접두사 환경변수만 클라이언트 번들에 포함시킴.
> `.env`는 `.gitignore`에 등록되어 안전.

### Step 2 — 새 스키마 SQL 작성 후 실행 ⬅ **현재 진행 중**

1. `supabase/schema.sql`을 신규 모델(groups 기반)에 맞춰 재작성
2. Supabase 대시보드 → **SQL Editor → New query** 에 붙여넣고 실행
3. 다음 항목 포함 필수:
   - 테이블: `profiles`, `groups`, `group_members`, `invite_codes`, `missions`, `products`
   - `auth.users` 생성 시 `profiles` 자동 INSERT 트리거
   - `updated_at` 자동 갱신 트리거
   - RLS 정책 (그룹 멤버끼리만 접근 가능)
   - `ranking_view` (미션 완료 수 기준)
   - `ALTER PUBLICATION supabase_realtime ADD TABLE missions;` (Realtime 구독용)

### Step 3 — Google OAuth 설정
대시보드 → **Authentication → Providers → Google** 활성화

- Google Cloud Console에서 OAuth Client ID 발급
- Authorized redirect URIs에 Supabase가 안내하는 콜백 URL 등록
- Supabase Provider 화면에 Client ID/Secret 입력
- Site URL / Redirect URLs:
  - `http://localhost:5173` (개발)
  - 프로덕션 도메인 (배포 후 추가)

### Step 4 — 동작 검증

```bash
npm run dev
```

체크리스트:
- [ ] 콘솔에 `[DEV] Supabase 환경변수 미설정` 경고가 **나오지 않음**
- [ ] Google 로그인 성공 → `profiles` 테이블에 row 자동 생성
- [ ] 새 미션 추가 → Supabase Table Editor에서 row 확인
- [ ] 다른 브라우저/계정에서 미션 변경 → Realtime으로 즉시 반영

---

## 위험 요소 및 주의사항

- **Secret key 절대 `.env`에 넣지 말 것** — Vite는 `VITE_` 변수를 클라이언트 번들에 포함시키므로 노출됨. 클라이언트는 publishable(anon) key만 사용.
- **schema.sql 실행은 비가역** — 빈 새 프로젝트에서만 실행. 기존 데이터가 있는 프로젝트에는 그대로 돌리지 말 것.
- **RLS 정책 누락 주의** — RLS 활성화 후 정책이 없으면 모든 SELECT가 빈 결과 반환. 정책을 빠짐없이 작성.
- **Realtime 활성화 누락 시** `MissionContext`의 실시간 동기화가 작동하지 않음.
