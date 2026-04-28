import { useLocation, useNavigate } from "react-router-dom";
import { useMissionStore } from "@/app/stores";
import type { MissionFrequency, MissionSchedule } from "@/app/types/mission";
import MissionEditPopup from "./MissionEditPopup";

interface MissionEditState {
  missionId: string;
  title: string;
  description: string;
  reward: number;
  frequency?: MissionFrequency;
  schedule?: MissionSchedule;
}

export default function MissionEditScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const updateMission = useMissionStore((s) => s.update);
  const deleteMission = useMissionStore((s) => s.remove);
  const state = location.state as MissionEditState | null;

  return (
    <MissionEditPopup
      initialTitle={state?.title ?? ""}
      initialDescription={state?.description ?? ""}
      initialReward={state?.reward ?? 1}
      initialFrequency={state?.frequency ?? "1회"}
      initialSchedule={state?.schedule ?? null}
      onClose={() => navigate(-1)}
      onConfirm={async (data) => {
        if (state?.missionId) {
          await updateMission(state.missionId, {
            title: data.title,
            subtitle: data.description,
            reward: data.reward,
            frequency: data.frequency,
            schedule: data.schedule,
          });
        }
        navigate(-1);
      }}
      onDelete={async () => {
        if (state?.missionId) {
          await deleteMission(state.missionId);
        }
        navigate(-1);
      }}
    />
  );
}
