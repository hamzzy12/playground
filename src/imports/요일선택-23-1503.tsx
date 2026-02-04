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

export default function Component({ className, onClose, selectedDays, onDaysChange }: ComponentProps) {
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
    <div className={className || "bg-white h-[852px] relative w-[393px]"} data-name="요일선택">
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-[0_-0.25%_0_0]" />
      <div className="absolute h-[669px] left-[30px] top-0 w-[333px]" data-name="image 23">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full" src={imgImage23} />
        </div>
      </div>
      
      {/* 나중에 버튼 */}
      <div 
        className="absolute h-[50px] left-[113px] top-[588px] w-[167px] cursor-pointer active:scale-95 transition-transform"
        onClick={onClose}
      >
        <div className="absolute contents inset-0">
          <div className="absolute inset-0 rounded-[10px]">
            <div aria-hidden="true" className="absolute border-3 border-[#d68641] border-solid inset-[-1.5px] pointer-events-none rounded-[11.5px]" />
          </div>
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#d68641] text-[18px]">나중에</p>
        </div>
      </div>
      
      {/* 선택완료 버튼 */}
      <div 
        className="absolute h-[50px] left-[113px] top-[528px] w-[167px] cursor-pointer active:scale-95 transition-transform"
        onClick={onClose}
      >
        <div className="absolute contents inset-0">
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#492607] text-[18px]">선택완료</p>
        </div>
      </div>
      
      {/* 요일 버튼들 */}
      <div className="absolute contents left-[62px] top-[296px]">
        {/* 월 */}
        <div 
          className="absolute left-[62px] rounded-[8px] size-[60px] top-[296px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('월')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('월') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[36.74%_74.55%_60.09%_21.37%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('월') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>월</p>
        
        {/* 화 */}
        <div 
          className="absolute left-[132px] rounded-[8px] size-[60px] top-[296px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('화')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('화') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[36.74%_56.74%_60.09%_38.93%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('화') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>화</p>
        
        {/* 수 */}
        <div 
          className="absolute left-[202px] rounded-[8px] size-[60px] top-[296px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('수')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('수') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[36.74%_39.44%_60.09%_56.74%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('수') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>수</p>
        
        {/* 목 */}
        <div 
          className="absolute left-[272px] rounded-[8px] size-[60px] top-[296px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('목')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('목') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[36.74%_21.63%_60.09%_74.55%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('목') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>목</p>
        
        {/* 금 */}
        <div 
          className="absolute left-[62px] rounded-[8px] size-[60px] top-[366px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('금')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('금') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[44.84%_74.55%_52%_21.63%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('금') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>금</p>
        
        {/* 토 */}
        <div 
          className="absolute left-[132px] rounded-[8px] size-[60px] top-[366px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('토')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('토') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[44.84%_56.74%_52%_39.44%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('토') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>토</p>
        
        {/* 일 */}
        <div 
          className="absolute left-[202px] rounded-[8px] size-[60px] top-[366px] cursor-pointer active:scale-95 transition-transform"
          onClick={() => toggleDay('일')}
        >
          <div className={`absolute inset-0 rounded-[8px] ${currentDays.includes('일') ? 'bg-[#ffe400]' : 'bg-[#733e14]'}`} />
        </div>
        <p className={`absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[44.84%_38.93%_52%_57%] leading-[1.5] not-italic text-[18px] pointer-events-none ${currentDays.includes('일') ? 'text-[#492607]' : 'text-[rgba(255,255,255,0.3)]'}`}>일</p>
      </div>
      
      <div className="absolute contents left-[98px] top-[184px]">
        <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-1.5px)] top-[184px] w-[194px]" data-name="image 14">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <div className="absolute h-[30px] left-[151px] top-[199px] w-[88px]" data-name="image 89">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage89} />
        </div>
      </div>
    </div>
  );
}