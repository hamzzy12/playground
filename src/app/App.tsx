import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "@/app/components/LoginScreen";
import InvitationScreen from "@/app/components/InvitationScreen";
import InvitationSignupScreen from "@/app/components/InvitationSignupScreen";
import HomeScreen from "@/app/components/HomeScreen";
import ParentHomeScreen from "@/app/components/ParentHomeScreen";
import SoloHomeScreen from "@/app/components/SoloHomeScreen";
import MissionProposeScreen from "@/app/components/MissionProposeScreen";
import InProgressMissionScreen from "@/app/components/InProgressMissionScreen";
import RankingScreen from "@/app/components/RankingScreen";
import SoloRankingScreen from "@/app/components/SoloRankingScreen";
import ProductRefillPopup from "@/app/components/ProductRefillPopup";
import ProductRewardPopup from "@/app/components/ProductRewardPopup";
import MissionEditPopup from "@/app/components/MissionEditPopup";
import ModeChangePopup from "@/app/components/ModeChangePopup";
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
            {/* 공개 라우트 (로그인 불필요) */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="/invitation" element={<InvitationScreen />} />
            <Route path="/invitation-signup" element={<InvitationSignupScreen />} />

            {/* 인증 필요 라우트 */}
            <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
            <Route path="/parent-home" element={<ProtectedRoute><ParentHomeScreen /></ProtectedRoute>} />
            <Route path="/solo-home" element={<ProtectedRoute><SoloHomeScreen /></ProtectedRoute>} />
            <Route path="/mission-propose" element={<ProtectedRoute><MissionProposeScreen /></ProtectedRoute>} />
            <Route path="/mission-in-progress" element={<ProtectedRoute><InProgressMissionScreen /></ProtectedRoute>} />
            <Route path="/ranking" element={<ProtectedRoute><RankingScreen /></ProtectedRoute>} />
            <Route path="/solo-ranking" element={<ProtectedRoute><SoloRankingScreen /></ProtectedRoute>} />
            <Route path="/product-refill" element={<ProtectedRoute><ProductRefillPopup /></ProtectedRoute>} />
            <Route path="/product-reward" element={<ProtectedRoute><ProductRewardPopup /></ProtectedRoute>} />
            <Route path="/mission-edit" element={<ProtectedRoute><MissionEditPopup initialTitle="" initialDescription="" initialReward={1} /></ProtectedRoute>} />
            <Route path="/growth-report" element={<ProtectedRoute><GrowthReportScreen /></ProtectedRoute>} />
            <Route path="/mode-change" element={<ProtectedRoute><div className="min-h-screen w-full flex justify-center bg-gray-100"><div className="bg-white h-[852px] relative w-[393px] overflow-hidden"><ModeChangePopup onClose={() => window.history.back()} /></div></div></ProtectedRoute>} />
          </Routes>
        </MissionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
