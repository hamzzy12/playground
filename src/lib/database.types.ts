export type MissionStatus = 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';
export type MissionFrequency = '1회' | '매일' | '매주' | '매월';
export type UserRole = 'parent' | 'child' | 'solo';
export type ProductStatus = 'available' | 'soldout' | 'shipping' | 'delivered';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          role: UserRole;
          profile_img: string | null;
          border_color: string | null;
          coins: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          role?: UserRole;
          profile_img?: string | null;
          border_color?: string | null;
          coins?: number;
        };
        Update: {
          name?: string;
          role?: UserRole;
          profile_img?: string | null;
          border_color?: string | null;
          coins?: number;
        };
      };
      families: {
        Row: {
          id: string;
          parent_id: string;
          child_id: string;
          created_at: string;
        };
        Insert: {
          parent_id: string;
          child_id: string;
        };
        Update: {
          parent_id?: string;
          child_id?: string;
        };
      };
      invite_codes: {
        Row: {
          code: string;
          creator_id: string;
          used_by: string | null;
          role_for: 'parent' | 'child';
          family_id: string | null;
          created_at: string;
        };
        Insert: {
          code: string;
          creator_id: string;
          role_for: 'parent' | 'child';
          family_id?: string | null;
        };
        Update: {
          used_by?: string | null;
          family_id?: string | null;
        };
      };
      missions: {
        Row: {
          id: string;
          family_id: string | null;
          creator_id: string;
          assignee_id: string | null;
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
          family_id?: string | null;
          creator_id: string;
          assignee_id?: string | null;
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
        };
      };
      products: {
        Row: {
          id: string;
          family_id: string | null;
          creator_id: string;
          title: string;
          coin_price: number;
          icon_src: string | null;
          status: ProductStatus;
          delivery_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          family_id?: string | null;
          creator_id: string;
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
        };
      };
      cheer_messages: {
        Row: {
          id: string;
          family_id: string;
          sender_id: string;
          message: string;
          created_at: string;
        };
        Insert: {
          family_id: string;
          sender_id: string;
          message: string;
        };
        Update: {
          message?: string;
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
