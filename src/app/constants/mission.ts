import type {
  Mission,
  MissionFrequency,
  MissionSchedule,
  ParticipationStatus,
} from "@/app/types/mission";

/**
 * 스케줄 UI(Selector) 의 한글 라벨 ↔ DB 저장용 숫자 변환.
 * 숫자 표현은 JS Date.getDay() 와 호환 (0=일 ~ 6=토). 주차는 1~4 (첫째~넷째).
 * MissionProposeScreen + MissionEditPopup 양쪽에서 재사용.
 */
export type ScheduleDayLabel = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export type ScheduleWeekLabel = '첫째주' | '둘째주' | '셋째주' | '넷째주';

export const DAY_LABEL_TO_NUMBER: Record<ScheduleDayLabel, number> = {
  '일': 0, '월': 1, '화': 2, '수': 3, '목': 4, '금': 5, '토': 6,
};
export const NUMBER_TO_DAY_LABEL: Record<number, ScheduleDayLabel> = {
  0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토',
};
export const WEEK_LABEL_TO_NUMBER: Record<ScheduleWeekLabel, number> = {
  '첫째주': 1, '둘째주': 2, '셋째주': 3, '넷째주': 4,
};
export const NUMBER_TO_WEEK_LABEL: Record<number, ScheduleWeekLabel> = {
  1: '첫째주', 2: '둘째주', 3: '셋째주', 4: '넷째주',
};

/** Selector state 를 DB 저장용 schedule 로 변환 */
export function buildSchedule(
  frequency: MissionFrequency,
  days: ScheduleDayLabel[],
  weeklySchedule: Partial<Record<ScheduleWeekLabel, ScheduleDayLabel[]>>,
): MissionSchedule {
  if (frequency === '매주') {
    return {
      days: days.map((d) => DAY_LABEL_TO_NUMBER[d]).sort((a, b) => a - b),
    };
  }
  if (frequency === '매월') {
    const monthly: Record<number, number[]> = {};
    for (const [weekLabel, dayLabels] of Object.entries(weeklySchedule)) {
      const labels = dayLabels ?? [];
      if (labels.length === 0) continue;
      const weekNum = WEEK_LABEL_TO_NUMBER[weekLabel as ScheduleWeekLabel];
      monthly[weekNum] = labels
        .map((d) => DAY_LABEL_TO_NUMBER[d])
        .sort((a, b) => a - b);
    }
    return { monthly };
  }
  return null;
}

/** DB 의 schedule 을 Selector 입력용 라벨 형태로 변환 */
export function parseScheduleToLabels(schedule: MissionSchedule): {
  days: ScheduleDayLabel[];
  weeklySchedule: Partial<Record<ScheduleWeekLabel, ScheduleDayLabel[]>>;
} {
  if (schedule && 'days' in schedule) {
    return {
      days: schedule.days.map((n) => NUMBER_TO_DAY_LABEL[n]).filter(Boolean),
      weeklySchedule: {},
    };
  }
  if (schedule && 'monthly' in schedule) {
    const weeklySchedule: Partial<Record<ScheduleWeekLabel, ScheduleDayLabel[]>> = {};
    for (const [weekNumStr, dayNums] of Object.entries(schedule.monthly)) {
      const weekLabel = NUMBER_TO_WEEK_LABEL[Number(weekNumStr)];
      if (!weekLabel) continue;
      weeklySchedule[weekLabel] = dayNums
        .map((n) => NUMBER_TO_DAY_LABEL[n])
        .filter(Boolean);
    }
    return { days: [], weeklySchedule };
  }
  return { days: [], weeklySchedule: {} };
}

export const PARTICIPATION_STATUS_COLORS: Record<ParticipationStatus, { bgColor: string; barColor: string }> = {
  in_progress: { bgColor: '#f5eaf8', barColor: '#C07FE5' },
  gave_up: { bgColor: '#f5e8e8', barColor: '#E57F7F' },
  completed: { bgColor: '#e8f6ed', barColor: '#5EE2A0' },
};

/** 본인이 아직 수락 안 한 미션 카드의 기본 톤 */
export const MISSION_DEFAULT_COLORS = { bgColor: '#f2e1be', barColor: '#FEB700' };

export const PARTICIPATION_STATUS_PRIORITY: Record<ParticipationStatus, number> = {
  in_progress: 0,
  gave_up: 1,
  completed: 2,
};

/** 본인 참여가 없으면 기본색, 있으면 상태색 */
export function getColorsForParticipation(
  status: ParticipationStatus | null | undefined,
): { bgColor: string; barColor: string } {
  if (!status) return MISSION_DEFAULT_COLORS;
  return PARTICIPATION_STATUS_COLORS[status];
}

/**
 * 해당 일자에 미션이 "활성" 인지 (= 화면에 노출해야 하는지) 판단.
 * - `1회` / `매일`: 항상 활성
 * - `매주`: schedule.days 가 해당 요일을 포함해야 활성. schedule 이 없으면 매일과 동일하게 fallback
 * - `매월`: schedule.monthly[해당주차] 가 해당 요일을 포함해야 활성. schedule 이 없으면 매일과 동일
 *
 * 주차는 1~5 범위 (Math.ceil(date / 7)). 첫째주~넷째주만 등록 가능하므로 5주차는 매월 미션에선 비활성.
 */
export function isMissionActiveOn(mission: Mission, date: Date): boolean {
  switch (mission.frequency) {
    case '1회':
    case '매일':
      return true;
    case '매주': {
      const sched = mission.schedule;
      if (!sched || !('days' in sched)) return true; // 백워드 호환: 스케줄 없으면 매일 활성
      return sched.days.includes(date.getDay());
    }
    case '매월': {
      const sched = mission.schedule;
      if (!sched || !('monthly' in sched)) return true;
      const weekOfMonth = Math.ceil(date.getDate() / 7);
      return sched.monthly[weekOfMonth]?.includes(date.getDay()) ?? false;
    }
  }
}
