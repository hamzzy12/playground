---
name: backend-integration
description: 미션놀이터 백엔드 통합 가이드. Supabase 서비스 레이어 패턴, 에셋 관리(배럴 파일), database.types.ts 관리, Realtime 구독 규칙을 정의. 백엔드 연동 코드 작성 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 백엔드 통합 및 에셋 관리 가이드

Supabase 백엔드 연동, 데이터 타입 관리, 에셋 관리 규칙.

---

## 1. 서비스 레이어 패턴

### 원칙
**컴포넌트에서 Supabase 직접 호출 금지.** 모든 DB 접근은 서비스 레이어를 통한다.

```
컴포넌트 → Context → Service → Supabase
```

### 폴더 구조
```
src/app/services/
├── authService.ts       # 인증, 초대코드 검증
├── missionService.ts    # 미션 CRUD
├── groupService.ts      # 그룹 생성, 멤버 관리
└── productService.ts    # 상품 CRUD
```

### 서비스 파일 작성 규칙

```tsx
// services/missionService.ts
import { supabase } from "@/lib/supabase";
import type { Mission, MissionStatus } from "@/app/types/mission";

export const missionService = {
  async fetchByGroup(groupId: string): Promise<Mission[]> {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map(transformMissionRow);
  },

  async create(mission: Omit<Mission, "id" | "created_at">): Promise<Mission> {
    const { data, error } = await supabase
      .from("missions")
      .insert(mission)
      .select()
      .single();

    if (error) throw error;
    return transformMissionRow(data);
  },

  async updateStatus(id: string, status: MissionStatus): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
```

### 규칙
- 각 서비스는 하나의 도메인 담당
- 반환 타입 명시 (Promise<T>)
- 에러는 throw하고, Context에서 catch
- DB 행(row) → 앱 모델 변환은 서비스 내 `transform` 함수에서 처리
- 서비스는 순수 함수 — React 훅/상태 사용 금지

---

## 2. Context와 서비스의 역할 분리

### Context 역할
- 서비스 호출 + 결과 캐싱
- 낙관적 업데이트 (Optimistic Update)
- Realtime 구독 관리
- 로딩/에러 상태 관리
- 컴포넌트에 데이터 제공

### 서비스 역할
- Supabase 쿼리 실행
- DB 행 ↔ 앱 모델 변환
- 에러 발생 시 throw

```tsx
// context/MissionContext.tsx
import { missionService } from "@/app/services/missionService";

const fetchMissions = async () => {
  try {
    setLoading(true);
    const data = await missionService.fetchByGroup(groupId);
    setMissions(data);
  } catch (error) {
    console.error("Failed to fetch missions:", error);
  } finally {
    setLoading(false);
  }
};
```

---

## 3. Realtime 구독 패턴

### 기본 패턴
```tsx
// Context 내부에서 구독
useEffect(() => {
  const channel = supabase
    .channel("missions-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "missions",
        filter: `group_id=eq.${groupId}`,
      },
      () => fetchMissions()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [groupId]);
```

### 규칙
- 구독은 Context에서만 (컴포넌트에서 직접 구독 금지)
- `filter`로 필요한 데이터만 구독 (그룹 범위)
- cleanup 함수에서 반드시 `removeChannel`
- 변경 감지 시 전체 재조회 (`fetchMissions()`) — 부분 업데이트보다 안전

---

## 4. database.types.ts 관리

### 위치
`src/lib/database.types.ts`

### 역할
- Supabase 테이블 스키마의 TypeScript 표현
- 서비스 레이어에서 직접 참조
- 앱 모델 타입(`src/app/types/`)과 분리

### 구조
```tsx
// lib/database.types.ts — DB 스키마 그대로
export interface Database {
  public: {
    Tables: {
      profiles: { Row: { ... }; Insert: { ... }; Update: { ... } };
      missions: { Row: { ... }; Insert: { ... }; Update: { ... } };
      groups: { Row: { ... }; Insert: { ... }; Update: { ... } };
      // ...
    };
  };
}
```

```tsx
// app/types/mission.ts — 앱에서 사용하는 모델
export interface Mission {
  id: string;
  title: string;
  // ... DB 컬럼과 다를 수 있음 (camelCase, 추가 필드 등)
}
```

### 규칙
- DB 타입은 Supabase CLI로 자동 생성 (`supabase gen types typescript`)
- 수동 수정 최소화 — 스키마 변경 시 재생성
- 앱 모델 타입은 `src/app/types/`에 별도 관리
- 서비스의 `transform` 함수가 DB Row → 앱 모델 변환 담당

---

## 5. 에셋 관리

### 디렉토리 구조
```
src/assets/
├── index.ts             # 배럴 파일 (해시명 → 의미 있는 이름)
├── [hash].png           # Figma에서 내보낸 원본 파일
└── [hash].svg
```

### 배럴 파일 (index.ts)
해시 기반 파일명을 의미 있는 이름으로 매핑:

```tsx
// assets/index.ts
export { default as imgCoin } from "figma:asset/4e34cf3a...png";
export { default as imgMissionComplete } from "figma:asset/7d773474...png";
export { default as imgTabMission } from "figma:asset/917899768...svg";
export { default as imgTabShop } from "figma:asset/5e41aca0...svg";
```

### 컴포넌트에서 사용
```tsx
// Good — 배럴 파일에서 의미 있는 이름으로 import
import { imgCoin, imgMissionComplete } from "@/assets";

// Bad — 해시명 직접 import
import imgImage12 from "figma:asset/7d773474cf8d2e22025ba48c1015d38f36885283.png";
```

### 규칙
- 새 에셋 추가 시 반드시 `assets/index.ts`에 등록
- 이름은 `img` 접두사 + 용도: `imgCoin`, `imgProfileDefault`, `imgMissionBg`
- 사용하지 않는 에셋은 주기적으로 정리
- SVG 경로 파일(`src/imports/svg-*.ts`)도 의미 있는 이름으로 관리

### Vite 설정
```tsx
// vite.config.ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "figma:asset": path.resolve(__dirname, "./src/assets"),
  },
}
```

---

## 6. 환경 변수

### 파일
- `.env` — 로컬 개발용 (git 추적 안 함)
- `.env.example` — 키 목록만 (값 없이)

### 필수 변수
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

### 접근
```tsx
// lib/supabase.ts에서만 환경 변수 접근
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 규칙
- `VITE_` 접두사 필수 (Vite 클라이언트 노출)
- 컴포넌트에서 `import.meta.env` 직접 접근 금지 — `lib/` 또는 `services/`에서만
- 비밀 키는 클라이언트에 노출하지 않음 (anon key만 사용)

---

## 7. 에러 처리 패턴

### 서비스 레이어
```tsx
// 에러를 throw — Context에서 처리
async fetchByGroup(groupId: string): Promise<Mission[]> {
  const { data, error } = await supabase.from("missions").select("*").eq("group_id", groupId);
  if (error) throw error;
  return data.map(transformMissionRow);
}
```

### Context 레이어
```tsx
// try/catch로 처리, 상태 업데이트
const fetchMissions = async () => {
  try {
    const data = await missionService.fetchByGroup(groupId);
    setMissions(data);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch missions:", err);
    setError("미션을 불러올 수 없습니다.");
  }
};
```

### 낙관적 업데이트
```tsx
const updateMissionStatus = async (id: string, status: MissionStatus) => {
  // 1. 즉시 UI 반영
  setMissions(prev => prev.map(m => m.id === id ? { ...m, status } : m));

  try {
    // 2. 서버에 반영
    await missionService.updateStatus(id, status);
  } catch (err) {
    // 3. 실패 시 롤백
    await fetchMissions();
    console.error("Failed to update mission status:", err);
  }
};
```
