import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "@/app/components/LoginScreen";
import InvitationScreen from "@/app/components/InvitationScreen";
import InvitationSignupScreen from "@/app/components/InvitationSignupScreen";
import HomeScreen from "@/app/components/HomeScreen";
import ParentHomeScreen from "@/app/components/ParentHomeScreen";
import SoloHomeScreen from "@/app/components/SoloHomeScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/invitation" element={<InvitationScreen />} />
        <Route path="/invitation-signup" element={<InvitationSignupScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/parent-home" element={<ParentHomeScreen />} />
        <Route path="/solo-home" element={<SoloHomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
