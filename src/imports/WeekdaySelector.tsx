import { useState } from "react";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage89 from "figma:asset/b26b75e2e6281fa5f1c9cdc300fb58b247321891.png";

type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

interface ComponentProps {
  className?: string;
  onClose?: () => void;
  selectedDays?: DayType[];
  onDaysChange?: (days: DayType[]) => void;
}

interface DayButtonProps {
  day: DayType;
  isSelected: boolean;
  onClick: () => void;
}

function DayButton({ day, isSelected, onClick }: DayButtonProps) {
  return (
    <div
      className="relative size-[60px] cursor-pointer active:scale-95 transition-transform"
      onClick={onClick}
    >
      <div className={`absolute inset-0 rounded-[8px] ${isSelected ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
      <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] ${isSelected ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>
        {day}
      </p>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

function ActionButton({ label, variant, onClick }: ActionButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <div
      className="relative h-[50px] w-[167px] cursor-pointer active:scale-95 transition-transform"
      onClick={onClick}
    >
      {isPrimary ? (
        <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
      ) : (
        <div className="absolute inset-0 rounded-[10px] border-3 border-[#d68641] border-solid" />
      )}
      <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] ${isPrimary ? 'text-[#492607]' : 'text-[#d68641]'}`}>
        {label}
      </p>
    </div>
  );
}

export default function WeekdaySelector({ className, onClose, selectedDays, onDaysChange }: ComponentProps) {
  const [currentDays, setCurrentDays] = useState<DayType[]>(selectedDays || []);

  const days: DayType[] = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = (day: DayType) => {
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];

    setCurrentDays(newDays);
    onDaysChange?.(newDays);
  };

  return (
    <div className={className || "bg-white h-[852px] relative w-[393px]"} data-name="요일선택">
      {/* 배경 오버레이 */}
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-0" />

      {/* 팝업 배경 이미지 */}
      <div className="absolute h-[669px] left-[30px] top-0 w-[333px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full" src={imgImage23} />
        </div>
      </div>

      {/* 헤더 배너 */}
      <div className="absolute h-[65px] left-1/2 -translate-x-1/2 top-[184px] w-[194px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>

      {/* 요일선택 텍스트 */}
      <div className="absolute h-[30px] left-1/2 -translate-x-1/2 top-[199px] w-[88px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage89} />
      </div>

      {/* 요일 버튼들 - 첫째줄 (월화수목) */}
      <div className="absolute top-[296px] left-[62px] flex gap-[10px]">
        {days.slice(0, 4).map((day) => (
          <DayButton
            key={day}
            day={day}
            isSelected={currentDays.includes(day)}
            onClick={() => toggleDay(day)}
          />
        ))}
      </div>

      {/* 요일 버튼들 - 둘째줄 (금토일) */}
      <div className="absolute top-[366px] left-[62px] flex gap-[10px]">
        {days.slice(4).map((day) => (
          <DayButton
            key={day}
            day={day}
            isSelected={currentDays.includes(day)}
            onClick={() => toggleDay(day)}
          />
        ))}
      </div>

      {/* 액션 버튼들 */}
      <div className="absolute top-[528px] left-[113px]">
        <ActionButton label="선택완료" variant="primary" onClick={onClose} />
      </div>
      <div className="absolute top-[588px] left-[113px]">
        <ActionButton label="나중에" variant="secondary" onClick={onClose} />
      </div>
    </div>
  );
}
