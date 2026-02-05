import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useMissions } from "@/app/context/MissionContext";
import svgPaths from "@/imports/svg-pjyub6r4mi";
import svgPathsNew from "@/imports/svg-uurowocuep";
import svgPathsExchange from "@/imports/svg-e1i3f271x4";
import imgImage51 from "figma:asset/25e22a55b2742b552f58579327786ada9e64aa32.png";
import imgImage90 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";
import imgImage34 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";
import imgImage42 from "figma:asset/f7aea2908b31eb201e3c6ddeb0dd898aae25e2f4.png";
import imgImage41 from "figma:asset/fff6d42b3b5957c3ef2140ea9b993bb9db708049.png";
import imgImage43 from "figma:asset/3a35e0010c42c44aa08bc9f129ba6db496d0093c.png";
import imgImage44 from "figma:asset/89bc45fd4f0c044adf1c161def566e19ce2bc7dc.png";
import imgImage52 from "figma:asset/c368e03333cec45fed8236b2ca94b1f8e78c82d4.png";
import imgImage77 from "figma:asset/cf6022d6ba1edae48e648736e5f3c30ba3130330.png";
import imgImage47 from "figma:asset/149ffd9965dec6b119823221359b74045abf60b7.png";
import imgImage49 from "figma:asset/f80d92b0aa5fe352e0affa98dc34d4f5654cddc2.png";
import imgImage48 from "figma:asset/f62dd14ca55f929a3069b8da15c4902593663f9e.png";
import imgImage45 from "figma:asset/fb2306265cb70042010e7f9b17540ae4244eb277.png";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage50 from "figma:asset/06750638a04f2b3069b1057f814539a0302a2245.png";
import imgLabelSoldOut from "figma:asset/5415e0017a0f70c5a42fb73f4f0d552d2dc65191.png";
import imgImage37 from "figma:asset/409eeaf8b8d3d94dd075d0b92daaa9b7111bd5df.png";
import imgImage38 from "figma:asset/8148c67e4f82e7c37584d8a139dd13503abe9306.png";
import imgCoin from "figma:asset/4e34cf3a2b2ddea240a98b7184299dc4893e0819.png";
import imgHamberger from "figma:asset/cbce2ab124aac67762a2b6ddf11aaa5defb044a4.png";
import imgImage33 from "figma:asset/0211ed9a365c410c14df8931e04d20f485ded183.png";
import imgGiveUp from "figma:asset/8e84a045d8b268a46a68ba2858691647755a8a10.png";
import imgChallengeSuccess from "figma:asset/5e53b1193805a5d5a43f46e2a3b6fa73f6e30911.png";
import imgImage59 from "figma:asset/ed6117d0cb27758f4af5f1b706c8fe1515b5f600.png";
import imgImage60 from "figma:asset/7c4559a30c02a8324962e51c90a82dfdf2c358c3.png";
import svgPathsBlue from "@/imports/svg-d8ty54xrai";
import svgPathsMenu from "@/imports/svg-kmzz9f9dmz";

interface MissionCardProps {
  bgColor: string;
  barColor: string;
  shadowColor: string;
  title: string;
  subtitle: string;
  rewardText: string;
  iconSrc: string;
  buttonSrc: string;
  inProgressButtonSrc: string;
  completedButtonSrc: string;
  svgPath: string;
  status?: 'active' | 'in_progress' | 'completed';
  onButtonClick?: () => void;
}

const MissionCard = ({ bgColor, barColor, shadowColor, title, subtitle, rewardText, iconSrc, buttonSrc, inProgressButtonSrc, completedButtonSrc, svgPath, status = 'active', onButtonClick }: MissionCardProps) => {
  const isInProgress = status === 'in_progress';
  const isCompleted = status === 'completed';

  let displayBgColor = bgColor;
  let displayBarColor = barColor;
  let displayButtonSrc = buttonSrc;

  if (isInProgress) {
    displayBgColor = '#f5eaf8';
    displayBarColor = '#C07FE5';
    displayButtonSrc = inProgressButtonSrc;
  } else if (isCompleted) {
    displayBgColor = '#e8f6ed';
    displayBarColor = '#5EE2A0';
    displayButtonSrc = completedButtonSrc;
  }

  return (
    <button
      className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px] cursor-pointer active:scale-95 transition-transform rounded-[16px] overflow-hidden"
      onClick={onButtonClick}
    >
      {/* Shadow */}
      <div className="absolute inset-0 top-[6px] rounded-[16px]" style={{ backgroundColor: shadowColor }} />

      {/* Main Background */}
      <div className="absolute inset-0 rounded-[16px]" style={{ backgroundColor: displayBgColor }} />

      {/* Bottom Bar */}
      <div className="absolute left-0 bottom-0 w-[361px] h-[47px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
          <path d={svgPath} fill={displayBarColor} />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 pointer-events-none">
         <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] bottom-[11px] left-0 w-full leading-[1.5] not-italic text-[18px] text-left pl-[25px] text-[#492607] whitespace-pre-wrap">
          {rewardText}
        </p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[20px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">
          {title}
        </p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[48px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">
          {subtitle}
        </p>

        {/* Icon */}
        <div className="absolute left-[25px] top-[15px] size-[66px]">
          <img alt="icon" className="w-full h-full object-cover" src={iconSrc} />
        </div>

        {/* Status Button Image */}
        <div className="absolute right-[10px] bottom-[10px] h-[56px] w-[142px]">
           <img alt="button" className="w-full h-full object-contain" src={displayButtonSrc} />
        </div>
      </div>
    </button>
  );
};

interface ShopItemProps {
  title: string;
  price: string;
  iconSrc: string;
  status?: 'available' | 'soldout' | 'shipping' | 'delivered';
  statusImageSrc?: string;
  onClick?: () => void;
}

const ShopItem = ({ title, price, iconSrc, status = 'available', statusImageSrc, onClick }: ShopItemProps) => (
  <button
    className="relative w-[367px] h-[87px] shrink-0 mb-[16px] block text-left active:scale-95 transition-transform cursor-pointer rounded-[8px] overflow-hidden"
    onClick={onClick}
  >
     <div className="absolute inset-0 top-[11px] bg-[#45270b] rounded-[8px]" />
     <div className="absolute inset-0 h-[87px] bg-[#f2e1be] rounded-[8px]" />
     
     {/* Yellow Right Section (Price) */}
     <div className="absolute right-0 top-0 w-[90px] h-[87px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 87">
           <path d={svgPathsExchange.p68c9900} fill="#FFC100" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#291608] leading-tight">칭찬코인</p>
           <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[26px] text-[#291608] leading-tight">{price}</p>
        </div>
     </div>

     {/* Icon */}
     <div className="absolute left-[25px] top-[11px] size-[66px]">
        <img className="w-full h-full object-cover" src={iconSrc} alt="Icon" />
     </div>

     {/* Title */}
     <div className="absolute left-[100px] top-0 h-[87px] flex items-center">
        <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#291608]">{title}</p>
     </div>

     {/* Status Overlay */}
     {status !== 'available' && statusImageSrc && (
        <>
            <div className="absolute inset-0 bg-black/70 rounded-[8px]" />
            <div className="absolute left-[139px] top-[22px] w-[112px] h-[44px]">
                <img src={statusImageSrc} className="w-full h-full object-contain" alt={status} />
            </div>
        </>
     )}
  </button>
);

// 오늘 날짜를 한국어 형식으로 포맷하는 함수
const getTodayDateString = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayNames[today.getDay()];
  return `${month}월 ${date}일(${day}) 오늘의 미션`;
};

export default function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Context에서 미션 상태 가져오기
  const { missions, updateMissionStatus } = useMissions();

  // 완료된 미션 처리
  useEffect(() => {
    const state = location.state as { completedMissionId?: string } | null;
    if (state?.completedMissionId) {
      updateMissionStatus(state.completedMissionId, 'completed');
      // state 초기화 (뒤로가기 시 중복 처리 방지)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, updateMissionStatus]);

  // 미션 카드 클릭 핸들러
  const handleMissionButtonClick = (mission: typeof missions[0]) => {
    if (mission.status === 'active') {
      // 미진행 → 진행중으로 변경
      updateMissionStatus(mission.id, 'in_progress');
    } else if (mission.status === 'in_progress') {
      // 진행중 → 진행중 미션 화면으로 이동
      navigate('/mission-in-progress', {
        state: {
          mission: {
            id: mission.id,
            title: mission.title,
            subtitle: mission.subtitle,
            reward: mission.reward,
          }
        }
      });
    }
  };


  React.useEffect(() => {
    // 초기 렌더링 직후 애니메이션 활성화
    setIsInitialRender(false);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-white h-[852px] relative w-[393px] overflow-hidden" data-name="홈화면">
      {/* Layer 1: Sky Background */}
      <div className="absolute h-[854px] left-[-1px] top-[-2px] w-[394px]" data-name="image 51">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage51} />
      </div>

      {/* Layer 2: Character Face & Sparkles (Behind the brown frame) */}
      <div className="absolute h-[159px] left-[121px] top-[59px] w-[152px]" data-name="image 90">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage90} />
      </div>
      <div className="absolute left-[39px] size-[21px] top-[142px]" data-name="image 34">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage34} />
      </div>
      <div className="absolute left-[66px] size-[29px] top-[98px]" data-name="image 40">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage34} />
      </div>

      {/* Layer 3: Brown Frame (Covers character body parts) */}
      <div className="absolute h-[805px] left-0 top-[-2px] w-[393px]" data-name="image 52">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
      </div>

      {/* Layer 4: Coins/Body Foreground (On top of brown frame) */}
      <div className="absolute h-[78px] left-[38px] top-[129px] w-[318px]" data-name="image 33">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage33} />
      </div>

      {/* Layer 5: Static UI Elements (Top Header, Tabs, etc) */}
      <div className="absolute top-0 left-0 w-full h-[315px] z-20 pointer-events-none">
          {/* User Profile */}
          <div className="absolute left-[16px] top-[11px] w-[109px] h-[45px] pointer-events-auto">
            <div className="absolute bg-[#291608] inset-0 rounded-[8px]" />
            <div className="absolute bg-[#007722] left-0 top-0 size-[45px] rounded-[8px]" />
            <div className="absolute h-[35px] left-[2px] top-[8px] w-[40px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[134.55%] left-0 max-w-none top-[-0.13%] w-[112.5%]" src={imgImage90} />
              </div>
            </div>
            <div className="absolute border-3 border-[#00da62] border-solid left-0 top-0 size-[45px] rounded-[8px]" />
            <p className="absolute right-[10px] top-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">김쭈니</p>
          </div>

          {/* Coin */}
          <div className="absolute left-[130px] top-[11px] h-[40px] pointer-events-auto">
             <div className="absolute bg-[#291608] h-[31px] left-[17px] top-[4px] w-[75px] rounded-[8px]" />
             <div className="absolute left-0 top-0 size-[40px]">
                <img alt="" className="w-full h-full object-cover" src={imgCoin} />
             </div>
             <p className="absolute left-[50px] top-[4px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">5</p>
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

          {/* Menu Popup */}
          {isMenuOpen && (
            <div className="absolute left-[173px] top-[77px] z-50 pointer-events-auto">
              {/* Background Panel (Group 13) */}
              <div className="absolute top-0 left-0 w-[200px] h-[202px] pointer-events-none">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 202">
                  <g>
                    <path d={svgPathsMenu.p29ac7700} fill="#311D0C" />
                  </g>
                </svg>
              </div>

              {/* Menu Items (Group 14) */}
              <div className="absolute left-[10px] top-[10px] z-10">
                {/* Mission Suggestion Button */}
                <div
                  className="absolute top-0 left-0 w-[180px] h-[39px] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/mission-propose');
                  }}
                >
                   <div className="absolute inset-0 bg-[#feb700] border border-solid border-white rounded-[8px]" />
                   <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                     미션제안하기
                   </p>
                </div>

                {/* Notice */}
                <div className="absolute top-[48px] left-0 w-[180px] h-[38px]">
                  <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
                  <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                    공지사항
                  </p>
                </div>

                {/* Settings */}
                <div className="absolute top-[96px] left-0 w-[180px] h-[38px]">
                  <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
                  <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                    설정
                  </p>
                </div>

                {/* Logout */}
                <div
                  className="absolute top-[144px] left-0 w-[180px] h-[38px] cursor-pointer"
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

          {/* Mission is Good (Speech Bubble) */}
          <div className="absolute left-[29px] top-[77px] w-[130px] h-[50px]">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgImage77} />
            <p className="absolute inset-0 flex items-center justify-center pt-[2px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#291608] text-[18px]">미션이 좋아</p>
          </div>

          {/* Date Selector Strip (Tabs Area) */}
          <div className="absolute top-[212px] left-[12px] w-[367px] z-30 h-[38px] pointer-events-auto">
             {/* Tab Background Track */}
             <div className="absolute inset-0 w-[367px] h-[38px]">
                <img className="w-full h-full object-cover" src={imgImage42} alt="Tab Background" />
             </div>
             
             {/* Active Tab Indicator */}
             <motion.div 
               className="absolute top-0 left-0 w-[180px] h-[38px]"
               animate={{ x: activeTab === 'mission' ? 0 : 187 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
             >
                <img className="w-full h-full object-cover" src={imgImage41} alt="Active Tab" />
             </motion.div>

             {/* Click Handlers (Invisible) */}
             <div 
                className="absolute top-0 left-0 w-[180px] h-[38px] cursor-pointer z-10"
                onClick={() => setActiveTab('mission')}
             />
             <div 
                className="absolute top-0 right-0 w-[180px] h-[38px] cursor-pointer z-10"
                onClick={() => setActiveTab('shop')}
             />

             {/* Tab Texts */}
             {/* Mission List Text */}
             <div className="absolute left-[50px] top-[7px] w-[78px] h-[24px] pointer-events-none z-20">
                <img src={imgImage43} className={`w-full h-full object-contain transition-opacity duration-300 ${activeTab === 'mission' ? 'opacity-100' : 'opacity-50'}`} alt="Mission List" />
             </div>

             {/* Exchange Shop Text */}
             <div className="absolute left-[239px] top-[7px] w-[74px] h-[24px] pointer-events-none z-20">
                <img src={imgImage44} className={`w-full h-full object-contain transition-opacity duration-300 ${activeTab === 'shop' ? 'opacity-100' : 'opacity-50'}`} alt="Exchange Shop" />
             </div>
          </div>

          {/* Today's Mission Header - ONLY show on Mission Tab */}
          {activeTab === 'mission' && (
            <div className="absolute top-[260px] left-[16px] w-[361px] h-[47px]">
              <div className="absolute bg-[#532807] inset-0 rounded-[8px]" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">
                {getTodayDateString()}
              </p>
              <div className="absolute left-[13px] top-[10px] w-[31px] h-[26px]">
                 <img alt="" className="w-full h-full" src={imgImage45} />
              </div>
            </div>
          )}
      </div>

      {/* Layer 6: Scrollable Content Area (Z-Index 10) */}
      <motion.div
        className={`absolute left-0 w-full overflow-y-auto z-10 pt-[10px] pb-[40px] bottom-[60px] ${activeTab === 'mission' ? 'px-[16px]' : 'pl-[12px] pr-[14px]'}`}
        animate={{ top: activeTab === 'mission' ? 315 : 265 }}
        transition={isInitialRender ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      >
        
        {activeTab === 'mission' ? (
          /* MISSION LIST CONTENT */
          <>
            {missions.map(mission => (
              <MissionCard
                key={mission.id}
                bgColor={mission.bgColor}
                barColor={mission.barColor}
                shadowColor="#45270b"
                title={mission.title}
                subtitle={mission.subtitle}
                rewardText={`보상 : 칭찬코인 +${mission.reward}`}
                iconSrc={imgImage46}
                buttonSrc={imgImage50}
                inProgressButtonSrc={imgImage37}
                completedButtonSrc={imgImage38}
                svgPath={svgPaths.p2cc17800}
                status={mission.status}
                onButtonClick={() => handleMissionButtonClick(mission)}
              />
            ))}
          </>
        ) : (
          /* SHOP CONTENT */
          <>
             <ShopItem 
                title="유튜브시청20분"
                price="-1"
                iconSrc={imgImage46}
                onClick={() => console.log('Shop item clicked: Youtube')}
             />

             <ShopItem 
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                onClick={() => console.log('Shop item clicked: Play with mom')}
             />

             <ShopItem 
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status="soldout"
                statusImageSrc={imgLabelSoldOut}
                onClick={() => console.log('Shop item clicked: Sold out')}
             />

             <ShopItem 
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status="shipping"
                statusImageSrc={imgImage59}
                onClick={() => console.log('Shop item clicked: Shipping')}
             />

             <ShopItem 
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status="delivered"
                statusImageSrc={imgImage60}
                onClick={() => console.log('Shop item clicked: Delivered')}
             />
          </>
        )}
      </motion.div>

      {/* Layer 7: Fixed Bottom Navigation (Z-Index 30) */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] z-30 pointer-events-none">
        <div className="absolute top-[-40px] left-0 w-full h-[90px] pointer-events-auto">
             {/* Bottom bar background svg shape */}
             <div className="absolute bottom-[5px] left-0 w-[134px] h-[46px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 46">
                    <path d={svgPaths.p28dd3d40} fill="#875224" />
                </svg>
             </div>
             
             {/* Icons */}
             {/* Mission Home (Active) */}
             <div className="absolute left-[37px] bottom-[10px] w-[57px] h-[26px]">
                <img alt="" className="w-full h-full object-cover" src={imgImage47} />
             </div>

             {/* Ranking */}
             <div className="absolute left-[162px] bottom-[10px] w-[60px] h-[26px] opacity-30">
                <img alt="" className="w-full h-full object-cover" src={imgImage48} />
             </div>

             {/* Report */}
             <div className="absolute left-[277px] bottom-[10px] w-[96px] h-[26px] opacity-30">
                <img alt="" className="w-full h-full object-cover" src={imgImage49} />
             </div>
        </div>
      </div>



      </div>
    </div>
  );
}