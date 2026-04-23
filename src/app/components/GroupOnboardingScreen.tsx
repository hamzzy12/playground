import { useNavigate } from "react-router-dom";
import { useAuthStore, useGroupStore } from "@/app/stores";
import { inviteCodeService } from "@/app/services";
import { useEffect, useState } from "react";

/**
 * 그룹이 없는 사용자의 랜딩 화면.
 * - "새 그룹 만들기" → /group-create
 * - "초대코드로 참여하기" → 인라인 입력 UI 로 전환 → validate 후 /invitation?code=XXX
 * 이미 그룹이 있으면 /home 으로 리다이렉트.
 */
export default function GroupOnboardingScreen() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const currentGroup = useGroupStore((s) => s.currentGroup);
  const loading = useGroupStore((s) => s.loading);

  const [mode, setMode] = useState<"choose" | "enter-code">("choose");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && currentGroup) {
      navigate("/home", { replace: true });
    }
  }, [loading, currentGroup, navigate]);

  const handleSubmitCode = async () => {
    if (!code.trim()) {
      setError("초대코드를 입력해주세요");
      return;
    }
    setSubmitting(true);
    setError("");
    const data = await inviteCodeService.validate(code);
    setSubmitting(false);
    if (!data) {
      setError("유효하지 않은 초대코드입니다");
      return;
    }
    navigate(`/invitation?code=${encodeURIComponent(data.code)}`);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
      <div className="h-[852px] w-[393px] relative overflow-hidden">
        <p className="absolute left-0 top-[120px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[28px] text-white">
          {user ? `${user.user_metadata?.name ?? "사용자"}님,` : ""}
        </p>
        <p className="absolute left-0 top-[160px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-white">
          그룹을 만들거나 참여해주세요
        </p>

        {mode === "choose" ? (
          <>
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
              onClick={() => {
                setError("");
                setMode("enter-code");
              }}
            >
              <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-[#ffe400]">
                초대코드로 참여하기
              </p>
            </button>
          </>
        ) : (
          <>
            <p className="absolute left-0 top-[330px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white">
              받은 초대코드를 입력해주세요
            </p>

            <div className="absolute left-[46px] top-[380px] w-[301px] h-[60px]">
              <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="예: ABCDEFGH"
                maxLength={16}
                className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white placeholder:text-[rgba(255,255,255,0.3)] tracking-widest outline-none"
              />
            </div>

            {error && (
              <p className="absolute left-[46px] top-[450px] w-[301px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#ff9b9b]">
                {error}
              </p>
            )}

            <button
              className="absolute left-[46px] top-[500px] w-[301px] h-[70px] rounded-[12px] bg-[#ffe400] active:scale-95 transition-transform disabled:opacity-50"
              onClick={handleSubmitCode}
              disabled={submitting}
            >
              <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-[#492607]">
                {submitting ? "확인 중..." : "참여하기"}
              </p>
            </button>

            <button
              className="absolute left-[46px] top-[585px] w-[301px] h-[50px] rounded-[10px] border-2 border-[#d68641] active:scale-95 transition-transform"
              onClick={() => {
                setMode("choose");
                setCode("");
                setError("");
              }}
            >
              <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#d68641]">
                뒤로
              </p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
