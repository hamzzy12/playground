import { supabase } from "@/lib/supabase";

export interface InviteCode {
  code: string;
  creator_id: string;
  group_id: string;
  used_by: string | null;
  created_at: string;
}

export const inviteCodeService = {
  async validate(code: string): Promise<InviteCode | null> {
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", code.trim())
      .is("used_by", null)
      .single();
    if (error || !data) return null;
    return data as InviteCode;
  },

  async markUsed(code: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("invite_codes")
      .update({ used_by: userId })
      .eq("code", code);
    if (error) console.error("[inviteCodeService] markUsed:", error);
  },
};
