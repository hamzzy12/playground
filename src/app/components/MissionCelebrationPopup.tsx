import React from "react";
import imgImage58 from "figma:asset/ceca254530099be7b774b9275785696bec1d8a49.png";
import imgLight2 from "figma:asset/df0e21b5e1958b2c58932528557c34b8a212b0ca.png";
import imgImage55 from "figma:asset/965fb9e3672f1b431deadafeb12eb3a91fa0e0fb.png";
import imgImage59 from "figma:asset/13fd5dd166c54f1d8e21530d331a2d6b44fdb71c.png";
import imgImage40 from "figma:asset/1f04a42ee33275b3f150a4dc2ddde91b9839c383.png";

interface MissionCelebrationPopupProps {
  onConfirm?: () => void;
  reward?: number;
}

export default function MissionCelebrationPopup({
  onConfirm,
  reward = 1,
}: MissionCelebrationPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/90" />

      {/* 모바일 컨테이너 (393px) */}
      <div className="relative w-[393px] h-full overflow-hidden">
        {/* 빛 효과 배경 */}
        <div className="absolute h-[196px] left-0 top-[41px] w-[393px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[100.09%] left-[-9.67%] max-w-none top-[-0.05%] w-[109.67%]"
              src={imgImage58}
            />
          </div>
        </div>

        {/* 빛 효과 2 */}
        <div className="absolute h-[196px] left-0 top-[41px] w-[393px] pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute h-[100.09%] left-[-9.67%] max-w-none top-[-0.05%] w-[109.67%]"
              src={imgImage58}
            />
          </div>
        </div>

        {/* 별 이미지 (미션완료 배너) */}
        <div className="absolute h-[186px] left-1/2 -translate-x-1/2 top-[143px] w-[277px]">
          <img
            alt="미션완료"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgLight2}
          />
        </div>

        {/* 코인 아이콘 */}
        <div className="-translate-x-1/2 absolute left-[calc(50%-6.5px)] size-[102px] top-[331px]">
          <img
            alt="코인"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage55}
          />
        </div>
        {/* +1 표시 */}
        <div className="absolute h-[31px] left-[206px] top-[402px] w-[35px]">
          <img
            alt="+1"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage59}
          />
        </div>

        {/* 축하 메시지 */}
        <div className="-translate-x-1/2 absolute left-[calc(50%-7px)] top-[463px] text-center whitespace-nowrap">
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white leading-[1.5] mb-0">
            정말 잘했어!
          </p>
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white leading-[1.5]">
            또 하나 해볼까?
          </p>
        </div>

        {/* 선물 받기 버튼 */}
        <button
          className="-translate-x-1/2 absolute h-[50px] left-[calc(50%-7px)] top-[554px] w-[167px] cursor-pointer active:scale-95 transition-transform"
          onClick={onConfirm}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
            선물 받기
          </p>
        </button>

        {/* 반짝이 효과들 */}
        <div className="absolute left-[51px] size-[29px] top-[151px] pointer-events-none">
          <img alt="" className="size-full object-cover" src={imgImage40} />
        </div>
        <div className="absolute left-[121px] size-[18px] top-[150px] pointer-events-none">
          <img alt="" className="size-full object-cover" src={imgImage40} />
        </div>
        <div className="absolute left-[80px] size-[18px] top-[98px] pointer-events-none">
          <img alt="" className="size-full object-cover" src={imgImage40} />
        </div>
        <div className="absolute left-[265px] size-[29px] top-[110px] pointer-events-none">
          <img alt="" className="size-full object-cover" src={imgImage40} />
        </div>
        <div className="absolute left-[318px] size-[20px] top-[205px] pointer-events-none">
          <img alt="" className="size-full object-cover" src={imgImage40} />
        </div>
      </div>
    </div>
  );
}
