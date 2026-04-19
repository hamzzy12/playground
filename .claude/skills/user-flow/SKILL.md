---
name: user-flow
description: 미션놀이터 사용자 플로우. 인증, 그룹 참여, 미션 제안/수락, 상점, 랭킹 등 전체 흐름을 정의. 화면 구현이나 플로우 변경 시 참고.
user-invocable: true
disable-model-invocation: false
---

# 미션놀이터 - 사용자 플로우

그룹 미션 기반 보상 앱의 전체 사용자 플로우 정의.

---

## 1. 인증 및 그룹 참여

### 1-1. 로그인

**컴포넌트**: `src/app/components/LoginScreen.tsx` (라우트: `/`)

- **Google OAuth**: `signInWithGoogle()` → 홈 화면 이동
- **초대코드 입력**: 초대코드 검증 → 그룹 합류 → 회원가입
- **자동 리다이렉트**: 이미 로그인된 유저는 홈으로 자동 이동

### 1-2. 초대 시스템

**초대 플로우**:
1. 기존 멤버가 초대코드 생성
2. 새 멤버가 초대코드 입력 → `/invitation` → `/invitation-signup`
3. 이름 입력 후 가입 완료 → 그룹 자동 합류

**데이터 모델**:
```typescript
// invite_codes 테이블
{
  code: string;        // 초대코드
  creator_id: string;  // 초대한 멤버
  group_id: string;    // 합류할 그룹
  used_by: string;     // 사용한 멤버 (null이면 미사용)
}
```

### 1-3. 인증 시스템 (AuthContext)

**컴포넌트**: `src/app/context/AuthContext.tsx`

Supabase 기반 인증. Google OAuth 로그인, 프로필(이름·포인트) 관리.

```typescript
interface Profile {
  id: string;
  name: string;
  profile_img: string | null;
  border_color: string | null;
  points: number;       // 보상 포인트
  group_id: string;     // 소속 그룹
  created_at: string;
  updated_at: string;
}
```

**제공 기능**:
- `signInWithGoogle()` — Google OAuth 로그인
- `signOut()` — 로그아웃
- `updateProfile(updates)` — 프로필 업데이트
- `refreshProfile()` — 프로필 새로고침

---

## 2. 미션 시스템

### 2-1. 미션 제안/수락 플로우

```
제안자: 미션 생성 (제목, 설명, 보상 포인트 설정)
  ↓
수락자: 미션 목록에서 확인 → 수락
  ↓
수행: 수락자가 미션 진행
  ↓
완료: 미션 완료 → 보상 포인트 지급 (제안자 → 수행자)
```

### 2-2. 미션 데이터 구조

```typescript
type MissionStatus = 'pending' | 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  reward: number;          // 보상 포인트
  status: MissionStatus;
  frequency?: '1회' | '매일' | '매주' | '매월';
  dueDate?: string;
  iconSrc?: string;
  enabled?: boolean;
  proposer_id: string;     // 제안한 멤버
  accepter_id?: string;    // 수락한 멤버
  group_id: string;        // 소속 그룹
}
```

### 2-3. 미션 상태 흐름

```
pending (제안됨, 수락 대기)
  ↓ 수락
active (수락됨, 미진행)
  ↓ 시작
in_progress (진행중)
  ├→ challenge_success (도전 성공) → completed (완료, 포인트 지급)
  └→ gave_up (포기)
```

### 2-4. 미션 상태별 색상

| 상태 | 배경색 | 바 색상 | 의미 |
|------|--------|---------|------|
| `pending` | `#fef3c7` | `#f59e0b` | 수락 대기 (주황) |
| `active` | `#f2e1be` | `#FEB700` | 미진행 (노랑) |
| `in_progress` | `#f5eaf8` | `#C07FE5` | 진행중 (보라) |
| `gave_up` | `#f5e8e8` | `#E57F7F` | 포기 (빨강) |
| `challenge_success` | `#e8f0f6` | `#7FC0E5` | 도전성공 (파랑) |
| `completed` | `#e8f6ed` | `#5EE2A0` | 완료 (초록) |

### 2-5. 미션 관리 (MissionContext)

**컴포넌트**: `src/app/context/MissionContext.tsx`

| 함수 | 설명 |
|------|------|
| `proposeMission()` | 미션 제안 (그룹에 공개) |
| `acceptMission()` | 미션 수락 (수락자 지정) |
| `updateMissionStatus()` | 상태 변경 |
| `updateMission()` | 미션 수정 |
| `deleteMission()` | 미션 삭제 |

### 2-6. 실시간 동기화

Supabase Realtime으로 `missions` 테이블 변경 구독. 그룹 멤버 간 미션 상태가 즉시 동기화된다.

---

## 3. 홈 화면

**컴포넌트**: `src/app/components/HomeScreen.tsx` (라우트: `/home`)

### 3-1. 탭 구조

```
HomeScreen
├── 미션 탭
│   ├── 받은 미션 (다른 멤버가 제안한 미션)
│   │   ├── pending → 수락/거절
│   │   ├── active → 시작하기
│   │   ├── in_progress → 수행 중
│   │   └── completed → 완료 확인
│   ├── 보낸 미션 (내가 제안한 미션)
│   │   └── 상태 확인 + 관리
│   └── 미션 제안하기 → 미션 생성 화면
├── 상점 탭
│   ├── 상품 목록 (그룹 내 등록된 상품)
│   ├── 포인트로 구매
│   └── 상품 등록하기
├── 프로필 (이름, 포인트 잔액)
├── 그룹 관리 (멤버 목록, 초대)
└── 하단 네비게이션
    ├── 미션홈
    ├── 랭킹
    └── 리포트
```

### 3-2. 미션 카드 클릭 핸들러

```typescript
const handleMissionClick = (mission) => {
  switch (mission.status) {
    case 'pending':
      // 수락/거절 선택
      break;
    case 'active':
      updateMissionStatus(mission.id, 'in_progress');
      break;
    case 'in_progress':
      // 미션 수행 화면으로 이동
      navigate('/mission-in-progress', { state: { mission } });
      break;
    case 'challenge_success':
      // 완료 처리 + 포인트 지급
      break;
    case 'completed':
      // 완료 확인
      break;
  }
};
```

---

## 4. 상점 시스템

### 4-1. 상품 데이터 구조

```typescript
interface Product {
  id: string;
  name: string;
  price: number;           // 포인트 가격
  iconSrc: string | null;
  status: 'available' | 'soldout' | 'shipping' | 'delivered';
  seller_id: string;       // 등록한 멤버
  buyer_id?: string;       // 구매한 멤버
  group_id: string;
}
```

### 4-2. 상품 상태 흐름

```
available (판매중)
  ↓ 구매 (포인트 차감)
shipping (배송중/준비중)
  ↓ 전달 완료
delivered (전달 완료)
```

---

## 5. 랭킹

**라우트**: `/ranking`

그룹 내 멤버들의 미션 수행 실적 순위.
- 미션 완료 횟수, 연속 성공 기록 등 기준
- 포디움 (상위 3명) + 전체 목록

---

## 6. 리포트

**라우트**: `/report`

미션 수행 통계 시각화.
- 미션 완료율
- 연속 성공 기록
- 포기 횟수
- 누적 획득 포인트

---

## 전체 플로우 요약

```
진입
├── 로그인 (/)
│   ├── Google OAuth → /home
│   └── 초대코드 입력 → /invitation → /invitation-signup → 그룹 합류 → /home
│
└── 홈 (/home)
    ├── 미션 탭
    │   ├── 받은 미션 (수락/수행/완료)
    │   ├── 보낸 미션 (상태 확인/관리)
    │   └── 미션 제안하기
    ├── 상점 탭
    │   ├── 상품 구매 (포인트 차감)
    │   └── 상품 등록
    ├── 그룹 관리 (멤버 초대)
    ├── 랭킹 (/ranking)
    └── 리포트 (/report)
```

---

## 데이터베이스 (Supabase)

| 테이블 | 용도 |
|--------|------|
| `profiles` | 멤버 프로필 (이름, 포인트, 그룹) |
| `groups` | 그룹 정보 |
| `group_members` | 그룹-멤버 관계 |
| `missions` | 미션 (제안자, 수락자, 상태, 보상) |
| `products` | 상점 상품 |
| `invite_codes` | 초대코드 |
