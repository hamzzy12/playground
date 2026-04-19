---
name: backend-integration
description: 미션놀이터 백엔드 통합 가이드. Supabase 서비스 레이어, Zustand 스토어, database.types.ts, Realtime 구독 규칙을 정의. 백엔드 연동 코드 작성 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 백엔드 통합 가이드

Supabase 백엔드 연동, Zustand 상태 관리, 데이터 타입/에셋 관리 규칙.

---

## 1. 데이터 흐름

```
컴포넌트 → Store(Zustand) → Service → Supabase
              ↑
           Realtime 구독 → Store 갱신
```

- **컴포넌트**: Store hook으로 상태 구독, action 호출
- **Store**: 상태 보관 + Service 호출 + 낙관적 업데이트
- **Service**: Supabase 호출 + DB Row ↔ 앱 모델 변환
- **컴포넌트에서 supabase 직접 호출 금지** (Service만 사용)

---

## 2. Service 레이어

### 폴더 구조 (실제)
```
src/app/services/
├── authService.ts        # supabase.auth.* (세션, OAuth, signOut, onAuthStateChange)
├── profileService.ts     # profiles 테이블
├── missionService.ts     # missions 테이블 + Realtime 헬퍼
├── inviteCodeService.ts  # invite_codes 테이블
├── groupService.ts       # group_members 테이블
└── index.ts              # 배럴 export
```

### 작성 규칙
- 파일 1개 = 테이블 또는 도메인 1개
- 함수는 `Promise<T>` 반환 타입 명시
- 에러는 `console.error`로 로깅 후 `null`/빈 배열/`void` 반환 (호출 측이 분기 처리)
- DB Row → 앱 모델 변환은 같은 파일의 private 함수(`rowToMission` 등)에서 처리
- React 훅/상태 사용 금지 (순수 함수)

```ts
// services/missionService.ts (요약)
import { supabase } from "@/lib/supabase";
import type { Mission } from "@/app/types/mission";

interface MissionRow { /* DB shape */ }
function rowToMission(row: MissionRow): Mission { /* 변환 */ }

export const missionService = {
  async fetchByUser(userId: string): Promise<Mission[]> { ... },
  async create(input: MissionCreateInput): Promise<void> { ... },
  subscribeToChanges(callback: () => void): () => void { ... },
};
```

---

## 3. Zustand 스토어

### 폴더 구조
```
src/app/stores/
├── authStore.ts      # user, session, loading, signInWithGoogle, signOut + initAuth()
├── profileStore.ts   # profile, fetch, update, clear
├── missionStore.ts   # missions, fetch/add/update/remove + subscribeMissions()
└── index.ts          # 배럴 export
```

### 분리 기준
**Supabase API 단위로 분리**.
- `authStore` ↔ `supabase.auth.*`
- `profileStore` ↔ `supabase.from('profiles')`
- `missionStore` ↔ `supabase.from('missions')`

API가 다르면 상태도 분리, 같은 테이블 작업이면 한 스토어로.

### 작성 규칙
- 스토어는 Service 호출만 (Supabase 직접 호출 금지)
- 상태 변경은 `set(...)`로, 다른 store 참조는 `useOtherStore.getState()`
- 낙관적 업데이트(`updateStatus` 등)는 `set` 먼저 → Service 호출
- Realtime/세션 구독은 Hook이 아닌 별도 함수(`initAuth`, `subscribeMissions`)로 노출

```ts
// stores/missionStore.ts (요약)
export const useMissionStore = create<MissionState>((set, get) => ({
  missions: [],
  fetch: async (userId) => {
    const missions = await missionService.fetchByUser(userId);
    set({ missions });
  },
  updateStatus: async (id, status) => {
    set((s) => ({ missions: s.missions.map(...) })); // 낙관적
    await missionService.updateStatus(id, status);
  },
  ...
}));

export function subscribeMissions(userId: string): () => void {
  return missionService.subscribeToChanges(() => {
    useMissionStore.getState().fetch(userId);
  });
}
```

### 컴포넌트 사용
```tsx
// selector 형태로 필요한 부분만 구독 → 불필요한 리렌더 방지
const user = useAuthStore((s) => s.user);
const profile = useProfileStore((s) => s.profile);
const missions = useMissionStore((s) => s.missions);
```

---

## 4. 초기화 / 생애주기

`App.tsx`의 `AppInitializer` 컴포넌트가 담당:

```tsx
function AppInitializer({ children }) {
  const userId = useAuthStore((s) => s.user?.id);

  // 1. 세션 복원 + auth 변경 구독 (앱 1회)
  useEffect(() => initAuth(), []);

  // 2. user 변경 시 profile / missions fetch + Realtime 구독
  useEffect(() => {
    if (userId) {
      useProfileStore.getState().fetch(userId);
      useMissionStore.getState().fetch(userId);
      return subscribeMissions(userId);
    }
    useProfileStore.getState().clear();
    useMissionStore.getState().clear();
  }, [userId]);

  return children;
}
```

원칙: **세션은 즉시 확정(loading=false), profile/missions는 비동기 로드.** 프로필 조회 지연/실패가 앱 진입을 막지 않음.

---

## 5. Realtime 구독

### 현재 구현
- `missions` 테이블 전체 구독 (필터 없음)
- 변경 발생 시 `useMissionStore.fetch(userId)`로 전체 재조회
- RLS 정책이 그룹 외 row를 차단 (데이터 누출 없음)

### 미구현 / 개선 목표
- 그룹 단위 필터링: `filter: group_id=eq.${myGroupId}`로 좁히기
- 부분 업데이트(insert/update/delete payload 활용)로 fetch 줄이기

### 규칙
- 구독은 Service의 `subscribeToChanges` 헬퍼만 사용
- `App.tsx` 초기화 외에서 직접 `supabase.channel()` 호출 금지
- cleanup(`unsubscribe`)은 반드시 반환

---

## 6. database.types.ts

### 위치
`src/lib/database.types.ts`

### 역할
- DB 스키마의 TypeScript 표현 (Service에서 참조)
- 앱 모델(`src/app/types/`)과 분리

### 규칙
- DB 컬럼은 `snake_case`, 앱 모델은 `camelCase`로 매핑
- 매핑은 Service의 `rowToXxx` 함수에서 수행
- 스키마 변경 시 `supabase/schema.sql`도 같이 갱신

### 컬럼 ↔ 앱 모델 명명 차이 (예시)
| DB 컬럼 | 앱 모델 필드 | 비고 |
|---|---|---|
| `coins` | `coins` | "포인트"는 UI 표시 용어, DB/모델은 `coins`로 통일 |
| `proposer_id` / `accepter_id` | `creatorId` / `assigneeId` | Mission 모델 호환성 |
| `seller_id` / `buyer_id` | (사용 시 매핑) | products |

---

## 7. Supabase 보조 함수

스키마(`supabase/schema.sql`)에 정의된 RLS 보조 함수:

- `is_group_member(group_id UUID) RETURNS BOOLEAN` (`SECURITY DEFINER`)
  - `group_members` 정책이 자기 자신을 참조할 때 발생하는 RLS 무한재귀를 방지
  - 새 RLS 정책 작성 시 `EXISTS (SELECT 1 FROM group_members ...)` 대신 `public.is_group_member(group_id)` 사용

### 뷰
- `ranking_view`: profiles + 완료된 missions 집계 (랭킹용)
  - 컬럼: `id`, `name`, `profile_img`, `border_color`, `completed_count`

---

## 8. 환경 변수

### 파일
- `.env` — 로컬 (gitignore)
- `.env.example` — 키 목록 템플릿

### 필수 변수
```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable key>  # sb_publishable_...
```

### 규칙
- `VITE_` 접두사 필수 (Vite가 클라이언트 번들에 포함)
- **Secret key 사용 금지** — 브라우저에 노출되면 RLS 우회 가능
- `lib/supabase.ts`에서만 `import.meta.env` 접근

---

## 9. 에셋 관리

### 디렉토리
```
src/assets/
├── [hash].png|svg    # Figma export 원본
└── (배럴 파일은 아직 미도입)
```

### 컴포넌트 import (현재)
```tsx
import imgCoin from "figma:asset/4e34cf3a...png";
```

### 개선 목표 (미도입)
의미 있는 이름으로 매핑하는 `src/assets/index.ts` 배럴 파일.

```tsx
// 목표
import { imgCoin, imgMissionComplete } from "@/assets";
```

### Vite 별칭 (`vite.config.ts`)
- `@/` → `src/`
- `figma:asset/` → `src/assets/`
