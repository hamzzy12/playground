import { create } from "zustand";
import { groupService, type Group, type GroupMember } from "@/app/services";
import { supabase } from "@/lib/supabase";

interface GroupState {
  currentGroup: Group | null;
  members: GroupMember[];
  loading: boolean;
  /** profile.group_id 를 기반으로 현재 그룹 + 멤버 로드. group_id 없으면 null 상태. */
  fetchForUser: (userId: string) => Promise<void>;
  /** 새 그룹 생성 후 상태에 반영. 호출자는 로그인된 상태여야 함 (RPC 가 auth.uid() 사용) */
  create: (name: string) => Promise<Group | null>;
  /** 이미 알고 있는 groupId 로 로드 (초대코드 가입 직후 등) */
  setCurrent: (groupId: string) => Promise<void>;
  clear: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  currentGroup: null,
  members: [],
  loading: false,

  fetchForUser: async (userId) => {
    set({ loading: true });
    const { data: profile } = await supabase
      .from("profiles")
      .select("group_id")
      .eq("id", userId)
      .single();
    const groupId = (profile as { group_id: string | null } | null)?.group_id ?? null;
    if (!groupId) {
      set({ currentGroup: null, members: [], loading: false });
      return;
    }
    const [group, members] = await Promise.all([
      groupService.getById(groupId),
      groupService.getMembers(groupId),
    ]);
    set({ currentGroup: group, members, loading: false });
  },

  create: async (name) => {
    const group = await groupService.create(name);
    if (group) {
      const members = await groupService.getMembers(group.id);
      set({ currentGroup: group, members });
    }
    return group;
  },

  setCurrent: async (groupId) => {
    set({ loading: true });
    const [group, members] = await Promise.all([
      groupService.getById(groupId),
      groupService.getMembers(groupId),
    ]);
    set({ currentGroup: group, members, loading: false });
  },

  clear: () => set({ currentGroup: null, members: [], loading: false }),
}));
