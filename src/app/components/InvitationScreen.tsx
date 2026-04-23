import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore, useGroupStore, useProfileStore } from "@/app/stores";
import { inviteCodeService, groupService } from "@/app/services";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage13 from "figma:asset/a14963193f556e2d9f09861159985994a20f1c33.png";
import imgImage55 from "figma:asset/965fb9e3672f1b431deadafeb12eb3a91fa0e0fb.png";

export default function InvitationScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useProfileStore((s) => s.update);

  const code = searchParams.get("code") ?? "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [memberCount, setMemberCount] = useState(0);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!code) {
      setError("초대코드가 없습니다");
      setLoading(false);
      return;
    }
    (async () => {
      // RLS 상 비멤버는 groups / group_members 를 읽을 수 없으므로 preview_invite RPC 사용
      const data = await inviteCodeService.preview(code);
      if (!data) {
        setError("유효하지 않은 초대코드입니다");
        setLoading(false);
        return;
      }
      setGroupId(data.groupId);
      setGroupName(data.groupName);
      setMemberCount(data.memberCount);
      setLoading(false);
    })();
  }, [code]);

  const handleJoin = async () => {
    if (!user || !groupId) return;
    setJoining(true);
    await groupService.addMember(groupId, user.id);
    await updateProfile(user.id, { group_id: groupId });
    await useGroupStore.getState().setCurrent(groupId);
    setJoining(false);
    navigate("/home", { replace: true });
  };

  const handleDecline = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
      <div className="bg-[#6e8f3b] h-[852px] relative w-[393px] overflow-hidden">
        {/* 배경 (종이/두루마리) */}
        <div className="absolute h-[772px] left-0 top-[80px] w-[393px] z-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[100.09%] left-[-1.08%] max-w-none top-[-0.04%] w-[102.42%]" src={imgImage17} />
          </div>
        </div>

        {/* 헤더 나무 간판 */}
        <div className="-translate-x-1/2 absolute h-[87px] left-[calc(50%+0.5px)] top-[42px] w-[262px] z-20">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <div className="absolute h-[36px] left-[111px] top-[65.5px] w-[172px] z-30">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
        </div>

        {/* 본문 */}
        {loading ? (
          <div className="absolute left-0 right-0 top-[280px] text-center z-20 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[20px]">
            초대 정보를 불러오는 중...
          </div>
        ) : error ? (
          <>
            <div className="absolute left-0 right-0 top-[240px] text-center z-20 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607]">
              <p className="text-[22px] font-bold mb-2">초대를 확인할 수 없어요</p>
              <p className="text-[16px] text-[#8f5a2f]">{error}</p>
            </div>
            <div className="absolute top-[692px] left-[113px] w-[167px] h-[50px] z-30 cursor-pointer" onClick={() => navigate("/", { replace: true })}>
              <div className="absolute inset-0 bg-[#ffe400] rounded-[10px] shadow-md active:scale-95 transition-transform" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[18px] font-bold">로그인으로 돌아가기</p>
            </div>
          </>
        ) : (
          <>
            {/* 그룹명 */}
            <div className="absolute top-[180px] left-0 w-full text-center z-20 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607]">
              <p className="text-[16px] text-[#8f5a2f] mb-2">초대받은 그룹</p>
              <p className="text-[28px] font-bold">{groupName}</p>
            </div>

            {/* 참여 멤버 수 카드 */}
            <div className="absolute left-[32px] top-[310px] w-[325px] h-[92px] z-20">
              <div className="absolute inset-0 bg-[#F2CF99] rounded-[10px]" />
              <div className="absolute left-[10px] top-[10px] w-[70px] h-[70px] flex items-center justify-center">
                <div className="relative w-[50px] h-[50px] bg-[#c17d13] rounded-[10px] flex items-center justify-center border-2 border-[#ffdf95]">
                  <div className="absolute inset-0 border-2 border-[#ffdf95] rounded-[10px] pointer-events-none"></div>
                  <img alt="members" className="w-[43px] h-[43px] object-cover" src={imgImage55} />
                </div>
              </div>
              <div className="absolute left-[95px] top-[20px] right-[15px] text-[#492607] font-['ONE_Mobile_POP_OTF:Regular',sans-serif]">
                <p className="text-[18px] font-bold mb-1">현재 참여 멤버</p>
                <p className="text-[20px]">{memberCount}명</p>
              </div>
            </div>

            {/* 안내 문구 */}
            <div className="absolute top-[430px] left-0 right-0 text-center z-20 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607]">
              <p className="text-[20px]">
                <span className="font-bold">{groupName}</span> 에
              </p>
              <p className="text-[20px]">참여하시겠습니까?</p>
            </div>

            {/* 참여 버튼 */}
            <div
              className={`absolute top-[692px] left-[113px] w-[167px] h-[50px] z-30 cursor-pointer ${joining ? "opacity-50 pointer-events-none" : ""}`}
              onClick={handleJoin}
            >
              <div className="absolute inset-0 bg-[#ffe400] rounded-[10px] shadow-md hover:bg-[#ffed4d] active:scale-95 transition-transform" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[18px] font-bold">
                {joining ? "참여 중..." : "참여하기"}
              </p>
            </div>

            {/* 나중에 버튼 */}
            <div className="absolute top-[752px] left-[113px] w-[167px] h-[50px] z-30 cursor-pointer" onClick={handleDecline}>
              <div className="absolute inset-0 border-3 border-[#d68641] rounded-[10px] hover:bg-[#d68641] hover:bg-opacity-10 active:scale-95 transition-transform" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#d68641] text-[18px] font-bold">나중에</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
