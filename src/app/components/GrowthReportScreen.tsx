import React from "react";
import { useNavigate } from "react-router-dom";

import imgImage45 from "figma:asset/fb2306265cb70042010e7f9b17540ae4244eb277.png";
import img11 from "figma:asset/090d51aa33f49cc631bc92b3dd3fcf328050d0bb.png";
import imgCoin from "figma:asset/4e34cf3a2b2ddea240a98b7184299dc4893e0819.png";
import imgRectangle39 from "figma:asset/24adb0753ff5cf6ed07f9ad608b6c253c8d6a70a.svg";
import imgRectangle64 from "figma:asset/984f69330ef8355e1268e978ef06a4c53c36c23a.svg";
import imgRectangle65 from "figma:asset/c3393a3e6937f55be1204bad439f4eaf2c36fb3e.svg";
import imgRectangle66 from "figma:asset/3fcd41d9a80c31d77d3eb568f73fb8db0d809a12.svg";
import imgRectangle67 from "figma:asset/0505b6a6c573eea1b8af775f6e31e94c9ec94b82.svg";
import imgGroup207 from "figma:asset/bef442c595260a54c83358cd47e8914b454e1203.svg";
import imgGroup210 from "figma:asset/7fdcb9048bcec4cce6f63b2c475ee60e5468fd29.svg";
import imgGroup211 from "figma:asset/401ac9fca25f0ab63af2b5f799a3bc12bacbf3f1.svg";

export default function GrowthReportScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div
        className="h-[852px] relative w-[393px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(179.892deg, rgb(149, 210, 224) 0%, rgb(231, 251, 193) 14.784%)",
        }}
      >
        {/* Brown background area */}
        <div className="absolute left-0 top-[148px] w-[393px] h-[655px] bg-[#875224]" />

        {/* Wave separator */}
        <div className="absolute left-0 top-[112px] w-[393px] h-[36px]">
          <img alt="" className="block max-w-none size-full" src={imgGroup207} />
        </div>

        {/* Character */}
        <div className="absolute left-[68px] top-[61px] w-[61px] h-[59px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={img11}
          />
        </div>

        {/* Treasure boxes + coins area */}
        <div className="absolute left-[257.25px] top-[37.51px] size-[43.25px]">
          <img alt="" className="block max-w-none size-full" src={imgGroup210} />
        </div>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[278.87px] text-[29px] text-center text-white top-[36px]" style={{ textShadow: '3px 0 0 #1a1a2e, -3px 0 0 #1a1a2e, 0 3px 0 #1a1a2e, 0 -3px 0 #1a1a2e, 2px 2px 0 #1a1a2e, -2px -2px 0 #1a1a2e, 2px -2px 0 #1a1a2e, -2px 2px 0 #1a1a2e, 3px 1px 0 #1a1a2e, -3px 1px 0 #1a1a2e, 3px -1px 0 #1a1a2e, -3px -1px 0 #1a1a2e, 1px 3px 0 #1a1a2e, -1px 3px 0 #1a1a2e, 1px -3px 0 #1a1a2e, -1px -3px 0 #1a1a2e' }}>
          ?
        </p>
        <div className="absolute left-[300.5px] top-[37.51px] size-[43.25px]">
          <img alt="" className="block max-w-none size-full" src={imgGroup211} />
        </div>
        <div className="absolute left-[214px] top-[37.51px] size-[43.25px]">
          <img alt="" className="block max-w-none size-full" src={imgGroup211} />
        </div>
        <div className="absolute left-[343.75px] top-[37.51px] size-[43.25px]">
          <img alt="" className="block max-w-none size-full" src={imgGroup211} />
        </div>

        {/* Coins */}
        <div className="absolute left-[270px] top-[90px] size-[27px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCoin} />
        </div>
        <div className="absolute left-[303px] top-[90px] size-[27px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCoin} />
        </div>
        <div className="absolute left-[336px] top-[90px] size-[27px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCoin} />
        </div>
        <div className="absolute left-[309px] top-[6px] size-[27px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCoin} />
        </div>

        {/* 미션 완료율 label */}
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[77px] text-[20px] text-center text-white top-[180px]">
          미션 완료율
        </p>

        {/* Completion rate card */}
        <div className="absolute left-[16px] top-[164px] w-[361px] h-[178px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle64} />
        </div>

        {/* Progress bar background */}
        <div className="absolute left-[35px] top-[300px] w-[320px] h-[23px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle65} />
        </div>
        {/* Progress bar fill */}
        <div className="absolute left-[35px] top-[300px] w-[251px] h-[23px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle66} />
        </div>
        {/* Target icon */}
        <div className="absolute left-[24px] top-[288px] w-[55px] h-[46px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage45}
          />
        </div>

        {/* 85% */}
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+0.5px)] text-[52px] text-center text-white top-[223px]">
          85%
        </p>
        {/* 어제보다 +5상승 */}
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+39px)] text-[#ff4d4d] text-[18px] text-center top-[205px]">
          어제보다 +5상승
        </p>

        {/* Stat cards - 2x2 grid */}
        {/* 재도전 횟수 */}
        <div className="absolute left-[16px] top-[357px] w-[173px] h-[123px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle67} />
        </div>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%-98.5px)] text-[18px] text-center text-white top-[376px]">
          재도전 횟수
        </p>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%-98.5px)] text-[36px] text-center text-white top-[409px]">
          12회
        </p>

        {/* 연속 미션 성공 */}
        <div className="absolute left-[204px] top-[357px] w-[173px] h-[123px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle67} />
        </div>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+93px)] text-[18px] text-center text-white top-[376px]">
          연속 미션 성공
        </p>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+92.5px)] text-[36px] text-center text-white top-[409px]">
          12회
        </p>

        {/* 포기 횟수 */}
        <div className="absolute left-[16px] top-[495px] w-[173px] h-[123px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle67} />
        </div>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%-98px)] text-[18px] text-center text-white top-[514px]">
          포기 횟수
        </p>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%-98.5px)] text-[36px] text-center text-white top-[547px]">
          2회
        </p>

        {/* 성공 미션 개수 */}
        <div className="absolute left-[204px] top-[495px] w-[173px] h-[123px]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle67} />
        </div>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+93px)] text-[18px] text-center text-white top-[514px]">
          성공 미션 개수
        </p>
        <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[calc(50%+92.5px)] text-[36px] text-center text-white top-[547px]">
          135개
        </p>

        {/* Bottom Navigation */}
        <div className="absolute left-0 top-[803px] w-[393px] h-[49px] bg-[#311d0c]">
          {/* Active indicator on 성장보고서 */}
          <div className="absolute right-0 top-0 w-[133px] h-[46px]">
            <img alt="" className="block max-w-none size-full" src={imgRectangle39} />
          </div>

          {/* 미션홈 */}
          <p
            className="-translate-x-1/2 absolute left-[65px] bottom-[8px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-[rgba(255,255,255,0.3)] leading-[1.5] cursor-pointer"
            style={{ textShadow: '3px 0 0 #311A06, -3px 0 0 #311A06, 0 3px 0 #311A06, 0 -3px 0 #311A06, 2px 2px 0 #311A06, -2px -2px 0 #311A06, 2px -2px 0 #311A06, -2px 2px 0 #311A06, 3px 1px 0 #311A06, -3px 1px 0 #311A06, 3px -1px 0 #311A06, -3px -1px 0 #311A06, 1px 3px 0 #311A06, -1px 3px 0 #311A06, 1px -3px 0 #311A06, -1px -3px 0 #311A06' }}
            onClick={() => navigate("/home")}
          >
            미션홈
          </p>
          {/* 랭킹전 */}
          <p
            className="-translate-x-1/2 absolute left-[194.5px] bottom-[8px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-[rgba(255,255,255,0.3)] leading-[1.5] cursor-pointer"
            style={{ textShadow: '3px 0 0 #311A06, -3px 0 0 #311A06, 0 3px 0 #311A06, 0 -3px 0 #311A06, 2px 2px 0 #311A06, -2px -2px 0 #311A06, 2px -2px 0 #311A06, -2px 2px 0 #311A06, 3px 1px 0 #311A06, -3px 1px 0 #311A06, 3px -1px 0 #311A06, -3px -1px 0 #311A06, 1px 3px 0 #311A06, -1px 3px 0 #311A06, 1px -3px 0 #311A06, -1px -3px 0 #311A06' }}
            onClick={() => navigate("/ranking")}
          >
            랭킹전
          </p>
          {/* 성장보고서 (active) */}
          <p
            className="-translate-x-1/2 absolute left-[329.5px] bottom-[8px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[21px] text-white leading-[1.5] whitespace-nowrap text-center"
            style={{ textShadow: '3px 0 0 #311A06, -3px 0 0 #311A06, 0 3px 0 #311A06, 0 -3px 0 #311A06, 2px 2px 0 #311A06, -2px -2px 0 #311A06, 2px -2px 0 #311A06, -2px 2px 0 #311A06, 3px 1px 0 #311A06, -3px 1px 0 #311A06, 3px -1px 0 #311A06, -3px -1px 0 #311A06, 1px 3px 0 #311A06, -1px 3px 0 #311A06, 1px -3px 0 #311A06, -1px -3px 0 #311A06' }}
          >
            성장보고서
          </p>
        </div>
      </div>
    </div>
  );
}
