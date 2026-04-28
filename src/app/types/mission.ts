export type ParticipationStatus = 'in_progress' | 'completed' | 'gave_up';

export type MissionFrequency = '1회' | '매일' | '매주' | '매월';

/**
 * 반복 스케줄. frequency 별로 의미가 달라진다.
 * - `1회` / `매일`: null (스케줄 무관)
 * - `매주`: `{ days: number[] }` — 요일 번호 배열 (0=일요일 ~ 6=토요일, JS Date.getDay() 호환)
 * - `매월`: `{ monthly: Record<number, number[]> }` — { 주차(1~4): 요일번호[] }
 *   예: `{ monthly: { 1: [1, 3], 3: [5] } }` = 첫째주 월·수, 셋째주 금
 */
export type MissionSchedule =
  | null
  | { days: number[] }
  | { monthly: Record<number, number[]> };

/**
 * 미션 "템플릿". 그룹에 공개되는 단일 레코드.
 * 참여자/상태는 {@link Participation} 로 분리되어 1:N 관계.
 */
export interface Mission {
  id: string;
  groupId: string | null;
  proposerId: string;
  title: string;
  subtitle: string;
  reward: number;
  frequency: MissionFrequency;
  schedule: MissionSchedule;
  dueDate?: string;
  iconSrc?: string;
  enabled: boolean;
  createdAt: string;
}

/**
 * 참여자 × 인스턴스 단위 row.
 * 반복 미션은 instanceDate 가 해당 일자(YYYY-MM-DD), 1회성은 null.
 */
export interface Participation {
  id: string;
  missionId: string;
  userId: string;
  instanceDate: string | null;
  status: ParticipationStatus;
  note: string | null;
  acceptedAt: string;
  completedAt: string | null;
}

export type ProductStatus = 'available' | 'soldout' | 'shipping' | 'delivered';

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  iconSrc: string | null;
  status: ProductStatus;
}
