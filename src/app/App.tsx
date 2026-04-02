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
import { AuthProvider } from "@/app/context/AuthContext";
import { MissionProvider } from "@/app/context/MissionContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MissionProvider>
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
        </MissionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
