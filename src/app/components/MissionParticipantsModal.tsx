import type { Participation, ParticipationStatus } from "@/app/types/mission";
import type { GroupMember } from "@/app/services";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";

interface MissionParticipantsModalProps {
  title: string;
  /** "미션 × 날짜" 단위의 참여 row 리스트 */
  participations: Participation[];
  members: GroupMember[];
  /** 반복 미션: 표시할 일자. 1회성: undefined */
  instanceDate?: string;
  onClose: () => void;
}

const STATUS_LABEL: Record<ParticipationStatus, string> = {
  in_progress: "진행 중",
  completed: "완료",
  gave_up: "포기",
};

const STATUS_DOT_COLOR: Record<ParticipationStatus, string> = {
  in_progress: "#FEB700",
  completed: "#5EE2A0",
  gave_up: "#E57F7F",
};

export default function MissionParticipantsModal({
  title,
  participations,
  members,
  instanceDate,
  onClose,
}: MissionParticipantsModalProps) {
  const memberById = new Map(members.map((m) => [m.userId, m]));

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
          {title}
        </p>
        {instanceDate && (
          <p className="mt-[4px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#733e14]">
            {instanceDate}
          </p>
        )}
      </div>

      {/* 참여자 리스트 */}
      <div className="absolute left-[60px] top-[150px] w-[273px] max-h-[390px] overflow-y-auto space-y-[10px]">
        {participations.length === 0 ? (
          <p className="text-center mt-[40px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#733e14]">
            아직 참여한 사람이 없어요
          </p>
        ) : (
          participations.map((p) => {
            const member = memberById.get(p.userId);
            return (
              <div
                key={p.id}
                className="flex items-center gap-[10px] p-[10px] rounded-[8px] bg-[#ffeccf]"
              >
                <div className="w-[40px] h-[40px] rounded-[6px] bg-[#007722]">
                  {member?.profileImg && (
                    <img
                      alt=""
                      src={member.profileImg}
                      className="w-full h-full object-cover rounded-[6px]"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#492607] truncate">
                    {member?.name ?? "(탈퇴한 멤버)"}
                  </p>
                  {p.note && (
                    <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[13px] text-[#733e14] truncate">
                      “{p.note}”
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-[6px] shrink-0">
                  <span
                    className="w-[10px] h-[10px] rounded-full"
                    style={{ backgroundColor: STATUS_DOT_COLOR[p.status] }}
                  />
                  <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[14px] text-[#492607]">
                    {STATUS_LABEL[p.status]}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        className="absolute left-1/2 -translate-x-1/2 top-[588px] w-[200px] h-[50px] bg-[#ffe400] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
}
