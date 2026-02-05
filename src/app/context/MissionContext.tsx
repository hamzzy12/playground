import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  bgColor: string;
  barColor: string;
  status: 'active' | 'in_progress' | 'completed';
  frequency?: '1회' | '매일' | '매주' | '매월';
  dueDate?: string;
}

interface MissionContextType {
  missions: Mission[];
  addMission: (mission: Omit<Mission, 'id' | 'status' | 'bgColor' | 'barColor'>) => void;
  updateMissionStatus: (id: string, status: Mission['status']) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

const initialMissions: Mission[] = [
  {
    id: '1',
    title: '구몬학습지 풀기',
    subtitle: 'p7~p15까지 할 수 있지?',
    reward: 1,
    bgColor: '#f2e1be',
    barColor: '#FEB700',
    status: 'active'
  },
  {
    id: '2',
    title: '태권도 학원 가기',
    subtitle: '학원 갔다오는게 어때?',
    reward: 1,
    bgColor: '#f2e1be',
    barColor: '#FEB700',
    status: 'active'
  },
  {
    id: '3',
    title: '학교 숙제 하기',
    subtitle: '학교 복습 빼먹지마~',
    reward: 1,
    bgColor: '#f2e1be',
    barColor: '#FEB700',
    status: 'active'
  }
];

export function MissionProvider({ children }: { children: ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  const addMission = useCallback((mission: Omit<Mission, 'id' | 'status' | 'bgColor' | 'barColor'>) => {
    const newMission: Mission = {
      ...mission,
      id: Date.now().toString(),
      status: 'active',
      bgColor: '#f2e1be',
      barColor: '#FEB700',
    };
    setMissions(prev => [newMission, ...prev]);
  }, []);

  const updateMissionStatus = useCallback((id: string, status: Mission['status']) => {
    setMissions(prev => prev.map(m =>
      m.id === id ? { ...m, status } : m
    ));
  }, []);

  return (
    <MissionContext.Provider value={{ missions, addMission, updateMissionStatus }}>
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
