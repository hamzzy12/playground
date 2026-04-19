import { create } from "zustand";
import { profileService, type Profile, type ProfileUpdate } from "@/app/services";

interface ProfileState {
  profile: Profile | null;
  fetch: (userId: string) => Promise<void>;
  update: (userId: string, updates: ProfileUpdate) => Promise<void>;
  clear: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  fetch: async (userId) => {
    const profile = await profileService.fetchById(userId);
    set({ profile });
  },
  update: async (userId, updates) => {
    const profile = await profileService.update(userId, updates);
    if (profile) set({ profile });
  },
  clear: () => set({ profile: null }),
}));
