import { useState } from "react";
import { useNavigate } from "react-router-dom";
import svgPaths from "@/imports/svg-jj8o0jubhu";
import svgPathsMenu from "@/imports/svg-suvnghhced";
import imgImage51 from "figma:asset/25e22a55b2742b552f58579327786ada9e64aa32.png";
import imgImage92 from "figma:asset/40787136f6fb551d30f83647db8d86726e3ea97e.png";
import imgImage52 from "figma:asset/c368e03333cec45fed8236b2ca94b1f8e78c82d4.png";
import imgCoin from "figma:asset/4e34cf3a2b2ddea240a98b7184299dc4893e0819.png";
import imgImage30 from "figma:asset/1bd23669ddf73fc6e96e58b5cd8d9ce98fe8c6bf.png";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage47 from "figma:asset/06750638a04f2b3069b1057f814539a0302a2245.png";
import imgImage37 from "figma:asset/409eeaf8b8d3d94dd075d0b92daaa9b7111bd5df.png";
import imgImage38 from "figma:asset/8148c67e4f82e7c37584d8a139dd13503abe9306.png";
import imgImage41 from "figma:asset/fff6d42b3b5957c3ef2140ea9b993bb9db708049.png";
import imgImage43 from "figma:asset/3a35e0010c42c44aa08bc9f129ba6db496d0093c.png";
import imgImage44 from "figma:asset/89bc45fd4f0c044adf1c161def566e19ce2bc7dc.png";
import imgImage40 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";
import imgHamberger from "figma:asset/cbce2ab124aac67762a2b6ddf11aaa5defb044a4.png";
import imgImage48 from "figma:asset/149ffd9965dec6b119823221359b74045abf60b7.png";
import imgImage49 from "figma:asset/f80d92b0aa5fe352e0affa98dc34d4f5654cddc2.png";
import imgImage50 from "figma:asset/f62dd14ca55f929a3069b8da15c4902593663f9e.png";
import imgImage54 from "figma:asset/7717fbadfaff2519242403e5e5201a7517a295a2.png";
import imgImage74 from "figma:asset/bf6aba8970b6e0b45897fd2685ac7ef492144c8e.png";
import imgImage77 from "figma:asset/cf6022d6ba1edae48e648736e5f3c30ba3130330.png";
import imgImage78 from "figma:asset/3c073d66f9a0c48e0d7e037390e6668aad752c1b.png";

export default function SoloHomeScreen() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-white h-[846px] relative w-[393px] overflow-hidden" data-name="홈화면_나혼자">
      {/* Background Layer 1: Sky */}
      <div className="absolute h-[848px] left-[-1px] top-[-2px] w-[394px]" data-name="image 51">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage51} />
      </div>

      {/* Background Layer 2: Character/Decor */}
      <div className="absolute h-[152px] left-[141px] top-[48px] w-[118px]" data-name="image 92">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage92} />
      </div>

      {/* Background Layer 3: Brown Frame */}
      <div className="absolute h-[803px] left-0 top-0 w-[394px]" data-name="image 52">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
      </div>

      {/* Scrollable Content Area */}
      <div className="absolute top-[315px] bottom-[60px] left-0 w-full overflow-y-auto z-10 pt-[5px] pb-[40px]">
        {/* Card 1: Yellow - Gumon */}
        <div className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px]">
            <div className="absolute bg-[#45270b] h-[146px] inset-0 top-[6px] rounded-[8px]" />
            <div className="absolute bg-[#f2e1be] h-[146px] inset-0 rounded-[8px]" />
            <div className="absolute h-[47px] left-0 bottom-0 w-[361px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
                    <path d={svgPaths.p2cc17800} fill="#FEB700" />
                </svg>
            </div>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] bottom-[11px] left-0 w-full text-center leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-pre-wrap pl-[25px] text-left">보상 : 칭찬코인 +1</p>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[20px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">구몬학습지 풀기</p>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[48px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">p7~p15까지 할 수 있지?</p>
            <div className="absolute left-[25px] size-[66px] top-[15px]">
                <img alt="" className="w-full h-full object-cover" src={imgImage46} />
            </div>
            <div className="absolute h-[56px] right-[10px] bottom-[10px] w-[142px]">
                <img alt="" className="w-full h-full object-contain" src={imgImage47} />
            </div>
        </div>

        {/* Card 2: Purple - Taekwondo */}
        <div className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px]">
            <div className="absolute bg-[#45270b] h-[146px] inset-0 top-[6px] rounded-[8px]" />
            <div className="absolute bg-[#f5eaf8] h-[146px] inset-0 rounded-[8px]" />
            <div className="absolute h-[47px] left-0 bottom-0 w-[361px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
                    <path d={svgPaths.p2cc17800} fill="#C07FE5" />
                </svg>
            </div>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] bottom-[11px] left-0 w-full text-center leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-pre-wrap pl-[25px] text-left">보상 : 칭찬코인 +1</p>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[20px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">태권도 학원 가기</p>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[48px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">학원 갔다오는게 어때?</p>
            <div className="absolute left-[25px] size-[66px] top-[15px]">
                <img alt="" className="w-full h-full object-cover" src={imgImage46} />
            </div>
            <div className="absolute h-[56px] right-[10px] bottom-[10px] w-[142px]">
                <img alt="" className="w-full h-full object-contain" src={imgImage37} />
            </div>
        </div>

        {/* Card 3: Green - Homework */}
        <div className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px]">
            <div className="absolute bg-[#45270b] h-[146px] inset-0 top-[6px] rounded-[8px]" />
            <div className="absolute bg-[#e8f6ed] h-[146px] inset-0 rounded-[8px]" />
            <div className="absolute h-[47px] left-0 bottom-0 w-[361px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
                    <path d={svgPaths.p2cc17800} fill="#5EE2A0" />
                </svg>
            </div>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] bottom-[11px] left-0 w-full text-center leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-pre-wrap pl-[25px] text-left">보상 : 칭찬코인 +1</p>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[20px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">학교 숙제 하기</p>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[48px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">학교 복습 빼먹지마~</p>
            <div className="absolute left-[25px] size-[66px] top-[15px]">
                <img alt="" className="w-full h-full object-cover" src={imgImage46} />
            </div>
            <div className="absolute h-[56px] right-[10px] bottom-[10px] w-[142px]">
                <img alt="" className="w-full h-full object-contain" src={imgImage38} />
            </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="absolute contents left-[16px] top-[11px]">
        {/* Coin Info */}
        <div className="absolute left-[130px] top-[11px] w-[92px] h-[40px]">
           <div className="absolute bg-[#291608] h-[31px] left-[17px] top-[4px] w-[75px] rounded-[8px]" />
           <div className="absolute left-0 top-0 size-[40px]">
              <img alt="" className="w-full h-full object-cover" src={imgCoin} />
           </div>
           <p className="absolute left-[52px] top-[4px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-center text-white">5</p>
        </div>

        {/* User Info (Kim Ham-jji) */}
        <div className="absolute left-[16px] top-[11px] w-[109px] h-[45px]">
           <div className="absolute bg-[#291608] inset-0 rounded-[8px]" />
           <div className="absolute left-0 top-0 size-[45px] bg-[#007722] rounded-[8px]" />
           <div className="absolute left-0 top-0 size-[45px] border-3 border-[#00da62] rounded-[8px]" />
           <div className="absolute left-[2px] top-[8px] w-[40px] h-[35px]">
              <img alt="" className="w-full h-full object-cover" src={imgImage30} />
           </div>
           <p className="absolute left-[50px] top-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-center text-white">김햄찌</p>
        </div>
      </div>

      {/* Hamburger */}
      <div 
        className="absolute left-[323px] top-[15px] pointer-events-auto cursor-pointer z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="absolute bg-[#644f41] rounded-[8px] size-[50px]" />
        <div className="absolute left-[11px] top-[12px] w-[28px] h-[25px]">
           <img alt="" className="w-full h-full object-cover" src={imgHamberger} />
        </div>
      </div>

      {/* Menu Popup (Reusing ParentHomeScreen Menu) */}
      {isMenuOpen && (
        <div className="absolute left-[179px] top-[79px] z-50 pointer-events-auto">
          {/* Background Panel */}
          <div className="absolute top-0 left-0 w-[200px] h-[154px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 154">
              <g>
                <path d={svgPathsMenu.p216fec00} fill="#311D0C" />
              </g>
            </svg>
          </div>

          {/* Menu Items */}
          <div className="absolute left-[10px] top-[10px]">
            {/* Notice */}
            <div className="absolute top-0 left-0 w-[180px] h-[38px]">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                공지사항
              </p>
            </div>
            {/* Settings */}
            <div className="absolute top-[48px] left-0 w-[180px] h-[38px]">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                설정
              </p>
            </div>
            {/* Logout */}
            <div
              className="absolute top-[96px] left-0 w-[180px] h-[38px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                로그아웃
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="absolute contents left-[16px] top-[215px]">
        <div className="absolute bg-[#4c2b0f] h-[37px] left-[16px] rounded-[8px] top-[215px] w-[361px]">
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
        </div>
        <div className="absolute h-[37.699px] left-[16px] top-[215px] w-[180.453px]" data-name="image 41">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage41} />
        </div>
        <div className="absolute h-[24.029px] left-[67px] top-[222px] w-[77.482px]" data-name="image 43">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage43} />
        </div>
        <div className="absolute h-[23.892px] left-[253.59px] top-[222px] w-[73.93px]" data-name="image 44">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage44} />
        </div>
      </div>

      {/* Star/Sparkle Decor */}
      <div className="absolute contents left-[336px] top-[121px]">
        <div className="absolute left-[336px] size-[17px] top-[121px]" data-name="image 40">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
        </div>
      </div>

      {/* Date Header */}
      <div className="absolute contents left-[16px] top-[260px]">
        <div className="absolute bg-[#532807] h-[47px] left-[16px] rounded-[8px] top-[260px] w-[363px]" />
        <div className="absolute bg-[#feb700] h-[47px] left-[330px] rounded-[8px] top-[260px] w-[48px]">
          <div aria-hidden="true" className="absolute border-3 border-[#bb7232] border-solid inset-[-3px] pointer-events-none rounded-[11px]" />
        </div>
        <div className="absolute left-[340px] size-[27px] top-[270px]" data-name="image 54">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage54} />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[31.91%_47.07%_64.89%_8.14%] leading-[1.5] not-italic text-[18px] text-center text-white flex items-center justify-center h-[47px] top-[260px] left-[16px] w-[314px]">1월 25일(토) 오늘의 미션</p>
      </div>

      {/* Speech Bubble: "How many points today?" */}
      <div className="absolute h-[53px] left-[297px] top-[142px] w-[56px]" data-name="image 74">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[149.06%] left-[-454.95%] max-w-none top-[-49.06%] w-[556.34%]" src={imgImage74} />
        </div>
      </div>
      <div className="absolute left-[111px] size-[21px] top-[105px]" data-name="image 34">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
      </div>
      <div className="absolute left-[353px] size-[13px] top-[88px]" data-name="image 76">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage40} />
        </div>
      </div>
      <div className="absolute contents left-[43px] top-[76px]">
        <div className="absolute h-[50px] left-[43px] top-[76px] w-[130px]" data-name="image 77">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage77} />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[43px] top-[76px] w-[130px] h-[50px] flex items-center justify-center pt-[2px] leading-[1.5] not-italic text-[#291608] text-[18px]">오늘은 몇점?</p>
      </div>
      <div className="absolute h-[49px] left-[62px] top-[138px] w-[70px]" data-name="image 78">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage78} />
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] z-30 pointer-events-none">
        <div className="absolute top-[-40px] left-0 w-full h-[90px] pointer-events-auto">
             <div className="absolute bottom-[5px] left-0 w-[134px] h-[46px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 46">
                    <path d={svgPaths.p28dd3d40} fill="#875224" />
                </svg>
             </div>
             <div className="absolute left-[37px] bottom-[10px] w-[57px] h-[26px]">
                <img alt="" className="w-full h-full object-cover" src={imgImage48} />
             </div>
             <div className="absolute left-[277px] bottom-[10px] w-[96px] h-[26px] opacity-30">
                <img alt="" className="w-full h-full object-cover" src={imgImage49} />
             </div>
             <div className="absolute left-[162px] bottom-[10px] w-[60px] h-[26px] opacity-30">
                <img alt="" className="w-full h-full object-cover" src={imgImage50} />
             </div>
        </div>
      </div>
      </div>
    </div>
  );
}