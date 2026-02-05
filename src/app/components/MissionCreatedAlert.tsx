import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

interface MissionCreatedAlertProps {
  onConfirm?: () => void;
  message?: string;
}

export default function MissionCreatedAlert({
  onConfirm,
  message = "미션이 만들어졌어요"
}: MissionCreatedAlertProps) {
  return (
    <div className="fixed inset-0 z-[99999]" data-name="알림팝업">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Container - 최상단 정렬 */}
      <div className="absolute inset-0 flex items-start justify-center">
        <div className="relative w-[393px] h-[427px]">
          {/* 알림 타이틀 이미지 */}
          <div className="absolute h-[61px] left-[94px] top-[180px] w-[204px] z-30">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage64} />
          </div>
          <div className="absolute h-[30px] left-[173px] top-[196px] w-[48px] z-30">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage65} />
          </div>

          {/* 메인 배경 이미지 */}
          <div className="absolute h-[427px] left-[27px] top-[0px] w-[333px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[105.69%] left-0 max-w-none top-[-5.65%] w-full"
                src={imgImage29}
              />
            </div>
          </div>

          {/* 메시지 텍스트 */}
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[27px] top-[294px] w-[333px] leading-[1.5] text-[20px] text-[#492607] text-center z-10">
            {message}
          </p>

          {/* 확인 버튼 */}
          <div
            className="absolute h-[50px] left-[126px] top-[352px] w-[135px] cursor-pointer z-10 active:scale-95 transition-transform"
            onClick={onConfirm}
          >
            <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
            <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] text-[18px] text-[#492607] text-center">
              확인
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
