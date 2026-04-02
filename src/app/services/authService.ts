import { supabase } from "@/lib/supabase";

export const authService = {
  async validateInviteCode(code: string) {
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", code.trim())
      .is("used_by", null)
      .single();

    if (error || !data) return null;
    return data;
  },

  async markInviteCodeUsed(code: string, userId: string) {
    const { error } = await supabase
      .from("invite_codes")
      .update({ used_by: userId })
      .eq("code", code);

    if (error) throw error;
  },
};
