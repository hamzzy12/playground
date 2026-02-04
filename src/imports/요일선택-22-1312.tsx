import { useState } from "react";
import imgImage87 from "figma:asset/107224774074739467c6ced065f389fbadb99d3c.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage88 from "figma:asset/b6651ec52b5cef36f4df76d8cfbd7e18cdeae7b9.png";

type WeekType = '첫째주' | '둘째주' | '셋째주' | '넷째주';
type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

// 주차별 요일 선택 상태 타입
export type WeeklySchedule = {
  [key in WeekType]?: DayType[];
};

function Group() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-3 border-[#d68641] border-solid inset-[-1.5px] pointer-events-none rounded-[11.5px]" />
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_36.02%_22%_35.24%] leading-[1.5] not-italic text-[#d68641] text-[18px] text-center">나중에</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_31.23%_22%_31.05%] leading-[1.5] not-italic text-[#492607] text-[18px] text-center">선택완료</p>
    </div>
  );
}

interface ComponentProps {
  onClose?: () => void;
  selectedWeeks?: WeekType[];
  weeklySchedule?: WeeklySchedule;
  onWeeksChange?: (weeks: WeekType[]) => void;
  onScheduleChange?: (schedule: WeeklySchedule) => void;
}

function Group4() {
  return (
    <div className="absolute contents left-[50px] top-[416px]">
      <div className="absolute bg-[#ffe400] left-[50px] rounded-[8px] size-[60px] top-[416px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[50.82%_78.63%_46.01%_17.3%] leading-[1.5] not-italic text-[#492607] text-[18px]">월</p>
    </div>
  );
}

export default function Component({ onClose, selectedWeeks, weeklySchedule, onWeeksChange, onScheduleChange }: ComponentProps) {
  const [currentWeeks, setCurrentWeeks] = useState<WeekType[]>(selectedWeeks || []);
  const [currentSchedule, setCurrentSchedule] = useState<WeeklySchedule>(weeklySchedule || {});
  const [activeWeek, setActiveWeek] = useState<WeekType>('첫째주'); // 현재 요일 편집 중인 주차

  const toggleDay = (day: DayType) => {
    let newSchedule: WeeklySchedule = { ...currentSchedule };
    const currentDays = newSchedule[activeWeek] || [];
    
    if (currentDays.includes(day)) {
      newSchedule[activeWeek] = currentDays.filter(d => d !== day);
    } else {
      newSchedule[activeWeek] = [...currentDays, day];
    }
    setCurrentSchedule(newSchedule);
    if (onScheduleChange) {
      onScheduleChange(newSchedule);
    }
  };

  const toggleWeek = (week: WeekType) => {
    // 주차 클릭 시 해당 주차의 요일 편집 모드로 전환
    setActiveWeek(week);
    
    // 해당 주차에 요일이 없으면 빈 배열로 초기화
    if (!currentSchedule[week]) {
      const newSchedule = { ...currentSchedule, [week]: [] };
      setCurrentSchedule(newSchedule);
      if (onScheduleChange) {
        onScheduleChange(newSchedule);
      }
    }
  };

  const getCurrentDays = () => currentSchedule[activeWeek] || [];
  
  const hasWeekDays = (week: WeekType) => {
    const days = currentSchedule[week];
    return days && days.length > 0;
  };

  return (
    <div className="bg-white h-[852px] relative w-[393px]" data-name="요일선택">
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-[0_-0.25%_0_0]" />
      <div className="absolute h-[717px] left-[28px] top-0 w-[334px]" data-name="image 87">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[111.73%] left-0 max-w-none top-[-11.72%] w-full" src={imgImage87} />
        </div>
      </div>
      
      {/* 나중에 버튼 */}
      <div 
        className="absolute h-[50px] left-[113px] top-[636px] w-[167px] cursor-pointer active:scale-95 transition-transform"
        onClick={onClose}
      >
        <Group />
      </div>
      
      {/* 선택완료 버튼 */}
      <div 
        className="absolute h-[50px] left-[113px] top-[576px] w-[167px] cursor-pointer active:scale-95 transition-transform"
        onClick={onClose}
      >
        <Group1 />
      </div>
      
      <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-1.5px)] top-[97px] w-[194px]" data-name="image 14">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[22.42%_76.59%_74.06%_15.01%] leading-[1.5] not-italic text-[20px] text-white">주수</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[44.13%_67.18%_52.35%_15.01%] leading-[1.5] not-italic text-[20px] text-white">요일선택</p>
      
      {/* 주수 선택 버튼들 */}
      {/* 첫째주 */}
      <div 
        className="absolute h-[60px] left-[50px] top-[231px] w-[83px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleWeek('첫째주')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${hasWeekDays('첫째주') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        {activeWeek === '첫째주' && (
          <div aria-hidden="true" className="absolute border-[5px] border-white border-solid inset-0 pointer-events-none rounded-[8px]" />
        )}
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${hasWeekDays('첫째주') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>첫째주</p>
      </div>

      {/* 둘째주 */}
      <div 
        className="absolute h-[60px] left-[143px] top-[231px] w-[83px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleWeek('둘째주')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${hasWeekDays('둘째주') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        {activeWeek === '둘째주' && (
          <div aria-hidden="true" className="absolute border-[5px] border-white border-solid inset-0 pointer-events-none rounded-[8px]" />
        )}
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${hasWeekDays('둘째주') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>둘째주</p>
      </div>

      {/* 셋째주 */}
      <div 
        className="absolute h-[60px] left-[238px] top-[231px] w-[83px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleWeek('셋째주')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${hasWeekDays('셋째주') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        {activeWeek === '셋째주' && (
          <div aria-hidden="true" className="absolute border-[5px] border-white border-solid inset-0 pointer-events-none rounded-[8px]" />
        )}
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${hasWeekDays('셋째주') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>셋째주</p>
      </div>

      {/* 넷째주 */}
      <div 
        className="absolute h-[60px] left-[50px] top-[301px] w-[83px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleWeek('넷째주')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${hasWeekDays('넷째주') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        {activeWeek === '넷째주' && (
          <div aria-hidden="true" className="absolute border-[5px] border-white border-solid inset-0 pointer-events-none rounded-[8px]" />
        )}
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${hasWeekDays('넷째주') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>넷째주</p>
      </div>

      {/* 요일 선택 버튼들 */}
      {/* 월 */}
      <div 
        className="absolute left-[50px] rounded-[8px] size-[60px] top-[416px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('월')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('월') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('월') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>월</p>
      </div>

      {/* 화 */}
      <div 
        className="absolute left-[120px] rounded-[8px] size-[60px] top-[416px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('화')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('화') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('화') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>화</p>
      </div>

      {/* 수 */}
      <div 
        className="absolute left-[190px] rounded-[8px] size-[60px] top-[416px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('수')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('수') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('수') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>수</p>
      </div>

      {/* 목 */}
      <div 
        className="absolute left-[260px] rounded-[8px] size-[60px] top-[416px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('목')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('목') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('목') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>목</p>
      </div>

      {/* 금 */}
      <div 
        className="absolute left-[50px] rounded-[8px] size-[60px] top-[486px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('금')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('금') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('금') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>금</p>
      </div>

      {/* 토 */}
      <div 
        className="absolute left-[120px] rounded-[8px] size-[60px] top-[486px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('토')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('토') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('토') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>토</p>
      </div>

      {/* 일 */}
      <div 
        className="absolute left-[190px] rounded-[8px] size-[60px] top-[486px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('일')}
      >
        <div className={`absolute inset-0 rounded-[8px] ${getCurrentDays().includes('일') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] ${getCurrentDays().includes('일') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>일</p>
      </div>

      <div className="absolute h-[30px] left-[164px] top-[112px] w-[67px]" data-name="image 88">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage88} />
      </div>
    </div>
  );
}