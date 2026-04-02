export type MissionStatus = 'pending' | 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';
export type MissionFrequency = '1회' | '매일' | '매주' | '매월';
export type ProductStatus = 'available' | 'soldout' | 'shipping' | 'delivered';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          profile_img: string | null;
          border_color: string | null;
          coins: number;
          group_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          profile_img?: string | null;
          border_color?: string | null;
          coins?: number;
          group_id?: string | null;
        };
        Update: {
          name?: string;
          profile_img?: string | null;
          border_color?: string | null;
          coins?: number;
          group_id?: string | null;
        };
      };
      groups: {
        Row: {
          id: string;
          name: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          name: string;
          created_by: string;
        };
        Update: {
          name?: string;
        };
      };
      group_members: {
        Row: {
          id: string;
          group_id: string;
          user_id: string;
          joined_at: string;
        };
        Insert: {
          group_id: string;
          user_id: string;
        };
        Update: Record<string, never>;
      };
      invite_codes: {
        Row: {
          code: string;
          creator_id: string;
          group_id: string;
          used_by: string | null;
          created_at: string;
        };
        Insert: {
          code: string;
          creator_id: string;
          group_id: string;
        };
        Update: {
          used_by?: string | null;
        };
      };
      missions: {
        Row: {
          id: string;
          group_id: string | null;
          proposer_id: string;
          accepter_id: string | null;
          title: string;
          subtitle: string | null;
          reward: number;
          status: MissionStatus;
          frequency: MissionFrequency;
          due_date: string | null;
          icon_src: string | null;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          group_id?: string | null;
          proposer_id: string;
          accepter_id?: string | null;
          title: string;
          subtitle?: string | null;
          reward?: number;
          status?: MissionStatus;
          frequency?: MissionFrequency;
          due_date?: string | null;
          icon_src?: string | null;
          enabled?: boolean;
        };
        Update: {
          title?: string;
          subtitle?: string | null;
          reward?: number;
          status?: MissionStatus;
          frequency?: MissionFrequency;
          due_date?: string | null;
          icon_src?: string | null;
          enabled?: boolean;
          accepter_id?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          group_id: string | null;
          seller_id: string;
          buyer_id: string | null;
          title: string;
          coin_price: number;
          icon_src: string | null;
          status: ProductStatus;
          delivery_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          group_id?: string | null;
          seller_id: string;
          title: string;
          coin_price: number;
          icon_src?: string | null;
          status?: ProductStatus;
          delivery_date?: string | null;
        };
        Update: {
          title?: string;
          coin_price?: number;
          icon_src?: string | null;
          status?: ProductStatus;
          delivery_date?: string | null;
          buyer_id?: string | null;
        };
      };
    };
    Views: {
      ranking_view: {
        Row: {
          id: string;
          name: string;
          profile_img: string | null;
          border_color: string | null;
          completed_count: number;
        };
      };
    };
  };
}
