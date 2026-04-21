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
   * 그룹 생성: `create_group_with_owner(name)` RPC 호출.
   * 내부적으로 groups INSERT + group_members INSERT + profiles.group_id UPDATE 를
   * 한 트랜잭션에서 SECURITY DEFINER 로 수행.
   * creatorId 인자는 store 와의 호환을 위해 유지하지만 서버가 auth.uid() 로 덮어씀.
   */
  async create(name: string, _creatorId: string): Promise<Group | null> {
    const { data, error } = await supabase.rpc("create_group_with_owner", {
      p_name: name,
    });
    if (error || !data) {
      console.error("[groupService] create:", error);
      return null;
    }
    const row = data as {
      id: string;
      name: string;
      created_by: string;
      created_at: string;
    };
    return {
      id: row.id,
      name: row.name,
      createdBy: row.created_by,
      createdAt: row.created_at,
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
