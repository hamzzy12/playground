import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import svgPaths from "@/imports/svg-disegqpe5s";
import svgPathsMenu from "@/imports/svg-suvnghhced";
import svgPathsShop from "@/imports/svg-lp98h8m8qs";
import MissionCreateModal from "@/imports/MissionCreateModal";
import MissionProposeModal from "@/imports/MissionProposeModal";
import AlertPopup from "@/imports/AlertPopup";
import MissionCard, { Mission } from "./MissionCard";
import DeveloperInfoPopup from "./DeveloperInfoPopup";
import ProductCreatePopup from "./ProductCreatePopup";
import ProductEditPopup from "./ProductEditPopup";
import ProductRefillPopup from "./ProductRefillPopup";
import ProductRewardPopup from "./ProductRewardPopup";
import MissionEditPopup from "./MissionEditPopup";
import ModeChangePopup from "./ModeChangePopup";
import imgImage51 from "figma:asset/25e22a55b2742b552f58579327786ada9e64aa32.png";
import imgImage92 from "figma:asset/40787136f6fb551d30f83647db8d86726e3ea97e.png";
import imgImage52 from "figma:asset/c368e03333cec45fed8236b2ca94b1f8e78c82d4.png";
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
import imgImage54 from "figma:asset/7717fbadfaff2519242403e5e5201a7517a295a2.png";
import imgImage74 from "figma:asset/bf6aba8970b6e0b45897fd2685ac7ef492144c8e.png";
import imgImage77 from "figma:asset/cf6022d6ba1edae48e648736e5f3c30ba3130330.png";
import imgImage78 from "figma:asset/3c073d66f9a0c48e0d7e037390e6668aad752c1b.png";
import imgImage93 from "figma:asset/eba2402ddf5af3fb43d9eb1bd727ab2d2a790348.png";
import imgShopBadge from "figma:asset/dc98638283e39420c57bbd4a6696268ee91b7adf.svg";
import imgNavTab from "figma:asset/c4338e4775c77da0d1a7c6298fbcf6dcf9b27fe8.svg";
import imgBarYellow from "figma:asset/3d0b785a346010a999a1dd72bd6a85f46b406120.svg";
import imgBarPurple from "figma:asset/1b86b0b73492988a03570aa79198a7343522a435.svg";
import imgBarGreen from "figma:asset/d87a12be099e7914ee0d9d86d176b2b02be99701.svg";
import imgMainTabMission from "figma:asset/917899768af2bdc82d70468ecf8b2eb6609ea73e.svg";
import imgMainTabShop from "figma:asset/5e41aca0a7ea2967ff0e7ce1012d70d64a5a9d8f.svg";
import imgCardBg from "figma:asset/1b26f984fa85514e442de5d0e874d1b8f381cdfd.svg";
import imgCardOverlay from "figma:asset/36c759c24a8ff334d106fa44da201597f8ea241b.svg";
import imgVector33 from "figma:asset/8bbc46cfe39b6598c0850fb42ba5033d3d519f0a.svg";
import imgEditBtn from "figma:asset/799e50dfe7b7023b5b89d5b87d6f541e8e517937.png";
import imgToggleOn from "figma:asset/53f85dfeb2f6b438582311a06991c630d2551111.svg";
import imgToggleOff from "figma:asset/4c3c0360ff1b8b3b2e4a23e9fd5542b76ca16eab.svg";
import imgCheerInput from "figma:asset/9012c968cdceedd9c681ae5f0166c2741293028d.svg";
import imgCheerCardBg from "figma:asset/c3f5fe2546bc6c4b9e38f46ce9daabe49907b3ee.svg";
import imgCheerCardShadow from "figma:asset/3e12aad1589bea607277e5580ba3864852198247.svg";
import imgChildSelectBg from "figma:asset/245c20d676c834a6ee62c555210ef1ea0727f8d4.svg";
import imgMenuBg from "figma:asset/70341e8811fcb0d7f9739fd52adbed0b2f9efb83.svg";

export default function ParentHomeScreen() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeveloperPopup, setShowDeveloperPopup] = useState(false);
  const [showModeChangePopup, setShowModeChangePopup] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  const [isMissionCreateOpen, setIsMissionCreateOpen] = useState(false);
  const [isMissionProposeOpen, setIsMissionProposeOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [refillingProductId, setRefillingProductId] = useState<string | null>(null);
  const [rewardingProductId, setRewardingProductId] = useState<string | null>(null);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [subTab, setSubTab] = useState<'list' | 'manage' | 'cheer'>('list');
  const [missionEnabled, setMissionEnabled] = useState<Record<string, boolean>>({ '1': true, '2': false, '3': true });
  const [cheerMessage, setCheerMessage] = useState('');
  const [cheerHistory, setCheerHistory] = useState<string[]>(['오늘도 열심히 잘 했어!', '지금처럼 쭉 가자~~']);
  const [isChildSelectOpen, setIsChildSelectOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState('김쭈니');
  const [children] = useState(['김쭈니', '김나나']);

  // 소원상점 상품 목록
  interface ShopProduct {
    id: string;
    name: string;
    price: number;
    iconSrc: string | null;
    status: 'available' | 'soldout' | 'shipping' | 'delivered';
  }
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([
    { id: '1', name: '유튜브시청20분', price: 1, iconSrc: null, status: 'available' },
    { id: '2', name: '유튜브시청20분', price: 1, iconSrc: null, status: 'soldout' },
    { id: '3', name: '유튜브시청20분', price: 1, iconSrc: null, status: 'delivered' },
  ]);

  // 미션 목록 상태
  const initialMissions: Mission[] = [
    {
      id: '1',
      title: '구몬학습지 풀기',
      description: 'p7~p15까지 할 수 있지?',
      reward: 1,
      backgroundColor: '#f2e1be',
      bottomBarColor: '#FEB700',
      status: 'completed'
    },
    {
      id: '2',
      title: '태권도 학원 가기',
      description: '학원 갔다오는게 어때?',
      reward: 1,
      backgroundColor: '#f5eaf8',
      bottomBarColor: '#C07FE5',
      status: 'active'
    },
    {
      id: '3',
      title: '학교 숙제 하기',
      description: '학교 복습 빼먹지마~',
      reward: 1,
      backgroundColor: '#e8f6ed',
      bottomBarColor: '#5EE2A0',
      status: 'active'
    }
  ];
  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  // 미션 추가 함수
  const handleCreateMission = (missionTitle: string, missionDescription: string, missionReward: number, frequency: string) => {
    const colors = [
      { bg: '#f2e1be', bar: '#FEB700' },
      { bg: '#f5eaf8', bar: '#C07FE5' },
      { bg: '#e8f6ed', bar: '#5EE2A0' },
      { bg: '#fef5e7', bar: '#F39C12' },
      { bg: '#ebf5fb', bar: '#3498DB' }
    ];
    
    const colorIndex = missions.length % colors.length;
    
    const newMission: Mission = {
      id: Date.now().toString(),
      title: missionTitle || '새로운 미션',
      description: missionDescription || '',
      reward: missionReward || 1,
      backgroundColor: colors[colorIndex].bg,
      bottomBarColor: colors[colorIndex].bar,
      status: 'active'
    };
    
    setMissions([newMission, ...missions]);
    setIsMissionProposeOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-white h-[852px] relative w-[393px] overflow-hidden" data-name="ParentHomeScreen.tsx">
      {/* Background Images */}
      <div className="absolute h-[848px] left-[-1px] top-[-2px] w-[394px]" data-name="image 51">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage51} />
      </div>
      <div className="absolute h-[152px] left-[141px] top-[48px] w-[118px]" data-name="image 92">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage92} />
      </div>
      <div className="absolute h-[803px] left-0 top-0 w-[394px]" data-name="image 52">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
      </div>

      {/* Mission Cards - 미션 목록 (스크롤) */}
      {activeTab === 'mission' && subTab === 'list' && (
        <div className="absolute left-0 top-[319px] w-[393px] h-[464px] overflow-y-auto">
          <div className="relative w-full" style={{ height: `${missions.length * 162 + 10}px` }}>
            {/* Mission Card 1 */}
            <div className="absolute left-[16px] top-0">
              <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
              <div className="absolute bg-[#f2e1be] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
              <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
                <img alt="" className="block w-full h-full" src={imgBarYellow} />
              </div>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-0 top-[104px] w-[361px] text-left leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-nowrap pl-[16px]">보상 : 칭찬코인 +1</p>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">구몬학습지 풀기</p>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[51px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">p7~p15까지 할 수 있지?</p>
              <div className="absolute left-[9px] size-[66px] top-[15px]" data-name="image 46">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
              </div>
              <div className="absolute h-[56px] left-[201px] top-[80px] w-[142px]" data-name="image 47">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage47} />
              </div>
            </div>

            {/* Mission Card 2 */}
            <div className="absolute left-[16px] top-[160px]">
              <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[7px] w-[361px]" />
              <div className="absolute bg-[#f5eaf8] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
              <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
                <img alt="" className="block w-full h-full" src={imgBarPurple} />
              </div>
              <div className="absolute h-[56px] left-[201px] top-[80px] w-[142px]" data-name="image 37">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage37} />
              </div>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-0 top-[104px] w-[361px] text-left leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-nowrap pl-[16px]">보상 : 칭찬코인 +1</p>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">태권도 학원 가기</p>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[51px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">학원 갔다오는게 어때?</p>
              <div className="absolute left-[9px] size-[66px] top-[15px]" data-name="image 46">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
              </div>
            </div>

            {/* Mission Card 3 */}
            <div className="absolute left-[16px] top-[322px]">
              <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
              <div className="absolute bg-[#e8f6ed] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
              <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
                <img alt="" className="block w-full h-full" src={imgBarGreen} />
              </div>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-0 top-[104px] w-[361px] text-left leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-nowrap pl-[16px]">보상 : 칭찬코인 +1</p>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">학교 숙제 하기</p>
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[51px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">학교 복습 빼먹지마~</p>
              <div className="absolute left-[9px] size-[66px] top-[15px]" data-name="image 46">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
              </div>
              <div className="absolute h-[56px] left-[206px] top-[80px] w-[142px]" data-name="image 38">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage38} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 미션 관리 */}
      {activeTab === 'mission' && subTab === 'manage' && (
        <>
          {/* 미션 만들기 버튼 */}
          <div
            className="absolute left-[16px] top-[314px] w-[361px] h-[52px] cursor-pointer active:scale-95 transition-transform"
            onClick={() => setIsMissionProposeOpen(true)}
          >
            <div className="absolute bg-[#45270b] left-0 top-[5px] w-[361px] h-[47px] rounded-[8px]" />
            <div className="absolute bg-[#feb700] left-0 top-0 w-[361px] h-[47px] rounded-[8px]" />
            <p className="absolute left-0 top-0 w-[361px] h-[47px] flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
              미션 만들기
            </p>
          </div>

          {/* 미션 관리 카드 목록 (스크롤) */}
          <div className="absolute left-0 top-[370px] w-[393px] h-[413px] overflow-y-auto">
            <div className="relative w-full" style={{ height: `${missions.length * 162 + 10}px` }}>
              {missions.map((mission, index) => {
                const enabled = missionEnabled[mission.id] ?? true;
                return (
                  <div
                    key={mission.id}
                    className="absolute left-[16px] cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ top: `${6 + index * 162}px` }}
                    onClick={() => setEditingMission(mission)}
                  >
                    <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
                    <div className="absolute bg-[#f2e1be] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
                    <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
                      <img alt="" className="block w-full h-full" src={imgBarYellow} />
                      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-0 top-[5px] w-[361px] text-left leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-nowrap pl-[16px] pointer-events-none">
                        보상 : 칭찬코인 +{mission.reward}
                      </p>
                    </div>
                    <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] w-[200px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">
                      {mission.title}
                    </p>
                    <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[51px] w-[200px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">
                      {mission.description}
                    </p>
                    <div className="absolute left-[9px] size-[66px] top-[15px]">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
                    </div>

                    {/* 토글 스위치 */}
                    <button
                      className="absolute left-[288px] top-[108px] w-[58px] h-[30px] cursor-pointer z-10"
                      onClick={(e) => { e.stopPropagation(); setMissionEnabled({ ...missionEnabled, [mission.id]: !enabled }); }}
                    >
                      <img alt="" className="block w-full h-full" src={enabled ? imgToggleOn : imgToggleOff} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 응원하기 */}
      {activeTab === 'mission' && subTab === 'cheer' && (
        <>
          {/* 응원 메세지 보내기 */}
          <p className="absolute left-[16px] top-[319px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
            응원 메세지 보내기
          </p>
          <div className="absolute left-[16px] top-[359px] w-[362px] h-[60px]">
            <img alt="" className="block w-full h-full" src={imgCheerInput} />
            <input
              type="text"
              value={cheerMessage}
              onChange={(e) => setCheerMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && cheerMessage.trim()) {
                  setCheerHistory([cheerMessage.trim(), ...cheerHistory]);
                  setCheerMessage('');
                }
              }}
              placeholder="오늘의 응원 한마디"
              className="absolute inset-0 bg-transparent px-[25px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          {/* 최근에 보낸 메시지 */}
          <p className="absolute left-[16px] top-[434px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
            최근에 보낸 메시지
          </p>

          {/* 메시지 목록 (스크롤) */}
          <div className="absolute left-0 top-[470px] w-[393px] h-[313px] overflow-y-auto">
            <div className="relative w-full" style={{ height: `${cheerHistory.length * 79 + 10}px` }}>
              {cheerHistory.map((msg, index) => (
                <div key={index} className="absolute left-[16px]" style={{ top: `${4 + index * 79}px` }}>
                  <div className="absolute left-0 top-[5px] w-[362px] h-[64px]">
                    <img alt="" className="block w-full h-full" src={imgCheerCardShadow} />
                  </div>
                  <div className="absolute left-0 top-0 w-[362px] h-[64px]">
                    <img alt="" className="block w-full h-full" src={imgCheerCardBg} />
                  </div>
                  <p className="absolute left-0 top-0 w-[362px] h-[64px] flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-[#492607] text-center">
                    {msg}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Tab (미션 / 소원 상점) */}
      <div className="absolute left-0 top-[195px] w-[394px] h-[57px]">
        <img alt="" className="block w-full h-full" src={activeTab === 'mission' ? imgMainTabMission : imgMainTabShop} />
      </div>
      <button
        className="absolute left-[98.5px] -translate-x-1/2 top-[212px] cursor-pointer z-10"
        onClick={() => setActiveTab('mission')}
      >
        <p
          className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[22px] text-center ${activeTab === 'mission' ? 'text-white' : 'text-white/30'}`}
          style={{
            textShadow: `
              -3px -3px 0 #45270B, 3px -3px 0 #45270B, -3px 3px 0 #45270B, 3px 3px 0 #45270B,
              0 -3px 0 #45270B, 0 3px 0 #45270B, -3px 0 0 #45270B, 3px 0 0 #45270B,
              -2px -3px 0 #45270B, 2px -3px 0 #45270B, -2px 3px 0 #45270B, 2px 3px 0 #45270B,
              -3px -2px 0 #45270B, 3px -2px 0 #45270B, -3px 2px 0 #45270B, 3px 2px 0 #45270B
            `
          }}
        >
          미션
        </p>
      </button>
      <button
        className="absolute left-[297px] -translate-x-1/2 top-[212px] cursor-pointer z-10"
        onClick={() => setActiveTab('shop')}
      >
        <p
          className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[22px] text-center whitespace-nowrap ${activeTab === 'shop' ? 'text-white' : 'text-white/30'}`}
          style={{
            textShadow: `
              -3px -3px 0 #45270B, 3px -3px 0 #45270B, -3px 3px 0 #45270B, 3px 3px 0 #45270B,
              0 -3px 0 #45270B, 0 3px 0 #45270B, -3px 0 0 #45270B, 3px 0 0 #45270B,
              -2px -3px 0 #45270B, 2px -3px 0 #45270B, -2px 3px 0 #45270B, 2px 3px 0 #45270B,
              -3px -2px 0 #45270B, 3px -2px 0 #45270B, -3px 2px 0 #45270B, 3px 2px 0 #45270B
            `
          }}
        >
          소원 상점
        </p>
      </button>

      {/* Sub Tab (미션 목록 / 미션 관리 / 응원하기) */}
      {activeTab === 'mission' && (
        <div className="absolute left-[16px] top-[267px]">
          <div className="absolute bg-[#4c2b0f] h-[37px] left-0 rounded-[8px] top-0 w-[361px]">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
          </div>
          <div
            className="absolute bg-[#b9915e] border-2 border-[#f0c58f] h-[37px] rounded-[8px] top-0 w-[120px] transition-all"
            style={{ left: subTab === 'list' ? '0px' : subTab === 'manage' ? '120px' : '241px' }}
          />
          <button
            className="absolute left-[59.5px] -translate-x-1/2 top-[5px] cursor-pointer z-10"
            onClick={() => setSubTab('list')}
          >
            <p
              className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-white text-center whitespace-nowrap ${subTab !== 'list' ? 'opacity-30' : ''}`}
              style={{
                textShadow: `
                  -2px -2px 0 #45270B, 2px -2px 0 #45270B, -2px 2px 0 #45270B, 2px 2px 0 #45270B,
                  0 -2px 0 #45270B, 0 2px 0 #45270B, -2px 0 0 #45270B, 2px 0 0 #45270B,
                  -1px -2px 0 #45270B, 1px -2px 0 #45270B, -1px 2px 0 #45270B, 1px 2px 0 #45270B,
                  -2px -1px 0 #45270B, 2px -1px 0 #45270B, -2px 1px 0 #45270B, 2px 1px 0 #45270B
                `
              }}
            >
              미션 목록
            </p>
          </button>
          <button
            className="absolute left-[180px] -translate-x-1/2 top-[5px] cursor-pointer z-10"
            onClick={() => setSubTab('manage')}
          >
            <p
              className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-white text-center whitespace-nowrap ${subTab !== 'manage' ? 'opacity-30' : ''}`}
              style={{
                textShadow: `
                  -2px -2px 0 #45270B, 2px -2px 0 #45270B, -2px 2px 0 #45270B, 2px 2px 0 #45270B,
                  0 -2px 0 #45270B, 0 2px 0 #45270B, -2px 0 0 #45270B, 2px 0 0 #45270B,
                  -1px -2px 0 #45270B, 1px -2px 0 #45270B, -1px 2px 0 #45270B, 1px 2px 0 #45270B,
                  -2px -1px 0 #45270B, 2px -1px 0 #45270B, -2px 1px 0 #45270B, 2px 1px 0 #45270B
                `
              }}
            >
              미션 관리
            </p>
          </button>
          <button
            className="absolute left-[300.5px] -translate-x-1/2 top-[5px] cursor-pointer z-10"
            onClick={() => setSubTab('cheer')}
          >
            <p
              className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-white text-center whitespace-nowrap ${subTab !== 'cheer' ? 'opacity-30' : ''}`}
              style={{
                textShadow: `
                  -2px -2px 0 #45270B, 2px -2px 0 #45270B, -2px 2px 0 #45270B, 2px 2px 0 #45270B,
                  0 -2px 0 #45270B, 0 2px 0 #45270B, -2px 0 0 #45270B, 2px 0 0 #45270B,
                  -1px -2px 0 #45270B, 1px -2px 0 #45270B, -1px 2px 0 #45270B, 1px 2px 0 #45270B,
                  -2px -1px 0 #45270B, 2px -1px 0 #45270B, -2px 1px 0 #45270B, 2px 1px 0 #45270B
                `
              }}
            >
              응원하기
            </p>
          </button>
        </div>
      )}

      {/* Star Decorations */}
      <div className="absolute left-[336px] size-[17px] top-[121px]" data-name="image 40">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
      </div>

      {/* Header - Child Name (클릭 시 아이 선택 드롭다운) */}
      <button
        className="absolute left-[16px] top-[15px] cursor-pointer z-40"
        onClick={() => { setIsChildSelectOpen(!isChildSelectOpen); setIsMenuOpen(false); }}
      >
        <div className="absolute bg-[#291608] h-[45px] left-0 rounded-[8px] top-0 w-[124px]" />
        <p className="absolute left-0 top-0 w-[124px] h-[45px] flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] text-white">아이 : {selectedChild}</p>
      </button>

      {/* 아이 선택 드롭다운 */}
      {isChildSelectOpen && (
        <div className="absolute left-[15px] top-[66px] w-[125px] h-[197px] z-40">
          {/* 드롭다운 배경 */}
          <div className="absolute left-0 top-0 w-[125px] h-[143px]">
            <img alt="" className="block max-w-none size-full" src={imgChildSelectBg} />
          </div>
          {/* 자녀 목록 */}
          {children.map((child, index) => (
            <button
              key={child}
              className="absolute left-[10px] w-[105px] h-[32px] cursor-pointer hover:bg-white/10 rounded-[4px] transition-colors"
              style={{ top: `${12 + index * 38}px` }}
              onClick={() => {
                setSelectedChild(child);
                setIsChildSelectOpen(false);
              }}
            >
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-white">
                {child}
              </p>
            </button>
          ))}
          {/* 아이추가 버튼 */}
          <div
            className="absolute bg-[rgba(255,255,255,0.2)] border-2 border-solid border-white h-[38px] left-[10px] rounded-[6px] top-[93px] w-[103px] cursor-pointer hover:bg-white/30 transition-colors"
            onClick={() => setIsChildSelectOpen(false)}
          >
            <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-white">
              아이추가
            </p>
          </div>
        </div>
      )}

      {/* Hamburger Menu Button */}
      <button
        className="absolute left-[323px] top-[15px] cursor-pointer z-50"
        onClick={() => { setIsMenuOpen(!isMenuOpen); setIsChildSelectOpen(false); }}
      >
        <div className="absolute bg-[#644f41] rounded-[8px] size-[50px]" />
        <div className="absolute h-[25px] left-[11px] top-[12px] w-[28px]" data-name="hamberger">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHamberger} />
        </div>
      </button>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-[179px] top-[79px] z-50">
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

      {/* Bottom Navigation */}
      <div className="absolute left-0 top-[803px] w-[393px] h-[49px] bg-[#45270B]" />
      <div className="absolute left-0 top-[803px] w-[133px] h-[46px]">
        <img alt="" className="block w-full h-full" src={imgNavTab} />
      </div>
      <p className="absolute left-[68px] -translate-x-1/2 top-[814px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[21px] text-white text-center whitespace-nowrap" style={{ textShadow: '2px 0 0 #311A06, -2px 0 0 #311A06, 0 2px 0 #311A06, 0 -2px 0 #311A06, 1px 1px 0 #311A06, -1px -1px 0 #311A06, 1px -1px 0 #311A06, -1px 1px 0 #311A06, 2px 1px 0 #311A06, -2px 1px 0 #311A06, 2px -1px 0 #311A06, -2px -1px 0 #311A06, 1px 2px 0 #311A06, -1px 2px 0 #311A06, 1px -2px 0 #311A06, -1px -2px 0 #311A06' }}>
        미션홈
      </p>
      <p className="absolute left-[197.5px] -translate-x-1/2 top-[814px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[21px] text-white/30 text-center whitespace-nowrap" style={{ textShadow: '2px 0 0 #311A06, -2px 0 0 #311A06, 0 2px 0 #311A06, 0 -2px 0 #311A06, 1px 1px 0 #311A06, -1px -1px 0 #311A06, 1px -1px 0 #311A06, -1px 1px 0 #311A06, 2px 1px 0 #311A06, -2px 1px 0 #311A06, 2px -1px 0 #311A06, -2px -1px 0 #311A06, 1px 2px 0 #311A06, -1px 2px 0 #311A06, 1px -2px 0 #311A06, -1px -2px 0 #311A06' }}>
        하루일기
      </p>
      <p className="absolute left-[332.5px] -translate-x-1/2 top-[814px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[21px] text-white/30 text-center whitespace-nowrap" style={{ textShadow: '2px 0 0 #311A06, -2px 0 0 #311A06, 0 2px 0 #311A06, 0 -2px 0 #311A06, 1px 1px 0 #311A06, -1px -1px 0 #311A06, 1px -1px 0 #311A06, -1px 1px 0 #311A06, 2px 1px 0 #311A06, -2px 1px 0 #311A06, 2px -1px 0 #311A06, -2px -1px 0 #311A06, 1px 2px 0 #311A06, -1px 2px 0 #311A06, 1px -2px 0 #311A06, -1px -2px 0 #311A06' }}>
        성장보고서
      </p>


      {/* Shop Content */}
      {activeTab === 'shop' && (
        <>
          {/* 상품 올리기 버튼 */}
          <div
            className="absolute left-[16px] top-[270px] w-[361px] h-[52px] cursor-pointer active:scale-95 transition-transform"
            onClick={() => setShowProductCreatePopup(true)}
          >
            <div className="absolute bg-[#45270b] left-0 top-[5px] w-[361px] h-[47px] rounded-[8px]" />
            <div className="absolute bg-[#feb700] left-0 top-0 w-[361px] h-[47px] rounded-[8px]" />
            <p className="absolute left-0 top-0 w-[361px] h-[47px] flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
              상품 올리기
            </p>
          </div>

          {/* 동적 상품 목록 (스크롤) */}
          <div className="absolute left-0 top-[326px] w-[393px] h-[457px] overflow-y-auto">
            <div className="relative w-full" style={{ height: `${shopProducts.length * 103 + 10}px` }}>
              {shopProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`absolute left-[15px] w-[362px] ${product.status === 'available' ? 'cursor-pointer' : ''}`}
                  style={{ top: `${6 + index * 103}px` }}
                  onClick={() => { if (product.status === 'available') setEditingProduct(product); }}
                >
                  <div className="absolute bg-[#45270b] h-[82px] left-0 rounded-[8px] top-[11px] w-[361px]" />
                  <div className="absolute left-0 top-0 w-[362px] h-[87px]">
                    <img alt="" className="block w-full h-full" src={imgCardBg} />
                  </div>
                  <div className="absolute left-[282px] top-0 w-[80px] h-[87px]">
                    <img alt="" className="block w-full h-full" src={imgShopBadge} />
                  </div>
                  <div className="absolute left-[10px] top-[11px] w-[66px] h-[66px]">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={product.iconSrc || imgImage46} />
                  </div>
                  <p className="absolute left-[84px] top-[24px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-[#291608]">
                    {product.name}
                  </p>
                  <p className="absolute right-[14px] top-[12px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[15px] text-[#291608] text-center">
                    칭찬코인
                  </p>
                  <p className="absolute right-[30px] top-[34px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[26px] text-[#291608] text-center">
                    -{product.price}
                  </p>

                  {/* 품절 오버레이 */}
                  {product.status === 'soldout' && (
                    <>
                      <div className="absolute left-0 top-0 w-[362px] h-[87px]">
                        <img alt="" className="block w-full h-full" src={imgCardOverlay} />
                      </div>
                      <div
                        className="absolute left-[100px] top-[23px] w-[161px] h-[47px] cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRefillingProductId(product.id);
                        }}
                      >
                        <div className="absolute bg-[#feb700] inset-0 rounded-[8px]" />
                        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
                          품절상품 채우기
                        </p>
                      </div>
                    </>
                  )}

                  {/* 배송완료(보상주기) 오버레이 */}
                  {product.status === 'delivered' && (
                    <>
                      <div className="absolute left-0 top-0 w-[362px] h-[87px]">
                        <img alt="" className="block w-full h-full" src={imgCardOverlay} />
                      </div>
                      <div
                        className="absolute left-[100px] top-[20px] w-[161px] h-[47px] cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRewardingProductId(product.id);
                        }}
                      >
                        <div className="absolute bg-[#5bffc6] inset-0 rounded-[8px]" />
                        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
                          보상주기
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Character Decorations */}
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
      
      <div className="absolute left-[43px] top-[76px]">
        <div className="absolute h-[50px] left-0 top-0 w-[130px]" data-name="image 77">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage77} />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-0 top-0 w-[130px] h-[50px] flex items-center justify-center leading-[1.5] not-italic text-[#291608] text-[18px]">오늘은 몇점?</p>
      </div>
      
      <div className="absolute h-[49px] left-[62px] top-[138px] w-[70px]" data-name="image 78">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage78} />
      </div>

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
            onCreateMission={(title, description, reward, frequency) => {
              handleCreateMission(title, description, reward, frequency);
            }}
          />
        </motion.div>
      )}
      </div>

      {/* 모드 변경 팝업 */}
      {showModeChangePopup && (
        <ModeChangePopup onClose={() => setShowModeChangePopup(false)} />
      )}

      {/* 만든개발자 팝업 */}
      {showDeveloperPopup && (
        <DeveloperInfoPopup onClose={() => setShowDeveloperPopup(false)} />
      )}

      {showProductCreatePopup && (
        <ProductCreatePopup
          onClose={() => setShowProductCreatePopup(false)}
          onConfirm={(productName, coinPrice, iconSrc) => {
            const newProduct: ShopProduct = {
              id: Date.now().toString(),
              name: productName,
              price: coinPrice,
              iconSrc: iconSrc,
              status: 'available',
            };
            setShopProducts([newProduct, ...shopProducts]);
            setShowProductCreatePopup(false);
          }}
        />
      )}

      {rewardingProductId && (
        <ProductRewardPopup
          onConfirm={() => {
            setShopProducts(shopProducts.map(p => p.id === rewardingProductId ? { ...p, status: 'soldout' } : p));
            setRewardingProductId(null);
          }}
        />
      )}

      {refillingProductId && (
        <ProductRefillPopup
          onConfirm={() => {
            setShopProducts(shopProducts.map(p => p.id === refillingProductId ? { ...p, status: 'available' } : p));
            setRefillingProductId(null);
          }}
        />
      )}

      {editingMission && (
        <MissionEditPopup
          initialTitle={editingMission.title}
          initialDescription={editingMission.description}
          initialReward={editingMission.reward}
          onClose={() => setEditingMission(null)}
          onConfirm={(data) => {
            setMissions(missions.map(m =>
              m.id === editingMission.id
                ? { ...m, title: data.title, description: data.description, reward: data.reward }
                : m
            ));
            setEditingMission(null);
          }}
          onDelete={() => {
            setMissions(missions.filter(m => m.id !== editingMission.id));
            setEditingMission(null);
          }}
        />
      )}

      {editingProduct && (
        <ProductEditPopup
          initialName={editingProduct.name}
          initialPrice={editingProduct.price}
          initialIconSrc={editingProduct.iconSrc}
          onClose={() => setEditingProduct(null)}
          onConfirm={(productName, coinPrice, iconSrc) => {
            setShopProducts(shopProducts.map(p =>
              p.id === editingProduct.id
                ? { ...p, name: productName, price: coinPrice, iconSrc: iconSrc }
                : p
            ));
            setEditingProduct(null);
          }}
          onDelete={() => {
            setShopProducts(shopProducts.filter(p => p.id !== editingProduct.id));
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}