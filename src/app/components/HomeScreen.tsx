import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  useAuthStore,
  useProfileStore,
  useMissionStore,
  useGroupStore,
} from "@/app/stores";
import type { Mission, Participation } from "@/app/types/mission";
import { isMissionActiveOn } from "@/app/constants/mission";
import { useTodayDate } from "@/app/hooks/useTodayDate";
import { MissionCard } from "@/app/components/molecules/MissionCard";
import { ShopItem } from "@/app/components/molecules/ShopItem";
import MissionCompletePopup from "./MissionCompletePopup";
import ExchangeConfirmPopup from "./ExchangeConfirmPopup";
import SoldOutPopup from "./SoldOutPopup";
import ShippingPopup from "./ShippingPopup";
import DeliveredPopup from "./DeliveredPopup";
import DeveloperInfoPopup from "./DeveloperInfoPopup";
import ProfileSelectModal from "./ProfileSelectModal";
import MissionParticipantsModal from "./MissionParticipantsModal";
import MissionRecordModal from "./MissionRecordModal";
import { PROFILE_MAP } from "@/app/constants/profile";
import svgPaths from "@/imports/svg-pjyub6r4mi";
import svgPathsMenu from "@/imports/svg-kmzz9f9dmz";
import imgImage51 from "figma:asset/25e22a55b2742b552f58579327786ada9e64aa32.png";
import imgImage90 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";
import imgImage34 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";
import imgImage41 from "figma:asset/fff6d42b3b5957c3ef2140ea9b993bb9db708049.png";
import imgImage52 from "figma:asset/c368e03333cec45fed8236b2ca94b1f8e78c82d4.png";
import imgImage77 from "figma:asset/cf6022d6ba1edae48e648736e5f3c30ba3130330.png";
import imgImage74 from "figma:asset/bf6aba8970b6e0b45897fd2685ac7ef492144c8e.png";
import imgImage78 from "figma:asset/3c073d66f9a0c48e0d7e037390e6668aad752c1b.png";
import imgGroup60 from "@/assets/c4338e4775c77da0d1a7c6298fbcf6dcf9b27fe8.svg";
import imgMainTabMission from "@/assets/917899768af2bdc82d70468ecf8b2eb6609ea73e.svg";
import imgMainTabShop from "@/assets/5e41aca0a7ea2967ff0e7ce1012d70d64a5a9d8f.svg";
import imgImage45 from "figma:asset/fb2306265cb70042010e7f9b17540ae4244eb277.png";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage50 from "figma:asset/06750638a04f2b3069b1057f814539a0302a2245.png";
import imgLabelSoldOut from "figma:asset/5415e0017a0f70c5a42fb73f4f0d552d2dc65191.png";
import imgImage37 from "figma:asset/409eeaf8b8d3d94dd075d0b92daaa9b7111bd5df.png";
import imgImage38 from "figma:asset/8148c67e4f82e7c37584d8a139dd13503abe9306.png";
import imgCoin from "figma:asset/4e34cf3a2b2ddea240a98b7184299dc4893e0819.png";
import imgHamberger from "figma:asset/cbce2ab124aac67762a2b6ddf11aaa5defb044a4.png";
import imgGiveUp from "figma:asset/8e84a045d8b268a46a68ba2858691647755a8a10.png";
import imgImage59 from "figma:asset/ed6117d0cb27758f4af5f1b706c8fe1515b5f600.png";
import imgImage60 from "figma:asset/7c4559a30c02a8324962e51c90a82dfdf2c358c3.png";

type MissionSubTab = "group" | "mine";

/** 오늘 기준 YYYY-MM-DD (local timezone). 반복 미션 instance_date 비교용 */
function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 미션 + 선택 날짜에 해당하는 내 참여 row 찾기 (없으면 null) */
function findMyParticipation(
  participations: Participation[],
  missionId: string,
  userId: string,
  instanceDate: string | null,
): Participation | null {
  return (
    participations.find(
      (p) =>
        p.missionId === missionId &&
        p.userId === userId &&
        p.instanceDate === instanceDate,
    ) ?? null
  );
}

/** 해당 미션 × 날짜의 참여자 전원 */
function findAllParticipations(
  participations: Participation[],
  missionId: string,
  instanceDate: string | null,
): Participation[] {
  return participations.filter(
    (p) => p.missionId === missionId && p.instanceDate === instanceDate,
  );
}

/** 미션의 현재 표시 대상 instance_date (1회성은 null, 반복은 오늘) */
function resolveInstanceDate(mission: Mission): string | null {
  return mission.frequency === "1회" ? null : todayISO();
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useProfileStore((s) => s.profile);
  const userId = useAuthStore((s) => s.user?.id);
  const signOut = useAuthStore((s) => s.signOut);
  const todayDateString = useTodayDate();

  const currentGroup = useGroupStore((s) => s.currentGroup);
  const groupLoading = useGroupStore((s) => s.loading);
  const members = useGroupStore((s) => s.members);

  const missions = useMissionStore((s) => s.missions);
  const participations = useMissionStore((s) => s.participations);
  const joinMission = useMissionStore((s) => s.join);
  const updateParticipation = useMissionStore((s) => s.updateParticipation);
  const removeParticipation = useMissionStore((s) => s.removeParticipation);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mission" | "shop">("mission");
  const [missionSubTab, setMissionSubTab] = useState<MissionSubTab>("mine");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [completingParticipationId, setCompletingParticipationId] = useState<string | null>(null);

  const [showParticipantsModal, setShowParticipantsModal] = useState<{
    mission: Mission;
    instanceDate: string | null;
  } | null>(null);

  const [showRecordModal, setShowRecordModal] = useState<Mission | null>(null);

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

  // 그룹이 없으면 온보딩으로
  useEffect(() => {
    if (!groupLoading && !currentGroup) {
      navigate("/group-onboarding", { replace: true });
    }
  }, [groupLoading, currentGroup, navigate]);

  // location.state 로 서브탭 복원
  useEffect(() => {
    const state = location.state as { missionSubTab?: MissionSubTab } | null;
    if (state?.missionSubTab) setMissionSubTab(state.missionSubTab);
    if (state) window.history.replaceState({}, document.title);
  }, [location.state]);

  React.useEffect(() => {
    setIsInitialRender(false);
  }, []);

  // 그룹 미션 탭: 활성화 + 오늘 스케줄에 해당하는 미션만, 최신순
  const groupMissions = useMemo(() => {
    const today = new Date();
    return missions
      .filter((m) => m.enabled && isMissionActiveOn(m, today))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [missions]);

  // 내 미션 탭: 오늘 스케줄에 해당하면서 내가 "오늘 인스턴스" 에 참여한 미션만
  const myMissions = useMemo(() => {
    if (!userId) return [];
    const today = new Date();
    return missions
      .filter((m) => {
        if (!m.enabled) return false;
        if (!isMissionActiveOn(m, today)) return false;
        const instanceDate = resolveInstanceDate(m);
        return participations.some(
          (p) => p.missionId === m.id && p.userId === userId && p.instanceDate === instanceDate,
        );
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [missions, participations, userId]);

  // 미션 카드의 버튼 클릭
  const handleMissionButtonClick = async (mission: Mission) => {
    if (!userId) return;
    const instanceDate = resolveInstanceDate(mission);
    const mine = findMyParticipation(participations, mission.id, userId, instanceDate);

    if (!mine) {
      // 미참여 → 수락
      await joinMission({ missionId: mission.id, userId, instanceDate });
      return;
    }

    if (mine.status === "in_progress") {
      // 진행중 → 완료 팝업
      setCompletingParticipationId(mine.id);
      setShowCompletePopup(true);
      return;
    }

    if (mine.status === "completed" || mine.status === "gave_up") {
      // 완료/포기 → 참여자 모달로 상황 확인
      setShowParticipantsModal({ mission, instanceDate });
    }
  };

  const handleMissionCompleteConfirm = async (note?: string) => {
    if (completingParticipationId) {
      await updateParticipation(completingParticipationId, "completed", note);
      setCompletingParticipationId(null);
    }
    setShowCompletePopup(false);
  };

  const renderMissionCard = (mission: Mission) => {
    if (!userId) return null;
    const instanceDate = resolveInstanceDate(mission);
    const mine = findMyParticipation(participations, mission.id, userId, instanceDate);
    const all = findAllParticipations(participations, mission.id, instanceDate);
    const isProposer = mission.proposerId === userId;
    return (
      <MissionCard
        key={`${mission.id}-${instanceDate ?? "once"}`}
        title={mission.title}
        subtitle={mission.subtitle}
        rewardText={`보상 : 칭찬코인 +${mission.reward}`}
        iconSrc={mission.iconSrc ?? imgImage46}
        buttonSrc={imgImage50}
        inProgressButtonSrc={imgImage37}
        gaveUpButtonSrc={imgGiveUp}
        completedButtonSrc={imgImage38}
        svgPath={svgPaths.p2cc17800}
        myStatus={mine?.status ?? null}
        participantCount={all.length}
        onButtonClick={() => handleMissionButtonClick(mission)}
        onParticipantBadgeClick={() => setShowParticipantsModal({ mission, instanceDate })}
        onEdit={
          isProposer
            ? () =>
                navigate("/mission-edit", {
                  state: {
                    missionId: mission.id,
                    title: mission.title,
                    description: mission.subtitle,
                    reward: mission.reward,
                    frequency: mission.frequency,
                    schedule: mission.schedule,
                  },
                })
            : undefined
        }
        onCancel={
          mine?.status === "in_progress"
            ? () => removeParticipation(mine.id)
            : undefined
        }
        onShowRecord={
          mission.frequency !== "1회"
            ? () => setShowRecordModal(mission)
            : undefined
        }
      />
    );
  };

  // 참여자 모달용 데이터
  const modalData = useMemo(() => {
    if (!showParticipantsModal) return null;
    const { mission, instanceDate } = showParticipantsModal;
    const all = findAllParticipations(participations, mission.id, instanceDate);
    return {
      title: mission.title,
      participations: all,
      instanceDate: instanceDate ?? undefined,
    };
  }, [showParticipantsModal, participations]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-white h-[852px] relative w-[393px] overflow-hidden" data-name="홈화면">
        {/* Layer 1: Sky Background */}
        <div className="absolute h-[854px] left-0 top-0 w-[394px]" data-name="image 51">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage51} />
        </div>

        {/* Layer 2: Character Face & Sparkles */}
        <div className="absolute h-[159px] left-[132px] top-[53px] w-[152px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage90} />
        </div>
        <div className="absolute left-[111px] size-[21px] top-[105px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage34} />
        </div>
        <div className="absolute left-[336px] size-[17px] top-[121px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage34} />
        </div>
        <div className="absolute left-[353px] size-[13px] top-[88px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage34} />
          </div>
        </div>

        {/* Layer 3: Brown Frame */}
        <div className="absolute h-[803px] left-0 top-0 w-[394px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
        </div>

        {/* Layer 4: Foreground deco */}
        <div className="absolute h-[53px] left-[297px] top-[142px] w-[56px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[149.06%] left-[-454.95%] max-w-none top-[-49.06%] w-[556.34%]" src={imgImage74} />
          </div>
        </div>
        <div className="absolute h-[49px] left-[62px] top-[138px] w-[70px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage78} />
        </div>

        {/* Layer 5: Static UI */}
        <div className="absolute top-0 left-0 w-full h-[315px] z-20 pointer-events-none">
          {/* User Profile */}
          <div
            className="absolute left-[16px] top-[11px] w-[109px] h-[45px] pointer-events-auto cursor-pointer"
            onClick={() => setShowProfileModal(true)}
          >
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
            <p className="absolute right-[10px] top-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">{profile?.name ?? "사용자"}</p>
          </div>

          {/* Coin */}
          <div className="absolute left-[130px] top-[11px] h-[40px] pointer-events-auto">
            <div className="absolute bg-[#291608] h-[31px] left-[17px] top-[4px] w-[75px] rounded-[8px]" />
            <div className="absolute left-0 top-0 size-[40px]">
              <img alt="" className="w-full h-full object-cover" src={imgCoin} />
            </div>
            <p className="absolute left-[50px] top-[4px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">{profile?.coins ?? 0}</p>
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
              <div className="absolute top-0 left-0 w-[200px] h-[250px] pointer-events-none">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 250">
                  <g>
                    <path d={svgPathsMenu.p29ac7700} fill="#311D0C" />
                  </g>
                </svg>
              </div>

              <div className="absolute left-[10px] top-[10px] z-10">
                {/* 내 그룹 */}
                <div
                  className="absolute top-0 left-0 w-[180px] h-[38px] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/group-members");
                  }}
                >
                  <img alt="" className="absolute inset-0 w-full h-full" src={imgImage41} />
                  <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                    내 그룹
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
                    window.open("https://cafe.naver.com/f-e/cafes/31663026/menus/1?viewType=L", "_blank");
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
                  onClick={async () => { await signOut(); navigate("/"); }}
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

          {/* Tab Bar Background */}
          <div className="absolute top-[195px] left-0 w-[394px] h-[57px]">
            <img alt="" className="block max-w-none size-full" src={activeTab === "mission" ? imgMainTabMission : imgMainTabShop} />
          </div>

          <p
            className={`absolute left-[98.5px] top-[212px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] leading-[1.5] text-center pointer-events-auto cursor-pointer z-20 transition-colors duration-300 ${activeTab === "mission" ? "text-white" : "text-white/30"}`}
            onClick={() => setActiveTab("mission")}
          >
            미션
          </p>
          <p
            className={`absolute left-[297px] top-[212px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] leading-[1.5] text-center pointer-events-auto cursor-pointer z-20 transition-colors duration-300 ${activeTab === "shop" ? "text-white" : "text-white/30"}`}
            onClick={() => setActiveTab("shop")}
          >
            소원 상점
          </p>

          {/* Sub-tabs (미션 탭 한정): 그룹 / 내 것 */}
          {activeTab === "mission" && (
            <div className="absolute top-[267px] left-[16px] w-[240px] h-[37px] z-30 pointer-events-auto">
              <div className="absolute inset-0 bg-[#4c2b0f] rounded-[8px]">
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]" />
              </div>

              <motion.div
                className="absolute top-0 h-[37px] w-[120px] bg-[#b9915e] border-2 border-[#f0c58f] rounded-[8px]"
                animate={{ x: missionSubTab === "mine" ? 0 : 120 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              <div className="absolute top-0 left-0 w-[120px] h-full cursor-pointer z-10" onClick={() => setMissionSubTab("mine")} />
              <div className="absolute top-0 right-0 w-[120px] h-full cursor-pointer z-10" onClick={() => setMissionSubTab("group")} />

              <div className="absolute left-0 top-0 w-[120px] h-full flex items-center justify-center pointer-events-none z-20">
                <p
                  className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-center transition-colors duration-300 ${missionSubTab === "mine" ? "text-white" : "text-white/30"}`}
                  style={{ textShadow: "2px 0 0 #45270B, -2px 0 0 #45270B, 0 2px 0 #45270B, 0 -2px 0 #45270B" }}
                >
                  내 미션
                </p>
              </div>
              <div className="absolute left-[120px] top-0 w-[120px] h-full flex items-center justify-center pointer-events-none z-20">
                <p
                  className={`font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-center transition-colors duration-300 ${missionSubTab === "group" ? "text-white" : "text-white/30"}`}
                  style={{ textShadow: "2px 0 0 #45270B, -2px 0 0 #45270B, 0 2px 0 #45270B, 0 -2px 0 #45270B" }}
                >
                  그룹 미션
                </p>
              </div>
            </div>
          )}

          {/* 오늘 날짜 헤더 (그룹 탭 한정) */}
          {activeTab === "mission" && missionSubTab === "group" && (
            <div className="absolute top-[314px] left-[16px] w-[361px] h-[47px]">
              <div className="absolute bg-[#532807] inset-0 rounded-[8px]" />
              <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white">
                {todayDateString}
              </p>
              <div className="absolute left-[13px] top-[10px] w-[31px] h-[26px]">
                <img alt="" className="w-full h-full" src={imgImage45} />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <motion.div
          className={`absolute left-0 w-full overflow-y-auto z-10 pt-[10px] pb-[40px] bottom-[60px] ${activeTab === "mission" ? "px-[16px]" : "pl-[12px] pr-[14px]"}`}
          animate={{ top: activeTab === "mission" ? (missionSubTab === "group" ? 370 : 315) : 265 }}
          transition={isInitialRender ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        >
          {activeTab === "mission" && missionSubTab === "mine" ? (
            <>
              <button
                className="relative w-[361px] h-[47px] mx-auto mb-[15px] cursor-pointer active:scale-95 transition-transform"
                onClick={() => navigate("/mission-propose")}
              >
                <div className="absolute inset-0 top-[5px] bg-[#45270b] rounded-[8px]" />
                <div className="absolute inset-0 bg-[#feb700] rounded-[8px]" />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  미션 만들기
                </p>
              </button>

              {myMissions.length === 0 ? (
                <p className="text-center mt-[40px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  아직 참여 중인 미션이 없어요.
                  <br />
                  '그룹 미션' 탭에서 수락해보세요!
                </p>
              ) : (
                myMissions.map(renderMissionCard)
              )}
            </>
          ) : activeTab === "mission" ? (
            <>
              {groupMissions.length === 0 ? (
                <p className="text-center mt-[40px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
                  아직 그룹에 미션이 없어요.
                  <br />
                  메뉴에서 '미션제안하기'로 시작해보세요!
                </p>
              ) : (
                groupMissions.map(renderMissionCard)
              )}
            </>
          ) : (
            /* SHOP — Phase 2에서 DB 연동 예정, 현재는 정적 데모 */
            <>
              <ShopItem title="유튜브시청20분" price="-1" iconSrc={imgImage46} status={shippingProducts.includes("shop-1") ? "shipping" : "available"} statusImageSrc={imgImage59} onClick={() => {
                if (shippingProducts.includes("shop-1")) setShowShippingPopup(true);
                else { setSelectedProduct({ id: "shop-1", title: "유튜브시청20분", price: "-1" }); setShowExchangePopup(true); }
              }} />
              <ShopItem title="엄마랑 1시간 놀기" price="-1" iconSrc={imgImage46} status={shippingProducts.includes("shop-2") ? "shipping" : "available"} statusImageSrc={imgImage59} onClick={() => {
                if (shippingProducts.includes("shop-2")) setShowShippingPopup(true);
                else { setSelectedProduct({ id: "shop-2", title: "엄마랑 1시간 놀기", price: "-1" }); setShowExchangePopup(true); }
              }} />
              <ShopItem title="엄마랑 1시간 놀기" price="-1" iconSrc={imgImage46} status="soldout" statusImageSrc={imgLabelSoldOut} onClick={() => setShowSoldOutPopup(true)} />
              <ShopItem title="엄마랑 1시간 놀기" price="-1" iconSrc={imgImage46} status="shipping" statusImageSrc={imgImage59} onClick={() => setShowShippingPopup(true)} />
              <ShopItem title="엄마랑 1시간 놀기" price="-1" iconSrc={imgImage46} status="delivered" statusImageSrc={imgImage60} onClick={() => setShowDeliveredPopup(true)} />
            </>
          )}
        </motion.div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full h-[50px] z-30">
          <div className="absolute left-0 top-[803px] w-[133px] h-[46px]" style={{ top: "auto", bottom: "3px" }}>
            <img alt="" className="block max-w-none size-full" src={imgGroup60} />
          </div>
          <p className="absolute left-[65.5px] bottom-[8px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-white leading-[1.5]">미션홈</p>
          <p className="absolute left-[196.5px] bottom-[8px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-[rgba(255,255,255,0.3)] leading-[1.5] cursor-pointer" onClick={() => navigate("/ranking")}>랭킹전</p>
          <p className="absolute left-[327.5px] bottom-[8px] -translate-x-1/2 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-[rgba(255,255,255,0.3)] leading-[1.5] whitespace-nowrap text-center cursor-pointer" onClick={() => navigate("/growth-report")}>성장보고서</p>
        </div>
      </div>

      {/* Popups */}
      {showCompletePopup && (
        <MissionCompletePopup
          onClose={() => setShowCompletePopup(false)}
          onConfirm={handleMissionCompleteConfirm}
        />
      )}

      {showParticipantsModal && modalData && (
        <MissionParticipantsModal
          title={modalData.title}
          participations={modalData.participations}
          members={members}
          instanceDate={modalData.instanceDate}
          currentUserId={userId}
          onClose={() => setShowParticipantsModal(null)}
        />
      )}

      {showRecordModal && userId && (
        <MissionRecordModal
          mission={showRecordModal}
          participations={participations.filter((p) => p.missionId === showRecordModal.id)}
          currentUserId={userId}
          onCompleteForDate={async (instanceDate) => {
            await joinMission({
              missionId: showRecordModal.id,
              userId,
              instanceDate,
              status: "completed",
            });
          }}
          onClose={() => setShowRecordModal(null)}
        />
      )}

      {showExchangePopup && (
        <ExchangeConfirmPopup
          productName={selectedProduct?.title}
          onConfirm={() => {
            if (selectedProduct?.id) setShippingProducts((prev) => [...prev, selectedProduct.id]);
            setShowExchangePopup(false);
            setSelectedProduct(null);
          }}
          onCancel={() => {
            setShowExchangePopup(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showSoldOutPopup && <SoldOutPopup onClose={() => setShowSoldOutPopup(false)} />}
      {showShippingPopup && <ShippingPopup onClose={() => setShowShippingPopup(false)} />}
      {showDeliveredPopup && <DeliveredPopup onClose={() => setShowDeliveredPopup(false)} />}
      {showDeveloperPopup && <DeveloperInfoPopup onClose={() => setShowDeveloperPopup(false)} />}

      {showProfileModal && (
        <ProfileSelectModal
          onClose={() => setShowProfileModal(false)}
          onConfirm={(profileId, borderId) => {
            setSelectedProfileImg(PROFILE_MAP[profileId] ?? null);
            const borderMap: Record<string, string> = {
              b1: "#37e59a",
              b2: "#ffb0ef",
              b3: "#ffe550",
              b4: "#ff7878",
            };
            if (borderId) setSelectedBorderColor(borderMap[borderId] ?? null);
          }}
        />
      )}
    </div>
  );
}
