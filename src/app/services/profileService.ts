import { supabase } from "@/lib/supabase";
import type { Profile } from "@/app/types/profile";

export type { Profile };

export type ProfileUpdate = Partial<
  Omit<Profile, "id" | "created_at" | "updated_at">
>;

export const profileService = {
  async fetchById(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("[profileService] fetchById:", error);
      return null;
    }
    return data as Profile;
  },

  async update(id: string, updates: ProfileUpdate): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error("[profileService] update:", error);
      return null;
    }
    return data as Profile;
  },
};
