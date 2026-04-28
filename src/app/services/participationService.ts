import { supabase } from "@/lib/supabase";
import type { Participation, ParticipationStatus } from "@/app/types/mission";

interface ParticipationRow {
  id: string;
  mission_id: string;
  user_id: string;
  instance_date: string | null;
  status: ParticipationStatus;
  note: string | null;
  accepted_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

function rowToParticipation(row: ParticipationRow): Participation {
  return {
    id: row.id,
    missionId: row.mission_id,
    userId: row.user_id,
    instanceDate: row.instance_date,
    status: row.status,
    note: row.note,
    acceptedAt: row.accepted_at,
    completedAt: row.completed_at,
  };
}

export interface ParticipationJoinInput {
  missionId: string;
  userId: string;
  /** 반복 미션의 해당 일자(YYYY-MM-DD). 1회성이면 null */
  instanceDate: string | null;
  note?: string;
  /** 기본 'in_progress'. 과거 일자 보충 입력 등에서 'completed' 로 바로 생성 가능 */
  status?: ParticipationStatus;
}

export const participationService = {
  /** 특정 그룹에 속한 미션들의 참여 row 를 한 번에 로드 */
  async fetchByGroup(groupId: string): Promise<Participation[]> {
    const { data, error } = await supabase
      .from("mission_participants")
      .select("*, missions!inner(group_id)")
      .eq("missions.group_id", groupId);
    if (error) {
      console.error("[participationService] fetchByGroup:", error);
      return [];
    }
    return (data as ParticipationRow[]).map(rowToParticipation);
  },

  /** 사용자가 미션 수락 (row 생성). status='completed' 면 completed_at 도 자동 세팅. */
  async join(input: ParticipationJoinInput): Promise<Participation | null> {
    const status = input.status ?? "in_progress";
    const { data, error } = await supabase
      .from("mission_participants")
      .insert({
        mission_id: input.missionId,
        user_id: input.userId,
        instance_date: input.instanceDate,
        status,
        note: input.note ?? null,
        completed_at: status === "completed" ? new Date().toISOString() : null,
      })
      .select("*")
      .single();
    if (error) {
      console.error("[participationService] join:", error);
      return null;
    }
    return rowToParticipation(data as ParticipationRow);
  },

  async updateStatus(
    id: string,
    status: ParticipationStatus,
    note?: string,
  ): Promise<void> {
    const updates: Record<string, unknown> = { status };
    if (status === "completed") updates.completed_at = new Date().toISOString();
    if (note !== undefined) updates.note = note;
    const { error } = await supabase
      .from("mission_participants")
      .update(updates)
      .eq("id", id);
    if (error) console.error("[participationService] updateStatus:", error);
  },

  async updateNote(id: string, note: string): Promise<void> {
    const { error } = await supabase
      .from("mission_participants")
      .update({ note })
      .eq("id", id);
    if (error) console.error("[participationService] updateNote:", error);
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from("mission_participants")
      .delete()
      .eq("id", id);
    if (error) console.error("[participationService] remove:", error);
  },

  /**
   * 특정 그룹의 참여 변경 구독.
   * Realtime의 postgres_changes filter 는 단일 컬럼만 지원하므로 mission_id 필터를 쓰려면
   * 사전에 미션 id 리스트가 필요. 간단하게 전체 mission_participants 를 구독하고 클라이언트에서 재조회.
   * (RLS가 다른 그룹의 이벤트는 차단함)
   */
  subscribeAll(callback: () => void): () => void {
    const channel = supabase
      .channel("mission-participants-all")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mission_participants" },
        () => callback(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  },
};
