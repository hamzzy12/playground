import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

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

  return <>{children}</>;
}
