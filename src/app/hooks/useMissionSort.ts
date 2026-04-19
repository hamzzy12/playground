import { useState, useEffect, useMemo } from "react";
import type { Mission } from "@/app/types/mission";
import { MISSION_STATUS_PRIORITY } from "@/app/constants/mission";

export const useMissionSort = (missions: Mission[]) => {
  const [missionOrder, setMissionOrder] = useState<string[]>([]);

  const missionIds = useMemo(() => missions.map(m => m.id), [missions]);

  useEffect(() => {
    const hasNewMission = missionIds.some(id => !missionOrder.includes(id));
    if (missionOrder.length === 0 || hasNewMission) {
      const sortedIds = [...missions]
        .sort((a, b) => MISSION_STATUS_PRIORITY[a.status] - MISSION_STATUS_PRIORITY[b.status])
        .map(m => m.id);
      setMissionOrder(sortedIds);
    }
  }, [missions, missionIds, missionOrder]);

  const sortedMissions = useMemo(() => {
    if (missionOrder.length === 0) return missions;
    return [...missions].sort((a, b) => {
      const indexA = missionOrder.indexOf(a.id);
      const indexB = missionOrder.indexOf(b.id);
      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });
  }, [missions, missionOrder]);

  return { sortedMissions, missionOrder, setMissionOrder };
};
