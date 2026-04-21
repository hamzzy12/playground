import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useGroupStore } from "@/app/stores";
import { inviteCodeService } from "@/app/services";
import type { InviteCode } from "@/app/services";

export default function GroupMembersScreen() {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.user?.id);
  const currentGroup = useGroupStore((s) => s.currentGroup);
  const members = useGroupStore((s) => s.members);

  const [code, setCode] = useState<InviteCode | null>(null);
  const [loadingCode, setLoadingCode] = useState(true);
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  useEffect(() => {
    if (!currentGroup || !userId) return;
    setLoadingCode(true);
    inviteCodeService
      .getOrCreate(currentGroup.id, userId)
      .then((c) => setCode(c))
      .finally(() => setLoadingCode(false));
  }, [currentGroup, userId]);

  const deepLink = code
    ? `${window.location.origin}/invitation-signup?code=${code.code}`
    : "";

  const handleCopy = async (text: string, kind: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  if (!currentGroup) {
    return (
      <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
        <div className="h-[852px] w-[393px] relative flex items-center justify-center">
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white">
            그룹 정보를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
      <div className="h-[852px] w-[393px] relative overflow-y-auto pb-[60px]">
        {/* 상단 */}
        <div className="sticky top-0 z-10 bg-[#6e8f3b] pt-[30px] pb-[16px]">
          <div className="flex items-center justify-between px-[20px]">
            <button
              onClick={() => navigate(-1)}
              className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white"
            >
              ← 뒤로
            </button>
            <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-white">
              {currentGroup.name}
            </p>
            <span className="w-[60px]" />
          </div>
        </div>

        {/* 초대코드 섹션 */}
        <section className="mx-[20px] mt-[20px] p-[20px] rounded-[12px] bg-[#733e14] border-4 border-[#cb721e]">
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white mb-[12px]">
            초대코드
          </p>
          {loadingCode ? (
            <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-white/70">
              코드 불러오는 중...
            </p>
          ) : code ? (
            <>
              <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[32px] text-[#ffe400] tracking-widest mb-[16px]">
                {code.code}
              </p>
              <div className="flex gap-[10px]">
                <button
                  className="flex-1 h-[44px] rounded-[8px] bg-[#ffe400] active:scale-95 transition-transform"
                  onClick={() => handleCopy(code.code, "code")}
                >
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#492607]">
                    {copied === "code" ? "복사됨!" : "코드 복사"}
                  </p>
                </button>
                <button
                  className="flex-1 h-[44px] rounded-[8px] bg-[#ffe400] active:scale-95 transition-transform"
                  onClick={() => handleCopy(deepLink, "link")}
                >
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#492607]">
                    {copied === "link" ? "복사됨!" : "링크 복사"}
                  </p>
                </button>
              </div>
            </>
          ) : (
            <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#ff9b9b]">
              코드 발급에 실패했습니다
            </p>
          )}
        </section>

        {/* 멤버 리스트 */}
        <section className="mx-[20px] mt-[20px]">
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white mb-[12px]">
            멤버 ({members.length}명)
          </p>
          <ul className="space-y-[10px]">
            {members.map((m) => (
              <li
                key={m.userId}
                className="flex items-center gap-[12px] p-[12px] rounded-[10px] bg-[#733e14] border-2 border-[#cb721e]"
              >
                <div
                  className="w-[44px] h-[44px] rounded-[8px] bg-[#007722]"
                  style={m.borderColor ? { border: `3px solid ${m.borderColor}` } : undefined}
                >
                  {m.profileImg && (
                    <img
                      alt=""
                      src={m.profileImg}
                      className="w-full h-full rounded-[8px] object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">
                    {m.name}
                    {m.userId === userId && (
                      <span className="ml-[8px] text-[14px] text-[#ffe400]">(나)</span>
                    )}
                  </p>
                </div>
                <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#ffe400]">
                  💰 {m.coins}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
