import { create } from "zustand";
import { missionService, participationService } from "@/app/services";
import type {
  Mission,
  MissionFrequency,
  Participation,
  ParticipationStatus,
} from "@/app/types/mission";

interface MissionAddInput {
  title: string;
  subtitle: string;
  reward: number;
  frequency?: MissionFrequency;
  dueDate?: string;
  iconSrc?: string;
}

interface MissionUpdateFields {
  title?: string;
  subtitle?: string;
  reward?: number;
  frequency?: MissionFrequency;
  dueDate?: string;
  iconSrc?: string;
}

interface JoinInput {
  missionId: string;
  userId: string;
  /** 반복 미션: 해당 일자(YYYY-MM-DD). 1회성: null */
  instanceDate: string | null;
  note?: string;
}

interface MissionState {
  missions: Mission[];
  participations: Participation[];
  loading: boolean;

  fetchByGroup: (groupId: string) => Promise<void>;

  add: (
    userId: string,
    groupId: string,
    input: MissionAddInput,
  ) => Promise<string | null>;
  update: (id: string, updates: MissionUpdateFields) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggleEnabled: (id: string, enabled: boolean) => Promise<void>;

  join: (input: JoinInput) => Promise<Participation | null>;
  updateParticipation: (
    id: string,
    status: ParticipationStatus,
    note?: string,
  ) => Promise<void>;
  removeParticipation: (id: string) => Promise<void>;

  clear: () => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  missions: [],
  participations: [],
  loading: false,

  fetchByGroup: async (groupId) => {
    set({ loading: true });
    const [missions, participations] = await Promise.all([
      missionService.fetchByGroup(groupId),
      participationService.fetchByGroup(groupId),
    ]);
    set({ missions, participations, loading: false });
  },

  add: async (userId, groupId, input) => {
    const id = await missionService.create({
      proposerId: userId,
      groupId,
      title: input.title,
      subtitle: input.subtitle,
      reward: input.reward,
      frequency: input.frequency,
      dueDate: input.dueDate ?? null,
      iconSrc: input.iconSrc ?? null,
    });
    await get().fetchByGroup(groupId);
    return id;
  },

  update: async (id, updates) => {
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, ...updates } : m,
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
    set((state) => ({
      missions: state.missions.filter((m) => m.id !== id),
      participations: state.participations.filter((p) => p.missionId !== id),
    }));
    await missionService.delete(id);
  },

  toggleEnabled: async (id, enabled) => {
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, enabled } : m,
      ),
    }));
    await missionService.toggleEnabled(id, enabled);
  },

  join: async (input) => {
    const p = await participationService.join(input);
    if (p) set((state) => ({ participations: [...state.participations, p] }));
    return p;
  },

  updateParticipation: async (id, status, note) => {
    set((state) => ({
      participations: state.participations.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              note: note !== undefined ? note : p.note,
              completedAt:
                status === "completed" ? new Date().toISOString() : p.completedAt,
            }
          : p,
      ),
    }));
    await participationService.updateStatus(id, status, note);
  },

  removeParticipation: async (id) => {
    set((state) => ({
      participations: state.participations.filter((p) => p.id !== id),
    }));
    await participationService.remove(id);
  },

  clear: () => set({ missions: [], participations: [], loading: false }),
}));

/**
 * 그룹 단위 Realtime 구독.
 * - missions: group_id 필터
 * - mission_participants: 전체 구독 (RLS가 차단)
 * 변경 시 그룹 전체 재조회 (단순하지만 Phase 1 수준에서 충분)
 */
export function subscribeGroupMissions(groupId: string): () => void {
  const refetch = () => useMissionStore.getState().fetchByGroup(groupId);
  const off1 = missionService.subscribeByGroup(groupId, refetch);
  const off2 = participationService.subscribeAll(refetch);
  return () => {
    off1();
    off2();
  };
}
