import { useState } from "react";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";

// 아이콘 목록 (나중에 더 추가 가능)
const ICONS = [
  { id: 'book1', src: imgImage46 },
  { id: 'book2', src: imgImage46 },
  { id: 'book3', src: imgImage46 },
  { id: 'book4', src: imgImage46 },
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
        className="absolute bg-[rgba(0,0,0,0.8)] inset-0"
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
      <p className="absolute left-1/2 -translate-x-1/2 top-[199px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#492607] whitespace-nowrap">
        아이콘선택
      </p>

      {/* 아이콘 목록 */}
      {ICONS.map((icon, index) => {
        const isSelected = selectedId === icon.id;
        const leftPositions = [61, 131, 201, 271];
        const leftPosition = leftPositions[index];

        return (
          <div
            key={icon.id}
            className="absolute size-[60px] top-[283px] cursor-pointer active:scale-95 transition-transform"
            style={{ left: `${leftPosition}px` }}
            onClick={() => handleSelect(icon.id)}
          >
            {isSelected ? (
              <>
                {/* 선택된 아이콘: 주황색 테두리 + 선택 오버레이 */}
                <div className="absolute border-5 border-[#ffc377] border-solid rounded-[8px] size-[60px] overflow-hidden">
                  <img alt={icon.id} className="w-full h-full object-cover" src={icon.src} />
                </div>
                <div className="absolute bg-[#302b2b] border-5 border-solid border-white rounded-[8px] size-[60px] flex items-center justify-center">
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] text-center text-white">
                    선택
                  </p>
                </div>
              </>
            ) : (
              /* 선택되지 않은 아이콘: 테두리 없음 */
              <img alt={icon.id} className="size-[60px] object-cover rounded-[8px]" src={icon.src} />
            )}
          </div>
        );
      })}

      {/* 선택완료 버튼 */}
      <div className="absolute h-[50px] left-[113px] top-[528px] w-[167px]" data-name="시작버튼">
        <button
          className="absolute inset-0 cursor-pointer active:scale-95 hover:brightness-110 transition-all"
          onClick={handleConfirm}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[18px] text-[#492607] pointer-events-none">
            선택완료
          </p>
        </button>
      </div>

      {/* 나중에 버튼 */}
      <div
        className="absolute h-[50px] left-[113px] top-[588px] w-[167px] cursor-pointer"
        data-name="시작버튼"
        onClick={onClose}
      >
        <div className="absolute inset-0 rounded-[10px]">
          <div aria-hidden="true" className="absolute border-3 border-[#d68641] border-solid inset-[-1.5px] pointer-events-none rounded-[11.5px]" />
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#d68641] text-[18px]">
          나중에
        </p>
      </div>
    </div>
  );
}
