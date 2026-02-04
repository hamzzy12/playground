import React, { useState } from "react";
import imgImage12 from "figma:asset/7d773474cf8d2e22025ba48c1015d38f36885283.png";
import imgImage11 from "figma:asset/39fca110c4e2513bc4a56a1e748ae427b6bc63b0.png";
import imgImage8 from "figma:asset/f96f017455e91698c320ac65818a05031a68a0b9.png";
import imgImage9 from "figma:asset/1233848ef9026b822f92716019cd075d54555c05.png";
import imgImage10 from "figma:asset/723997adc95222b4bb79be32c45165af7eb1ccb9.png";
import img27 from "figma:asset/396288bbb892b2e7b251be93e0ebadaa2a537a23.png";
import img31 from "figma:asset/1744f30806d6576c526e23621530bb67cc9aae56.png";
import img11 from "figma:asset/090d51aa33f49cc631bc92b3dd3fcf328050d0bb.png";

import InvitationScreen from "@/app/components/InvitationScreen";
import HomeScreen from "@/app/components/HomeScreen";
import ParentHomeScreen from "@/app/components/ParentHomeScreen";
import SoloHomeScreen from "@/app/components/SoloHomeScreen";
import InvitationSignupScreen from "@/app/components/InvitationSignupScreen";

export default function LoginScreen() {
  const [inviteCode, setInviteCode] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [showInvitationSignup, setShowInvitationSignup] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showParentHome, setShowParentHome] = useState(false);
  const [showSoloHome, setShowSoloHome] = useState(false);

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
  };

  const handleInviteSubmit = () => {
    console.log("Invite Code Submitted:", inviteCode);
    setShowInvite(true);
  };

  if (showHome) {
     return (
       <div className="min-h-screen w-full flex justify-center bg-gray-100">
         <HomeScreen onLogout={() => setShowHome(false)} />
         {/* Back button for testing purposes */}
         <button 
           onClick={() => setShowHome(false)}
           className="fixed bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-full text-sm z-50 hover:bg-black/70"
         >
           뒤로가기
         </button>
       </div>
     );
  }

  if (showParentHome) {
     return (
       <div className="min-h-screen w-full flex justify-center bg-gray-100">
         <ParentHomeScreen onLogout={() => setShowParentHome(false)} />
         {/* Back button for testing purposes */}
         <button 
           onClick={() => setShowParentHome(false)}
           className="fixed bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-full text-sm z-50 hover:bg-black/70"
         >
           뒤로가기
         </button>
       </div>
     );
  }

  if (showSoloHome) {
    return (
      <div className="min-h-screen w-full flex justify-center bg-gray-100">
        <SoloHomeScreen onLogout={() => setShowSoloHome(false)} />
        {/* Back button for testing purposes */}
        <button 
          onClick={() => setShowSoloHome(false)}
          className="fixed bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-full text-sm z-50 hover:bg-black/70"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  if (showInvite) {
    return (
      <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
        <InvitationScreen 
          onBack={() => setShowInvite(false)} 
          onAccept={() => {
            setShowInvite(false);
            setShowInvitationSignup(true);
          }} 
        />
      </div>
    );
  }

  if (showInvitationSignup) {
    return (
      <div className="min-h-screen w-full flex justify-center bg-[#6e8f3b]">
        <InvitationSignupScreen 
          onSignup={() => console.log("Signup Clicked")}
        />
        {/* Back button for testing purposes */}
        <button 
          onClick={() => {
            setShowInvitationSignup(false);
            setShowInvite(true);
          }}
          className="fixed bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-full text-sm z-50 hover:bg-black/70"
        >
          뒤로가기
        </button>
      </div>
    );
  }

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
        <div className="-translate-x-1/2 absolute contents left-1/2 top-[460px]">
          {/* Text: Already joined? */}
          <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+1px)] not-italic text-[20px] text-center text-white top-[460px] font-bold drop-shadow-md z-30 w-full">
            이미 가입하셨나요?
          </p>

          {/* Text: Got an invite? */}
          <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+0.5px)] not-italic text-[20px] text-center text-white top-[581px] font-bold drop-shadow-md z-30 w-full">
            초대 받으셨나요?
          </p>

          {/* Google Login Button */}
          <div className="-translate-x-1/2 absolute h-[50px] left-1/2 top-[497px] w-[209px] z-30">
            <button 
              onClick={handleGoogleLogin}
              className="absolute contents inset-0 group"
            >
              <div className="absolute bg-white border border-[#713925] border-solid inset-0 rounded-[10px] group-active:scale-95 transition-transform shadow-sm" />
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_14.28%_22%_32.13%] leading-[1.5] not-italic text-[#221e1e] text-[18px] text-center font-bold">
                Google로그인
              </p>
              <div className="absolute left-[30px] size-[26px] top-[12px]" data-name="image 11">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
              </div>
            </button>
          </div>

          {/* Invite Code Input */}
          <div className="absolute h-[50px] left-[94px] top-[623px] w-[207px] z-30">
            <div className="relative size-full">
               <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="초대코드"
                className="w-full h-full bg-[rgba(255,255,255,0.3)] border border-[#d1d1d1] border-solid rounded-[10px] px-[12px] text-left text-white placeholder-[rgba(255,255,255,0.7)] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] leading-[1.5] focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* Invite Submit Button */}
          <div className="absolute h-[50px] left-[92px] top-[685px] w-[209px] z-30">
             <button 
              onClick={handleInviteSubmit}
              className="absolute contents inset-0 group"
            >
              <div className="absolute bg-[#14a5d4] inset-0 rounded-[10px] group-hover:bg-[#118bb3] group-active:scale-95 transition-transform shadow-md" />
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_41.23%_22%_41.23%] leading-[1.5] not-italic text-[18px] text-center text-white font-bold w-full flex justify-center items-center h-full top-0 left-0">
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
            onClick={() => setShowHome(true)}
          >
            테스트1
          </button>
          <button 
            className="px-4 py-2 bg-white/80 rounded-lg text-sm font-bold shadow-sm hover:bg-white transition-colors"
            onClick={() => setShowParentHome(true)}
          >
            테스트2
          </button>
          <button 
            className="px-4 py-2 bg-white/80 rounded-lg text-sm font-bold shadow-sm hover:bg-white transition-colors"
            onClick={() => setShowSoloHome(true)}
          >
            테스트3
          </button>
        </div>

      </div>
    </div>
  );
}
