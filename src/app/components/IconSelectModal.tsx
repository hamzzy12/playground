import { useState } from "react";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage94 from "figma:asset/d5c1d24e59248c86b44b5632ac659ec5c66bf658.png";
import imgImage95 from "figma:asset/233786992c0b3a942d3108fc6a86928f3a095173.png";
import imgCheckmark from "figma:asset/db948d78db40676ed8a77c50b3adff627f7395c6.svg";

// 아이콘 목록 (나중에 더 추가 가능)
const ICONS = [
  { id: 'book1', src: imgImage95 },
  { id: 'book2', src: imgImage95 },
  { id: 'book3', src: imgImage95 },
  { id: 'book4', src: imgImage95 },
];

interface IconSelectModalProps {
  onSelect: (iconId: string, iconSrc: string) => void;
  onClose: () => void;
  selectedIconId?: string | null;
}

export default function IconSelectModal({ onSelect, onClose, selectedIconId: initialSelectedId }: IconSelectModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);

  const handleSelect = (iconId: string) => {
    setSelectedId(iconId);
  };

  const handleConfirm = () => {
    if (selectedId) {
      const selectedIcon = ICONS.find(icon => icon.id === selectedId);
      if (selectedIcon) {
        onSelect(selectedIcon.id, selectedIcon.src);
      }
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50" data-name="아이콘선택">
      {/* 어두운 배경 오버레이 */}
      <div
        className="absolute bg-[rgba(0,0,0,0.9)] inset-0"
        onClick={onClose}
      />

      {/* 나무 프레임 팝업 */}
      <div className="absolute h-[669px] left-[30px] top-0 w-[333px]" data-name="image 23">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full" src={imgImage23} />
        </div>
      </div>

      {/* 타이틀 */}
      <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-1.5px)] top-[184px] w-[194px]" data-name="image 14">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <div className="absolute h-[30px] left-[142px] top-[199px] w-[109px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage94} />
      </div>

      {/* 아이콘 목록 */}
      {ICONS.map((icon, index) => {
        const isSelected = selectedId === icon.id;
        const leftPositions = [50, 127, 204, 281];
        const leftPosition = leftPositions[index];

        return (
          <div
            key={icon.id}
            className="absolute size-[63px] top-[283px] cursor-pointer active:scale-95 transition-transform"
            style={{ left: `${leftPosition}px` }}
            onClick={() => handleSelect(icon.id)}
          >
            {/* 아이콘 이미지 */}
            <img alt={icon.id} className="absolute inset-0 size-full object-cover rounded-[8px]" src={icon.src} />
            {/* 선택 시 체크마크 SVG 오버레이 */}
            {isSelected && (
              <div className="absolute inset-[-3.17%]">
                <img alt="selected" className="block max-w-none size-full" src={imgCheckmark} />
              </div>
            )}
          </div>
        );
      })}

      {/* 나중에 버튼 */}
      <button
        className="absolute left-[53px] top-[588px] w-[135px] h-[50px] cursor-pointer active:scale-95 transition-transform"
        onClick={onClose}
      >
        <div className="absolute border-3 border-[#d68641] border-solid inset-0 rounded-[10px]" />
        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#d68641]">
          나중에
        </p>
      </button>

      {/* 선택완료 버튼 */}
      <button
        className="absolute left-[203px] top-[588px] w-[137px] h-[50px] cursor-pointer active:scale-95 transition-transform"
        onClick={handleConfirm}
      >
        <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
          선택완료
        </p>
      </button>
    </div>
  );
}
