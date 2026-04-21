import type { ParticipationStatus } from "@/app/types/mission";

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
