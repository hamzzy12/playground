import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

export type MissionStatus = 'active' | 'in_progress' | 'gave_up' | 'challenge_success' | 'completed';

// 미션 상태별 정렬 우선순위 (낮을수록 위에 표시)
export const MISSION_STATUS_PRIORITY: Record<MissionStatus, number> = {
  'active': 1,           // 미진행
  'in_progress': 2,      // 진행중
  'gave_up': 3,          // 포기
  'challenge_success': 4, // 도전성공
  'completed': 5,        // 미션완료
};

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  bgColor: string;
  barColor: string;
  status: MissionStatus;
  frequency?: '1회' | '매일' | '매주' | '매월';
  dueDate?: string;
  iconSrc?: string;
  enabled?: boolean;
  creatorId?: string;
  assigneeId?: string;
}

interface MissionContextType {
  missions: Mission[];
  loading: boolean;
  addMission: (mission: Omit<Mission, 'id' | 'status' | 'bgColor' | 'barColor'>) => Promise<void>;
  updateMissionStatus: (id: string, status: Mission['status']) => Promise<void>;
  updateMission: (id: string, updates: Partial<Pick<Mission, 'title' | 'subtitle' | 'reward' | 'frequency' | 'dueDate' | 'iconSrc'>>) => Promise<void>;
  deleteMission: (id: string) => Promise<void>;
  toggleMissionEnabled: (id: string, enabled: boolean) => Promise<void>;
}

// 상태에 따른 색상 매핑
function getColorsForStatus(status: MissionStatus): { bgColor: string; barColor: string } {
  switch (status) {
    case 'in_progress':
      return { bgColor: '#f5eaf8', barColor: '#C07FE5' };
    case 'gave_up':
      return { bgColor: '#f5e8e8', barColor: '#E57F7F' };
    case 'challenge_success':
      return { bgColor: '#e8f0f6', barColor: '#7FC0E5' };
    case 'completed':
      return { bgColor: '#e8f6ed', barColor: '#5EE2A0' };
    default:
      return { bgColor: '#f2e1be', barColor: '#FEB700' };
  }
}

// DB row → Mission 객체 변환
function dbRowToMission(row: Record<string, unknown>): Mission {
  const status = (row.status as MissionStatus) || 'active';
  const colors = getColorsForStatus(status);
  return {
    id: row.id as string,
    title: row.title as string,
    subtitle: (row.subtitle as string) || '',
    reward: (row.reward as number) || 1,
    bgColor: colors.bgColor,
    barColor: colors.barColor,
    status,
    frequency: row.frequency as Mission['frequency'],
    dueDate: row.due_date as string | undefined,
    iconSrc: row.icon_src as string | undefined,
    enabled: (row.enabled as boolean) ?? true,
    creatorId: row.creator_id as string | undefined,
    assigneeId: row.assignee_id as string | undefined,
  };
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  const isDev = import.meta.env.DEV;

  // Supabase에서 미션 가져오기
  const fetchMissions = useCallback(async () => {
    if (!user) {
      // 개발 환경에서는 로컬 미션 유지
      if (isDev) {
        setLoading(false);
        return;
      }
      setMissions([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .or(`creator_id.eq.${user.id},assignee_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMissions(data.map(dbRowToMission));
    }
    setLoading(false);
  }, [user, isDev]);

  // 유저 변경 시 미션 로드
  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  // Realtime 구독 (부모-자녀 간 실시간 동기화)
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('missions-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'missions' },
        () => {
          fetchMissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchMissions]);

  // 미션 추가
  const addMission = useCallback(async (mission: Omit<Mission, 'id' | 'status' | 'bgColor' | 'barColor'>) => {
    // 개발 환경에서 로그인 없이 로컬 추가
    if (!user && isDev) {
      const colors = getColorsForStatus('active');
      const newMission: Mission = {
        id: crypto.randomUUID(),
        title: mission.title,
        subtitle: mission.subtitle,
        reward: mission.reward,
        bgColor: colors.bgColor,
        barColor: colors.barColor,
        status: 'active',
        frequency: mission.frequency,
        dueDate: mission.dueDate,
        iconSrc: mission.iconSrc,
        enabled: true,
      };
      setMissions(prev => [newMission, ...prev]);
      return;
    }

    if (!user) return;

    await supabase.from("missions").insert({
      creator_id: user.id,
      assignee_id: mission.assigneeId || user.id,
      title: mission.title,
      subtitle: mission.subtitle,
      reward: mission.reward,
      frequency: mission.frequency || '1회',
      due_date: mission.dueDate || null,
      icon_src: mission.iconSrc || null,
      status: 'active',
    });

    await fetchMissions();
  }, [user, isDev, fetchMissions]);

  // 미션 상태 변경 (낙관적 업데이트)
  const updateMissionStatus = useCallback(async (id: string, status: Mission['status']) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        const colors = getColorsForStatus(status);
        return { ...m, status, bgColor: colors.bgColor, barColor: colors.barColor };
      }
      return m;
    }));

    await supabase
      .from("missions")
      .update({ status })
      .eq("id", id);
  }, []);

  // 미션 수정
  const updateMission = useCallback(async (id: string, updates: Partial<Pick<Mission, 'title' | 'subtitle' | 'reward' | 'frequency' | 'dueDate' | 'iconSrc'>>) => {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.subtitle !== undefined) dbUpdates.subtitle = updates.subtitle;
    if (updates.reward !== undefined) dbUpdates.reward = updates.reward;
    if (updates.frequency !== undefined) dbUpdates.frequency = updates.frequency;
    if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate;
    if (updates.iconSrc !== undefined) dbUpdates.icon_src = updates.iconSrc;

    await supabase.from("missions").update(dbUpdates).eq("id", id);
    await fetchMissions();
  }, [fetchMissions]);

  // 미션 삭제
  const deleteMission = useCallback(async (id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
    await supabase.from("missions").delete().eq("id", id);
  }, []);

  // 미션 토글 (활성/비활성)
  const toggleMissionEnabled = useCallback(async (id: string, enabled: boolean) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, enabled } : m));
    await supabase.from("missions").update({ enabled }).eq("id", id);
  }, []);

  return (
    <MissionContext.Provider value={{ missions, loading, addMission, updateMissionStatus, updateMission, deleteMission, toggleMissionEnabled }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
}
