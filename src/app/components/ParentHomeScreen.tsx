import React, { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "@/imports/svg-disegqpe5s";
import svgPathsMenu from "@/imports/svg-suvnghhced";
import svgPathsShop from "@/imports/svg-lp98h8m8qs";
import MissionCreateModal from "@/imports/상품올리기";
import MissionProposeModal from "@/imports/미션제안하기";
import AlertPopup from "@/imports/알림팝업-22-865";
import MissionCard, { Mission } from "./MissionCard";
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

export default function ParentHomeScreen({ className, onLogout }: { className?: string; onLogout?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'shop'>('mission');
  const [isMissionCreateOpen, setIsMissionCreateOpen] = useState(false);
  const [isMissionProposeOpen, setIsMissionProposeOpen] = useState(false);
  
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
    <div className={className || "bg-white h-[846px] relative w-[393px] mx-auto"} data-name="ParentHomeScreen.tsx">
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

      {/* Mission Cards - Static positioned as in Figma */}
      {activeTab === 'mission' && (
        <>
          {/* Mission Card 1 */}
          <div className="absolute left-[16px] top-[319px]">
            <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
            <div className="absolute bg-[#f2e1be] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
            <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
                <path d={svgPaths.p2cc17800} fill="#FEB700" />
              </svg>
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
          <div className="absolute left-[16px] top-[479px]">
            <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[7px] w-[361px]" />
            <div className="absolute bg-[#f5eaf8] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
            <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
                <path d={svgPaths.p2cc17800} fill="#C07FE5" />
              </svg>
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
          <div className="absolute left-[16px] top-[641px]">
            <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
            <div className="absolute bg-[#e8f6ed] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
            <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
                <path d={svgPaths.p2cc17800} fill="#5EE2A0" />
              </svg>
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
        </>
      )}

      {/* Tab Buttons */}
      <div className="absolute left-[16px] top-[215px]">
        <div className="absolute bg-[#4c2b0f] h-[37px] left-0 rounded-[8px] top-0 w-[361px]">
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
        </div>
        
        {/* Active Tab Background */}
        <motion.div 
          className="absolute h-[37.699px] top-0 w-[180.453px]"
          animate={{ left: activeTab === 'mission' ? 0 : 180.547 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          data-name="image 41"
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage41} />
        </motion.div>
        
        {/* Tab Text - Mission */}
        <button
          className="absolute h-[24.029px] left-[51px] top-[7px] w-[77.482px] cursor-pointer z-10"
          onClick={() => setActiveTab('mission')}
          data-name="image 43"
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage43} />
        </button>
        
        {/* Tab Text - Shop */}
        <button
          className="absolute h-[23.892px] left-[237.59px] top-[7px] w-[73.93px] cursor-pointer z-10"
          onClick={() => setActiveTab('shop')}
          data-name="image 44"
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage44} />
        </button>
      </div>

      {/* Star Decorations */}
      <div className="absolute left-[336px] size-[17px] top-[121px]" data-name="image 40">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
      </div>

      {/* Header - Child Name */}
      <div className="absolute left-[16px] top-[15px]">
        <div className="absolute bg-[#291608] h-[45px] left-0 rounded-[8px] top-0 w-[124px]" />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[13px] top-[9px] not-italic text-[18px] text-white">아이 : 김쭈니</p>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="absolute left-[323px] top-[15px] cursor-pointer z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="absolute bg-[#644f41] rounded-[8px] size-[50px]" />
        <div className="absolute h-[25px] left-[11px] top-[12px] w-[28px]" data-name="hamberger">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHamberger} />
        </div>
      </button>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-[179px] top-[79px] z-50">
          <div className="absolute top-0 left-0 w-[200px] h-[154px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 154">
              <path d={svgPathsMenu.p216fec00} fill="#311D0C" />
            </svg>
          </div>

          <div className="absolute left-[10px] top-[10px]">
            <button className="absolute top-0 left-0 w-[180px] h-[38px]">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                미션제안하기
              </p>
            </button>
            
            <button className="absolute top-[48px] left-0 w-[180px] h-[38px]">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                설정
              </p>
            </button>
            
            <button 
              className="absolute top-[96px] left-0 w-[180px] h-[38px]"
              onClick={onLogout}
            >
              <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                로그아웃
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute left-[-1px] top-[799px]">
        <div className="absolute h-[46px] left-0 top-0 w-[134px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 46">
            <path d={svgPaths.p28dd3d40} fill="#875224" />
          </svg>
        </div>
        <div className="absolute h-[26px] left-[38px] top-[12px] w-[57px]" data-name="image 47">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage48} />
        </div>
      </div>
      
      <div className="absolute h-[26px] left-[276px] top-[811px] w-[96px]" data-name="image 49">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-30 pointer-events-none size-full" src={imgImage49} />
      </div>
      
      <div className="absolute h-[26px] left-[150px] top-[812px] w-[78px]" data-name="image 93">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-30 pointer-events-none size-full" src={imgImage93} />
      </div>

      {/* Date Header + Add Button */}
      {activeTab === 'mission' && (
        <div className="absolute left-[16px] top-[260px]">
          <div className="absolute bg-[#532807] h-[47px] left-0 rounded-[8px] top-0 w-[363px]" />
          <button
            className="absolute bg-[#feb700] h-[47px] left-[314px] rounded-[8px] top-0 w-[48px] cursor-pointer z-10"
            onClick={() => setIsMissionProposeOpen(true)}
          >
            <div aria-hidden="true" className="absolute border-3 border-[#bb7232] border-solid inset-[-3px] pointer-events-none rounded-[11px]" />
            <div className="absolute left-[10px] size-[27px] top-[10px]" data-name="image 54">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage54} />
            </div>
          </button>
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[0px] top-[0px] h-[47px] w-[300px] flex items-center justify-center leading-[1.5] not-italic text-[18px] text-white">1월 25일(토) 오늘의 미션</p>
        </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#6E8F3B]"
        >
          <MissionProposeModal 
            className="w-[393px] h-[852px]" 
            onClose={() => setIsMissionProposeOpen(false)}
            onCreateMission={(title, description, reward, frequency) => {
              handleCreateMission(title, description, reward, frequency);
            }}
          />
        </motion.div>
      )}
    </div>
  );
}