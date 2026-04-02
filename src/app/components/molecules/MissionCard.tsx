import React from "react";
import type { MissionStatus } from "@/app/types/mission";
import { getColorsForStatus } from "@/app/constants/mission";

export interface MissionCardProps {
  bgColor: string;
  barColor: string;
  shadowColor: string;
  title: string;
  subtitle: string;
  rewardText: string;
  iconSrc: string;
  buttonSrc: string;
  inProgressButtonSrc: string;
  gaveUpButtonSrc: string;
  challengeSuccessButtonSrc: string;
  completedButtonSrc: string;
  svgPath: string;
  status?: MissionStatus;
  onButtonClick?: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  bgColor,
  barColor,
  shadowColor,
  title,
  subtitle,
  rewardText,
  iconSrc,
  buttonSrc,
  inProgressButtonSrc,
  gaveUpButtonSrc,
  challengeSuccessButtonSrc,
  completedButtonSrc,
  svgPath,
  status = 'active',
  onButtonClick,
}) => {
  const statusColors = getColorsForStatus(status);
  const displayBgColor = status === 'active' ? bgColor : statusColors.bgColor;
  const displayBarColor = status === 'active' ? barColor : statusColors.barColor;

  const buttonSrcMap: Record<MissionStatus, string> = {
    active: buttonSrc,
    in_progress: inProgressButtonSrc,
    gave_up: gaveUpButtonSrc,
    challenge_success: challengeSuccessButtonSrc,
    completed: completedButtonSrc,
  };
  const displayButtonSrc = buttonSrcMap[status] ?? buttonSrc;

  return (
    <button
      className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px] cursor-pointer active:scale-95 transition-transform rounded-[16px] overflow-hidden"
      onClick={onButtonClick}
    >
      {/* Shadow */}
      <div className="absolute inset-0 top-[6px] rounded-[16px]" style={{ backgroundColor: shadowColor }} />

      {/* Main Background */}
      <div className="absolute inset-0 rounded-[16px]" style={{ backgroundColor: displayBgColor }} />

      {/* Bottom Bar */}
      <div className="absolute left-0 bottom-0 w-[361px] h-[47px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
          <path d={svgPath} fill={displayBarColor} />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 pointer-events-none">
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] bottom-[11px] left-0 w-full leading-[1.5] not-italic text-[18px] text-left pl-[25px] text-[#492607] whitespace-pre-wrap">
          {rewardText}
        </p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[20px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">
          {title}
        </p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[48px] left-[100px] leading-[1.5] not-italic text-[#492607] text-[20px] whitespace-pre-wrap">
          {subtitle}
        </p>

        {/* Icon */}
        <div className="absolute left-[25px] top-[15px] size-[66px]">
          <img alt="icon" className="w-full h-full object-cover" src={iconSrc} />
        </div>

        {/* Status Button Image */}
        <div className="absolute right-[10px] bottom-[10px] h-[56px] w-[142px]">
          <img alt="button" className="w-full h-full object-contain" src={displayButtonSrc} />
        </div>
      </div>
    </button>
  );
};
