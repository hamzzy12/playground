import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useMissions, MISSION_STATUS_PRIORITY, MissionStatus } from "@/app/context/MissionContext";
import MissionCompletePopup from "./MissionCompletePopup";
import ExchangeConfirmPopup from "./ExchangeConfirmPopup";
import SoldOutPopup from "./SoldOutPopup";
import ShippingPopup from "./ShippingPopup";
import DeliveredPopup from "./DeliveredPopup";
import DeveloperInfoPopup from "./DeveloperInfoPopup";
import ProfileSelectModal from "./ProfileSelectModal";
import imgRectangle31 from "figma:asset/508ac9b065db524ed603dc0378c5d78cbbf23ff5.png";
import imgRectangle32 from "figma:asset/c64f822686c4bd0690d445a8f4dce0df3c0bba36.png";
import imgRectangle33 from "figma:asset/5e78257806ea55fb5db8e29170f3f75d1554a882.png";
import imgRectangle34 from "figma:asset/a5034f3978ced473b918a45d6f2940d377e84db2.png";

const PROFILE_MAP: Record<string, string> = {
  p1: imgRectangle31,
  p2: imgRectangle33,
  p3: imgRectangle34,
  p4: imgRectangle32,
};
import svgPaths from "@/imports/svg-pjyub6r4mi";
import svgPathsNew from "@/imports/svg-uurowocuep";
import svgPathsExchange from "@/imports/svg-e1i3f271x4";
import imgImage51 from "figma:asset/25e22a55b2742b552f58579327786ada9e64aa32.png";
import imgImage90 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";
import imgImage34 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";
import imgImage41 from "figma:asset/fff6d42b3b5957c3ef2140ea9b993bb9db708049.png";
import imgImage52 from "figma:asset/c368e03333cec45fed8236b2ca94b1f8e78c82d4.png";
import imgImage77 from "figma:asset/cf6022d6ba1edae48e648736e5f3c30ba3130330.png";
import imgImage74 from "figma:asset/bf6aba8970b6e0b45897fd2685ac7ef492144c8e.png";
import imgImage78 from "figma:asset/3c073d66f9a0c48e0d7e037390e6668aad752c1b.png";
import imgGroup60 from "@/assets/c4338e4775c77da0d1a7c6298fbcf6dcf9b27fe8.svg";
import imgGroup162 from "@/assets/917899768af2bdc82d70468ecf8b2eb6609ea73e.svg";
import imgImage45 from "figma:asset/fb2306265cb70042010e7f9b17540ae4244eb277.png";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage50 from "figma:asset/06750638a04f2b3069b1057f814539a0302a2245.png";
import imgLabelSoldOut from "figma:asset/5415e0017a0f70c5a42fb73f4f0d552d2dc65191.png";
import imgImage37 from "figma:asset/409eeaf8b8d3d94dd075d0b92daaa9b7111bd5df.png";
import imgImage38 from "figma:asset/8148c67e4f82e7c37584d8a139dd13503abe9306.png";
import imgCoin from "figma:asset/4e34cf3a2b2ddea240a98b7184299dc4893e0819.png";
import imgHamberger from "figma:asset/cbce2ab124aac67762a2b6ddf11aaa5defb044a4.png";
import imgGiveUp from "figma:asset/8e84a045d8b268a46a68ba2858691647755a8a10.png";
import imgChallengeSuccess from "figma:asset/5e53b1193805a5d5a43f46e2a3b6fa73f6e30911.png";
import imgImage59 from "figma:asset/ed6117d0cb27758f4af5f1b706c8fe1515b5f600.png";
import imgImage60 from "figma:asset/7c4559a30c02a8324962e51c90a82dfdf2c358c3.png";
import svgPathsBlue from "@/imports/svg-d8ty54xrai";
import svgPathsMenu from "@/imports/svg-kmzz9f9dmz";
import imgBarYellow from "figma:asset/3d0b785a346010a999a1dd72bd6a85f46b406120.svg";
import imgEditBtn from "figma:asset/799e50dfe7b7023b5b89d5b87d6f541e8e517937.png";
import imgToggleOn from "figma:asset/53f85dfeb2f6b438582311a06991c630d2551111.svg";
import imgToggleOff from "figma:asset/4c3c0360ff1b8b3b2e4a23e9fd5542b76ca16eab.svg";

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
  gaveUpButtonSrc: string;
  challengeSuccessButtonSrc: string;
  completedButtonSrc: string;
  svgPath: string;
  status?: MissionStatus;
  onButtonClick?: () => void;
}

const MissionCard = ({ bgColor, barColor, shadowColor, title, subtitle, rewardText, iconSrc, buttonSrc, inProgressButtonSrc, gaveUpButtonSrc, challengeSuccessButtonSrc, completedButtonSrc, svgPath, status = 'active', onButtonClick }: MissionCardProps) => {
  let displayBgColor = bgColor;
  let displayBarColor = barColor;
  let displayButtonSrc = buttonSrc;

  switch (status) {
    case 'in_progress':
      displayBgColor = '#f5eaf8';
      displayBarColor = '#C07FE5';
      displayButtonSrc = inProgressButtonSrc;
      break;
    case 'gave_up':
      displayBgColor = '#f5e8e8';
      displayBarColor = '#E57F7F';
      displayButtonSrc = gaveUpButtonSrc;
      break;
    case 'challenge_success':
      displayBgColor = '#e8f0f6';
      displayBarColor = '#7FC0E5';
      displayButtonSrc = challengeSuccessButtonSrc;
      break;
    case 'completed':
      displayBgColor = '#e8f6ed';
      displayBarColor = '#5EE2A0';
      displayButtonSrc = completedButtonSrc;
      break;
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
  const [missionSubTab, setMissionSubTab] = useState<'list' | 'manage'>('list');
  const [missionEnabled, setMissionEnabled] = useState<Record<string, boolean>>({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [completingMissionId, setCompletingMissionId] = useState<string | null>(null);
  const [missionOrder, setMissionOrder] = useState<string[]>([]);
  const [showExchangePopup, setShowExchangePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; title: string; price: string } | null>(null);
  const [shippingProducts, setShippingProducts] = useState<string[]>([]);
  const [showSoldOutPopup, setShowSoldOutPopup] = useState(false);
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [showDeliveredPopup, setShowDeliveredPopup] = useState(false);
  const [showDeveloperPopup, setShowDeveloperPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfileImg, setSelectedProfileImg] = useState<string | null>(null);
  const [selectedBorderColor, setSelectedBorderColor] = useState<string | null>(null);

  // Context에서 미션 상태 가져오기
  const { missions, updateMissionStatus } = useMissions();

  // 초기 로드 시에만 정렬된 순서 저장
  useEffect(() => {
    if (missionOrder.length === 0 && missions.length > 0) {
      const sortedIds = [...missions]
        .sort((a, b) => MISSION_STATUS_PRIORITY[a.status] - MISSION_STATUS_PRIORITY[b.status])
        .map(m => m.id);
      setMissionOrder(sortedIds);
    }
  }, [missions, missionOrder.length]);

  // 완료된 미션 처리 + 탭 복원
  useEffect(() => {
    const state = location.state as { completedMissionId?: string; missionSubTab?: 'list' | 'manage' } | null;
    if (state?.completedMissionId) {
      updateMissionStatus(state.completedMissionId, 'completed');
    }
    if (state?.missionSubTab) {
      setMissionSubTab(state.missionSubTab);
    }
    if (state) {
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
    } else if (mission.status === 'challenge_success') {
      // 도전성공 → 미션완료 팝업 표시
      setCompletingMissionId(mission.id);
      setShowCompletePopup(true);
    } else if (mission.status === 'completed') {
      // 완료된 미션 클릭 → 미션완료 팝업 표시 (확인용)
      setCompletingMissionId(null);
      setShowCompletePopup(true);
    }
  };

  // 미션완료 팝업 확인 핸들러
  const handleMissionCompleteConfirm = () => {
    if (completingMissionId) {
      updateMissionStatus(completingMissionId, 'completed');
      setCompletingMissionId(null);
    }
    setShowCompletePopup(false);
  };


  React.useEffect(() => {
    // 초기 렌더링 직후 애니메이션 활성화
    setIsInitialRender(false);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-white h-[852px] relative w-[393px] overflow-hidden" data-name="홈화면">
      {/* Layer 1: Sky Background */}
      <div className="absolute h-[854px] left-0 top-0 w-[394px]" data-name="image 51">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage51} />
      </div>

      {/* Layer 2: Character Face & Sparkles (Behind the brown frame) */}
      <div className="absolute h-[159px] left-[132px] top-[53px] w-[152px]" data-name="image 90">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage90} />
      </div>
      <div className="absolute left-[111px] size-[21px] top-[105px]" data-name="image 34">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage34} />
      </div>
      <div className="absolute left-[336px] size-[17px] top-[121px]" data-name="image 40">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage34} />
      </div>
      <div className="absolute left-[353px] size-[13px] top-[88px]" data-name="image 76">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage34} />
        </div>
      </div>

      {/* Layer 3: Brown Frame (Covers character body parts) */}
      <div className="absolute h-[803px] left-0 top-0 w-[394px]" data-name="image 52">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
      </div>

      {/* Layer 4: New foreground images */}
      <div className="absolute h-[53px] left-[297px] top-[142px] w-[56px]" data-name="image 74">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[149.06%] left-[-454.95%] max-w-none top-[-49.06%] w-[556.34%]" src={imgImage74} />
        </div>
      </div>
      <div className="absolute h-[49px] left-[62px] top-[138px] w-[70px]" data-name="image 78">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage78} />
      </div>

      {/* Layer 5: Static UI Elements (Top Header, Tabs, etc) */}
      <div className="absolute top-0 left-0 w-full h-[315px] z-20 pointer-events-none">
          {/* User Profile */}
          <div className="absolute left-[16px] top-[11px] w-[109px] h-[45px] pointer-events-auto cursor-pointer" onClick={() => setShowProfileModal(true)}>
            <div className="absolute bg-[#291608] inset-0 rounded-[8px]" />
            {selectedProfileImg ? (
              <div className="absolute left-0 top-0 size-[45px] rounded-[8px] overflow-hidden">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={selectedProfileImg} />
              </div>
            ) : (
              <>
                <div className="absolute bg-[#007722] left-0 top-0 size-[45px] rounded-[8px]" />
                <div className="absolute h-[35px] left-[2px] top-[8px] w-[40px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[134.55%] left-0 max-w-none top-[-0.13%] w-[112.5%]" src={imgImage90} />
                  </div>
                </div>
              </>
            )}
            <div
              className="absolute left-0 top-0 size-[45px] rounded-[8px]"
              style={{ border: `3px solid ${selectedBorderColor ?? "#00da62"}` }}
            />
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

                {/* 만든개발자 */}
                <div
                  className="absolute top-[48px] left-0 w-[180px] h-[38px] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowDeveloperPopup(true);
                  }}
                >
                  <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
                  <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                    만든개발자
                  </p>
                </div>

                {/* 알림 */}
                <div
                  className="absolute top-[96px] left-0 w-[180px] h-[38px] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.open('https://cafe.naver.com/f-e/cafes/31663026/menus/1?viewType=L', '_blank');
                  }}
                >
                  <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
                  <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                    알림
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

          {/* Speech Bubble */}
          <div className="absolute left-[43px] top-[76px] w-[130px] h-[50px]">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgImage77} />
            <p className="absolute inset-0 flex items-center justify-center pt-[2px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#291608] text-[18px]">오늘은 몇점?</p>
          </div>

          {/* Tab Bar Background (imgGroup162) */}
          <div className="absolute top-[195px] left-0 w-[394px] h-[57px]">
            <img alt="" className="block max-w-none size-full" src={imgGroup162} />
          </div>

          {/* Tab Labels */}
          <p
            className={`absolute left-[98.5px] top-[212px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] leading-[1.5] text-center pointer-events-auto cursor-pointer z-20 transition-colors duration-300 ${activeTab === 'mission' ? 'text-white' : 'text-white/30'}`}
            onClick={() => setActiveTab('mission')}
          >
            미션
          </p>
          <p
            className={`absolute left-[297px] top-[212px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] leading-[1.5] text-center pointer-events-auto cursor-pointer z-20 transition-colors duration-300 ${activeTab === 'shop' ? 'text-white' : 'text-white/30'}`}
            onClick={() => setActiveTab('shop')}
          >
            소원 상점
          </p>

          {/* Sub-tabs (Mission tab only) */}
          {activeTab === 'mission' && (
            <div className="absolute top-[267px] left-[16px] w-[240px] h-[37px] z-30 pointer-events-auto">
              {/* Background Track */}
              <div className="absolute inset-0 bg-[#4c2b0f] rounded-[8px]">
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
              </div>

              {/* Active Indicator */}
              <motion.div
                className="absolute top-0 h-[37px] w-[120px] bg-[#b9915e] border-2 border-[#f0c58f] rounded-[8px]"
                animate={{ x: missionSubTab === 'list' ? 0 : 120 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {/* Click Handlers */}
              <div className="absolute top-0 left-0 w-[120px] h-full cursor-pointer z-10" onClick={() => setMissionSubTab('list')} />
              <div className="absolute top-0 right-0 w-[120px] h-full cursor-pointer z-10" onClick={() => setMissionSubTab('manage')} />

              {/* Labels */}
              <div className="absolute left-0 top-0 w-[120px] h-full flex items-center justify-center pointer-events-none z-20">
                <p
                  className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-center transition-colors duration-300 ${missionSubTab === 'list' ? 'text-white' : 'text-white/30'}`}
                  style={{ textShadow: '2px 0 0 #45270B, -2px 0 0 #45270B, 0 2px 0 #45270B, 0 -2px 0 #45270B, 1.4px 1.4px 0 #45270B, -1.4px 1.4px 0 #45270B, 1.4px -1.4px 0 #45270B, -1.4px -1.4px 0 #45270B' }}
                >
                  미션 목록
                </p>
              </div>
              <div className="absolute left-[120px] top-0 w-[120px] h-full flex items-center justify-center pointer-events-none z-20">
                <p
                  className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-center transition-colors duration-300 ${missionSubTab === 'manage' ? 'text-white' : 'text-white/30'}`}
                  style={{ textShadow: '2px 0 0 #45270B, -2px 0 0 #45270B, 0 2px 0 #45270B, 0 -2px 0 #45270B, 1.4px 1.4px 0 #45270B, -1.4px 1.4px 0 #45270B, 1.4px -1.4px 0 #45270B, -1.4px -1.4px 0 #45270B' }}
                >
                  미션 관리
                </p>
              </div>
            </div>
          )}

          {/* Today's Mission Header - Show on Mission Tab > List Sub-tab */}
          {activeTab === 'mission' && missionSubTab === 'list' && (
            <div className="absolute top-[314px] left-[16px] w-[361px] h-[47px]">
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
        animate={{ top: activeTab === 'mission' ? (missionSubTab === 'list' ? 370 : 315) : 265 }}
        transition={isInitialRender ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      >

        {activeTab === 'mission' && missionSubTab === 'manage' ? (
          /* MISSION MANAGE CONTENT */
          <>
            {/* 미션 만들기 버튼 */}
            <button
              className="relative w-[361px] h-[47px] mx-auto mb-[15px] cursor-pointer active:scale-95 transition-transform"
              onClick={() => navigate('/mission-propose', { state: { from: 'home-manage' } })}
            >
              <div className="absolute inset-0 top-[5px] bg-[#45270b] rounded-[8px]" />
              <div className="absolute inset-0 bg-[#feb700] rounded-[8px]" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                미션 만들기
              </p>
            </button>

            {/* 미션 카드 목록 */}
            {missionOrder
              .map(id => missions.find(m => m.id === id))
              .filter((mission): mission is typeof missions[0] => mission !== undefined)
              .map(mission => {
                const enabled = missionEnabled[mission.id] ?? true;
                return (
                  <div key={mission.id} className="relative w-[361px] h-[152px] mx-auto mb-[10px]">
                    {/* Shadow */}
                    <div className="absolute left-0 top-[6px] w-[361px] h-[146px] bg-[#45270b] rounded-[8px]" />
                    {/* Card */}
                    <div className="absolute left-0 top-0 w-[361px] h-[146px] bg-[#f2e1be] rounded-[8px]" />
                    {/* Bottom Bar */}
                    <div className="absolute left-0 top-[99px] w-[361px] h-[47px]">
                      <img alt="" className="block w-full h-full" src={imgBarYellow} />
                    </div>
                    {/* Icon */}
                    <div className="absolute left-[9px] top-[15px] size-[66px]">
                      <img alt="" className="w-full h-full object-cover" src={imgImage46} />
                    </div>
                    {/* Title */}
                    <p className="absolute left-[84px] top-[17px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#492607]">
                      {mission.title}
                    </p>
                    {/* Subtitle */}
                    <p className="absolute left-[84px] top-[47px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#492607]">
                      {mission.subtitle}
                    </p>
                    {/* Reward */}
                    <p className="absolute left-[16px] top-[104px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                      보상 : 칭찬코인 +{mission.reward}
                    </p>
                    {/* 수정하기 Button */}
                    <div
                      className="absolute right-[15px] top-[10px] w-[80px] h-[40px] cursor-pointer active:scale-95 transition-transform"
                      onClick={() => navigate('/mission-edit')}
                    >
                      <img alt="수정하기" className="w-full h-full object-cover" src={imgEditBtn} />
                    </div>
                    {/* Toggle */}
                    <div
                      className="absolute right-[15px] top-[108px] w-[58px] h-[30px] cursor-pointer"
                      onClick={() => setMissionEnabled(prev => ({ ...prev, [mission.id]: !enabled }))}
                    >
                      <img alt="" className="block w-full h-full" src={enabled ? imgToggleOn : imgToggleOff} />
                    </div>
                  </div>
                );
              })}
          </>
        ) : activeTab === 'mission' ? (
          /* MISSION LIST CONTENT */
          <>
            {missionOrder
              .map(id => missions.find(m => m.id === id))
              .filter((mission): mission is typeof missions[0] => mission !== undefined)
              .map(mission => (
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
                gaveUpButtonSrc={imgGiveUp}
                challengeSuccessButtonSrc={imgChallengeSuccess}
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
                status={shippingProducts.includes('shop-1') ? 'shipping' : 'available'}
                statusImageSrc={imgImage59}
                onClick={() => {
                  if (shippingProducts.includes('shop-1')) {
                    setShowShippingPopup(true);
                  } else {
                    setSelectedProduct({ id: 'shop-1', title: "유튜브시청20분", price: "-1" });
                    setShowExchangePopup(true);
                  }
                }}
             />

             <ShopItem
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status={shippingProducts.includes('shop-2') ? 'shipping' : 'available'}
                statusImageSrc={imgImage59}
                onClick={() => {
                  if (shippingProducts.includes('shop-2')) {
                    setShowShippingPopup(true);
                  } else {
                    setSelectedProduct({ id: 'shop-2', title: "엄마랑 1시간 놀기", price: "-1" });
                    setShowExchangePopup(true);
                  }
                }}
             />

             <ShopItem
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status="soldout"
                statusImageSrc={imgLabelSoldOut}
                onClick={() => setShowSoldOutPopup(true)}
             />

             <ShopItem
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status="shipping"
                statusImageSrc={imgImage59}
                onClick={() => setShowShippingPopup(true)}
             />

             <ShopItem
                title="엄마랑 1시간 놀기"
                price="-1"
                iconSrc={imgImage46}
                status="delivered"
                statusImageSrc={imgImage60}
                onClick={() => setShowDeliveredPopup(true)}
             />
          </>
        )}
      </motion.div>

      {/* Layer 7: Fixed Bottom Navigation (Z-Index 30) */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] z-30">
        {/* Active tab indicator */}
        <div className="absolute left-0 top-[803px] w-[133px] h-[46px]" style={{ top: 'auto', bottom: '3px' }}>
          <img alt="" className="block max-w-none size-full" src={imgGroup60} />
        </div>

        {/* Tab Labels */}
        <p className="absolute left-[68px] bottom-[8px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-white leading-[1.5]">
          미션홈
        </p>
        <p
          className="absolute left-[197.5px] bottom-[8px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-[rgba(255,255,255,0.3)] leading-[1.5] cursor-pointer"
          onClick={() => navigate("/ranking")}
        >
          랭킹전
        </p>
        <p className="absolute left-[332.5px] bottom-[8px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-[rgba(255,255,255,0.3)] leading-[1.5]">
          성장보고서
        </p>
      </div>



      </div>

      {/* 미션완료 팝업 */}
      {showCompletePopup && (
        <MissionCompletePopup
          onClose={() => setShowCompletePopup(false)}
          onConfirm={handleMissionCompleteConfirm}
        />
      )}

      {/* 상품 교환 확인 팝업 */}
      {showExchangePopup && (
        <ExchangeConfirmPopup
          productName={selectedProduct?.title}
          onConfirm={() => {
            if (selectedProduct?.id) {
              setShippingProducts(prev => [...prev, selectedProduct.id]);
            }
            setShowExchangePopup(false);
            setSelectedProduct(null);
          }}
          onCancel={() => {
            setShowExchangePopup(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* 품절 팝업 */}
      {showSoldOutPopup && (
        <SoldOutPopup onClose={() => setShowSoldOutPopup(false)} />
      )}

      {/* 배송중 팝업 */}
      {showShippingPopup && (
        <ShippingPopup onClose={() => setShowShippingPopup(false)} />
      )}

      {/* 배송완료 팝업 */}
      {showDeliveredPopup && (
        <DeliveredPopup onClose={() => setShowDeliveredPopup(false)} />
      )}

      {/* 만든개발자 팝업 */}
      {showDeveloperPopup && (
        <DeveloperInfoPopup onClose={() => setShowDeveloperPopup(false)} />
      )}

      {/* 프로필 선택 모달 */}
      {showProfileModal && (
        <ProfileSelectModal
          onClose={() => setShowProfileModal(false)}
          onConfirm={(profileId, borderId) => {
            setSelectedProfileImg(PROFILE_MAP[profileId] ?? null);
            const borderMap: Record<string, string> = {
              b1: "#37e59a", b2: "#ffb0ef", b3: "#ffe550", b4: "#ff7878",
            };
            if (borderId) setSelectedBorderColor(borderMap[borderId] ?? null);
          }}
        />
      )}
    </div>
  );
}