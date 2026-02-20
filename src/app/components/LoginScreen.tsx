import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";
import imgImage12 from "figma:asset/7d773474cf8d2e22025ba48c1015d38f36885283.png";
import imgImage11 from "figma:asset/39fca110c4e2513bc4a56a1e748ae427b6bc63b0.png";
import imgImage8 from "figma:asset/f96f017455e91698c320ac65818a05031a68a0b9.png";
import imgImage9 from "figma:asset/1233848ef9026b822f92716019cd075d54555c05.png";
import imgImage10 from "figma:asset/723997adc95222b4bb79be32c45165af7eb1ccb9.png";
import img27 from "figma:asset/396288bbb892b2e7b251be93e0ebadaa2a537a23.png";
import img31 from "figma:asset/1744f30806d6576c526e23621530bb67cc9aae56.png";
import img11 from "figma:asset/090d51aa33f49cc631bc92b3dd3fcf328050d0bb.png";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { user, profile, signInWithGoogle, loading } = useAuth();
  const [inviteCode, setInviteCode] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이미 로그인된 유저는 역할에 따라 자동 이동
  useEffect(() => {
    if (!loading && user && profile) {
      const route =
        profile.role === "parent" ? "/parent-home" :
        profile.role === "child" ? "/home" :
        "/solo-home";
      navigate(route, { replace: true });
    }
  }, [user, profile, loading, navigate]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleInviteSubmit = async () => {
    if (!inviteCode.trim()) {
      setInviteError("초대코드를 입력해주세요");
      return;
    }

    setIsSubmitting(true);
    setInviteError("");

    // 초대코드 검증
    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", inviteCode.trim())
      .is("used_by", null)
      .single();

    if (error || !data) {
      setInviteError("유효하지 않은 초대코드입니다");
      setIsSubmitting(false);
      return;
    }

    // 초대코드가 유효하면 초대 화면으로 이동
    navigate("/invitation", { state: { inviteCode: data.code, roleFor: data.role_for } });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
      <div
        className="relative w-full max-w-[393px] h-[852px] overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(179.91deg, rgb(146, 209, 226) 0%, rgb(238, 255, 191) 37.392%)"
        }}
      >
        {/* Hill Image */}
        <div className="absolute h-[555px] left-[-2px] top-[297px] w-[400px]" data-name="image 12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[113.15%] left-[-0.1%] max-w-none top-0 w-[100.2%] object-cover" src={imgImage12} />
          </div>
        </div>

        {/* Content Container - Centered horizontally, positioned absolutely */}
        <div className="-translate-x-1/2 absolute left-1/2 top-[460px]">
          {/* Text: Already joined? */}
          <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+1px)] not-italic text-[20px] text-center text-white top-0 font-bold drop-shadow-md z-30 w-[393px]">
            이미 가입하셨나요?
          </p>

          {/* Text: Got an invite? */}
          <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+0.5px)] not-italic text-[20px] text-center text-white top-[121px] font-bold drop-shadow-md z-30 w-[393px]">
            초대 받으셨나요?
          </p>

          {/* Google Login Button */}
          <div className="-translate-x-1/2 absolute h-[50px] left-1/2 top-[37px] w-[209px] z-30">
            <button
              onClick={handleGoogleLogin}
              className="absolute inset-0 group"
            >
              <div className="absolute bg-white border border-[#713925] border-solid inset-0 rounded-[10px] group-active:scale-95 transition-transform shadow-sm" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[#221e1e] text-[18px] text-center font-bold pl-[26px]">
                Google로그인
              </p>
              <div className="absolute left-[30px] size-[26px] top-[12px]" data-name="image 11">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
              </div>
            </button>
          </div>

          {/* Invite Code Input */}
          <div className="-translate-x-1/2 absolute h-[50px] left-1/2 top-[163px] w-[207px] z-30">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="초대코드"
              className="w-full h-full bg-[rgba(255,255,255,0.3)] border border-[#d1d1d1] border-solid rounded-[10px] px-[12px] text-left text-white placeholder-[rgba(255,255,255,0.7)] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] leading-[1.5] focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Invite Submit Button */}
          <div className="-translate-x-1/2 absolute h-[50px] left-1/2 top-[225px] w-[209px] z-30">
            <button
              onClick={handleInviteSubmit}
              className="absolute inset-0 group"
            >
              <div className="absolute bg-[#14a5d4] inset-0 rounded-[10px] group-hover:bg-[#118bb3] group-active:scale-95 transition-transform shadow-md" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] text-center text-white font-bold">
                초대받고 들어가기
              </p>
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="absolute h-[201px] left-[72px] top-[48px] w-[240px] z-10" data-name="image 8">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
        </div>

        {/* Balloons */}
        <div className="absolute h-[102px] left-[10px] top-[155px] w-[48px]" data-name="image 9">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
        </div>
        <div className="absolute h-[143px] left-[316px] top-[25px] w-[66px]" data-name="image 10">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
        </div>

        {/* Characters */}
        <div className="absolute h-[72px] left-[172px] top-[339px] w-[83px] z-20" data-name="2 7">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img27} />
        </div>
        <div className="absolute h-[87px] left-[49px] top-[305px] w-[89px] z-20" data-name="3 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
        </div>
        <div className="absolute h-[88px] left-[266px] top-[297px] w-[91px] z-20" data-name="1 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
        </div>

        {/* Test Buttons */}
        <div className="absolute bottom-[20px] left-0 w-full flex justify-center gap-2 z-50">
          <button
            className="px-4 py-2 bg-white/80 rounded-lg text-sm font-bold shadow-sm hover:bg-white transition-colors"
            onClick={() => navigate("/home")}
          >
            테스트1
          </button>
          <button
            className="px-4 py-2 bg-white/80 rounded-lg text-sm font-bold shadow-sm hover:bg-white transition-colors"
            onClick={() => navigate("/parent-home")}
          >
            테스트2
          </button>
          <button
            className="px-4 py-2 bg-white/80 rounded-lg text-sm font-bold shadow-sm hover:bg-white transition-colors"
            onClick={() => navigate("/solo-home")}
          >
            테스트3
          </button>
        </div>

        {/* 초대코드 에러 메시지 */}
        {inviteError && (
          <div className="absolute bottom-[20px] left-0 w-full flex justify-center z-50">
            <p className="px-4 py-2 bg-red-500/90 rounded-lg text-sm font-bold text-white shadow-sm font-['ONE_Mobile_POP_OTF:Regular',sans-serif]">
              {inviteError}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
