import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

export default function Component({ className, onClose }: { className?: string; onClose?: () => void }) {
  return (
    <div className={className || "bg-white h-[852px] relative w-[393px]"} data-name="알림팝업">
      <div className="absolute bg-[rgba(0,0,0,0.7)] h-[852px] left-0 top-0 w-[393px]" />
      <div className="absolute contents left-[27px] top-0">
        <div className="absolute h-[427px] left-[27px] top-0 w-[333px]" data-name="image 29">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[105.69%] left-0 max-w-none top-[-5.65%] w-full" src={imgImage29} />
          </div>
        </div>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[34.51%_30.79%_61.97%_30.28%] leading-[1.5] not-italic text-[#492607] text-[20px] text-center">미션이 완료 됬어요!</p>
        <div 
          className="absolute h-[50px] left-[126px] top-[352px] w-[135px] cursor-pointer" 
          data-name="시작버튼"
          onClick={onClose}
        >
          <div className="absolute contents inset-0">
            <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] not-italic text-[#492607] text-[18px] text-center">확인</p>
          </div>
        </div>
        <div className="absolute h-[61px] left-[91px] top-[194px] w-[204px]" data-name="image 64">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage64} />
        </div>
      </div>
      <div className="absolute h-[30px] left-[173px] top-[210px] w-[48px]" data-name="image 65">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage65} />
      </div>
    </div>
  );
}