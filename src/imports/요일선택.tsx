import { useState } from "react";
import imgImage87 from "figma:asset/107224774074739467c6ced065f389fbadb99d3c.png";
import imgImage21 from "figma:asset/7fbe153e758dd697ac3336ffcf323c31e859859d.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage89 from "figma:asset/b26b75e2e6281fa5f1c9cdc300fb58b247321891.png";

type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

interface ComponentProps {
  onClose?: () => void;
  selectedDays?: DayType[];
  onDaysChange?: (days: DayType[]) => void;
}

export default function Component({ onClose, selectedDays, onDaysChange }: ComponentProps) {
  const [currentDays, setCurrentDays] = useState<DayType[]>(selectedDays || []);

  const toggleDay = (day: DayType) => {
    let newDays: DayType[];
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = [...currentDays, day];
    }
    setCurrentDays(newDays);
    if (onDaysChange) {
      onDaysChange(newDays);
    }
  };

  return (
    <div className="bg-white relative size-full" data-name="요일선택">
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-[0_-0.25%_0_0]" />
      <div className="absolute h-[717px] left-[28px] top-0 w-[334px]" data-name="image 87">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[111.73%] left-0 max-w-none top-[-11.72%] w-full" src={imgImage87} />
        </div>
      </div>
      
      {/* 요일 버튼들 - 클릭 가능하며 선택 상태에 따라 배경색 변경 */}
      {/* 월 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[187px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('월')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('월') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('월') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">월</p>
      </div>

      {/* 화 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[259px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('화')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('화') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('화') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">화</p>
      </div>

      {/* 수 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[331px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('수')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('수') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('수') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">수</p>
      </div>

      {/* 목 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[403px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('목')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('목') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('목') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">목</p>
      </div>

      {/* 금 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[475px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('금')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('금') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('금') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">금</p>
      </div>

      {/* 토 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[547px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('토')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('토') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('토') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">토</p>
      </div>

      {/* 일 */}
      <div 
        className="absolute h-[64px] left-[56px] top-[619px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => toggleDay('일')}
      >
        <div className={`absolute inset-0 rounded-[10px] ${currentDays.includes('일') ? 'bg-[#ffe400]' : ''}`} />
        <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${currentDays.includes('일') ? 'opacity-0' : ''}`} src={imgImage21} />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[1.5] not-italic text-[#492607] text-[20px] text-center">일</p>
      </div>

      <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-1.5px)] top-[97px] w-[194px]" data-name="image 14">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <div className="absolute h-[30px] left-[151px] top-[112px] w-[88px]" data-name="image 89">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage89} />
      </div>
    </div>
  );
}