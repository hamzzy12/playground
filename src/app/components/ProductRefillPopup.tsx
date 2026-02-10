import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

interface ProductRefillPopupProps {
  onConfirm?: () => void;
}

export default function ProductRefillPopup({ onConfirm }: ProductRefillPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-100 overflow-y-auto">
      <div className="relative w-[393px] h-[852px]">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/90" />

        {/* Wooden Board */}
        <div className="absolute left-[27px] top-0 w-[333px] h-[427px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[105.69%] left-0 max-w-none top-[-5.65%] w-full" src={imgImage29} />
          </div>
        </div>

        {/* Alert Banner */}
        <div className="absolute left-[91px] top-[194px] w-[204px] h-[61px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage64} />
        </div>

        {/* Diamond Icon */}
        <div className="absolute left-[173px] top-[210px] w-[48px] h-[30px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage65} />
        </div>

        {/* Message */}
        <p className="absolute left-1/2 -translate-x-1/2 top-[294px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-[#492607] text-center">
          상품이 채워졌습니다
        </p>

        {/* Confirm Button */}
        <button
          className="absolute left-[126px] top-[352px] w-[135px] h-[50px] bg-[#ffe400] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
}
