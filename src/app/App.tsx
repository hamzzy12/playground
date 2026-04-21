import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "@/app/components/LoginScreen";
import InvitationScreen from "@/app/components/InvitationScreen";
import InvitationSignupScreen from "@/app/components/InvitationSignupScreen";
import HomeScreen from "@/app/components/HomeScreen";
import MissionProposeScreen from "@/app/components/MissionProposeScreen";
import InProgressMissionScreen from "@/app/components/InProgressMissionScreen";
import RankingScreen from "@/app/components/RankingScreen";
import MissionEditScreen from "@/app/components/MissionEditScreen";
import GrowthReportScreen from "@/app/components/GrowthReportScreen";
import GroupOnboardingScreen from "@/app/components/GroupOnboardingScreen";
import GroupCreateScreen from "@/app/components/GroupCreateScreen";
import GroupMembersScreen from "@/app/components/GroupMembersScreen";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {
  initAuth,
  useAuthStore,
  useProfileStore,
  useMissionStore,
  useGroupStore,
  subscribeGroupMissions,
} from "@/app/stores";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const userId = useAuthStore((s) => s.user?.id);
  const currentGroupId = useGroupStore((s) => s.currentGroup?.id);

  useEffect(() => {
    return initAuth();
  }, []);

  // 로그인한 사용자의 프로필/그룹 로드
  useEffect(() => {
    if (userId) {
      useProfileStore.getState().fetch(userId);
      useGroupStore.getState().fetchForUser(userId);
    } else {
      useProfileStore.getState().clear();
      useGroupStore.getState().clear();
      useMissionStore.getState().clear();
    }
  }, [userId]);

  // 그룹이 결정되면 미션/참여 로드 + Realtime 구독
  useEffect(() => {
    if (!currentGroupId) {
      useMissionStore.getState().clear();
      return;
    }
    useMissionStore.getState().fetchByGroup(currentGroupId);
    const unsubscribe = subscribeGroupMissions(currentGroupId);
    return unsubscribe;
  }, [currentGroupId]);

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInitializer>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/invitation" element={<InvitationScreen />} />
          <Route path="/invitation-signup" element={<InvitationSignupScreen />} />

          {/* 인증 필요 라우트 */}
          <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          <Route path="/group-onboarding" element={<ProtectedRoute><GroupOnboardingScreen /></ProtectedRoute>} />
          <Route path="/group-create" element={<ProtectedRoute><GroupCreateScreen /></ProtectedRoute>} />
          <Route path="/group-members" element={<ProtectedRoute><GroupMembersScreen /></ProtectedRoute>} />
          <Route path="/mission-propose" element={<ProtectedRoute><MissionProposeScreen /></ProtectedRoute>} />
          <Route path="/mission-in-progress" element={<ProtectedRoute><InProgressMissionScreen /></ProtectedRoute>} />
          <Route path="/ranking" element={<ProtectedRoute><RankingScreen /></ProtectedRoute>} />
          <Route path="/mission-edit" element={<ProtectedRoute><MissionEditScreen /></ProtectedRoute>} />
          <Route path="/growth-report" element={<ProtectedRoute><GrowthReportScreen /></ProtectedRoute>} />
        </Routes>
      </AppInitializer>
    </BrowserRouter>
  );
}
