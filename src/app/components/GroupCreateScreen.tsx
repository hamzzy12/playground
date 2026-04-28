import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useGroupStore } from "@/app/stores";

export default function GroupCreateScreen() {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.user?.id);
  const createGroup = useGroupStore((s) => s.create);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("그룹 이름을 입력해주세요");
      return;
    }
    if (!userId) {
      setError("로그인이 필요합니다");
      return;
    }
    setError("");
    setSubmitting(true);
    const group = await createGroup(name.trim());
    setSubmitting(false);
    if (group) {
      navigate("/group-members", { replace: true });
    } else {
      setError("그룹 생성에 실패했습니다. 다시 시도해주세요");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
      <div className="h-[852px] w-[393px] relative overflow-hidden">
        <p className="absolute left-0 top-[140px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[28px] text-white">
          새 그룹 만들기
        </p>

        <div className="absolute left-[20px] top-[280px] w-[353px]">
          <label className="block font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white mb-[12px]">
            그룹 이름
          </label>
          <div className="relative h-[60px]">
            <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="우리 가족"
              maxLength={30}
              className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
            />
          </div>
          {error && (
            <p className="mt-[12px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#ff9b9b]">
              {error}
            </p>
          )}
        </div>

        <button
          className="absolute left-[113px] top-[480px] w-[167px] h-[50px] rounded-[10px] bg-[#ffe400] active:scale-95 transition-transform disabled:opacity-50"
          onClick={handleCreate}
          disabled={submitting}
        >
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
            {submitting ? "생성 중..." : "그룹 만들기"}
          </p>
        </button>

        <button
          className="absolute left-[113px] top-[540px] w-[167px] h-[50px] rounded-[10px] border-2 border-[#d68641] active:scale-95 transition-transform"
          onClick={() => navigate(-1)}
        >
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#d68641]">
            취소
          </p>
        </button>
      </div>
    </div>
  );
}
