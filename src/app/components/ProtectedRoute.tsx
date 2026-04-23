import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/app/stores";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const location = useLocation();

  // 로딩 중일 때 빈 화면 (깜빡임 방지)
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#492607]">
          로딩중...
        </p>
      </div>
    );
  }

  // 로그인 안 되어 있으면 로그인 페이지로.
  // 단, /invitation?code=XXX 딥링크로 비로그인 상태 진입한 경우 코드를
  // sessionStorage 에 보존해서 로그인 후 LoginScreen 이 자동으로 되돌려 보낸다.
  if (!user) {
    if (location.pathname === "/invitation") {
      const code = new URLSearchParams(location.search).get("code");
      if (code) sessionStorage.setItem("pendingInviteCode", code);
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
