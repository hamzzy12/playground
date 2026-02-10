import React from "react";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage99 from "figma:asset/26a17ce80f02584aa200091a322a8fe8afa6c8dc.png";
import imgGroup152 from "figma:asset/38620efb3385bdb48259451bc199835e7d856d91.svg";

interface DeveloperInfoPopupProps {
  onClose?: () => void;
}

export default function DeveloperInfoPopup({ onClose }: DeveloperInfoPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden touch-none" onClick={onClose}>
      {/* 블랙 딤드 */}
      <div className="absolute inset-0 bg-black/80" />

      {/* 팝업 컨테이너 */}
      <div className="relative w-[333px] h-[669px] mt-[-100px]" onClick={(e) => e.stopPropagation()}>
        {/* 나무판 배경 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full" src={imgImage23} />
        </div>

        {/* 타이틀 배너 "만든 개발자" */}
        <div className="-translate-x-1/2 absolute h-[65px] left-1/2 top-[184px] w-[194px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <p
          className="absolute top-[195px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[23px] text-center text-white"
          style={{ textShadow: "0px -3px 0 #1a1a2e, 0px 3px 0 #1a1a2e, -3px 0px 0 #1a1a2e, 3px 0px 0 #1a1a2e, -2px -2px 0 #1a1a2e, 2px -2px 0 #1a1a2e, -2px 2px 0 #1a1a2e, 2px 2px 0 #1a1a2e, -1px -3px 0 #1a1a2e, 1px -3px 0 #1a1a2e, -1px 3px 0 #1a1a2e, 1px 3px 0 #1a1a2e, -3px -1px 0 #1a1a2e, 3px -1px 0 #1a1a2e, -3px 1px 0 #1a1a2e, 3px 1px 0 #1a1a2e" }}
        >
          만든 개발자
        </p>

        {/* 내용 카드 배경 */}
        <div className="absolute bg-[#6f431e] h-[310px] left-[22px] rounded-[2px] top-[274px] w-[285px]" />
        <div className="absolute bg-[#f0e2c2] h-[310px] left-[22px] rounded-[2px] top-[268px] w-[285px]" />

        {/* 보석 아이콘 (맨 앞) */}
        <div className="absolute left-[151px] top-[253px] w-[30.5px] h-[30.5px] z-10">
          <img alt="" className="block w-full h-full" src={imgGroup152} />
        </div>

        {/* 문의사항 안내 */}
        <div className="absolute top-[299px] left-0 right-0 text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
          <p>문의사항은 까페와</p>
          <p>아래 연락처로 컨택 부탁드려요</p>
        </div>

        {/* 공식까페가기 버튼 */}
        <a
          href="https://cafe.naver.com/missionplay"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[83px] top-[367px] w-[167px] h-[50px] cursor-pointer active:scale-95 transition-transform"
        >
          <div className="absolute inset-0 bg-white border-2 border-[#9e5415] rounded-[10px]" />
          <div className="absolute left-[15px] top-[7px] w-[37px] h-[37px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage99} />
          </div>
          <p className="absolute top-0 left-[52px] right-0 bottom-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607]">
            공식까페가기
          </p>
        </a>

        {/* 개발자 연락처 */}
        <p className="absolute top-[460px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607] text-center">
          -개발자 연락처-
        </p>
        <p className="absolute top-[487px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607] text-center">
          tjdwls0129@naver.com
        </p>

        {/* from */}
        <p className="absolute top-[525px] left-0 right-0 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-[#492607] text-center">
          from 햄찌,토니,루마
        </p>

        {/* 확인 버튼 */}
        <div
          className="absolute h-[50px] left-[83px] top-[596px] w-[167px] cursor-pointer active:scale-95 transition-transform z-20"
          onClick={onClose}
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
