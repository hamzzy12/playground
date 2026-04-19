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
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {
  initAuth,
  useAuthStore,
  useProfileStore,
  useMissionStore,
  subscribeMissions,
} from "@/app/stores";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const userId = useAuthStore((s) => s.user?.id);

  // 세션 복원 + auth 변경 구독 (1회)
  useEffect(() => {
    return initAuth();
  }, []);

  // user 변경 감지 → profile / missions 동기화
  useEffect(() => {
    if (userId) {
      useProfileStore.getState().fetch(userId);
      useMissionStore.getState().fetch(userId);
      const unsubscribe = subscribeMissions(userId);
      return unsubscribe;
    }
    useProfileStore.getState().clear();
    useMissionStore.getState().clear();
  }, [userId]);

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
