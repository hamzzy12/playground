import { supabase } from "@/lib/supabase";
import type {
  Mission,
  MissionFrequency,
  MissionSchedule,
} from "@/app/types/mission";

interface MissionRow {
  id: string;
  group_id: string | null;
  proposer_id: string;
  title: string;
  subtitle: string | null;
  reward: number;
  frequency: MissionFrequency;
  schedule: MissionSchedule | null;
  due_date: string | null;
  icon_src: string | null;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

function rowToMission(row: MissionRow): Mission {
  return {
    id: row.id,
    groupId: row.group_id,
    proposerId: row.proposer_id,
    title: row.title,
    subtitle: row.subtitle ?? "",
    reward: row.reward,
    frequency: row.frequency,
    schedule: row.schedule ?? null,
    dueDate: row.due_date ?? undefined,
    iconSrc: row.icon_src ?? undefined,
    enabled: row.enabled ?? true,
    createdAt: row.created_at,
  };
}

export interface MissionCreateInput {
  proposerId: string;
  groupId: string;
  title: string;
  subtitle?: string;
  reward?: number;
  frequency?: MissionFrequency;
  schedule?: MissionSchedule;
  dueDate?: string | null;
  iconSrc?: string | null;
}

export interface MissionUpdateInput {
  title?: string;
  subtitle?: string;
  reward?: number;
  frequency?: MissionFrequency;
  schedule?: MissionSchedule;
  dueDate?: string | null;
  iconSrc?: string | null;
}

export const missionService = {
  /** 그룹의 모든 미션 (그룹 멤버 전원이 보는 공용 보드) */
  async fetchByGroup(groupId: string): Promise<Mission[]> {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[missionService] fetchByGroup:", error);
      return [];
    }
    return (data as MissionRow[]).map(rowToMission);
  },

  /** 내가 제안한 미션만 ("내 미션" 탭에서 사용) */
  async fetchByProposer(userId: string): Promise<Mission[]> {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .eq("proposer_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[missionService] fetchByProposer:", error);
      return [];
    }
    return (data as MissionRow[]).map(rowToMission);
  },

  async create(input: MissionCreateInput): Promise<string | null> {
    const { data, error } = await supabase
      .from("missions")
      .insert({
        proposer_id: input.proposerId,
        group_id: input.groupId,
        title: input.title,
        subtitle: input.subtitle ?? null,
        reward: input.reward ?? 1,
        frequency: input.frequency ?? "1회",
        schedule: input.schedule ?? null,
        due_date: input.dueDate ?? null,
        icon_src: input.iconSrc ?? null,
      })
      .select("id")
      .single();
    if (error) {
      console.error("[missionService] create:", error);
      return null;
    }
    return (data as { id: string }).id;
  },

  async update(id: string, updates: MissionUpdateInput): Promise<void> {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.subtitle !== undefined) dbUpdates.subtitle = updates.subtitle;
    if (updates.reward !== undefined) dbUpdates.reward = updates.reward;
    if (updates.frequency !== undefined) dbUpdates.frequency = updates.frequency;
    if (updates.schedule !== undefined) dbUpdates.schedule = updates.schedule;
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

  /** 특정 그룹의 missions 변경 구독. 이벤트 발생 시 callback 호출 */
  subscribeByGroup(groupId: string, callback: () => void): () => void {
    const channel = supabase
      .channel(`missions:group=${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "missions",
          filter: `group_id=eq.${groupId}`,
        },
        () => callback(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  },
};
