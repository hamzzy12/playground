import { useMemo, useState } from "react";
import type { Mission, Participation, ParticipationStatus } from "@/app/types/mission";
import { isMissionActiveOn } from "@/app/constants/mission";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";

interface MissionRecordModalProps {
  mission: Mission;
  /** 해당 미션의 모든 참여 row (본인 외 멤버 포함). 내부에서 currentUserId 로 필터 */
  participations: Participation[];
  currentUserId: string;
  /** 과거 일자 보충 입력. completed 상태로 즉시 생성. */
  onCompleteForDate: (instanceDate: string) => Promise<void> | void;
  onClose: () => void;
}

const STATUS_LABEL: Record<ParticipationStatus, string> = {
  in_progress: "진행 중",
  completed: "완료",
  gave_up: "포기",
};
const STATUS_COLOR: Record<ParticipationStatus, string> = {
  in_progress: "#FEB700",
  completed: "#5EE2A0",
  gave_up: "#E57F7F",
};
const PAGE_SIZE = 5;
const KOREAN_DAY = ['일', '월', '화', '수', '목', '금', '토'];

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateKR(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${KOREAN_DAY[date.getDay()]})`;
}

interface DateRow {
  date: string;
  active: boolean;                           // 현 스케줄 기준 활성 일자
  participation: Participation | null;       // 본인 참여 row
  isLegacy: boolean;                         // 비활성인데 참여 row 존재 (스케줄 변경 흔적)
}

/**
 * 미션 기록 모달.
 * - 미션 생성일 ~ 오늘 범위에서 활성 일자 + 비활성이지만 본인 참여가 있던 일자 모두 노출
 * - 활성 일자 + 미참여 → "수행함" 버튼 (과거 보충 입력)
 * - 비활성 일자 + 본인 참여 row → "(이전 스케줄)" 라벨, 회색 배경 (보존만)
 * - 페이지네이션: 최근 5일 + "더 보기"
 */
export default function MissionRecordModal({
  mission,
  participations,
  currentUserId,
  onCompleteForDate,
  onClose,
}: MissionRecordModalProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [busyDate, setBusyDate] = useState<string | null>(null);

  const dateList = useMemo<DateRow[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startISO = mission.createdAt.slice(0, 10); // YYYY-MM-DD
    const start = new Date(startISO + 'T00:00:00');

    const myParticipations = participations.filter((p) => p.userId === currentUserId);
    const result: DateRow[] = [];

    const cursor = new Date(today);
    while (cursor >= start) {
      const iso = toISODate(cursor);
      const active = isMissionActiveOn(mission, cursor);
      const participation =
        myParticipations.find((p) => p.instanceDate === iso) ?? null;

      // 활성 일자 또는 (비활성 + 본인 참여 흔적) 모두 표시
      if (active || participation) {
        result.push({
          date: iso,
          active,
          participation,
          isLegacy: !active && !!participation,
        });
      }

      cursor.setDate(cursor.getDate() - 1);
    }
    return result;
  }, [mission, participations, currentUserId]);

  const visible = dateList.slice(0, visibleCount);
  const hasMore = dateList.length > visibleCount;
  const remaining = dateList.length - visibleCount;

  const handleComplete = async (date: string) => {
    if (busyDate) return;
    setBusyDate(date);
    await onCompleteForDate(date);
    setBusyDate(null);
  };

  return (
    <div className="absolute inset-0 z-50">
      {/* 어두운 배경 */}
      <div className="absolute bg-black/90 inset-0" onClick={onClose} />

      {/* 나무 프레임 */}
      <div className="absolute h-[669px] left-[30px] top-0 w-[333px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full"
            src={imgImage23}
          />
        </div>
      </div>

      {/* 타이틀 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-[290px] text-center">
        <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[22px] text-[#492607]">
          {mission.title}
        </p>
        <p className="mt-[4px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[14px] text-[#733e14]">
          기록 보기
        </p>
      </div>

      {/* 일자별 리스트 */}
      <div className="absolute left-[60px] top-[150px] w-[273px] max-h-[400px] overflow-y-auto space-y-[8px] pr-[4px]">
        {visible.length === 0 ? (
          <p className="text-center mt-[40px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#733e14]">
            표시할 기록이 없어요
          </p>
        ) : (
          visible.map((row) => (
            <div
              key={row.date}
              className="flex items-center gap-[10px] p-[10px] rounded-[8px]"
              style={{ backgroundColor: row.isLegacy ? "#e8e0d0" : "#ffeccf" }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[15px] text-[#492607]">
                  {formatDateKR(row.date)}
                  {row.isLegacy && (
                    <span className="ml-[6px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[11px] text-[#8f5a2f]">
                      (이전 스케줄)
                    </span>
                  )}
                </p>
                {row.participation?.note && (
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[12px] text-[#733e14] truncate">
                    “{row.participation.note}”
                  </p>
                )}
              </div>
              <div className="shrink-0">
                {row.participation ? (
                  <div className="flex items-center gap-[4px]">
                    <span
                      className="w-[8px] h-[8px] rounded-full"
                      style={{ backgroundColor: STATUS_COLOR[row.participation.status] }}
                    />
                    <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[13px] text-[#492607]">
                      {STATUS_LABEL[row.participation.status]}
                    </p>
                  </div>
                ) : row.active ? (
                  <button
                    onClick={() => handleComplete(row.date)}
                    disabled={busyDate === row.date}
                    className="px-[10px] h-[28px] rounded-[6px] bg-[#ffe400] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[13px] text-[#492607] active:scale-95 transition-transform disabled:opacity-50"
                  >
                    {busyDate === row.date ? "..." : "수행함"}
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}

        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="w-full h-[40px] mt-[8px] rounded-[8px] border-2 border-[#cb721e] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[14px] text-[#492607] active:scale-95 transition-transform"
          >
            더 보기 ({remaining}일 남음)
          </button>
        )}
      </div>

      {/* 닫기 */}
      <button
        className="absolute left-1/2 -translate-x-1/2 top-[588px] w-[200px] h-[50px] bg-[#ffe400] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
}
