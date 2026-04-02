export type MissionStatus = 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';

export type MissionFrequency = '1회' | '매일' | '매주' | '매월';

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  bgColor: string;
  barColor: string;
  status: MissionStatus;
  frequency?: MissionFrequency;
  dueDate?: string;
  iconSrc?: string;
  enabled?: boolean;
  creatorId?: string;
  assigneeId?: string;
}

export type ProductStatus = 'available' | 'soldout' | 'shipping' | 'delivered';

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  iconSrc: string | null;
  status: ProductStatus;
}
