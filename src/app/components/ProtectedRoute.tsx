import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  // 개발 환경에서는 인증 우회 (테스트 버튼용)
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

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

  // 로그인 안 되어 있으면 로그인 페이지로
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 역할 제한이 있고, 현재 유저 역할이 허용 목록에 없으면 홈으로
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    const homeRoute =
      profile.role === "parent" ? "/parent-home" :
      profile.role === "child" ? "/home" :
      "/solo-home";
    return <Navigate to={homeRoute} replace />;
  }

  return <>{children}</>;
}
