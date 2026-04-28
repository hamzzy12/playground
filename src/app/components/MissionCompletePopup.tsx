import React, { useState } from "react";
import imgImage29 from "figma:asset/51a6e9937140383e3880dc10636d1c764026f9fe.png";
import imgImage64 from "figma:asset/7e075a8e73b237382056b30e739eb8ef9f7e381d.png";
import imgImage65 from "figma:asset/9552424a075954cc721530625f84c14ded002550.png";

interface MissionCompletePopupProps {
  onClose?: () => void;
  /** 확인 시 입력된 메모(`note`)와 함께 호출. 빈 문자열이면 undefined 로 전달. */
  onConfirm?: (note?: string) => void;
}

export default function MissionCompletePopup({
  onClose,
  onConfirm,
}: MissionCompletePopupProps) {
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    const trimmed = note.trim();
    onConfirm?.(trimmed.length > 0 ? trimmed : undefined);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      onClick={onClose}
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
        <div className="absolute h-[61px] left-[64px] top-[170px] w-[204px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage64}
          />
        </div>

        {/* 체크 아이콘 */}
        <div className="absolute h-[30px] left-1/2 -translate-x-1/2 top-[186px] w-[48px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage65}
          />
        </div>

        {/* 메시지 */}
        <p className="absolute top-[244px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[20px] text-center">
          미션이 완료 됬어요!
        </p>

        {/* 메모 입력 (선택) */}
        <div className="absolute top-[286px] left-[40px] right-[40px] z-10">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="한 줄 메모 (선택)"
            maxLength={60}
            className="w-full h-[40px] bg-white/80 border-2 border-[#c8a673] rounded-[8px] px-[12px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[14px] text-[#492607] placeholder:text-[#c5afa5] outline-none focus:border-[#7b3a00]"
          />
        </div>

        {/* 확인 버튼 */}
        <div
          className="absolute h-[50px] left-1/2 -translate-x-1/2 top-[350px] w-[135px] cursor-pointer active:scale-95 transition-transform z-20"
          onClick={handleConfirm}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[#492607] text-[18px]">
            확인
          </p>
        </div>
      </div>
    </div>
  );
}
