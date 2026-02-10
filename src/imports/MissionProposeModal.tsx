import { useState } from "react";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage63 from "figma:asset/67b776f37d98a218bd6499f227365db338cd0a13.png";
import imgImage54 from "figma:asset/7717fbadfaff2519242403e5e5201a7517a295a2.png";
import WeekdaySelector from "./WeekdaySelector";
import MonthlySelector, { WeeklySchedule } from "./MonthlySelector";
import IconSelectModal from "@/app/components/IconSelectModal";

type FrequencyType = '1회' | '매일' | '매주' | '매월';
type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

interface ComponentProps {
  className?: string;
  onClose?: () => void;
  onCreateMission?: (title: string, description: string, reward: number, frequency: FrequencyType, dueDate?: string) => void;
}

export default function MissionProposeModal({ className, onClose, onCreateMission }: ComponentProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyType>('1회');
  const [missionContent, setMissionContent] = useState('');
  const [additionalContent, setAdditionalContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [rewardCoins, setRewardCoins] = useState('1');
  const [isWeekdaySelectorOpen, setIsWeekdaySelectorOpen] = useState(false);
  const [isMonthlySelectorOpen, setIsMonthlySelectorOpen] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({});
  const [weeklySelectedDays, setWeeklySelectedDays] = useState<DayType[]>([]);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [selectedIconSrc, setSelectedIconSrc] = useState<string | null>(null);
  const [isIconSelectOpen, setIsIconSelectOpen] = useState(false);

  const handleCreateMission = () => {
    if (!missionContent) {
      alert('미션 내용을 입력해주세요!');
      return;
    }
    if (!rewardCoins || parseInt(rewardCoins) <= 0) {
      alert('보상 코인을 입력해주세요!');
      return;
    }
    onCreateMission?.(missionContent, additionalContent, parseInt(rewardCoins), selectedFrequency, dueDate || undefined);
    onClose?.();
  };

  return (
    <div className={className || "w-[393px] h-[852px] overflow-y-auto"}>
      <div className="bg-[#6e8f3b] h-[1004px] relative w-[393px]" data-name="미션제안하기">
        {/* 배경 이미지 */}
        <div className="absolute h-[879px] left-0 top-[125px] w-[393px] pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[100.09%] left-[-8.09%] max-w-none top-[-0.04%] w-[116.49%]" src={imgImage17} />
          </div>
        </div>

        {/* 타이틀 배너 */}
        <div className="-translate-x-1/2 absolute h-[87px] left-[calc(50%+0.5px)] top-[87px] w-[262px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <div className="absolute h-[36px] left-[112px] top-[108px] w-[169px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage63} />
        </div>

        {/* 미션완료일 정하기 */}
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[29px] top-[198px] leading-[1.5] text-[20px] text-white">
          미션완료일 정하기
        </p>

        {/* Frequency Buttons */}
        {(['1회', '매일', '매주', '매월'] as FrequencyType[]).map((freq, i) => {
          const leftPositions = [20, 111, 201, 290];
          const isSelected = selectedFrequency === freq;
          return (
            <div
              key={freq}
              className="absolute w-[83px] h-[60px] cursor-pointer active:scale-95 transition-transform"
              style={{ left: `${leftPositions[i]}px`, top: '238px' }}
              onClick={() => {
                setSelectedFrequency(freq);
                if (freq === '매주') setIsWeekdaySelectorOpen(true);
                if (freq === '매월') setIsMonthlySelectorOpen(true);
              }}
            >
              <div className={`absolute inset-0 rounded-[8px] ${isSelected ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
              <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] ${isSelected ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>
                {freq}
              </p>
            </div>
          );
        })}

        {/* 미션제안하기 */}
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[29px] top-[313px] leading-[1.5] text-[20px] text-white">
          미션제안하기
        </p>

        {/* 제안할 미션 내용 */}
        <div className="absolute left-[20px] top-[353px] w-[353px] h-[60px]">
          <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
          <input
            type="text"
            value={missionContent}
            onChange={(e) => setMissionContent(e.target.value)}
            placeholder="제안할 미션 내용"
            className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
          />
        </div>

        {/* 추가내용(선택) */}
        <div className="absolute left-[20px] top-[423px] w-[353px] h-[60px]">
          <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
          <input
            type="text"
            value={additionalContent}
            onChange={(e) => setAdditionalContent(e.target.value)}
            placeholder="추가내용(선택)"
            className="absolute inset-0 bg-transparent px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none"
          />
        </div>

        {/* 목표 완료일 */}
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[498px] leading-[1.5] text-[20px] text-white">
          목표 완료일
        </p>
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
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[613px] leading-[1.5] text-[20px] text-white">
          보상으로 받을 칭찬코인 개수
        </p>
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
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[22px] top-[728px] leading-[1.5] text-[20px] text-white">
          아이콘 선택
        </p>
        <div className="absolute left-[22px] top-[768px] flex gap-[10px]">
          <div
            className="cursor-pointer active:scale-95 transition-transform"
            onClick={() => setIsIconSelectOpen(true)}
          >
            <div className="bg-[#733e14] border-4 border-[#cb721e] border-solid rounded-[8px] size-[78px] flex items-center justify-center">
              <img alt="add icon" className="size-[39px]" src={imgImage54} />
            </div>
          </div>
          {selectedIconSrc && (
            <div className="relative">
              <div className="size-[78px] cursor-pointer" onClick={() => setIsIconSelectOpen(true)}>
                <img src={selectedIconSrc} alt="선택된 아이콘" className="w-full h-full object-contain" />
              </div>
              <button
                onClick={() => { setSelectedIconId(null); setSelectedIconSrc(null); }}
                className="absolute -top-[8px] -right-[8px] bg-red-500 text-white rounded-full w-[24px] h-[24px] flex items-center justify-center text-[14px] font-bold"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 미션 만들기 버튼 */}
        <button
          className="absolute left-[113px] top-[866px] w-[167px] h-[50px] cursor-pointer active:scale-95 transition-transform"
          onClick={handleCreateMission}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[18px]">
            미션 만들기
          </p>
        </button>

        {/* 나중에 버튼 */}
        <button
          className="absolute left-[113px] top-[926px] w-[167px] h-[50px] cursor-pointer active:scale-95 transition-transform"
          onClick={onClose}
        >
          <div className="absolute border-3 border-[#d68641] border-solid inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#d68641] text-[18px]">
            나중에
          </p>
        </button>
      </div>

      {/* 요일선택 모달 */}
      {isWeekdaySelectorOpen && (
        <div className="fixed inset-0 z-50 flex justify-center" onClick={() => setIsWeekdaySelectorOpen(false)}>
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
        <div className="fixed inset-0 z-50 flex justify-center" onClick={() => setIsMonthlySelectorOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <MonthlySelector
              onClose={() => setIsMonthlySelectorOpen(false)}
              weeklySchedule={weeklySchedule}
              onScheduleChange={setWeeklySchedule}
            />
          </div>
        </div>
      )}

      {/* 아이콘 선택 모달 */}
      {isIconSelectOpen && (
        <IconSelectModal
          onSelect={(iconId, iconSrc) => { setSelectedIconId(iconId); setSelectedIconSrc(iconSrc); }}
          onClose={() => setIsIconSelectOpen(false)}
          selectedIconId={selectedIconId}
        />
      )}
    </div>
  );
}
