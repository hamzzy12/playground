# 2026-04-28 — 반복 미션 시스템 정착

**작업 범위**: `docs/2026-04-21-group-mission.md` 의 반복 미션 의도를 실제 동작 수준까지 끌어올린다. 매주의 요일 / 매월의 주차·요일 스케줄을 DB 에 저장하고 화면 표시 로직에 반영. 또한 "오늘" 1건만 보이는 현재 한계를 풀고 과거 일자 보충 입력을 지원.

**관련 문서**:
- `docs/2026-04-21-group-mission.md` — Phase 1 설계 / 데이터 모델 의도
- `docs/2026-04-23-fix-group-mission-bugs.md` — 버그 픽스 / Phase 1 정리
- `docs/roadmap.md` — Phase 1.x 잔여 과제

---

## 1. 현재 반복 미션 — 코드 사실

### 데이터 모델

```sql
missions.frequency  TEXT  CHECK ('1회' | '매일' | '매주' | '매월')
                          -- 단순 카테고리 enum. 요일/주차 정보 없음.

mission_participants.instance_date  DATE NULL
  -- 1회 미션: NULL
  -- 반복 미션: 해당 일자 (mission_id, user_id, instance_date) UNIQUE
```

### 미션 생성 흐름 (`MissionProposeScreen`)

1회 / 매일 / 매주 / 매월 4개 버튼:
- "매주" 클릭 → `WeekdaySelector` 모달 (월~일 다중 선택)
- "매월" 클릭 → `MonthlySelector` 모달 (첫째주~넷째주 × 요일)

⚠️ **모달에서 선택한 요일/주차는 React state 로만 유지되고 `addMission` 호출 시 무시된다.** 즉 `frequency: '매주'` 만 DB 에 저장되고 어떤 요일인지 정보는 사라진다.

### 화면 표시 (`HomeScreen.resolveInstanceDate`)

```ts
function resolveInstanceDate(mission) {
  return mission.frequency === "1회" ? null : todayISO();
}
```

→ frequency 가 `매일/매주/매월` 모두 동일하게 "오늘 인스턴스" 1건만 카드로 노출.

### 결과적 동작

| frequency | 실제 사용자 경험 |
|---|---|
| 1회 | 한 번 수락 → 완료. 끝. |
| 매일 | 매일 자정 후 새 미참여 카드. ✓ 의도대로 |
| 매주 | **매일과 동일**. 사용자가 선택한 요일 무시. ✗ |
| 매월 | **매일과 동일**. 주차/요일 무시. ✗ |

**→ 매일/매주/매월 사이에 의미적 차이가 사실상 없다.** 카테고리 라벨만 다른 동일 동작.

---

## 2. 의도 vs 현실 갭 (`2026-04-21-group-mission.md` 기준)

| 의도 | 현재 | 갭 |
|---|---|---|
| 일자별 독립 row, on-demand 생성 | ✅ DB 모델은 일자별 row | — |
| 매주/매월 스케줄이 의미 있는 데이터 | ❌ 모달은 있지만 저장 안 됨 | 🔴 큼 |
| 과거 깜박한 날 보충 입력 가능 | ❌ UI 진입점 없음 | 🔴 큼 |
| 최근 5일치 + 더보기 페이지네이션 | ❌ "오늘" 1건만 노출 | 🔴 큼 |

---

## 3. 오늘까지 작업 누적 (현 브랜치 `phase-1-finalize`)

### 직전 머지된 PR (`origin/main`, PR #4 = `4ef252a`)

**`fix-bugs` 브랜치 4 커밋**:
- `0c47a6b` fix(invite-flow): 초대 플로우 재설계
- `0f74f4b` feat(group): 그룹 탈퇴 UI
- `3ab261b` feat(home): 미션 카드 UI 통합 + ⋮ 메뉴 + 탭 순서 교체
- `2ae3db7` feat(home): 기본 미션 서브탭 '내 미션' 으로

### 현 브랜치 (`phase-1-finalize`) 미푸시 2 커밋

- `2de2d18` feat(group-mission): Phase 1 잔여 정리 + 참여 취소/메모 UI
  - BUG-5 데드 코드 (`/mission-in-progress`) 제거
  - BUG-6 참여자 0명 배지 미노출
  - BUG-7 `groupService.create` 미사용 인자 정리
  - 회귀 1: 미션 제안 후 복귀 탭 `'mine'` → `'group'`
  - 회귀 2: 햄버거 "미션제안하기" 제거
  - 참여 취소 UI: 카드 ⋮ 메뉴 ("참여 취소", in_progress 일 때만)
  - 참여자 메모 입력: `MissionCompletePopup` 한 줄 입력란
- `dee599e` chore: `.claude/settings.local.json` 추적 해제

### Phase 1 의 빠진 퍼즐 (오늘 처리 대상)

- 매주/매월 스케줄 저장 + 표시
- 반복 미션 일자별 카드 (최근 5일 + 과거 보충)

---

## 4. 오늘 구현 계획

### Phase A — 매주/매월 스케줄 정착 (먼저 처리)

#### A-1. 데이터 모델 — `missions.schedule JSONB`

```sql
ALTER TABLE missions
  ADD COLUMN schedule JSONB;
```

스키마 (frequency 별 의미):

```ts
type MissionSchedule =
  | null                                    // 1회, 매일
  | { days: number[] }                      // 매주: 0=일 ~ 6=토 (Date.getDay() 호환)
  | { monthly: Record<number, number[]> };  // 매월: { 1: [1,3], 3: [5] } = 첫째주 월·수, 셋째주 금
```

- 정수 (0~6 for day, 1~4 for week) 로 저장 — JS `Date.getDay()` / `getDate()` 와 직접 매핑 가능 (한글 enum 보다 처리 간편)
- 단일 `JSONB` 컬럼이 frequency 별 다른 구조를 유연하게 수용
- 백워드 호환: 기존 row 는 `schedule = NULL` → 매주/매월이라도 "매일과 동일하게 동작" (현 동작 유지)

#### A-2. 타입 + 서비스 + 스토어

`src/app/types/mission.ts`:
```ts
export type MissionSchedule =
  | null
  | { days: number[] }
  | { monthly: Record<number, number[]> };

export interface Mission {
  ...
  schedule: MissionSchedule;
}
```

`missionService`:
- `MissionRow` 에 `schedule: any` 추가
- `rowToMission` 에서 `schedule: row.schedule ?? null`
- `MissionCreateInput` / `update` 에 `schedule?: MissionSchedule`

`missionStore.MissionAddInput`:
- `schedule?: MissionSchedule` 필드 추가

#### A-3. `MissionProposeScreen` — 모달 콜백을 schedule 로 변환

기존 React state (`weeklySelectedDays: DayType[]`, `weeklySchedule: WeeklySchedule`) 를 `addMission` 호출 시 영문/숫자 schedule 로 변환:

```ts
const DAY_TO_NUMBER: Record<DayType, number> = {
  '일': 0, '월': 1, '화': 2, '수': 3, '목': 4, '금': 5, '토': 6,
};
const WEEK_TO_NUMBER: Record<WeekType, number> = {
  '첫째주': 1, '둘째주': 2, '셋째주': 3, '넷째주': 4,
};

function buildSchedule(): MissionSchedule {
  if (selectedFrequency === '매주') {
    return { days: weeklySelectedDays.map(d => DAY_TO_NUMBER[d]).sort() };
  }
  if (selectedFrequency === '매월') {
    const monthly: Record<number, number[]> = {};
    for (const week of selectedWeeks) {
      const days = (weeklySchedule[week] ?? []).map(d => DAY_TO_NUMBER[d]);
      if (days.length > 0) monthly[WEEK_TO_NUMBER[week]] = days.sort();
    }
    return { monthly };
  }
  return null;
}
```

검증:
- 매주인데 요일 미선택 → "요일을 선택해주세요" 알림 후 차단
- 매월인데 schedule 비어있으면 동일 차단

#### A-4. `MissionEditScreen` — schedule 수정 지원

기존 `MissionEditScreen` 은 title/subtitle/reward 만 편집. 반복 스케줄 수정도 동일 화면에서 가능하게 확장.

(이 부분은 우선순위 낮음 — 처음 생성 시점에만 스케줄 잡으면 충분하다고 보고 Phase B 이후로 미뤄도 됨. 결정 필요.)

#### A-5. 화면 표시 — "오늘 활성" 판단

`HomeScreen` (또는 별도 helper):
```ts
function isMissionActiveOn(mission: Mission, date: Date): boolean {
  switch (mission.frequency) {
    case '1회':
    case '매일':
      return true;
    case '매주':
      return mission.schedule?.days?.includes(date.getDay()) ?? false;
    case '매월': {
      const dow = date.getDay();
      const wom = Math.ceil(date.getDate() / 7); // 1~5
      return mission.schedule?.monthly?.[wom]?.includes(dow) ?? false;
    }
  }
}
```

- `groupMissions` / `myMissions` filter 에 `isMissionActiveOn(m, new Date())` 추가
- 비활성 미션은 그룹 미션 탭에 노출 안 됨
- 단, 이미 참여한 row 는 별개 — 본인 참여 row 는 비활성 일자라도 "내 미션" 탭에 보여야 할지? 일단 활성 일자만 노출. (요일 잘못 잡은 미션을 보충 입력하려면 Phase B 의 기록 보기 화면을 통해서.)

### Phase B — 일자별 카드 + 과거 보충 (Phase A 후)

#### 결정 필요 (UX 기획)

옵션:
- **(a) 한 카드 안에 최근 5일치 row 가로/세로 나열** — 카드 높이 증가. 일자별 상태 dot 5개. 클릭 시 해당 일자 액션.
- **(b) 카드는 1장 (오늘만), ⋮ 메뉴에 "기록 보기" 추가** — 별도 풀스크린 또는 모달에서 일자별 row 표시 + 과거 보충 입력. 카드 UI 변화 없음.
- **(c) 카드는 1장 + 카드 하단에 작은 dot 5개 미니 표시** — 일자별 상태만 시각화, 클릭은 (b)의 기록 보기로 이동.

**추천: (b)** — 미션 카드는 "오늘 액션" 에 집중하고, 기록은 별도 모달/화면으로 분리. 카드 UI 변경 최소화 + 향후 확장(통계, 그래프 등) 자연스러움.

#### 구현 계획 (옵션 (b) 가정)

1. `MissionRecordModal` 신규 — `ProductIconSelectModal` / `MissionParticipantsModal` 스타일 재사용
2. 진입점:
   - 미션 카드 ⋮ 메뉴에 "기록 보기" 항목 추가 (반복 미션에만)
   - 또는 카드 자체 클릭 (현재 카드 클릭이 다른 동작 안 함)
3. 모달 내용:
   - 미션 생성일 ~ 오늘 범위 일자 리스트 (활성 일자만)
   - 각 일자별: 본인 참여 row 가 있으면 상태 표시, 없으면 "수행함" 버튼
   - "수행함" 클릭 → 해당 일자에 `participationService.join` 호출 (instance_date = 그 날짜) → 즉시 `completed` 처리하거나 "수락 → 완료" 2단계 선택
4. 페이지네이션:
   - 최근 5일 기본 노출
   - "더 보기" 버튼으로 5일씩 추가 로드 (활성 일자 단위로 카운트)
5. 데이터 로드:
   - 현재 `useMissionStore.participations` 는 그룹의 모든 참여 로드 — 이미 충분
   - 추가 fetch 없이 클라이언트 필터로 처리 가능

---

## 5. 마이그레이션 / Supabase 작업

배포 시 Supabase SQL Editor 에서:
```sql
ALTER TABLE missions ADD COLUMN schedule JSONB;
```

`schema.sql` 에도 동일 컬럼 추가 (스키마 리셋 시 반영). 기존 row 는 NULL — 코드가 NULL 처리하므로 백워드 호환.

RPC 변경 불필요 (RLS / GRANT 동일).

---

## 6. 작업 체크리스트

### Phase A — 매주/매월 스케줄 정착 (먼저) ✅ 완료

- [x] `schema.sql` + Supabase: `missions.schedule JSONB` 추가
- [x] `types/mission.ts`: `MissionSchedule` 타입 + `Mission.schedule` 필드
- [x] `missionService`: `MissionRow.schedule` / `rowToMission` / `MissionCreateInput.schedule` / `update`
- [x] `missionStore.MissionAddInput.schedule`
- [x] `MissionProposeScreen`: 모달 콜백 → schedule 빌드 + `addMission` 전달 (헬퍼 `buildSchedule` 으로 추출)
- [x] **공용 안내 모달 컴포넌트** `AlertModal` — alert 대체
- [x] `MissionProposeScreen`: 매주/매월 + 스케줄 비어있으면 `AlertModal` + 미션 만들기 차단
- [x] `isMissionActiveOn(mission, date)` 헬퍼 (`constants/mission.ts`)
- [x] `HomeScreen` 의 `groupMissions` / `myMissions` 필터에 활성 판단 적용
- [x] 타입 체크 통과 (`npx tsc --noEmit`)
- [ ] 수동 테스트 (브라우저 — 시나리오는 아래 "검증" 절 참고)

### Phase A' — schedule 편집 지원 ✅ 완료

- [x] `MissionEditPopup` 에 frequency + schedule 편집 UI (selector 모달 진입, 초기값 복원, 검증)
- [x] `MissionEditScreen` 에 `initialFrequency` / `initialSchedule` 전달 + `frequency` / `schedule` 도 update
- [x] `HomeScreen` 의 onEdit navigate state 에 `frequency` / `schedule` 추가
- [x] `missionService.update` 의 schedule 처리 (Phase A 에서 이미 추가)
- [x] 스케줄 변경 후 비활성 일자가 된 기존 참여 row 는 보존 (결정 4 의 (a) — `mission_participants` 손대지 않음)
- [x] 매핑 헬퍼 (`buildSchedule` / `parseScheduleToLabels` / `DAY_LABEL_TO_NUMBER` 등) 를 `constants/mission.ts` 로 추출하여 propose / edit 양쪽 재사용
- [ ] 수동 테스트 (브라우저)

### Phase B — 일자별 기록 모달 ✅ 완료

- [x] `MissionRecordModal` 신규 (`MissionParticipantsModal` 스타일 재사용)
- [x] 미션 카드 ⋮ 메뉴에 "기록 보기" 항목 (반복 미션 한정 — `mission.frequency !== '1회'` 일 때만 주입)
- [x] 모달 내용:
  - 활성 일자: 베이지 배경, 본인 참여 row 가 있으면 상태 dot + 라벨 / 없으면 "수행함" 버튼
  - 비활성 일자 + 본인 참여 row 존재 시: 회색 배경 + "(이전 스케줄)" 라벨, 데이터 보존
  - 비활성 일자 + 미참여: 노출 안 함
- [x] 페이지네이션: 최근 5일 기본 + "더 보기 (N일 남음)" 5일씩 추가
- [x] 과거 일자 보충 입력: `participationService.join` 에 `status?` 옵션 추가, `MissionRecordModal` 의 "수행함" 클릭 시 `status='completed'` 로 즉시 INSERT (`completed_at` 자동 설정)
- [x] 타입 체크 통과
- [ ] 수동 테스트 (브라우저 — DB INSERT 시뮬레이션 필요)

### 회귀 검증

- [ ] 1회 미션: 변화 없이 동작
- [ ] 매일 미션: 변화 없이 동작
- [ ] 기존 `schedule=NULL` 인 매주/매월 row: "매일과 동일" 로 fallback (백워드 호환)
- [ ] 참여 취소 / 메모 입력 (이전 커밋) 와 충돌 없음

---

## 7. 결정 사항 (2026-04-28 확정)

1. **Phase B UX 형태** → **(b) 별도 기록 모달 + 페이지네이션**
2. **MissionEditScreen 에 schedule 수정 추가** → **Phase A 후 순차 진행** (오늘 안에 같이 처리)
3. **요일 미선택 매주/매월 처리** → **차단**. 단 alert/redirect 가 아닌 **모달 형태 안내** 로 표시. 페이지/모달은 그대로 머무르며 "미션 만들기" 버튼 클릭만 무효화 + 안내 모달 노출.
4. **활성 외 일자 참여 row** → **(a) 그대로 표시** (회색 등 시각적 구분만, 데이터 보존)

---

## 8. 변경 이력

- 2026-04-28: 최초 작성. Phase A 계획 수립 + 4가지 결정 사항 확정.
- 2026-04-29: Phase A / A' / B 모두 코드 구현 완료 (`npx tsc --noEmit` 통과). 추가 결정사항 — 검증 실패 안내는 `AlertModal` 공용 컴포넌트로 분리 (현재 `MissionProposeScreen`, `MissionEditPopup` 양쪽에서 사용). 매핑 헬퍼는 `constants/mission.ts` 로 통합. 브라우저 수동 검증 진행 중.

---

## 9. 코드 변경 요약 (2026-04-29 완료분)

| 영역 | 파일 | 변경 |
|---|---|---|
| 스키마 | `supabase/schema.sql` | `missions.schedule JSONB` 컬럼 추가 |
| 타입 | `src/app/types/mission.ts` | `MissionSchedule` 유니언 타입 + `Mission.schedule` 필드 |
| 상수/헬퍼 | `src/app/constants/mission.ts` | `DAY_LABEL_TO_NUMBER` 등 매핑, `buildSchedule`, `parseScheduleToLabels`, `isMissionActiveOn` |
| 서비스 | `src/app/services/missionService.ts` | `MissionRow.schedule` / `rowToMission` / `Create/Update Input.schedule` |
| 서비스 | `src/app/services/participationService.ts` | `join` 에 `status?` 옵션 (과거 일자 즉시 completed 가능) |
| 스토어 | `src/app/stores/missionStore.ts` | `MissionAddInput.schedule`, `MissionUpdateFields.schedule`, `JoinInput.status` |
| 컴포넌트 | `src/app/components/AlertModal.tsx` | 신설 (공용 안내 모달) |
| 컴포넌트 | `src/app/components/MissionRecordModal.tsx` | 신설 (일자별 기록 + 페이지네이션 + 과거 보충 입력) |
| 컴포넌트 | `src/app/components/MissionProposeScreen.tsx` | schedule 빌드/검증 + `AlertModal` 적용 |
| 컴포넌트 | `src/app/components/MissionEditPopup.tsx` | frequency + schedule 편집 UI 전체 재작성 (selector 모달 진입, 초기값 복원, 검증) |
| 컴포넌트 | `src/app/components/MissionEditScreen.tsx` | `initialFrequency` / `initialSchedule` 전달 + update 시 schedule 포함 |
| 컴포넌트 | `src/app/components/molecules/MissionCard.tsx` | `onShowRecord?` prop 추가 + ⋮ 메뉴에 "기록 보기" 항목 |
| 컴포넌트 | `src/app/components/HomeScreen.tsx` | `isMissionActiveOn` 필터 적용, navigate state 에 schedule 전달, `MissionRecordModal` 렌더 + `onCompleteForDate` 핸들러 |
