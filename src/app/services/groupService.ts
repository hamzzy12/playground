import { supabase } from "@/lib/supabase";

export interface Group {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
}

export interface GroupMember {
  userId: string;
  name: string;
  profileImg: string | null;
  borderColor: string | null;
  coins: number;
  joinedAt: string;
}

export const groupService = {
  /**
   * 그룹 생성 → 본인을 첫 멤버로 등록 → profiles.group_id 갱신.
   * 실패 시 부분 생성 방지를 위해 순차 실행 후 에러 체크.
   */
  async create(name: string, creatorId: string): Promise<Group | null> {
    const { data: group, error: gErr } = await supabase
      .from("groups")
      .insert({ name, created_by: creatorId })
      .select("*")
      .single();
    if (gErr || !group) {
      console.error("[groupService] create (group):", gErr);
      return null;
    }

    const { error: mErr } = await supabase
      .from("group_members")
      .insert({ group_id: group.id, user_id: creatorId });
    if (mErr) {
      console.error("[groupService] create (member):", mErr);
    }

    const { error: pErr } = await supabase
      .from("profiles")
      .update({ group_id: group.id })
      .eq("id", creatorId);
    if (pErr) {
      console.error("[groupService] create (profile.group_id):", pErr);
    }

    return {
      id: group.id,
      name: group.name,
      createdBy: group.created_by,
      createdAt: group.created_at,
    };
  },

  /** 이미 존재하는 그룹에 가입. profiles.group_id 는 호출자가 별도로 갱신 */
  async addMember(groupId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("group_members")
      .insert({ group_id: groupId, user_id: userId });
    if (error) console.error("[groupService] addMember:", error);
  },

  async getById(groupId: string): Promise<Group | null> {
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("id", groupId)
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      createdBy: data.created_by,
      createdAt: data.created_at,
    };
  },

  /** 그룹 멤버 프로필 리스트 (group_members JOIN profiles) */
  async getMembers(groupId: string): Promise<GroupMember[]> {
    const { data, error } = await supabase
      .from("group_members")
      .select(
        "user_id, joined_at, profiles!inner(name, profile_img, border_color, coins)",
      )
      .eq("group_id", groupId);
    if (error || !data) {
      console.error("[groupService] getMembers:", error);
      return [];
    }
    // supabase-js 는 embedded relation 을 항상 배열로 반환 (1:1 이어도)
    const rows = data as unknown as Array<{
      user_id: string;
      joined_at: string;
      profiles: {
        name: string;
        profile_img: string | null;
        border_color: string | null;
        coins: number;
      } | Array<{
        name: string;
        profile_img: string | null;
        border_color: string | null;
        coins: number;
      }>;
    }>;
    return rows.map((row) => {
      const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
      return {
        userId: row.user_id,
        name: profile?.name ?? "사용자",
        profileImg: profile?.profile_img ?? null,
        borderColor: profile?.border_color ?? null,
        coins: profile?.coins ?? 0,
        joinedAt: row.joined_at,
      };
    });
  },
};
