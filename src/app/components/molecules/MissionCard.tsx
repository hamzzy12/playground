import React from "react";
import type { ParticipationStatus } from "@/app/types/mission";
import { getColorsForParticipation } from "@/app/constants/mission";

export interface MissionCardProps {
  title: string;
  subtitle: string;
  rewardText: string;
  iconSrc: string;
  buttonSrc: string;
  inProgressButtonSrc: string;
  gaveUpButtonSrc: string;
  completedButtonSrc: string;
  svgPath: string;
  /** 본인의 참여 상태 (없으면 미수락) */
  myStatus?: ParticipationStatus | null;
  /** 참여자 수 (우측 하단 배지) */
  participantCount?: number;
  onButtonClick?: () => void;
  onParticipantBadgeClick?: () => void;
}

/**
 * 그룹 공개 미션의 카드.
 * - 본인이 아직 수락 안 했으면 "수락" 버튼 + 기본 톤(MISSION_DEFAULT_COLORS)
 * - 수락했으면 본인의 참여 상태에 맞춰 톤/버튼 변경
 */
export const MissionCard: React.FC<MissionCardProps> = ({
  title,
  subtitle,
  rewardText,
  iconSrc,
  buttonSrc,
  inProgressButtonSrc,
  gaveUpButtonSrc,
  completedButtonSrc,
  svgPath,
  myStatus,
  participantCount,
  onButtonClick,
  onParticipantBadgeClick,
}) => {
  const { bgColor, barColor } = getColorsForParticipation(myStatus);

  const buttonSrcByStatus: Record<ParticipationStatus, string> = {
    in_progress: inProgressButtonSrc,
    gave_up: gaveUpButtonSrc,
    completed: completedButtonSrc,
  };
  const displayButtonSrc = myStatus ? buttonSrcByStatus[myStatus] : buttonSrc;

  return (
    <div className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px] rounded-[16px] overflow-hidden">
      {/* Shadow */}
      <div className="absolute inset-0 top-[6px] rounded-[16px] bg-[#45270b]" />

      {/* Main Background */}
      <div className="absolute inset-0 rounded-[16px]" style={{ backgroundColor: bgColor }} />

      {/* Bottom Bar */}
      <div className="absolute left-0 bottom-0 w-[361px] h-[47px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
          <path d={svgPath} fill={barColor} />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 pointer-events-none">
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] bottom-[11px] left-0 w-full leading-[1.5] text-[18px] text-left pl-[25px] text-[#492607] whitespace-pre-wrap">
          {rewardText}
        </p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[20px] left-[100px] leading-[1.5] text-[#492607] text-[20px] whitespace-pre-wrap">
          {title}
        </p>
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] top-[48px] left-[100px] leading-[1.5] text-[#492607] text-[20px] whitespace-pre-wrap">
          {subtitle}
        </p>

        {/* Icon */}
        <div className="absolute left-[25px] top-[15px] size-[66px]">
          <img alt="icon" className="w-full h-full object-cover" src={iconSrc} />
        </div>
      </div>

      {/* 참여자 수 배지 (클릭 가능) */}
      {typeof participantCount === "number" && (
        <button
          className="absolute right-[160px] top-[14px] h-[26px] px-[10px] rounded-full bg-[#492607] text-white font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[14px] active:scale-95 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onParticipantBadgeClick?.();
          }}
        >
          참여 {participantCount}
        </button>
      )}

      {/* Status Button Image (클릭 가능) */}
      <button
        className="absolute right-[10px] bottom-[10px] h-[56px] w-[142px] active:scale-95 transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick?.();
        }}
      >
        <img alt="button" className="w-full h-full object-contain" src={displayButtonSrc} />
      </button>
    </div>
  );
};
