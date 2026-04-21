import { useNavigate } from "react-router-dom";
import { useAuthStore, useGroupStore } from "@/app/stores";
import { useEffect } from "react";

/**
 * 그룹이 없는 사용자의 랜딩 화면.
 * - 새 그룹 만들기 → /group-create
 * - 초대코드로 참여 → /invitation
 * 이미 그룹이 있으면 /home 으로 리다이렉트.
 */
export default function GroupOnboardingScreen() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const currentGroup = useGroupStore((s) => s.currentGroup);
  const loading = useGroupStore((s) => s.loading);

  useEffect(() => {
    if (!loading && currentGroup) {
      navigate("/home", { replace: true });
    }
  }, [loading, currentGroup, navigate]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
      <div className="h-[852px] w-[393px] relative overflow-hidden">
        <p className="absolute left-0 top-[120px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[28px] text-white">
          {user ? `${user.user_metadata?.name ?? "사용자"}님,` : ""}
        </p>
        <p className="absolute left-0 top-[160px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-white">
          그룹을 만들거나 참여해주세요
        </p>

        <button
          className="absolute left-[46px] top-[380px] w-[301px] h-[70px] rounded-[12px] bg-[#ffe400] active:scale-95 transition-transform"
          onClick={() => navigate("/group-create")}
        >
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-[#492607]">
            + 새 그룹 만들기
          </p>
        </button>

        <button
          className="absolute left-[46px] top-[470px] w-[301px] h-[70px] rounded-[12px] bg-[#7b3a00] border-2 border-[#ffe400] active:scale-95 transition-transform"
          onClick={() => navigate("/invitation")}
        >
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-[#ffe400]">
            초대코드로 참여하기
          </p>
        </button>
      </div>
    </div>
  );
}
