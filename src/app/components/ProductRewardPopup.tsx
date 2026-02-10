import { useRef, useState } from "react";
import imgImage29 from "figma:asset/cf324f7116373cd3d9f07fc7bb4cd7ec486d632b.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";

interface ProductRewardPopupProps {
  onConfirm?: (rewardDate: string) => void;
}

export default function ProductRewardPopup({ onConfirm }: ProductRewardPopupProps) {
  const [rewardDate, setRewardDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-100 overflow-y-auto">
      <div className="relative w-[393px] h-[852px]">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/90" />

        {/* Wooden Board */}
        <div className="absolute left-[27px] top-0 w-[333px] h-[439px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[102.8%] left-0 max-w-none top-[-2.77%] w-full" src={imgImage29} />
          </div>
        </div>

        {/* Alert Banner */}
        <div className="absolute left-[90px] top-[192px] w-[204px] h-[61px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage64} />
        </div>

        {/* Banner Title */}
        <p className="absolute left-[192px] -translate-x-1/2 top-[203px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[26px] text-white text-center">
          보상날짜
        </p>

        {/* Date Input */}
        <div
          className="absolute left-[83px] top-[289px] w-[233px] h-[50px] cursor-pointer"
          onClick={() => dateInputRef.current?.showPicker()}
        >
          <div className="absolute inset-0 bg-[#7b3901] rounded-[10px]" />
          <p className={`absolute inset-0 flex items-center px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] ${rewardDate ? 'text-white' : 'text-white/30'}`}>
            {rewardDate || "선물 줄 날짜"}
          </p>
          <input
            ref={dateInputRef}
            type="date"
            value={rewardDate}
            onChange={(e) => setRewardDate(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Confirm Button */}
        <button
          className="absolute left-[126px] top-[352px] w-[135px] h-[50px] bg-[#ffe400] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]"
          onClick={() => onConfirm?.(rewardDate)}
        >
          확인
        </button>
      </div>
    </div>
  );
}
