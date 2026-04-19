import { create } from "zustand";
import { missionService } from "@/app/services";
import { getColorsForStatus } from "@/app/constants/mission";
import type { Mission, MissionFrequency, MissionStatus } from "@/app/types/mission";

interface MissionAddInput {
  title: string;
  subtitle: string;
  reward: number;
  frequency?: MissionFrequency;
  dueDate?: string;
  iconSrc?: string;
  assigneeId?: string;
}

interface MissionUpdateFields {
  title?: string;
  subtitle?: string;
  reward?: number;
  frequency?: MissionFrequency;
  dueDate?: string;
  iconSrc?: string;
}

interface MissionState {
  missions: Mission[];
  loading: boolean;
  fetch: (userId: string) => Promise<void>;
  add: (userId: string, input: MissionAddInput) => Promise<void>;
  updateStatus: (id: string, status: MissionStatus) => Promise<void>;
  update: (id: string, updates: MissionUpdateFields) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggleEnabled: (id: string, enabled: boolean) => Promise<void>;
  clear: () => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  missions: [],
  loading: false,

  fetch: async (userId) => {
    set({ loading: true });
    const missions = await missionService.fetchByUser(userId);
    set({ missions, loading: false });
  },

  add: async (userId, input) => {
    await missionService.create({
      proposerId: userId,
      accepterId: input.assigneeId ?? userId,
      title: input.title,
      subtitle: input.subtitle,
      reward: input.reward,
      frequency: input.frequency,
      dueDate: input.dueDate ?? null,
      iconSrc: input.iconSrc ?? null,
    });
    await get().fetch(userId);
  },

  updateStatus: async (id, status) => {
    set((state) => ({
      missions: state.missions.map((m) => {
        if (m.id !== id) return m;
        const colors = getColorsForStatus(status);
        return { ...m, status, bgColor: colors.bgColor, barColor: colors.barColor };
      }),
    }));
    await missionService.updateStatus(id, status);
  },

  update: async (id, updates) => {
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    }));
    await missionService.update(id, {
      title: updates.title,
      subtitle: updates.subtitle,
      reward: updates.reward,
      frequency: updates.frequency,
      dueDate: updates.dueDate ?? null,
      iconSrc: updates.iconSrc ?? null,
    });
  },

  remove: async (id) => {
    set((state) => ({ missions: state.missions.filter((m) => m.id !== id) }));
    await missionService.delete(id);
  },

  toggleEnabled: async (id, enabled) => {
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, enabled } : m
      ),
    }));
    await missionService.toggleEnabled(id, enabled);
  },

  clear: () => set({ missions: [] }),
}));

/**
 * missions 테이블 변경 realtime 구독. 변경 시 해당 user의 미션을 재조회.
 * user 변경 시 호출/cleanup.
 */
export function subscribeMissions(userId: string): () => void {
  return missionService.subscribeToChanges(() => {
    useMissionStore.getState().fetch(userId);
  });
}
