# 미션놀이터 백엔드 연동 계획

> 작성일: 2026-02-12
> 기술 스택: Supabase (PostgreSQL + Auth + Realtime) + Vercel (배포)

---

## 현재 상태

미션놀이터는 **React 프론트엔드만** 존재하는 앱입니다.
- 모든 데이터(미션, 상점, 랭킹, 유저)가 하드코딩 또는 React state로만 관리됨
- 새로고침하면 데이터가 초기화됨
- 로그인/회원가입 기능이 UI만 존재하고 실제 인증 없음

## 목표

Supabase를 백엔드로 연동하여:
1. 실제 데이터 저장 (새로고침해도 유지)
2. Google 로그인 인증
3. 부모-자녀 간 실시간 데이터 동기화

---

## 현재 앱 분석

### 사용자 유형 3가지

| 모드 | 라우트 | 설명 |
|------|--------|------|
| 자녀 | `/home` | 미션 수행, 교환상점 사용, 랭킹 확인 |
| 부모 | `/parent-home` | 미션 생성/관리, 교환상점 관리, 응원하기 |
| 솔로 | `/solo-home` | 혼자 미션 생성/수행 (부모+자녀 역할 통합) |

### 핵심 데이터 (현재 프론트에서만 관리)

| 데이터 | 위치 | 설명 |
|--------|------|------|
| 미션 | `src/app/context/MissionContext.tsx` | id, title, subtitle, reward, status |
| 교환상점 상품 | `HomeScreen.tsx` 내 하드코딩 | title, price, status |
| 사용자 | 하드코딩 "김쭈니" | 프로필, 테두리 색상, 코인 |
| 랭킹 | `RankingScreen.tsx` 내 하드코딩 | 1~100위 정적 데이터 |
| 초대코드 | `LoginScreen.tsx` | 입력만 가능, 검증 없음 |

### 전체 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | LoginScreen | 로그인/초대코드 입력 |
| `/invitation` | InvitationScreen | 초대 수락 화면 |
| `/invitation-signup` | InvitationSignupScreen | 초대 회원가입 |
| `/home` | HomeScreen | 자녀 홈화면 |
| `/parent-home` | ParentHomeScreen | 부모 홈화면 |
| `/solo-home` | SoloHomeScreen | 솔로 홈화면 |
| `/mission-propose` | MissionProposeScreen | 미션 제안 |
| `/mission-in-progress` | InProgressMissionScreen | 진행중 미션 |
| `/ranking` | RankingScreen | 랭킹 화면 |
| `/solo-ranking` | SoloRankingScreen | 솔로 랭킹 |
| `/mission-edit` | MissionEditPopup | 미션 수정 |
| `/growth-report` | GrowthReportScreen | 성장보고서 |
| `/mode-change` | ModeChangePopup | 모드 변경 |

### 사용자 플로우 요약

```
[자녀 플로우]
초대코드 입력 → 회원가입 → 홈화면
├── 미션 탭: 미션 목록 확인 → 미션 수행 → 완료 → 코인 획득
├── 소원 상점 탭: 코인으로 상품 교환 → 배송 대기
├── 미션 제안: 부모에게 미션 제안
├── 랭킹: 미션 연속 성공 순위 확인
└── 프로필: 캐릭터/테두리 선택

[부모 플로우]
로그인/초대코드 → 홈화면
├── 미션 탭
│   ├── 미션 목록: 자녀 미션 현황 확인
│   ├── 미션 관리: 미션 생성/수정/삭제/토글
│   └── 응원하기: 응원 메시지 보내기
├── 교환상점 탭: 상품 올리기/수정/품절채우기/보상주기
├── 아이 선택: 관리 대상 자녀 변경
└── 모드 변경: 싱글모드/부모모드 전환

[솔로 플로우]
로그인 → 홈화면
├── 미션: 직접 미션 생성 + 수행
├── 교환상점: 미구현
├── 랭킹: 솔로 랭킹
└── 모드 변경: 부모모드로 전환 가능
```

---

## 수정 대상 파일 목록

| 파일 | 현재 역할 | 변경 내용 |
|------|----------|----------|
| `src/app/context/MissionContext.tsx` | React state로 미션 관리 | Supabase CRUD로 교체 |
| `src/app/components/LoginScreen.tsx` | console.log만 출력 | Supabase Google Auth 연동 |
| `src/app/components/HomeScreen.tsx` | 하드코딩된 상점/코인 | Supabase에서 데이터 fetch |
| `src/app/components/ParentHomeScreen.tsx` | 하드코딩된 아이 목록 | Supabase에서 자녀 관계 fetch |
| `src/app/components/RankingScreen.tsx` | 정적 랭킹 | Supabase에서 동적 랭킹 fetch |
| `src/app/components/InvitationScreen.tsx` | 네비게이션만 | 초대코드 검증 연동 |
| `src/app/components/InvitationSignupScreen.tsx` | UI만 | 실제 회원가입 처리 |
| `src/app/App.tsx` | 라우팅 | AuthProvider + ProtectedRoute 추가 |
| `src/app/components/MissionEditPopup.tsx` | UI만 | Supabase DB 수정/삭제 |
| `src/app/components/MissionProposeScreen.tsx` | UI만 | DB 저장 |
| `src/app/components/ProductCreatePopup.tsx` | UI만 | DB insert |
| `src/app/components/ProductEditPopup.tsx` | UI만 | DB update/delete |
| `src/app/components/ExchangeConfirmPopup.tsx` | UI만 | 코인 차감 + 상태 변경 |
| `src/app/components/ProfileSelectModal.tsx` | 로컬 state | DB 업데이트 |
| `src/app/components/SoloRankingScreen.tsx` | 정적 랭킹 | 동적 랭킹 |
| `src/app/components/SoloHomeScreen.tsx` | 로컬 state | Supabase 연동 |

---

## 구현 단계 (총 6단계)

### 1단계: Supabase 프로젝트 설정 + DB 스키마 생성

**할 일:**
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 anon key 복사
3. 환경 변수 파일 `.env` 생성
4. `@supabase/supabase-js` 패키지 설치
5. Supabase 클라이언트 파일 생성
6. DB 테이블 생성 (Supabase SQL Editor에서 실행)

**새 파일:**
| 파일 | 용도 |
|------|------|
| `src/lib/supabase.ts` | Supabase 클라이언트 초기화 |
| `.env.example` | 환경 변수 템플릿 |
| `supabase/schema.sql` | DB 스키마 (참고용) |

**설치 패키지:**
```bash
npm install @supabase/supabase-js
```

**환경 변수 (.env):**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**DB 테이블 스키마:**

```sql
-- 1. 사용자 프로필
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('parent', 'child', 'solo')) NOT NULL DEFAULT 'solo',
  profile_img TEXT,        -- 프로필 이미지 ID (p1~p4)
  border_color TEXT,       -- 테두리 색상 (#37e59a 등)
  coins INTEGER DEFAULT 0, -- 칭찬코인
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 가족 관계 (부모-자녀 연결)
CREATE TABLE families (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES profiles(id) NOT NULL,
  child_id UUID REFERENCES profiles(id) NOT NULL,
  invite_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 미션
CREATE TABLE missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id),
  creator_id UUID REFERENCES profiles(id) NOT NULL,
  assignee_id UUID REFERENCES profiles(id),  -- NULL이면 솔로모드
  title TEXT NOT NULL,
  subtitle TEXT,
  reward INTEGER DEFAULT 1,
  status TEXT CHECK (status IN ('active','in_progress','gave_up','challenge_success','completed')) DEFAULT 'active',
  frequency TEXT CHECK (frequency IN ('1회','매일','매주','매월')) DEFAULT '1회',
  due_date DATE,
  icon_src TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 교환상점 상품
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id),
  creator_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  coin_price INTEGER NOT NULL,
  icon_src TEXT,
  status TEXT CHECK (status IN ('available','soldout','shipping','delivered')) DEFAULT 'available',
  delivery_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 응원 메시지
CREATE TABLE cheer_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) NOT NULL,
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 초대코드
CREATE TABLE invite_codes (
  code TEXT PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) NOT NULL,
  used_by UUID REFERENCES profiles(id),
  role_for TEXT CHECK (role_for IN ('parent', 'child')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 2단계: 인증 (Google 로그인 + 회원가입)

**사전 준비:**
1. Supabase 대시보드 → Authentication → Providers → Google 활성화
2. [Google Cloud Console](https://console.cloud.google.com) → OAuth 클라이언트 ID 발급
3. Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

**할 일:**
1. AuthContext 생성 (인증 상태 관리)
2. ProtectedRoute 컴포넌트 생성 (인증 가드)
3. LoginScreen에 Google 로그인 연동
4. 회원가입 시 profiles 테이블에 프로필 저장
5. 초대코드 검증 로직 구현
6. App.tsx에 AuthProvider + ProtectedRoute 적용

**새 파일:**
| 파일 | 용도 |
|------|------|
| `src/app/context/AuthContext.tsx` | 인증 상태 관리 (유저, 로딩) |
| `src/app/components/ProtectedRoute.tsx` | 비인증 사용자 리다이렉트 |

**수정 파일:**
| 파일 | 변경 내용 |
|------|----------|
| `LoginScreen.tsx` | `handleGoogleLogin` → Supabase OAuth 호출 |
| `InvitationSignupScreen.tsx` | profiles 테이블에 저장 + families 관계 생성 |
| `App.tsx` | AuthProvider 감싸기 + ProtectedRoute 적용 |

**핵심 코드 (LoginScreen.tsx):**
```tsx
const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({ provider: 'google' });
};
```

**역할별 자동 라우팅:**
```
로그인 성공 → profiles.role 확인
  ├── 'parent' → /parent-home
  ├── 'child'  → /home
  └── 'solo'   → /solo-home
```

---

### 3단계: 미션 CRUD 연동

**할 일:**
1. MissionContext를 Supabase 연동으로 리팩터링
2. 하드코딩된 initialMissions 제거
3. Supabase Realtime 구독으로 실시간 동기화

**수정 파일:**
| 파일 | 변경 내용 |
|------|----------|
| `MissionContext.tsx` | Supabase fetch/insert/update + Realtime |
| `HomeScreen.tsx` | 미션 완료 시 coins 업데이트 |
| `ParentHomeScreen.tsx` | 미션 생성 시 assignee_id 지정 + 응원하기 |
| `MissionEditPopup.tsx` | DB 수정/삭제 |
| `MissionProposeScreen.tsx` | DB 저장 |

**핵심 변경 (MissionContext.tsx):**
```tsx
// Before: 하드코딩
const [missions, setMissions] = useState(initialMissions);

// After: Supabase에서 fetch
useEffect(() => {
  const fetchMissions = async () => {
    const { data } = await supabase
      .from('missions')
      .select('*')
      .or(`creator_id.eq.${userId},assignee_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    setMissions(data ?? []);
  };
  fetchMissions();
}, [userId]);
```

**미션 상태 흐름 (변경 없음):**
```
active → in_progress → completed
                    → gave_up
                    → challenge_success → completed
```

---

### 4단계: 교환상점 연동

**할 일:**
1. ShopContext 생성 (Supabase 연동)
2. 하드코딩된 상점 데이터 제거
3. 코인 차감/증가 로직 DB 연동

**새 파일:**
| 파일 | 용도 |
|------|------|
| `src/app/context/ShopContext.tsx` | 교환상점 상태 관리 |

**수정 파일:**
| 파일 | 변경 내용 |
|------|----------|
| `HomeScreen.tsx` | 상품 목록 fetch + 교환 시 코인 차감 |
| `ParentHomeScreen.tsx` | 상품 올리기/수정/품절채우기/보상주기 |
| `ProductCreatePopup.tsx` | DB insert |
| `ProductEditPopup.tsx` | DB update/delete |
| `ExchangeConfirmPopup.tsx` | 코인 차감 + status 변경 |

**교환상점 상태 흐름 (변경 없음):**
```
available → (자녀가 교환) → shipping → delivered → soldout
                                                → (부모가 채우기) → available
```

---

### 5단계: 랭킹 + 프로필 연동

**할 일:**
1. 정적 랭킹 데이터를 Supabase 쿼리로 교체
2. 프로필 변경이 DB에 저장되도록 수정
3. 부모의 아이 선택 드롭다운을 families 테이블 기반으로 수정

**수정 파일:**
| 파일 | 변경 내용 |
|------|----------|
| `RankingScreen.tsx` | Supabase 랭킹 쿼리 |
| `SoloRankingScreen.tsx` | 동일하게 변경 |
| `ProfileSelectModal.tsx` | profiles 테이블 업데이트 |
| `ParentHomeScreen.tsx` | families 테이블에서 자녀 목록 fetch |

**랭킹 쿼리 (Supabase RPC 또는 View):**
```sql
SELECT p.name, p.profile_img, COUNT(m.id) as score
FROM profiles p
JOIN missions m ON m.assignee_id = p.id OR m.creator_id = p.id
WHERE m.status = 'completed'
GROUP BY p.id, p.name, p.profile_img
ORDER BY score DESC
LIMIT 100;
```

---

### 6단계: Vercel 배포 + 보안 마무리

**할 일:**
1. GitHub 저장소 → Vercel 연결
2. 환경 변수 설정 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
3. Supabase에 Vercel 도메인을 OAuth redirect URL로 추가
4. Row Level Security (RLS) 정책 설정

**RLS 정책:**
```sql
-- 미션: 본인 관련 미션만 조회/수정 가능
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own missions"
  ON missions FOR SELECT
  USING (creator_id = auth.uid() OR assignee_id = auth.uid());

CREATE POLICY "Users can insert own missions"
  ON missions FOR INSERT
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update own missions"
  ON missions FOR UPDATE
  USING (creator_id = auth.uid() OR assignee_id = auth.uid());

-- 프로필: 본인 프로필만 수정 가능
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- 상품: 같은 가족 내에서만 조회 가능
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Family members can view products"
  ON products FOR SELECT
  USING (
    creator_id = auth.uid() OR
    family_id IN (
      SELECT id FROM families
      WHERE parent_id = auth.uid() OR child_id = auth.uid()
    )
  );
```

---

## 작업 순서 다이어그램

```
1단계: Supabase 설정 + DB 스키마
  │    (모든 단계의 기반)
  ▼
2단계: 인증 (Google 로그인)
  │    (로그인이 되어야 나머지 동작)
  ▼
3단계: 미션 CRUD
  │    (앱의 핵심 기능)
  ▼
4단계: 교환상점
  │    (미션 보상과 연결)
  ▼
5단계: 랭킹 + 프로필
  │    (부가 기능)
  ▼
6단계: Vercel 배포 + 보안
       (최종 마무리)
```

---

## 새로 생성할 파일 전체 목록

| 파일 | 용도 |
|------|------|
| `src/lib/supabase.ts` | Supabase 클라이언트 초기화 |
| `src/app/context/AuthContext.tsx` | 인증 상태 관리 |
| `src/app/context/ShopContext.tsx` | 교환상점 상태 관리 |
| `src/app/components/ProtectedRoute.tsx` | 인증 가드 |
| `.env` | 환경 변수 (gitignore에 추가) |
| `.env.example` | 환경 변수 템플릿 |
| `supabase/schema.sql` | DB 스키마 (참고용) |

## 설치 패키지

```bash
npm install @supabase/supabase-js
```
> Supabase 하나만 설치하면 인증, DB, Realtime 모두 사용 가능

---

## 검증 체크리스트

각 단계 완료 후 아래 항목을 확인:

- [ ] `npm run dev` → 로컬 실행 정상
- [ ] `npm run typecheck` → 타입 에러 없음
- [ ] Supabase 대시보드 → 테이블 데이터 확인
- [ ] Google 로그인 → 정상 인증
- [ ] 미션 생성 → 새로고침 후 데이터 유지
- [ ] 부모/자녀 각각 로그인 → 데이터 동기화
- [ ] 교환상점 → 코인 차감/상품 상태 변경
- [ ] 랭킹 → 실제 미션 완료 수 기반 순위
- [ ] Vercel 배포 → 프로덕션 정상 동작
