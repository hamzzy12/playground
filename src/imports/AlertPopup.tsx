import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

interface AlertPopupProps {
  className?: string;
  onClose?: () => void;
  message?: string;
}

export default function AlertPopup({ className, onClose, message = "미션이 만들어졌어요" }: AlertPopupProps) {
  return (
    <div className={className || "bg-white h-[852px] relative w-[393px]"} data-name="알림팝업">
      {/* 배경 오버레이 */}
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-0" />

      {/* 팝업 배경 이미지 */}
      <div className="absolute h-[427px] left-[27px] top-0 w-[333px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[105.69%] left-0 max-w-none top-[-5.65%] w-full" src={imgImage29} />
        </div>
      </div>

      {/* 아이콘 배경 */}
      <div className="absolute h-[61px] left-[91px] top-[194px] w-[204px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage64} />
      </div>

      {/* 체크 아이콘 */}
      <div className="absolute h-[30px] left-1/2 -translate-x-1/2 top-[210px] w-[48px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage65} />
      </div>

      {/* 메시지 */}
      <p className="absolute top-[294px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[20px] text-center">
        {message}
      </p>

      {/* 확인 버튼 */}
      <div
        className="absolute h-[50px] left-[126px] top-[352px] w-[135px] cursor-pointer active:scale-95 transition-transform z-20"
        onClick={onClose}
      >
        <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[18px]">
          확인
        </p>
      </div>
    </div>
  );
}
