import imgImage58 from "figma:asset/ceca254530099be7b774b9275785696bec1d8a49.png";
import imgLight2 from "figma:asset/df0e21b5e1958b2c58932528557c34b8a212b0ca.png";
import imgImage55 from "figma:asset/965fb9e3672f1b431deadafeb12eb3a91fa0e0fb.png";
import imgImage59 from "figma:asset/13fd5dd166c54f1d8e21530d331a2d6b44fdb71c.png";
import imgImage40 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";

interface SoloMissionCompletePopupProps {
  onConfirm?: () => void;
}

export default function SoloMissionCompletePopup({ onConfirm }: SoloMissionCompletePopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* 어두운 배경 */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.9)]" />

      {/* 393px 컨테이너 */}
      <div className="relative w-[393px] h-[852px]">
        {/* 빛줄기 + 별3개 + 미션완료 배너 */}
        <div className="absolute h-[196px] left-0 top-[41px] w-[393px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[100.09%] left-[-9.67%] max-w-none top-[-0.05%] w-[109.67%]" src={imgImage58} />
          </div>
        </div>

        {/* 빛 효과 */}
        <div className="-translate-x-1/2 absolute h-[186px] left-[calc(50%-7px)] top-[143px] w-[277px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLight2} />
        </div>

        {/* 반짝이 장식 */}
        <div className="absolute left-[51px] size-[29px] top-[151px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
        </div>
        <div className="absolute left-[121px] size-[18px] top-[150px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
        </div>
        <div className="absolute left-[80px] size-[18px] top-[98px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
        </div>
        <div className="absolute left-[265px] size-[29px] top-[110px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
        </div>
        <div className="absolute left-[318px] size-[20px] top-[205px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage40} />
        </div>

        {/* 코인 아이콘 */}
        <div className="-translate-x-1/2 absolute left-[calc(50%-6.5px)] size-[102px] top-[331px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage55} />
        </div>

        {/* +1 */}
        <div className="absolute h-[31px] left-[206px] top-[402px] w-[35px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage59} />
        </div>

        {/* 메시지 */}
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%-7px)] text-[20px] text-center text-white top-[463px]">
          정말 잘했어!
          <br />
          또 하나 해볼까?
        </p>

        {/* 선물 받기 버튼 */}
        <button
          className="-translate-x-1/2 absolute left-[calc(50%-7px)] top-[554px] w-[167px] h-[50px] cursor-pointer active:scale-95 transition-transform"
          onClick={onConfirm}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
            선물 받기
          </p>
        </button>
      </div>
    </div>
  );
}
