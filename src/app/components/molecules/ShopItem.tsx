import React from "react";
import svgPathsExchange from "@/imports/svg-e1i3f271x4";
import type { ProductStatus } from "@/app/types/mission";

export interface ShopItemProps {
  title: string;
  price: string;
  iconSrc: string;
  status?: ProductStatus;
  statusImageSrc?: string;
  onClick?: () => void;
}

export const ShopItem: React.FC<ShopItemProps> = ({
  title,
  price,
  iconSrc,
  status = 'available',
  statusImageSrc,
  onClick,
}) => (
  <button
    className="relative w-[367px] h-[87px] shrink-0 mb-[16px] block text-left active:scale-95 transition-transform cursor-pointer rounded-[8px] overflow-hidden"
    onClick={onClick}
  >
    <div className="absolute inset-0 top-[11px] bg-[#45270b] rounded-[8px]" />
    <div className="absolute inset-0 h-[87px] bg-[#f2e1be] rounded-[8px]" />

    {/* Yellow Right Section (Price) */}
    <div className="absolute right-0 top-0 w-[90px] h-[87px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 87">
        <path d={svgPathsExchange.p68c9900} fill="#FFC100" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#291608] leading-tight">칭찬코인</p>
        <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[26px] text-[#291608] leading-tight">{price}</p>
      </div>
    </div>

    {/* Icon */}
    <div className="absolute left-[25px] top-[11px] size-[66px]">
      <img className="w-full h-full object-cover" src={iconSrc} alt="Icon" />
    </div>

    {/* Title */}
    <div className="absolute left-[100px] top-0 h-[87px] flex items-center">
      <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#291608]">{title}</p>
    </div>

    {/* Status Overlay */}
    {status !== 'available' && statusImageSrc && (
      <>
        <div className="absolute inset-0 bg-black/70 rounded-[8px]" />
        <div className="absolute left-[139px] top-[22px] w-[112px] h-[44px]">
          <img src={statusImageSrc} className="w-full h-full object-contain" alt={status} />
        </div>
      </>
    )}
  </button>
);
