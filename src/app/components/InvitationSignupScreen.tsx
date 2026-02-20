import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";
import imgImage20 from "figma:asset/03d18b0705eb33c048b11cf3194ca32f0d463be7.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage19 from "figma:asset/f3138f69f4a0667feabf1394df9cea9fc0ed336e.png";
import imgImage18 from "figma:asset/b582ab9ec41e0373445c90f23527c50a90385640.png";
import RelationshipSelectionModal from "@/app/components/RelationshipSelectionModal";
import SignupCompletePopup from "@/app/components/SignupCompletePopup";

function RelationshipButton({ className, onClick, value }: { className?: string; onClick?: () => void; value?: string }) {
  return (
    <div
      className={className || "h-[50px] relative w-[199px] cursor-pointer"}
      data-name="시작버튼"
      onClick={onClick}
    >
      <div className="absolute bg-[#7b3a00] inset-0 rounded-[10px]" />
      <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[#c5afa5] text-[18px]">
        {value || "관계가 어떻게 되요?"}
      </p>
    </div>
  );
}

export default function InvitationSignupScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();
  const [showRelationshipModal, setShowRelationshipModal] = useState(false);
  const [showSignupComplete, setShowSignupComplete] = useState(false);
  const [relationship, setRelationship] = useState("");
  const [name, setName] = useState("");
  const [signupError, setSignupError] = useState("");

  // 초대 정보 (LoginScreen에서 전달)
  const inviteState = location.state as { inviteCode?: string; roleFor?: string } | null;

  const handleSignup = async () => {
    if (!name.trim()) {
      setSignupError("이름을 입력해주세요");
      return;
    }
    if (!relationship) {
      setSignupError("관계를 선택해주세요");
      return;
    }

    setSignupError("");

    // 역할 결정: 초대코드의 role_for 기반 또는 기본 solo
    const role = inviteState?.roleFor === "child" ? "child" as const
      : inviteState?.roleFor === "parent" ? "parent" as const
      : "solo" as const;

    // 프로필 업데이트 (이미 Google 로그인으로 auth.users + profiles 생성됨)
    if (user) {
      await updateProfile({ name: name.trim(), role });

      // 초대코드가 있으면 가족 관계 생성 + 코드 사용 처리
      if (inviteState?.inviteCode) {
        // 초대코드에서 생성자 정보 가져오기
        const { data: codeData } = await supabase
          .from("invite_codes")
          .select("creator_id")
          .eq("code", inviteState.inviteCode)
          .single();

        if (codeData) {
          // 가족 관계 생성
          const familyInsert = role === "child"
            ? { parent_id: codeData.creator_id, child_id: user.id }
            : { parent_id: user.id, child_id: codeData.creator_id };

          const { data: familyData } = await supabase
            .from("families")
            .insert(familyInsert)
            .select()
            .single();

          // 초대코드 사용 처리
          await supabase
            .from("invite_codes")
            .update({ used_by: user.id, family_id: familyData?.id })
            .eq("code", inviteState.inviteCode);
        }
      }
    }

    setShowSignupComplete(true);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#6f8f3b]">
      <div className="bg-[#6f8f3b] h-[852px] relative w-[393px] overflow-hidden" data-name="초대_회원가입">
        <div className="-translate-x-1/2 absolute h-[625px] left-1/2 top-0 w-[357px]" data-name="image 20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[114.08%] left-[-0.07%] max-w-none top-[-14.08%] w-[100.14%]" src={imgImage20} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[78px] left-[calc(50%+0.5px)] top-[215.5px] w-[234px]" data-name="image 14">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>

        {/* Signup Button */}
        <div
          className="absolute h-[50px] left-[91px] top-[493px] w-[205px] cursor-pointer active:scale-95 transition-transform"
          data-name="시작버튼"
          onClick={handleSignup}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[#492607] text-[18px]">신규가입</p>
        </div>

        <RelationshipButton
          className="absolute h-[50px] left-[97px] top-[373px] w-[199px]"
          onClick={() => setShowRelationshipModal(true)}
          value={relationship}
        />

        {/* Name Input */}
        <div className="absolute h-[50px] left-[97px] top-[433px] w-[199px]">
          <div className="absolute bg-[#7b3a00] inset-0 rounded-[10px]" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            className="absolute inset-0 bg-transparent rounded-[10px] px-4 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder-[#c5afa5] text-center outline-none"
          />
        </div>

        <p className="absolute left-0 top-[330px] w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] text-white">미션놀이터에 오신것을 환영해요</p>

        <div className="absolute h-[36px] left-[140px] top-[235px] w-[113px]" data-name="image 19">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage19} />
        </div>
        <div className="absolute h-[142px] left-[127px] top-[57px] w-[147px]" data-name="image 18">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage18} />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/invitation")}
          className="fixed bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-full text-sm z-50 hover:bg-black/70"
        >
          뒤로가기
        </button>

        {showRelationshipModal && (
          <RelationshipSelectionModal
            onClose={() => setShowRelationshipModal(false)}
            onSelect={(val) => setRelationship(val)}
          />
        )}

        {signupError && (
          <div className="absolute bottom-[60px] left-0 w-full flex justify-center z-50">
            <p className="px-4 py-2 bg-red-500/90 rounded-lg text-sm font-bold text-white shadow-sm font-['ONE_Mobile_POP_OTF:Regular',sans-serif]">
              {signupError}
            </p>
          </div>
        )}

        {showSignupComplete && (
          <SignupCompletePopup
            onConfirm={() => {
              const role = inviteState?.roleFor;
              const route = role === "parent" ? "/parent-home" : role === "child" ? "/home" : "/solo-home";
              navigate(route);
            }}
          />
        )}
      </div>
    </div>
  );
}
