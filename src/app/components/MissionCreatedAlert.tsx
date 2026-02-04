import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

interface MissionCreatedAlertProps {
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function MissionCreatedAlert({ onClose, onConfirm }: MissionCreatedAlertProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" data-name="알림팝업">
      {/* Overlay */}
      <div className="absolute bg-[rgba(0,0,0,0.8)] h-full left-0 top-0 w-full" />
      
      {/* Alert Container */}
      <div className="relative w-[393px] h-[852px]">
        {/* Alert Title Box - "알림" */}
        <div className="absolute left-[46px] top-[194px] w-[300px] h-[60px] z-20">
          {/* 오렌지색 배경 */}
          <div className="absolute inset-0 bg-[#C97A3C] rounded-t-[12px] border-4 border-[#8B5A2B] border-b-0" />
          {/* 타이틀 텍스트 */}
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#291608] text-[24px] font-bold">
            알림
          </p>
          {/* 왼쪽 장식 아이콘 */}
          <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-[#8B5A2B] rounded-full flex items-center justify-center">
            <div className="w-[12px] h-[12px] bg-[#FFA500] rounded-full" />
          </div>
          {/* 오른쪽 장식 아이콘 */}
          <div className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-[#8B5A2B] rounded-full flex items-center justify-center">
            <div className="w-[12px] h-[12px] bg-[#FFA500] rounded-full" />
          </div>
        </div>

        {/* Alert Content Box */}
        <div className="absolute left-[30px] top-[254px] w-[333px] h-[427px] z-10">
          {/* Background Image */}
          <div className="absolute h-[427px] left-0 top-0 w-[333px]" data-name="image 29">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[105.69%] left-0 max-w-none top-[-5.65%] w-full" src={imgImage29} />
            </div>
          </div>
          
          {/* Message Text */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[29.26%] top-[34.51%] w-[41%] leading-[1.5] not-italic text-[#492607] text-[20px] text-center z-10">
            미션이 만들어졌어요
          </p>
          
          {/* Confirm Button */}
          <div 
            className="absolute h-[50px] left-[99px] top-[295px] w-[135px] cursor-pointer z-10 active:scale-95 transition-transform"
            onClick={handleConfirm}
            data-name="시작버튼"
          >
            <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
            <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[18px]">
              확인
            </p>
          </div>
          
          {/* Decoration Image 64 */}
          <div className="absolute h-[61px] left-[64px] top-[150px] w-[204px] z-10" data-name="image 64">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage64} />
          </div>
          
          {/* Decoration Image 65 - 상단 작은 장식 */}
          <div className="absolute h-[30px] left-[142px] top-[-44px] w-[48px] z-10" data-name="image 65">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage65} />
          </div>
        </div>
      </div>
    </div>
  );
}
