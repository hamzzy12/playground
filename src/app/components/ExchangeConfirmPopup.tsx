import React from "react";
import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

interface ExchangeConfirmPopupProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  productName?: string;
}

export default function ExchangeConfirmPopup({
  onConfirm,
  onCancel,
  productName,
}: ExchangeConfirmPopupProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      onClick={onCancel}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 팝업 컨테이너 */}
      <div
        className="relative w-[333px] h-[427px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 팝업 배경 이미지 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[105.69%] left-0 max-w-none top-[-5.65%] w-full"
            src={imgImage29}
          />
        </div>

        {/* 아이콘 배경 */}
        <div className="absolute h-[61px] left-[64px] top-[194px] w-[204px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage64}
          />
        </div>

        {/* 물음표 아이콘 */}
        <div className="absolute h-[30px] left-1/2 -translate-x-1/2 top-[210px] w-[48px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage65}
          />
        </div>

        {/* 메시지 */}
        <p className="absolute top-[294px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[20px] text-center">
          상품으로 교환할건가요?
        </p>

        {/* 버튼 컨테이너 */}
        <div className="absolute top-[352px] left-0 right-0 flex justify-center gap-[9px]">
          {/* 확인 버튼 */}
          <button
            className="relative h-[50px] w-[141px] cursor-pointer active:scale-95 transition-transform"
            onClick={onConfirm}
          >
            <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
            <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[18px]">
              확인
            </p>
          </button>

          {/* 아니오 버튼 */}
          <button
            className="relative h-[50px] w-[141px] cursor-pointer active:scale-95 transition-transform"
            onClick={onCancel}
          >
            <div className="absolute border-3 border-[#d68641] border-solid inset-0 rounded-[10px]" />
            <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#d68641] text-[18px]">
              아니오
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
