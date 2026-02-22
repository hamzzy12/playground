import { useLocation, useNavigate } from "react-router-dom";
import { useMissions } from "@/app/context/MissionContext";
import MissionEditPopup from "./MissionEditPopup";

interface MissionEditState {
  missionId: string;
  title: string;
  description: string;
  reward: number;
}

export default function MissionEditScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateMission, deleteMission } = useMissions();
  const state = location.state as MissionEditState | null;

  return (
    <MissionEditPopup
      initialTitle={state?.title ?? ""}
      initialDescription={state?.description ?? ""}
      initialReward={state?.reward ?? 1}
      onClose={() => navigate(-1)}
      onConfirm={async (data) => {
        if (state?.missionId) {
          await updateMission(state.missionId, {
            title: data.title,
            subtitle: data.description,
            reward: data.reward,
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
