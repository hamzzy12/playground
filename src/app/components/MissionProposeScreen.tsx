import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage63 from "figma:asset/67b776f37d98a218bd6499f227365db338cd0a13.png";
import imgImage54 from "figma:asset/7717fbadfaff2519242403e5e5201a7517a295a2.png";
import WeekdaySelector from "@/imports/요일선택-23-1503";
import MonthlySelector, { WeeklySchedule } from "@/imports/요일선택-22-1312";
import MissionCreatedAlert from "./MissionCreatedAlert";
import IconSelectModal from "./IconSelectModal";
import { useMissions } from "@/app/context/MissionContext";

type FrequencyType = '1회' | '매일' | '매주' | '매월';
type WeekType = '첫째주' | '둘째주' | '셋째주' | '넷째주';
type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export default function MissionProposeScreen() {
  const navigate = useNavigate();
  const { addMission } = useMissions();
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyType>('1회');
  const [missionContent, setMissionContent] = useState('');
  const [additionalContent, setAdditionalContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [rewardCoins, setRewardCoins] = useState('1');
  const [isWeekdaySelectorOpen, setIsWeekdaySelectorOpen] = useState(false);
  const [isMonthlySelectorOpen, setIsMonthlySelectorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // 월선택 팝업 상태 관리
  const [selectedWeeks, setSelectedWeeks] = useState<WeekType[]>([]);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({});

  // 매주 요일선택 상태 관리
  const [weeklySelectedDays, setWeeklySelectedDays] = useState<DayType[]>([]);

  // 아이콘 선택 상태 관리
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [selectedIconSrc, setSelectedIconSrc] = useState<string | null>(null);
  const [isIconSelectOpen, setIsIconSelectOpen] = useState(false);

  const handleIconSelect = (iconId: string, iconSrc: string) => {
    setSelectedIconId(iconId);
    setSelectedIconSrc(iconSrc);
  };

  const handleRemoveIcon = () => {
    setSelectedIconId(null);
    setSelectedIconSrc(null);
  };

  const handleCreateMission = () => {
    if (!missionContent) {
      alert('미션 내용을 입력해주세요!');
      return;
    }

    if (!rewardCoins || parseInt(rewardCoins) <= 0) {
      alert('보상 코인을 입력해주세요!');
      return;
    }

    // 미션 추가
    addMission({
      title: missionContent,
      subtitle: additionalContent || '미션을 완료해보세요!',
      reward: parseInt(rewardCoins),
      frequency: selectedFrequency,
      dueDate: dueDate || undefined
    });

    // 알림 팝업 표시
    setShowAlert(true);
  };

  const handleConfirmAlert = () => {
    setShowAlert(false);
    navigate('/home');
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-[#6e8f3b] h-[852px] relative w-[393px] overflow-y-auto" data-name="미션제안하기">
        {/* 스크롤 가능한 콘텐츠 컨테이너 */}
        <div className="relative w-[393px] h-[1004px]">
          {/* 배경 이미지 */}
          <div className="absolute h-[879px] left-0 top-[125px] w-[393px]" data-name="image 17">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[100.09%] left-[-8.09%] max-w-none top-[-0.04%] w-[116.49%]" src={imgImage17} />
            </div>
          </div>

          {/* 헤더 */}
          <div className="-translate-x-1/2 absolute h-[87px] left-[calc(50%+0.5px)] top-[87px] w-[262px]" data-name="image 14">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
          </div>
          <div className="absolute h-[36px] left-[112px] top-[108px] w-[169px]" data-name="image 63">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage63} />
          </div>

          {/* 미션완료일 정하기 라벨 */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[29px] top-[198px] leading-[1.5] not-italic text-[20px] text-white">미션완료일 정하기</p>

          {/* 미션제안하기 라벨 */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[29px] top-[313px] leading-[1.5] not-italic text-[20px] text-white">미션제안하기</p>

          {/* Frequency Buttons */}
          <div
            className="absolute left-[20px] top-[238px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
            onClick={() => setSelectedFrequency('1회')}
          >
            <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '1회' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
            <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '1회' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>1회</p>
          </div>

          <div
            className="absolute left-[111px] top-[238px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
            onClick={() => setSelectedFrequency('매일')}
          >
            <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '매일' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
            <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '매일' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>매일</p>
          </div>

          <div
            className="absolute left-[201px] top-[238px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
            onClick={() => {
              setSelectedFrequency('매주');
              setIsWeekdaySelectorOpen(true);
            }}
          >
            <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '매주' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
            <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '매주' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>매주</p>
          </div>

          <div
            className="absolute left-[290px] top-[238px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
            onClick={() => {
              setSelectedFrequency('매월');
              setIsMonthlySelectorOpen(true);
            }}
          >
            <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '매월' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
            <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '매월' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>매월</p>
          </div>

          {/* 제안할 미션 내용 Input */}
          <div className="absolute left-[20px] top-[353px] w-[353px] h-[60px]">
            <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid h-[60px] rounded-[8px] w-[353px]" />
            <input
              type="text"
              value={missionContent}
              onChange={(e) => setMissionContent(e.target.value)}
              placeholder="제안할 미션 내용"
              className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
            />
          </div>

          {/* 추가내용(선택) Input */}
          <div className="absolute left-[20px] top-[423px] w-[353px] h-[60px]">
            <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid h-[60px] rounded-[8px] w-[353px]" />
            <input
              type="text"
              value={additionalContent}
              onChange={(e) => setAdditionalContent(e.target.value)}
              placeholder="추가내용(선택)"
              className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
            />
          </div>

          {/* 목표 완료일 */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[498px] leading-[1.5] not-italic text-[20px] text-white">목표 완료일</p>
          <div className="absolute left-[20px] top-[538px] w-[353px] h-[60px]">
            <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="날짜 입력"
              className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none [color-scheme:dark]"
            />
          </div>

          {/* 보상으로 받을 칭찬코인 개수 */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[613px] leading-[1.5] not-italic text-[20px] text-white">보상으로 받을 칭찬코인 개수</p>
          <div className="absolute left-[20px] top-[653px] w-[353px] h-[60px]">
            <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
            <input
              type="number"
              value={rewardCoins}
              onChange={(e) => setRewardCoins(e.target.value)}
              placeholder="1"
              className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-white outline-none"
            />
          </div>

          {/* 아이콘 선택 */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[22px] top-[728px] leading-[1.5] not-italic text-[20px] text-white">아이콘 선택</p>
          <div className="absolute left-[22px] top-[768px] flex gap-[10px]">
            {/* + 버튼 (항상 표시) */}
            <div
              className="cursor-pointer active:scale-95 transition-transform"
              onClick={() => setIsIconSelectOpen(true)}
            >
              <div className="bg-[#733e14] border-4 border-[#cb721e] border-solid rounded-[8px] size-[78px] flex items-center justify-center">
                <img alt="add icon" className="size-[39px]" src={imgImage54} />
              </div>
            </div>

            {/* 선택된 아이콘 미리보기 (선택된 경우에만 표시) */}
            {selectedIconSrc && (
              <div className="relative">
                <div
                  className="bg-[#733e14] border-4 border-[#cb721e] border-solid rounded-[8px] size-[78px] overflow-hidden cursor-pointer"
                  onClick={() => setIsIconSelectOpen(true)}
                >
                  <img
                    src={selectedIconSrc}
                    alt="선택된 아이콘"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 삭제 버튼 */}
                <button
                  onClick={handleRemoveIcon}
                  className="absolute -top-[8px] -right-[8px] bg-red-500 text-white rounded-full w-[24px] h-[24px] flex items-center justify-center text-[14px] font-bold"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* 미션 만들기 버튼 */}
          <div className="absolute h-[50px] left-[113px] top-[866px] w-[167px]" data-name="시작버튼">
            <button
              className="absolute inset-0 cursor-pointer active:scale-95 hover:brightness-110 transition-all"
              onClick={handleCreateMission}
            >
              <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
              <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#492607] text-[18px] pointer-events-none">미션 만들기</p>
            </button>
          </div>

          {/* 나중에 버튼 */}
          <div className="absolute h-[50px] left-[113px] top-[926px] w-[167px] cursor-pointer" data-name="시작버튼" onClick={handleClose}>
            <div className="absolute inset-0 rounded-[10px]">
              <div aria-hidden="true" className="absolute border-3 border-[#d68641] border-solid inset-[-1.5px] pointer-events-none rounded-[11.5px]" />
            </div>
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#d68641] text-[18px]">
              나중에
            </p>
          </div>
        </div>

        {/* 요일선택 모달 */}
        {isWeekdaySelectorOpen && (
          <div
            className="absolute inset-0 z-50"
            onClick={() => setIsWeekdaySelectorOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <WeekdaySelector
                onClose={() => setIsWeekdaySelectorOpen(false)}
                selectedDays={weeklySelectedDays}
                onDaysChange={setWeeklySelectedDays}
              />
            </div>
          </div>
        )}

        {/* 월 선택 모달 */}
        {isMonthlySelectorOpen && (
          <div
            className="absolute inset-0 z-50"
            onClick={() => setIsMonthlySelectorOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <MonthlySelector
                onClose={() => setIsMonthlySelectorOpen(false)}
                selectedWeeks={selectedWeeks}
                weeklySchedule={weeklySchedule}
                onWeeksChange={setSelectedWeeks}
                onScheduleChange={setWeeklySchedule}
              />
            </div>
          </div>
        )}

        {/* 아이콘 선택 모달 */}
        {isIconSelectOpen && (
          <IconSelectModal
            onSelect={handleIconSelect}
            onClose={() => setIsIconSelectOpen(false)}
            selectedIconId={selectedIconId}
          />
        )}

        {/* 미션 생성 완료 알림 팝업 */}
        {showAlert && (
          <MissionCreatedAlert onConfirm={handleConfirmAlert} />
        )}
      </div>
    </div>
  );
}
