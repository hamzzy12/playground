import { useState } from "react";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage54 from "figma:asset/7717fbadfaff2519242403e5e5201a7517a295a2.png";
import ProductIconSelectModal from "./ProductIconSelectModal";

interface ProductEditPopupProps {
  onClose?: () => void;
  onConfirm?: (productName: string, coinPrice: number, iconSrc: string | null) => void;
  onDelete?: () => void;
  initialName: string;
  initialPrice: number;
  initialIconSrc: string | null;
}

export default function ProductEditPopup({ onClose, onConfirm, onDelete, initialName, initialPrice, initialIconSrc }: ProductEditPopupProps) {
  const [productName, setProductName] = useState(initialName);
  const [coinPrice, setCoinPrice] = useState(String(initialPrice));
  const [isIconSelectOpen, setIsIconSelectOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [selectedIconSrc, setSelectedIconSrc] = useState<string | null>(initialIconSrc);

  const handleConfirm = () => {
    if (productName.trim()) {
      onConfirm?.(productName, Number(coinPrice) || 1, selectedIconSrc);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-100 overflow-y-auto">
      <div className="relative w-[393px] h-[852px] bg-[#6e8f3b]">
        {/* Brown Background */}
        <div className="absolute h-[727px] left-0 top-[125px] w-[393px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[121.01%] left-[-8.09%] max-w-none top-[-0.05%] w-[116.49%]" src={imgImage17} />
          </div>
        </div>

        {/* Title Banner */}
        <div className="absolute h-[87px] left-1/2 -translate-x-1/2 top-[87px] w-[262px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <p
          className="absolute left-1/2 -translate-x-1/2 top-[101px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[32px] text-center text-white"
          style={{
            textShadow: `
              -3px -3px 0 #713925, 3px -3px 0 #713925, -3px 3px 0 #713925, 3px 3px 0 #713925,
              0 -3px 0 #713925, 0 3px 0 #713925, -3px 0 0 #713925, 3px 0 0 #713925,
              -2px -3px 0 #713925, 2px -3px 0 #713925, -2px 3px 0 #713925, 2px 3px 0 #713925,
              -3px -2px 0 #713925, 3px -2px 0 #713925, -3px 2px 0 #713925, 3px 2px 0 #713925
            `
          }}
        >
          상품수정
        </p>

        {/* 상품 이름 */}
        <p className="absolute left-[29px] top-[198px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          상품 이름
        </p>
        <div className="absolute left-[20px] top-[238px] w-[353px] h-[60px]">
          <input
            type="text"
            value={productName}
            onChange={(e) => { if (e.target.value.length <= 10) setProductName(e.target.value); }}
            maxLength={10}
            placeholder="어떤 선물인가요?"
            className="w-full h-full bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder-white/30 focus:outline-none"
          />
        </div>

        {/* 필요한 코인 */}
        <p className="absolute left-[29px] top-[313px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          필요한 코인
        </p>
        <div className="absolute left-[20px] top-[352px] w-[353px] h-[60px]">
          <input
            type="number"
            value={coinPrice}
            onChange={(e) => { const v = Number(e.target.value); if (e.target.value === '' || (v >= 0 && v <= 99)) setCoinPrice(e.target.value); }}
            min={1}
            max={99}
            className="w-full h-full bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white focus:outline-none"
          />
        </div>

        {/* 아이콘 선택 */}
        <p className="absolute left-[22px] top-[426px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          아이콘 선택
        </p>
        <button
          className="absolute left-[22px] top-[467px] w-[78px] h-[78px] bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] flex items-center justify-center overflow-hidden"
          onClick={() => setIsIconSelectOpen(true)}
        >
          {selectedIconSrc ? (
            <img alt="" className="w-full h-full object-cover" src={selectedIconSrc} />
          ) : (
            <img alt="" className="w-[39px] h-[39px] object-cover" src={imgImage54} />
          )}
        </button>
        {/* 선택된 아이콘 미리보기 */}
        {selectedIconSrc && (
          <div className="absolute left-[110px] top-[467px] w-[78px] h-[78px] bg-[#f7f2ee] border-4 border-[#cb721e] rounded-[8px] overflow-hidden">
            <img alt="" className="w-full h-full object-cover" src={selectedIconSrc} />
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="absolute left-[20px] top-[768px] flex gap-[17px]">
          <button
            className="w-[168px] h-[50px] border-3 border-[#d68641] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#d68641]"
            onClick={onDelete}
          >
            삭제하기
          </button>
          <button
            className="w-[168px] h-[50px] bg-[#ffe400] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]"
            onClick={handleConfirm}
          >
            상품 수정
          </button>
        </div>

        {/* 아이콘 선택 모달 */}
        {isIconSelectOpen && (
          <ProductIconSelectModal
            selectedIconId={selectedIconId}
            onSelect={(iconId, iconSrc) => {
              setSelectedIconId(iconId);
              setSelectedIconSrc(iconSrc);
            }}
            onClose={() => setIsIconSelectOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
