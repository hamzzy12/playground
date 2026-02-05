import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage63 from "figma:asset/67b776f37d98a218bd6499f227365db338cd0a13.png";
import WeekdaySelector from "@/imports/요일선택-23-1503";
import MonthlySelector, { WeeklySchedule } from "@/imports/요일선택-22-1312";
import MissionCreatedAlert from "./MissionCreatedAlert";
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
      <div className="bg-[#6e8f3b] h-[852px] relative w-[393px]" data-name="미션제안하기">
        <div className="absolute h-[50px] left-[16px] top-[692px] w-[359px]">
          <div className="absolute bg-[#0e0d0d] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] text-center text-white">미션수락하기</p>
        </div>
        <div className="absolute h-[772px] left-0 top-[80px] w-[393px]" data-name="image 17">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[100.09%] left-[-1.08%] max-w-none top-[-0.04%] w-[102.42%]" src={imgImage17} />
          </div>
        </div>

        {/* 목표 완료일 */}
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[453px] leading-[1.5] not-italic text-[20px] text-white">목표 완료일</p>
        <div className="absolute left-[20px] top-[493px] w-[353px] h-[60px]">
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
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[568px] leading-[1.5] not-italic text-[20px] text-white">보상으로 받을 칭찬코인 개수</p>
        <div className="absolute left-[20px] top-[608px] w-[353px] h-[60px]">
          <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
          <input
            type="number"
            value={rewardCoins}
            onChange={(e) => setRewardCoins(e.target.value)}
            placeholder="1"
            className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-white outline-none"
          />
        </div>

        {/* 나중에 버튼 */}
        <div className="absolute h-[50px] left-[113px] top-[752px] w-[167px] cursor-pointer" data-name="시작버튼" onClick={handleClose}>
          <div className="absolute inset-0 rounded-[10px]">
            <div aria-hidden="true" className="absolute border-3 border-[#d68641] border-solid inset-[-1.5px] pointer-events-none rounded-[11.5px]" />
          </div>
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#d68641] text-[18px]">
            나중에
          </p>
        </div>

        {/* 미션 만들기 버튼 */}
        <div className="absolute h-[50px] left-[113px] top-[692px] w-[167px]" data-name="시작버튼">
          <button
            className="absolute inset-0 cursor-pointer active:scale-95 hover:brightness-110 transition-all"
            onClick={handleCreateMission}
          >
            <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#492607] text-[18px] pointer-events-none">미션 만들기</p>
          </button>
        </div>

        <div className="-translate-x-1/2 absolute h-[87px] left-[calc(50%+0.5px)] top-[42px] w-[262px]" data-name="image 14">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[17.96%_55.73%_78.52%_7.38%] leading-[1.5] not-italic text-[20px] text-white">미션완료일 정하기</p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[31.46%_65.14%_65.02%_7.38%] leading-[1.5] not-italic text-[20px] text-white">미션제안하기</p>

        {/* Frequency Buttons */}
        <div
          className="absolute left-[20px] top-[193px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => setSelectedFrequency('1회')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '1회' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
          <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '1회' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>1회</p>
        </div>

        <div
          className="absolute left-[111px] top-[193px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => setSelectedFrequency('매일')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '매일' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
          <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '매일' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>매일</p>
        </div>

        <div
          className="absolute left-[201px] top-[193px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => {
            setSelectedFrequency('매주');
            setIsWeekdaySelectorOpen(true);
          }}
        >
          <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '매주' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
          <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '매주' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>매주</p>
        </div>

        <div
          className="absolute left-[290px] top-[193px] w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => {
            setSelectedFrequency('매월');
            setIsMonthlySelectorOpen(true);
          }}
        >
          <div className={`absolute inset-0 rounded-[8px] ${selectedFrequency === '매월' ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
          <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${selectedFrequency === '매월' ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>매월</p>
        </div>

        {/* 제안할 미션 내용 Input */}
        <div className="absolute left-[20px] top-[308px] w-[353px] h-[60px]">
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
        <div className="absolute left-[20px] top-[378px] w-[353px] h-[60px]">
          <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid h-[60px] rounded-[8px] w-[353px]" />
          <input
            type="text"
            value={additionalContent}
            onChange={(e) => setAdditionalContent(e.target.value)}
            placeholder="추가내용(선택)"
            className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
          />
        </div>

        <div className="absolute h-[36px] left-[112px] top-[63px] w-[169px]" data-name="image 63">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage63} />
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

        {/* 미션 생성 완료 알림 팝업 */}
        {showAlert && (
          <MissionCreatedAlert onConfirm={handleConfirmAlert} />
        )}
      </div>
    </div>
  );
}
