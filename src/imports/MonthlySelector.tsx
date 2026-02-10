import { useState } from "react";
import imgImage87 from "figma:asset/107224774074739467c6ced065f389fbadb99d3c.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage88 from "figma:asset/b6651ec52b5cef36f4df76d8cfbd7e18cdeae7b9.png";

type WeekType = '첫째주' | '둘째주' | '셋째주' | '넷째주';
type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export type WeeklySchedule = {
  [key in WeekType]?: DayType[];
};

interface ComponentProps {
  onClose?: () => void;
  selectedWeeks?: WeekType[];
  weeklySchedule?: WeeklySchedule;
  onWeeksChange?: (weeks: WeekType[]) => void;
  onScheduleChange?: (schedule: WeeklySchedule) => void;
}

interface SelectButtonProps {
  label: string;
  isSelected: boolean;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
  size?: 'week' | 'day';
}

function SelectButton({ label, isSelected, isActive, onClick, className, size = 'week' }: SelectButtonProps) {
  const sizeClass = size === 'week' ? 'w-[83px] h-[60px]' : 'size-[60px]';

  return (
    <div
      className={`relative ${sizeClass} cursor-pointer active:scale-95 transition-transform ${className}`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 rounded-[8px] ${isSelected ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
      {isActive && (
        <div className="absolute border-[5px] border-white border-solid inset-0 pointer-events-none rounded-[8px]" />
      )}
      <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] ${isSelected ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>
        {label}
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

export default function MonthlySelector({ onClose, weeklySchedule, onScheduleChange }: ComponentProps) {
  const [currentSchedule, setCurrentSchedule] = useState<WeeklySchedule>(weeklySchedule || {});
  const [activeWeek, setActiveWeek] = useState<WeekType>('첫째주');

  const weeks: WeekType[] = ['첫째주', '둘째주', '셋째주', '넷째주'];
  const days: DayType[] = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = (day: DayType) => {
    const newSchedule: WeeklySchedule = { ...currentSchedule };
    const currentDays = newSchedule[activeWeek] || [];

    if (currentDays.includes(day)) {
      newSchedule[activeWeek] = currentDays.filter(d => d !== day);
    } else {
      newSchedule[activeWeek] = [...currentDays, day];
    }
    setCurrentSchedule(newSchedule);
    onScheduleChange?.(newSchedule);
  };

  const toggleWeek = (week: WeekType) => {
    setActiveWeek(week);
    if (!currentSchedule[week]) {
      const newSchedule = { ...currentSchedule, [week]: [] };
      setCurrentSchedule(newSchedule);
      onScheduleChange?.(newSchedule);
    }
  };

  const getCurrentDays = () => currentSchedule[activeWeek] || [];
  const hasWeekDays = (week: WeekType) => (currentSchedule[week]?.length ?? 0) > 0;

  return (
    <div className="bg-white h-[852px] relative w-[393px]" data-name="월선택">
      {/* 배경 오버레이 */}
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-0" />

      {/* 팝업 배경 이미지 */}
      <div className="absolute h-[717px] left-[28px] top-0 w-[334px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[111.73%] left-0 max-w-none top-[-11.72%] w-full" src={imgImage87} />
        </div>
      </div>

      {/* 헤더 배너 */}
      <div className="absolute h-[65px] left-1/2 -translate-x-1/2 top-[97px] w-[194px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>

      {/* 월선택 텍스트 */}
      <div className="absolute h-[30px] left-1/2 -translate-x-1/2 top-[112px] w-[67px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage88} />
      </div>

      {/* 주선택 라벨 */}
      <p className="absolute top-[195px] left-[50px] w-[271px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white text-center">
        주선택
      </p>

      {/* 주차 선택 버튼들 - 첫째줄 */}
      <div className="absolute top-[231px] left-[50px] flex gap-[10px]">
        {weeks.slice(0, 3).map((week) => (
          <SelectButton
            key={week}
            label={week}
            isSelected={hasWeekDays(week)}
            isActive={activeWeek === week}
            onClick={() => toggleWeek(week)}
          />
        ))}
      </div>

      {/* 주차 선택 버튼들 - 둘째줄 */}
      <div className="absolute top-[301px] left-[50px]">
        <SelectButton
          label="넷째주"
          isSelected={hasWeekDays('넷째주')}
          isActive={activeWeek === '넷째주'}
          onClick={() => toggleWeek('넷째주')}
        />
      </div>

      {/* 요일선택 라벨 */}
      <p className="absolute top-[380px] left-[50px] w-[271px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white text-center">
        요일선택
      </p>

      {/* 요일 선택 버튼들 - 첫째줄 */}
      <div className="absolute top-[416px] left-[50px] flex gap-[10px]">
        {days.slice(0, 4).map((day) => (
          <SelectButton
            key={day}
            label={day}
            isSelected={getCurrentDays().includes(day)}
            onClick={() => toggleDay(day)}
            size="day"
          />
        ))}
      </div>

      {/* 요일 선택 버튼들 - 둘째줄 */}
      <div className="absolute top-[486px] left-[50px] flex gap-[10px]">
        {days.slice(4).map((day) => (
          <SelectButton
            key={day}
            label={day}
            isSelected={getCurrentDays().includes(day)}
            onClick={() => toggleDay(day)}
            size="day"
          />
        ))}
      </div>

      {/* 액션 버튼들 */}
      <div className="absolute top-[576px] left-[113px]">
        <ActionButton label="선택완료" variant="primary" onClick={onClose} />
      </div>
      <div className="absolute top-[636px] left-[113px]">
        <ActionButton label="나중에" variant="secondary" onClick={onClose} />
      </div>
    </div>
  );
}
