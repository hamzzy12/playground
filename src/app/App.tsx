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
import { MissionProvider } from "@/app/context/MissionContext";

export default function App() {
  return (
    <BrowserRouter>
      <MissionProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/invitation" element={<InvitationScreen />} />
          <Route path="/invitation-signup" element={<InvitationSignupScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/parent-home" element={<ParentHomeScreen />} />
          <Route path="/solo-home" element={<SoloHomeScreen />} />
          <Route path="/mission-propose" element={<MissionProposeScreen />} />
          <Route path="/mission-in-progress" element={<InProgressMissionScreen />} />
          <Route path="/ranking" element={<RankingScreen />} />
          <Route path="/solo-ranking" element={<SoloRankingScreen />} />
          <Route path="/product-refill" element={<ProductRefillPopup />} />
          <Route path="/product-reward" element={<ProductRewardPopup />} />
          <Route path="/mission-edit" element={<MissionEditPopup initialTitle="" initialDescription="" initialReward={1} />} />
          <Route path="/mode-change" element={<div className="min-h-screen w-full flex justify-center bg-gray-100"><div className="bg-white h-[852px] relative w-[393px] overflow-hidden"><ModeChangePopup onClose={() => window.history.back()} /></div></div>} />
        </Routes>
      </MissionProvider>
    </BrowserRouter>
  );
}
