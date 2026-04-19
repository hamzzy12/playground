import { supabase } from "@/lib/supabase";
import type { MissionStatus, MissionFrequency } from "@/app/types/mission";

export interface MissionRow {
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
}

export const missionService = {
  async fetchByUser(userId: string): Promise<MissionRow[]> {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .or(`proposer_id.eq.${userId},accepter_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as MissionRow[]) ?? [];
  },

  async create(mission: {
    proposer_id: string;
    accepter_id?: string;
    title: string;
    subtitle?: string;
    reward?: number;
    frequency?: MissionFrequency;
    due_date?: string | null;
    icon_src?: string | null;
  }): Promise<void> {
    const { error } = await supabase.from("missions").insert({
      ...mission,
      status: 'active' as MissionStatus,
    });
    if (error) throw error;
  },

  async updateStatus(id: string, status: MissionStatus): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .update({ status })
      .eq("id", id);
    if (error) throw error;
  },

  async update(id: string, updates: Record<string, unknown>): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async toggleEnabled(id: string, enabled: boolean): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .update({ enabled })
      .eq("id", id);
    if (error) throw error;
  },
};
