import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgGroup65 from "figma:asset/828dccdb78cf88858262c06ca9ea0e73aca67f21.svg";
import imgMenuBg from "figma:asset/70341e8811fcb0d7f9739fd52adbed0b2f9efb83.svg";
import DeveloperInfoPopup from "./DeveloperInfoPopup";
import ModeChangePopup from "./ModeChangePopup";
import MissionCompletePopup from "./MissionCompletePopup";
import SoloMissionCompletePopup from "./SoloMissionCompletePopup";
import { useMissions, MISSION_STATUS_PRIORITY, MissionStatus } from "@/app/context/MissionContext";
import imgImage51 from "figma:asset/25e22a55b2742b552f58579327786ada9e64aa32.png";
import imgImage92 from "figma:asset/40787136f6fb551d30f83647db8d86726e3ea97e.png";
import imgImage52 from "figma:asset/c368e03333cec45fed8236b2ca94b1f8e78c82d4.png";
import imgImage91 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";
import imgCoin from "figma:asset/4e34cf3a2b2ddea240a98b7184299dc4893e0819.png";
import imgImage45 from "figma:asset/fb2306265cb70042010e7f9b17540ae4244eb277.png";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage50 from "figma:asset/06750638a04f2b3069b1057f814539a0302a2245.png";
import imgImage37 from "figma:asset/409eeaf8b8d3d94dd075d0b92daaa9b7111bd5df.png";
import imgGiveUp from "figma:asset/8e84a045d8b268a46a68ba2858691647755a8a10.png";
import imgChallengeSuccess from "figma:asset/5e53b1193805a5d5a43f46e2a3b6fa73f6e30911.png";
import imgImage38 from "figma:asset/8148c67e4f82e7c37584d8a139dd13503abe9306.png";
import imgImage40 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";
import imgHamberger from "figma:asset/cbce2ab124aac67762a2b6ddf11aaa5defb044a4.png";
import imgImage74 from "figma:asset/bf6aba8970b6e0b45897fd2685ac7ef492144c8e.png";
import imgImage77 from "figma:asset/cf6022d6ba1edae48e648736e5f3c30ba3130330.png";
import imgImage78 from "figma:asset/3c073d66f9a0c48e0d7e037390e6668aad752c1b.png";
import imgImage41 from "figma:asset/fff6d42b3b5957c3ef2140ea9b993bb9db708049.png";
import imgRectangle35 from "figma:asset/3d0b785a346010a999a1dd72bd6a85f46b406120.svg";
import imgRectangle36 from "figma:asset/1b86b0b73492988a03570aa79198a7343522a435.svg";
import imgGroup60 from "figma:asset/c4338e4775c77da0d1a7c6298fbcf6dcf9b27fe8.svg";
import { motion } from "motion/react";
import MissionProposeModal from "@/imports/MissionProposeModal";
import MissionEditModal from "@/imports/MissionEditModal";
import ProductCreatePopup from "./ProductCreatePopup";
import imgGroup162 from "figma:asset/917899768af2bdc82d70468ecf8b2eb6609ea73e.svg";
import imgVector33 from "figma:asset/8bbc46cfe39b6598c0850fb42ba5033d3d519f0a.svg";
import imgRectangle40 from "figma:asset/9012c968cdceedd9c681ae5f0166c2741293028d.svg";
import imgRectangle58 from "figma:asset/c3f5fe2546bc6c4b9e38f46ce9daabe49907b3ee.svg";
import imgRectangle59 from "figma:asset/3e12aad1589bea607277e5580ba3864852198247.svg";
import imgShopCard from "figma:asset/1b26f984fa85514e442de5d0e874d1b8f381cdfd.svg";
import imgShopPrice from "figma:asset/dc98638283e39420c57bbd4a6696268ee91b7adf.svg";
import imgShopSoldout from "figma:asset/36c759c24a8ff334d106fa44da201597f8ea241b.svg";
import svgPaths from "@/imports/svg-pjyub6r4mi";

const textOutline3px = {
  textShadow: `
    -3px -3px 0 #45270B, 3px -3px 0 #45270B, -3px 3px 0 #45270B, 3px 3px 0 #45270B,
    0 -3px 0 #45270B, 0 3px 0 #45270B, -3px 0 0 #45270B, 3px 0 0 #45270B,
    -2px -3px 0 #45270B, 2px -3px 0 #45270B, -2px 3px 0 #45270B, 2px 3px 0 #45270B,
    -3px -2px 0 #45270B, 3px -2px 0 #45270B, -3px 2px 0 #45270B, 3px 2px 0 #45270B
  `,
};

// 오늘 날짜를 한국어 형식으로 포맷하는 함수
const getTodayDateString = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayNames[today.getDay()];
  return `${month}월 ${date}일(${day}) 오늘의 미션`;
};

interface MissionCardProps {
  bgColor: string;
  barColor: string;
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

const SoloMissionCard = ({ bgColor, barColor, title, subtitle, rewardText, iconSrc, buttonSrc, inProgressButtonSrc, gaveUpButtonSrc, challengeSuccessButtonSrc, completedButtonSrc, svgPath, status = 'active', onButtonClick }: MissionCardProps) => {
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
      <div className="absolute inset-0 top-[6px] rounded-[16px] bg-[#45270b]" />
      <div className="absolute inset-0 rounded-[16px]" style={{ backgroundColor: displayBgColor }} />
      <div className="absolute left-0 bottom-0 w-[361px] h-[47px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
          <path d={svgPath} fill={displayBarColor} />
        </svg>
      </div>
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
        <div className="absolute left-[25px] top-[15px] size-[66px]">
          <img alt="icon" className="w-full h-full object-cover" src={iconSrc} />
        </div>
        <div className="absolute right-[10px] bottom-[10px] h-[56px] w-[142px]">
          <img alt="button" className="w-full h-full object-contain" src={displayButtonSrc} />
        </div>
      </div>
    </button>
  );
};

export default function SoloHomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeveloperPopup, setShowDeveloperPopup] = useState(false);
  const [showModeChangePopup, setShowModeChangePopup] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
  const [subTab, setSubTab] = useState<'list' | 'manage' | 'cheer'>('list');
  const [missionEnabled, setMissionEnabled] = useState<Record<string, boolean>>({
    '1': true,
    '2': false,
  });
  const [isMissionProposeOpen, setIsMissionProposeOpen] = useState(false);
  const [editingMission, setEditingMission] = useState<{ id: string; title: string; subtitle: string; reward: number } | null>(null);
  const [cheerMessage, setCheerMessage] = useState('');
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  const [sentMessages, setSentMessages] = useState<string[]>(['오늘도 열심히 잘 했어!', '지금처럼 쭉 가자~~']);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [showSoloCelebration, setShowSoloCelebration] = useState(false);
  const [completingMissionId, setCompletingMissionId] = useState<string | null>(null);
  const [missionOrder, setMissionOrder] = useState<string[]>([]);

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

  // 완료된 미션 처리
  useEffect(() => {
    const state = location.state as { completedMissionId?: string } | null;
    if (state?.completedMissionId) {
      updateMissionStatus(state.completedMissionId, 'completed');
      window.history.replaceState({}, document.title);
    }
  }, [location.state, updateMissionStatus]);

  // 미션 카드 클릭 핸들러
  const handleMissionButtonClick = (mission: typeof missions[0]) => {
    if (mission.status === 'active') {
      updateMissionStatus(mission.id, 'in_progress');
    } else if (mission.status === 'in_progress') {
      // 솔로홈은 진행중 클릭 시 미션완료 축하 화면
      setCompletingMissionId(mission.id);
      setShowSoloCelebration(true);
    } else if (mission.status === 'challenge_success') {
      setCompletingMissionId(mission.id);
      setShowCompletePopup(true);
    } else if (mission.status === 'completed') {
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

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-white h-[852px] relative w-[393px] overflow-hidden" data-name="홈화면_솔로">
        {/* Background Layer 1: Sky */}
        <div className="absolute h-[854px] left-[-1px] top-[-2px] w-[394px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage51} />
        </div>

        {/* Background Layer 2: Character */}
        <div className="absolute h-[152px] left-[141px] top-[48px] w-[118px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage92} />
        </div>

        {/* Background Layer 3: Brown Frame */}
        <div className="absolute h-[803px] left-0 top-0 w-[394px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
        </div>

        {/* Profile */}
        <div className="absolute bg-[#291608] h-[45px] left-[16px] rounded-[8px] top-[11px] w-[109px]" />
        <div className="absolute bg-[#072] left-[15px] rounded-[8px] size-[45px] top-[11px]" />
        <div className="absolute h-[35px] left-[17px] top-[19px] w-[40px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[134.55%] left-0 max-w-none top-[-0.13%] w-[112.5%]" src={imgImage91} />
          </div>
        </div>
        <div className="absolute border-3 border-[#00da62] border-solid left-[15px] rounded-[8px] size-[45px] top-[11px]" />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[67px] top-[20px] leading-[1.5] text-[18px] text-center text-white whitespace-nowrap">
          김쭈니
        </p>

        {/* Coin */}
        <div className="absolute bg-[#291608] h-[31px] left-[147px] rounded-[8px] top-[15px] w-[75px]" />
        <div className="absolute left-[130px] size-[40px] top-[11px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCoin} />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[201px] top-[17px] leading-[1.5] text-[18px] text-center text-white -translate-x-1/2">
          5
        </p>

        {/* Hamburger */}
        <div
          className="absolute left-[323px] top-[15px] cursor-pointer z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="absolute bg-[#644f41] rounded-[8px] size-[50px]" />
          <div className="absolute h-[25px] left-[11px] top-[12px] w-[28px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHamberger} />
          </div>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute left-[173px] top-[73px] z-50">
            {/* 메뉴 배경 */}
            <div className="absolute top-0 left-0 w-[200px] h-[202px]">
              <img alt="" className="block max-w-none size-full" src={imgMenuBg} />
            </div>

            {/* 메뉴 항목들 */}
            <div className="absolute left-[10px] top-[10px] flex flex-col gap-[10px] w-[180px]">
              {/* 모드 변경 */}
              <button
                className="relative w-[180px] h-[38px] cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowModeChangePopup(true);
                }}
              >
                <div className="absolute inset-0 bg-[#b9915e] border border-[#f0c58f] rounded-[6px]" />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  모드 변경
                </p>
              </button>

              {/* 만든개발자 */}
              <button
                className="relative w-[180px] h-[38px] cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowDeveloperPopup(true);
                }}
              >
                <div className="absolute inset-0 bg-[#b9915e] border border-[#f0c58f] rounded-[6px]" />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  만든개발자
                </p>
              </button>

              {/* 알림 */}
              <button
                className="relative w-[180px] h-[38px] cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open('https://cafe.naver.com/f-e/cafes/31663026/menus/1?viewType=L', '_blank');
                }}
              >
                <div className="absolute inset-0 bg-[#b9915e] border border-[#f0c58f] rounded-[6px]" />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  알림
                </p>
              </button>

              {/* 로그아웃 */}
              <button
                className="relative w-[180px] h-[38px] cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/");
                }}
              >
                <div className="absolute inset-0 bg-[#b9915e] border border-[#f0c58f] rounded-[6px]" />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  로그아웃
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Speech Bubble */}
        <div className="absolute h-[50px] left-[43px] top-[76px] w-[130px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage77} />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[43px] top-[76px] w-[130px] h-[50px] flex items-center justify-center leading-[1.5] text-[#291608] text-[18px]">
          오늘은 몇점?
        </p>

        {/* Score */}
        <div className="absolute h-[49px] left-[62px] top-[138px] w-[70px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage78} />
        </div>

        {/* Sparkles */}
        <div className="absolute left-[336px] size-[17px] top-[121px] pointer-events-none">
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImage40} />
        </div>
        <div className="absolute left-[111px] size-[21px] top-[105px] pointer-events-none">
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImage40} />
        </div>
        <div className="absolute left-[353px] size-[13px] top-[88px] pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage40} />
          </div>
        </div>
        <div className="absolute h-[53px] left-[297px] top-[142px] w-[56px] pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[149.06%] left-[-454.95%] max-w-none top-[-49.06%] w-[556.34%]" src={imgImage74} />
          </div>
        </div>

        {/* Main Tabs: 미션 / 소원 상점 */}
        <div className="absolute bg-[#45270B] h-[57px] left-0 top-[195px] w-[394px] pointer-events-none" />
        <div
          className="absolute bg-[#875224] h-[47px] top-[205px] w-[197px] rounded-t-[16px] transition-all pointer-events-none"
          style={{ left: activeTab === 'mission' ? '0px' : '197px' }}
        />
        <button
          className="absolute left-0 top-[195px] w-[197px] h-[57px] cursor-pointer z-10"
          onClick={() => setActiveTab('mission')}
        >
          <p
            className="absolute inset-0 flex items-center justify-center pt-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[22px] text-center text-white"
            style={{ ...textOutline3px, opacity: activeTab === 'mission' ? 1 : 0.3 }}
          >
            미션
          </p>
        </button>
        <button
          className="absolute left-[197px] top-[195px] w-[197px] h-[57px] cursor-pointer z-10"
          onClick={() => setActiveTab('shop')}
        >
          <p
            className="absolute inset-0 flex items-center justify-center pt-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[22px] text-center text-white"
            style={{ ...textOutline3px, opacity: activeTab === 'shop' ? 1 : 0.3 }}
          >
            소원 상점
          </p>
        </button>

        {/* Sub Tabs: 미션 목록 / 미션 관리 / 응원하기 */}
        {activeTab === 'mission' && (
          <>
            <div className="absolute bg-[#4c2b0f] h-[37px] left-[16px] rounded-[8px] top-[267px] w-[361px]">
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
            </div>
            <div
              className="absolute bg-[#b9915e] border-2 border-[#f0c58f] border-solid h-[37px] rounded-[8px] top-[267px] w-[120px] transition-all z-[1]"
              style={{ left: subTab === 'list' ? '16px' : subTab === 'manage' ? '136px' : '257px' }}
            />
            <p
              className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[75.5px] text-[18px] text-center text-white top-[272px] cursor-pointer z-10"
              style={{ ...textOutline3px, opacity: subTab === 'list' ? 1 : 0.3 }}
              onClick={() => setSubTab('list')}
            >
              미션 목록
            </p>
            <p
              className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[196px] text-[18px] text-center text-white top-[272px] cursor-pointer z-10"
              style={{ ...textOutline3px, opacity: subTab === 'manage' ? 1 : 0.3 }}
              onClick={() => setSubTab('manage')}
            >
              미션 관리
            </p>
            <p
              className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[316.5px] text-[18px] text-center text-white top-[272px] cursor-pointer z-10"
              style={{ ...textOutline3px, opacity: subTab === 'cheer' ? 1 : 0.3 }}
              onClick={() => setSubTab('cheer')}
            >
              응원하기
            </p>
          </>
        )}

        {/* Date Header */}
        {activeTab === 'mission' && subTab === 'list' && (
          <>
            <div className="absolute bg-[#532807] h-[47px] left-[16px] rounded-[8px] top-[314px] w-[361px]" />
            <div className="absolute h-[26px] left-[29px] top-[324px] w-[31px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage45} />
            </div>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[16px] top-[314px] w-[361px] h-[47px] flex items-center justify-center leading-[1.5] text-[18px] text-center text-white">
              {getTodayDateString()}
            </p>
          </>
        )}

        {/* Mission Cards (Scrollable) */}
        {activeTab === 'mission' && subTab === 'list' && (
          <div className="absolute left-0 top-[365px] w-[393px] bottom-[49px] overflow-y-auto px-[16px] pt-[10px]">
            {missionOrder
              .map(id => missions.find(m => m.id === id))
              .filter((mission): mission is typeof missions[0] => mission !== undefined)
              .map(mission => (
              <SoloMissionCard
                key={mission.id}
                bgColor={mission.bgColor}
                barColor={mission.barColor}
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
          </div>
        )}

        {/* 미션 관리 Content */}
        {activeTab === 'mission' && subTab === 'manage' && (
          <>
            {/* 미션 만들기 버튼 */}
            <div
              className="absolute left-[16px] top-[314px] w-[361px] h-[52px] cursor-pointer active:scale-95 transition-transform"
              onClick={() => setIsMissionProposeOpen(true)}
            >
              <div className="absolute bg-[#45270b] h-[47px] left-0 rounded-[8px] top-[5px] w-[361px]" />
              <div className="absolute bg-[#feb700] h-[47px] left-0 rounded-[8px] top-0 w-[361px]" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607] text-center">
                미션 만들기
              </p>
            </div>

            {/* 미션 관리 카드 목록 */}
            <div className="absolute left-0 top-[370px] w-[393px] bottom-[49px] overflow-y-auto">
              <div className="relative w-full pb-[20px]">
                {/* Card 1 */}
                <div
                  className="relative w-[361px] h-[152px] mx-auto mt-[6px] cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => setEditingMission({ id: '1', title: '구몬학습지 풀기', subtitle: 'p7~p15까지 할 수 있지?', reward: 1 })}
                >
                  <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
                  <div className="absolute bg-[#f2e1be] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
                  <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
                    <img alt="" className="block max-w-none size-full" src={imgRectangle35} />
                  </div>
                  <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[53px] top-[108px] leading-[1.5] text-[18px] text-[#492607] text-center">
                    보상 : 칭찬코인 +1
                  </p>
                  <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] leading-[1.5] text-[20px] text-[#492607]">
                    구몬학습지 풀기
                  </p>
                  <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[48px] leading-[1.5] text-[20px] text-[#492607]">
                    p7~p15까지 할 수 있지?
                  </p>
                  <div className="absolute left-[9px] size-[66px] top-[15px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
                  </div>
                  {/* 수정하기 버튼 */}
                  <div className="absolute left-[292px] top-[8px] w-[76px] h-[27px]">
                    <div className="absolute bg-[#5e4334] border-4 border-[#392722] border-solid inset-0 rounded-[2px]" />
                    <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[16px] text-center text-white">
                      수정하기
                    </p>
                  </div>
                  <div className="absolute h-[10.5px] left-[361px] top-[35.5px] w-[8.5px]">
                    <img alt="" className="block max-w-none size-full" src={imgVector33} />
                  </div>
                  {/* 토글 스위치 */}
                  <div
                    className="absolute left-[278px] top-[108px] w-[68px] h-[30px] cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setMissionEnabled(prev => ({ ...prev, '1': !prev['1'] })); }}
                  >
                    <div className={`absolute left-0 top-[4px] w-[68px] h-[23px] rounded-[6px] ${missionEnabled['1'] ? 'bg-[#e59114]' : 'bg-[#b4b3b3]'}`}>
                      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.25)]" />
                    </div>
                    <div
                      className={`absolute top-0 size-[30px] rounded-[6px] border-2 transition-all ${missionEnabled['1'] ? 'left-[38px] bg-[#fff0da] border-[#916626]' : 'left-0 bg-[#e5e5e5] border-[#919191]'}`}
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="relative w-[361px] h-[152px] mx-auto mt-[10px] cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => setEditingMission({ id: '2', title: '태권도 학원 가기', subtitle: '학원 갔다오는게 어때?', reward: 1 })}
                >
                  <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
                  <div className="absolute bg-[#f2e1be] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
                  <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
                    <img alt="" className="block max-w-none size-full" src={imgRectangle35} />
                  </div>
                  <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[53px] top-[108px] leading-[1.5] text-[18px] text-[#492607] text-center">
                    보상 : 칭찬코인 +1
                  </p>
                  <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] leading-[1.5] text-[20px] text-[#492607]">
                    태권도 학원 가기
                  </p>
                  <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[48px] leading-[1.5] text-[20px] text-[#492607]">
                    학원 갔다오는게 어때?
                  </p>
                  <div className="absolute left-[9px] size-[66px] top-[15px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
                  </div>
                  {/* 수정하기 버튼 */}
                  <div className="absolute left-[292px] top-[8px] w-[76px] h-[27px]">
                    <div className="absolute bg-[#5e4334] border-4 border-[#392722] border-solid inset-0 rounded-[2px]" />
                    <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[16px] text-center text-white">
                      수정하기
                    </p>
                  </div>
                  <div className="absolute h-[10.5px] left-[361px] top-[35.5px] w-[8.5px]">
                    <img alt="" className="block max-w-none size-full" src={imgVector33} />
                  </div>
                  {/* 토글 스위치 */}
                  <div
                    className="absolute left-[278px] top-[108px] w-[68px] h-[30px] cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setMissionEnabled(prev => ({ ...prev, '2': !prev['2'] })); }}
                  >
                    <div className={`absolute left-0 top-[4px] w-[68px] h-[23px] rounded-[6px] ${missionEnabled['2'] ? 'bg-[#e59114]' : 'bg-[#b4b3b3]'}`}>
                      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.25)]" />
                    </div>
                    <div
                      className={`absolute top-0 size-[30px] rounded-[6px] border-2 transition-all ${missionEnabled['2'] ? 'left-[38px] bg-[#fff0da] border-[#916626]' : 'left-0 bg-[#e5e5e5] border-[#919191]'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 응원하기 Content */}
        {activeTab === 'mission' && subTab === 'cheer' && (
          <>
            {/* 응원 메세지 보내기 */}
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[16px] top-[319px] leading-[1.5] text-[20px] text-white">
              응원 메세지 보내기
            </p>

            {/* 입력 필드 */}
            <div className="absolute left-[16px] top-[359px] w-[362px] h-[60px]">
              <img alt="" className="absolute inset-0 max-w-none size-full pointer-events-none" src={imgRectangle40} />
              <input
                type="text"
                value={cheerMessage}
                onChange={(e) => setCheerMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === 'Enter' && cheerMessage.trim()) {
                    setSentMessages(prev => [cheerMessage.trim(), ...prev]);
                    setCheerMessage('');
                  }
                }}
                placeholder="오늘의 응원 한마디"
                className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
              />
            </div>

            {/* 최근에 보낸 메시지 */}
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[16px] top-[434px] leading-[1.5] text-[20px] text-white">
              최근에 보낸 메시지
            </p>

            {/* 메시지 목록 */}
            <div className="absolute left-0 top-[474px] w-[393px] bottom-[49px] overflow-y-auto">
              <div className="relative w-full pb-[20px]">
                {sentMessages.map((msg, index) => (
                  <div key={index} className="relative w-[362px] h-[69px] mx-auto" style={{ marginTop: index === 0 ? 0 : '5px' }}>
                    <div className="absolute left-0 top-[5px] w-[362px] h-[64px]">
                      <img alt="" className="block max-w-none size-full" src={imgRectangle59} />
                    </div>
                    <div className="absolute left-0 top-0 w-[362px] h-[64px]">
                      <img alt="" className="block max-w-none size-full" src={imgRectangle58} />
                    </div>
                    <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-[#492607] text-center">
                      {msg}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 소원 상점 */}
        {activeTab === 'shop' && (
          <div className="absolute left-0 top-[260px] w-[393px] bottom-[49px] overflow-y-auto">
            <div className="relative w-full pb-[20px]">
              {/* 상품 올리기 버튼 */}
              <div
                className="relative w-[361px] h-[52px] mx-auto mt-[10px] cursor-pointer active:scale-95 transition-transform"
                onClick={() => setShowProductCreatePopup(true)}
              >
                <div className="absolute bg-[#45270b] left-0 top-[5px] w-[361px] h-[47px] rounded-[8px]" />
                <div className="absolute bg-[#feb700] left-0 top-0 w-[361px] h-[47px] rounded-[8px]" />
                <p className="absolute left-0 top-0 w-[361px] h-[47px] flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
                  상품 올리기
                </p>
              </div>

              {/* 상품 1: 일반 */}
              <div className="relative w-[362px] h-[93px] mx-auto mt-[10px]">
                <div className="absolute bg-[#45270b] h-[82px] left-0 rounded-[8px] top-[11px] w-[361px]" />
                <div className="absolute h-[87px] left-0 top-0 w-[362px]">
                  <img alt="" className="block max-w-none size-full" src={imgShopCard} />
                </div>
                <div className="absolute h-[87px] left-[282px] top-0 w-[80px]">
                  <img alt="" className="block max-w-none size-full" src={imgShopPrice} />
                </div>
                <div className="absolute left-[10px] size-[66px] top-[11px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
                </div>
                <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[88px] top-[33px] leading-[1.5] text-[20px] text-[#291608] text-center">
                  유튜브시청20분
                </p>
                <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[295px] top-[8px] w-[55px] leading-[1.5] text-[15px] text-[#291608] text-center">
                  칭찬코인
                </p>
                <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[295px] top-[30px] w-[55px] leading-[1.5] text-[26px] text-[#291608] text-center">
                  -1
                </p>
              </div>

              {/* 상품 2: 품절 */}
              <div className="relative w-[362px] h-[93px] mx-auto mt-[10px]">
                <div className="absolute bg-[#45270b] h-[82px] left-0 rounded-[8px] top-[11px] w-[361px]" />
                <div className="absolute h-[87px] left-0 top-0 w-[362px]">
                  <img alt="" className="block max-w-none size-full" src={imgShopCard} />
                </div>
                <div className="absolute h-[87px] left-[282px] top-0 w-[80px]">
                  <img alt="" className="block max-w-none size-full" src={imgShopPrice} />
                </div>
                <div className="absolute left-[10px] size-[66px] top-[11px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
                </div>
                <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[88px] top-[33px] leading-[1.5] text-[20px] text-[#291608] text-center">
                  유튜브시청20분
                </p>
                <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[295px] top-[8px] w-[55px] leading-[1.5] text-[15px] text-[#291608] text-center">
                  칭찬코인
                </p>
                <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[295px] top-[30px] w-[55px] leading-[1.5] text-[26px] text-[#291608] text-center">
                  -1
                </p>
                {/* 품절 오버레이 */}
                <div className="absolute h-[87px] left-0 top-0 w-[362px]">
                  <img alt="" className="block max-w-none size-full" src={imgShopSoldout} />
                </div>
                <div className="absolute bg-[#feb700] h-[47px] left-[100px] rounded-[8px] top-[23px] w-[161px] cursor-pointer active:scale-95 transition-transform">
                  <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607] text-center">
                    품절상품 채우기
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="absolute left-0 top-[803px] w-[393px] h-[49px] bg-[#45270B]" />
        <div className="absolute h-[46px] left-0 top-[803px] w-[133px]">
          <img alt="" className="block max-w-none size-full" src={imgGroup60} />
        </div>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[68px] text-[21px] text-center text-white top-[814px]">
          미션홈
        </p>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[197.5px] text-[21px] text-[rgba(255,255,255,0.3)] text-center top-[814px] cursor-pointer" onClick={() => navigate("/solo-ranking")}>
          랭킹전
        </p>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[332.5px] text-[21px] text-[rgba(255,255,255,0.3)] text-center top-[814px]">
          성장보고서
        </p>
      </div>

      {/* Product Create Popup */}
      {showProductCreatePopup && (
        <ProductCreatePopup
          onClose={() => setShowProductCreatePopup(false)}
          onConfirm={() => setShowProductCreatePopup(false)}
        />
      )}

      {/* Mission Edit Modal */}
      {editingMission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100"
        >
          <MissionEditModal
            className="w-[393px] h-full max-h-screen overflow-y-auto bg-[#733e14]"
            mission={editingMission}
            onClose={() => setEditingMission(null)}
          />
        </motion.div>
      )}

      {/* Mission Propose Modal */}
      {isMissionProposeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100"
        >
          <MissionProposeModal
            className="w-[393px] h-full max-h-screen overflow-y-auto bg-[#733e14]"
            onClose={() => setIsMissionProposeOpen(false)}
          />
        </motion.div>
      )}
      {showDeveloperPopup && (
        <DeveloperInfoPopup onClose={() => setShowDeveloperPopup(false)} />
      )}

      {/* 모드 변경 팝업 */}
      {showModeChangePopup && (
        <ModeChangePopup onClose={() => setShowModeChangePopup(false)} />
      )}

      {/* 미션완료 팝업 */}
      {showCompletePopup && (
        <MissionCompletePopup
          onClose={() => setShowCompletePopup(false)}
          onConfirm={handleMissionCompleteConfirm}
        />
      )}

      {/* 솔로 미션완료 축하 화면 */}
      {showSoloCelebration && (
        <SoloMissionCompletePopup
          onConfirm={() => {
            if (completingMissionId) {
              updateMissionStatus(completingMissionId, 'completed');
              setCompletingMissionId(null);
            }
            setShowSoloCelebration(false);
          }}
        />
      )}
    </div>
  );
}
