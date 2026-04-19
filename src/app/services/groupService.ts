import { supabase } from "@/lib/supabase";

export const groupService = {
  async addMember(groupId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("group_members")
      .insert({ group_id: groupId, user_id: userId });
    if (error) console.error("[groupService] addMember:", error);
  },
};
