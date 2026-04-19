import { supabase } from "@/lib/supabase";
import type {
  Mission,
  MissionStatus,
  MissionFrequency,
} from "@/app/types/mission";
import { getColorsForStatus } from "@/app/constants/mission";

interface MissionRow {
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

function rowToMission(row: MissionRow): Mission {
  const status: MissionStatus = row.status || "active";
  const colors = getColorsForStatus(status);
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? "",
    reward: row.reward,
    bgColor: colors.bgColor,
    barColor: colors.barColor,
    status,
    frequency: row.frequency,
    dueDate: row.due_date ?? undefined,
    iconSrc: row.icon_src ?? undefined,
    enabled: row.enabled ?? true,
    creatorId: row.proposer_id,
    assigneeId: row.accepter_id ?? undefined,
  };
}

export interface MissionCreateInput {
  proposerId: string;
  accepterId?: string;
  title: string;
  subtitle?: string;
  reward?: number;
  frequency?: MissionFrequency;
  dueDate?: string | null;
  iconSrc?: string | null;
}

export interface MissionUpdateInput {
  title?: string;
  subtitle?: string;
  reward?: number;
  frequency?: MissionFrequency;
  dueDate?: string | null;
  iconSrc?: string | null;
}

export const missionService = {
  async fetchByUser(userId: string): Promise<Mission[]> {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .or(`proposer_id.eq.${userId},accepter_id.eq.${userId}`)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[missionService] fetchByUser:", error);
      return [];
    }
    return (data as MissionRow[]).map(rowToMission);
  },

  async create(input: MissionCreateInput): Promise<void> {
    const { error } = await supabase.from("missions").insert({
      proposer_id: input.proposerId,
      accepter_id: input.accepterId ?? input.proposerId,
      title: input.title,
      subtitle: input.subtitle ?? null,
      reward: input.reward ?? 1,
      frequency: input.frequency ?? "1회",
      due_date: input.dueDate ?? null,
      icon_src: input.iconSrc ?? null,
      status: "active",
    });
    if (error) console.error("[missionService] create:", error);
  },

  async updateStatus(id: string, status: MissionStatus): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .update({ status })
      .eq("id", id);
    if (error) console.error("[missionService] updateStatus:", error);
  },

  async update(id: string, updates: MissionUpdateInput): Promise<void> {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.subtitle !== undefined) dbUpdates.subtitle = updates.subtitle;
    if (updates.reward !== undefined) dbUpdates.reward = updates.reward;
    if (updates.frequency !== undefined) dbUpdates.frequency = updates.frequency;
    if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate;
    if (updates.iconSrc !== undefined) dbUpdates.icon_src = updates.iconSrc;
    const { error } = await supabase
      .from("missions")
      .update(dbUpdates)
      .eq("id", id);
    if (error) console.error("[missionService] update:", error);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("missions").delete().eq("id", id);
    if (error) console.error("[missionService] delete:", error);
  },

  async toggleEnabled(id: string, enabled: boolean): Promise<void> {
    const { error } = await supabase
      .from("missions")
      .update({ enabled })
      .eq("id", id);
    if (error) console.error("[missionService] toggleEnabled:", error);
  },

  /**
   * missions 테이블 변경 구독. 변경 발생 시 callback 호출.
   * 반환값은 unsubscribe 함수.
   */
  subscribeToChanges(callback: () => void): () => void {
    const channel = supabase
      .channel("missions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "missions" },
        () => callback()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  },
};
