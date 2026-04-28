import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
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
  /** 제공되면 ⋮ 메뉴에 "수정하기" 항목 노출. 제안자 본인에게만 주입. */
  onEdit?: () => void;
  /** 제공되면 ⋮ 메뉴에 "참여 취소" 항목 노출. 본인이 in_progress 인 경우에만 주입. */
  onCancel?: () => void;
  /** 제공되면 ⋮ 메뉴에 "기록 보기" 항목 노출. 반복 미션(1회 제외) 에만 주입. */
  onShowRecord?: () => void;
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
  onEdit,
  onCancel,
  onShowRecord,
}) => {
  const hasMenu = Boolean(onEdit || onCancel || onShowRecord);
  const { bgColor, barColor } = getColorsForParticipation(myStatus);
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonSrcByStatus: Record<ParticipationStatus, string> = {
    in_progress: inProgressButtonSrc,
    gave_up: gaveUpButtonSrc,
    completed: completedButtonSrc,
  };
  const displayButtonSrc = myStatus ? buttonSrcByStatus[myStatus] : buttonSrc;

  return (
    <div className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px] rounded-[16px]">
      {/* Shadow */}
      <div className="absolute inset-0 top-[6px] rounded-[16px] bg-[#45270b]" />

      {/* Main Background */}
      <div className="absolute inset-0 rounded-[16px] overflow-hidden" style={{ backgroundColor: bgColor }}>
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

        {/* 참여자 수 배지 (클릭 가능). 0명이면 노출하지 않음 */}
        {typeof participantCount === "number" && participantCount > 0 && (
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

      {/*
        세로 ⋮ 메뉴 — overflow-hidden 바깥에 배치해 팝오버가 잘리지 않게.
        메뉴 항목이 하나라도 있을 때만 (`hasMenu`) ⋮ 자체가 노출.
        - `onEdit` 제공 (제안자 본인) → "수정하기"
        - `onCancel` 제공 (본인 in_progress) → "참여 취소"
      */}
      {hasMenu && (
        <>
          <button
            className="absolute right-[8px] top-[8px] w-[32px] h-[32px] flex items-center justify-center active:scale-95 transition-transform z-20"
            style={{ color: "#492607" }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            aria-label="메뉴"
          >
            <EllipsisVertical size={22} strokeWidth={2.5} />
          </button>
          {menuOpen && (
            <>
              {/* 외부 클릭 닫기 */}
              <div
                className="fixed inset-0 z-30"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
              />
              {/* 팝오버 */}
              <div className="absolute right-[8px] top-[44px] z-40 bg-white rounded-[8px] shadow-lg py-[4px] min-w-[140px] border border-[#e0e0e0]">
                {onEdit && (
                  <button
                    className="w-full text-left px-[14px] py-[10px] text-[15px] text-[#492607] hover:bg-[#f5f0e2] active:bg-[#ebe2cc] font-['ONE_Mobile_POP_OTF:Regular',sans-serif]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onEdit();
                    }}
                  >
                    수정하기
                  </button>
                )}
                {onShowRecord && (
                  <button
                    className="w-full text-left px-[14px] py-[10px] text-[15px] text-[#492607] hover:bg-[#f5f0e2] active:bg-[#ebe2cc] font-['ONE_Mobile_POP_OTF:Regular',sans-serif]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onShowRecord();
                    }}
                  >
                    기록 보기
                  </button>
                )}
                {onCancel && (
                  <button
                    className="w-full text-left px-[14px] py-[10px] text-[15px] text-[#c54040] hover:bg-[#fbeaea] active:bg-[#f5d6d6] font-['ONE_Mobile_POP_OTF:Regular',sans-serif]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onCancel();
                    }}
                  >
                    참여 취소
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
