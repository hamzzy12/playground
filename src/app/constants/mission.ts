import type { MissionStatus } from "@/app/types/mission";

export const MISSION_STATUS_COLORS: Record<MissionStatus, { bgColor: string; barColor: string }> = {
  pending: { bgColor: '#fef3c7', barColor: '#f59e0b' },
  active: { bgColor: '#f2e1be', barColor: '#FEB700' },
  in_progress: { bgColor: '#f5eaf8', barColor: '#C07FE5' },
  gave_up: { bgColor: '#f5e8e8', barColor: '#E57F7F' },
  challenge_success: { bgColor: '#e8f0f6', barColor: '#7FC0E5' },
  completed: { bgColor: '#e8f6ed', barColor: '#5EE2A0' },
};

export const MISSION_STATUS_PRIORITY: Record<MissionStatus, number> = {
  pending: 0,
  active: 1,
  in_progress: 2,
  gave_up: 3,
  challenge_success: 4,
  completed: 5,
};

export function getColorsForStatus(status: MissionStatus): { bgColor: string; barColor: string } {
  return MISSION_STATUS_COLORS[status] ?? MISSION_STATUS_COLORS.active;
}
