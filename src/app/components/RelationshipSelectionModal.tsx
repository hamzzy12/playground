import React from "react";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage21 from "figma:asset/7fbe153e758dd697ac3336ffcf323c31e859859d.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage24 from "figma:asset/c6680846773d8124fed6e936bb9a26a76ad51397.png";

interface RelationshipSelectionModalProps {
  onSelect: (relationship: string) => void;
  onClose: () => void;
}

export default function RelationshipSelectionModal({ onSelect, onClose }: RelationshipSelectionModalProps) {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
        {/* Container for the board, maintaining original coordinate system context */}
        <div className="relative w-[393px] h-[852px] pointer-events-none" onClick={(e) => e.stopPropagation()}>
             {/* Board Image - Top 0 based on figma */}
            <div className="absolute h-[669px] left-[28px] top-0 w-[333px] pointer-events-auto">
                 <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgImage23} />
            </div>
            
            {/* Header: 관계선택 (approximate centering based on code provided) */}
             <div className="absolute h-[65px] left-[100px] top-[187px] w-[194px] pointer-events-auto"> 
                <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgImage14} />
             </div>
             <div className="absolute h-[31px] left-[143px] top-[201px] w-[104px] pointer-events-auto">
                <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgImage24} />
             </div>

            {/* Buttons */}
            {/* Option 1: 나자신 */}
            <div 
                className="absolute h-[64px] left-[56px] top-[274px] w-[278px] cursor-pointer active:scale-95 transition-transform pointer-events-auto"
                onClick={() => handleSelect("나자신")}
            >
                <img alt="" className="absolute inset-0 w-full h-full" src={imgImage21} />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[20px]">나자신</p>
            </div>

            {/* Option 2: 부모 */}
            <div 
                className="absolute h-[64px] left-[56px] top-[348px] w-[278px] cursor-pointer active:scale-95 transition-transform pointer-events-auto"
                onClick={() => handleSelect("부모")}
            >
                <img alt="" className="absolute inset-0 w-full h-full" src={imgImage21} />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[20px]">부모</p>
            </div>

            {/* Option 3: 자식 */}
            <div 
                className="absolute h-[64px] left-[56px] top-[422px] w-[278px] cursor-pointer active:scale-95 transition-transform pointer-events-auto"
                onClick={() => handleSelect("자식")}
            >
                <img alt="" className="absolute inset-0 w-full h-full" src={imgImage21} />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[20px]">자식</p>
            </div>

            {/* Option 4: 기타 직접 입력 */}
             <div 
                className="absolute h-[64px] left-[56px] top-[496px] w-[278px] cursor-pointer active:scale-95 transition-transform pointer-events-auto"
                onClick={() => handleSelect("기타 직접 입력")}
            >
                <img alt="" className="absolute inset-0 w-full h-full" src={imgImage21} />
                <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[20px]">기타 직접 입력</p>
            </div>
        </div>
    </div>
  );
}