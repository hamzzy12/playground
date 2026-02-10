import { useRef, useState } from "react";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage54 from "figma:asset/7717fbadfaff2519242403e5e5201a7517a295a2.png";
import ProductIconSelectModal from "./ProductIconSelectModal";

interface MissionEditPopupProps {
  onClose?: () => void;
  onConfirm?: (data: {
    title: string;
    description: string;
    frequency: string;
    targetDate: string;
    reward: number;
    iconSrc: string | null;
  }) => void;
  onDelete?: () => void;
  initialTitle: string;
  initialDescription: string;
  initialReward: number;
}

const FREQUENCIES = ["1회", "매일", "매주", "매월"];

export default function MissionEditPopup({
  onClose,
  onConfirm,
  onDelete,
  initialTitle,
  initialDescription,
  initialReward,
}: MissionEditPopupProps) {
  const [frequency, setFrequency] = useState("1회");
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [targetDate, setTargetDate] = useState("");
  const [reward, setReward] = useState(String(initialReward));
  const [isIconSelectOpen, setIsIconSelectOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [selectedIconSrc, setSelectedIconSrc] = useState<string | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    if (title.trim()) {
      onConfirm?.({
        title,
        description,
        frequency,
        targetDate,
        reward: Number(reward) || 1,
        iconSrc: selectedIconSrc,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-100 overflow-y-auto">
      <div className="relative w-[393px] min-h-[1004px] bg-[#6e8f3b]">
        {/* Brown Background */}
        <div className="absolute h-[879px] left-0 top-[125px] w-[393px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[100.09%] left-[-8.09%] max-w-none top-[-0.04%] w-[116.49%]" src={imgImage17} />
          </div>
        </div>

        {/* Title Banner */}
        <div className="absolute h-[87px] left-1/2 -translate-x-1/2 top-[87px] w-[262px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <p
          className="absolute left-1/2 -translate-x-1/2 top-[101px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[32px] text-center text-white"
          style={{
            textShadow: `
              -3px -3px 0 #713925, 3px -3px 0 #713925, -3px 3px 0 #713925, 3px 3px 0 #713925,
              0 -3px 0 #713925, 0 3px 0 #713925, -3px 0 0 #713925, 3px 0 0 #713925,
              -2px -3px 0 #713925, 2px -3px 0 #713925, -2px 3px 0 #713925, 2px 3px 0 #713925,
              -3px -2px 0 #713925, 3px -2px 0 #713925, -3px 2px 0 #713925, 3px 2px 0 #713925
            `
          }}
        >
          미션 수정
        </p>

        {/* 미션완료일 정하기 */}
        <p className="absolute left-[29px] top-[198px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          미션완료일 정하기
        </p>
        <div className="absolute left-[20px] top-[238px] flex gap-[8px]">
          {FREQUENCIES.map((freq) => (
            <button
              key={freq}
              className={`w-[83px] h-[60px] rounded-[8px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] ${
                frequency === freq
                  ? "bg-[#ffe400] text-[#492607]"
                  : "bg-[#733e14] text-white/30"
              }`}
              onClick={() => setFrequency(freq)}
            >
              {freq}
            </button>
          ))}
        </div>

        {/* 미션제안하기 */}
        <p className="absolute left-[29px] top-[313px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          미션제안하기
        </p>
        <div className="absolute left-[20px] top-[353px] w-[353px] h-[60px]">
          <input
            type="text"
            value={title}
            onChange={(e) => { if (e.target.value.length <= 15) setTitle(e.target.value); }}
            maxLength={15}
            placeholder="미션 제목"
            className="w-full h-full bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder-white/30 focus:outline-none"
          />
        </div>
        <div className="absolute left-[20px] top-[423px] w-[353px] h-[60px]">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="미션 설명"
            className="w-full h-full bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder-white/30 focus:outline-none"
          />
        </div>

        {/* 목표 완료일 */}
        <p className="absolute left-[29px] top-[498px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          목표 완료일
        </p>
        <div
          className="absolute left-[20px] top-[538px] w-[353px] h-[60px] cursor-pointer"
          onClick={() => dateInputRef.current?.showPicker()}
        >
          <div className="absolute inset-0 bg-[#733e14] border-4 border-[#cb721e] rounded-[8px]" />
          <p className={`absolute inset-0 flex items-center px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] ${targetDate ? 'text-white' : 'text-white/30'}`}>
            {targetDate || "날짜를 선택하세요"}
          </p>
          <input
            ref={dateInputRef}
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* 보상으로 받을 칭찬코인 개수 */}
        <p className="absolute left-[29px] top-[613px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          보상으로 받을 칭찬코인 개수
        </p>
        <div className="absolute left-[20px] top-[653px] w-[353px] h-[60px]">
          <input
            type="number"
            value={reward}
            onChange={(e) => { const v = Number(e.target.value); if (e.target.value === '' || (v >= 0 && v <= 99)) setReward(e.target.value); }}
            min={1}
            max={99}
            className="w-full h-full bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] px-[16px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white focus:outline-none"
          />
        </div>

        {/* 아이콘 선택 */}
        <p className="absolute left-[22px] top-[728px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
          아이콘 선택
        </p>
        <button
          className="absolute left-[22px] top-[768px] w-[78px] h-[78px] bg-[#733e14] border-4 border-[#cb721e] rounded-[8px] flex items-center justify-center overflow-hidden"
          onClick={() => setIsIconSelectOpen(true)}
        >
          {selectedIconSrc ? (
            <img alt="" className="w-full h-full object-cover" src={selectedIconSrc} />
          ) : (
            <img alt="" className="w-[39px] h-[39px] object-cover" src={imgImage54} />
          )}
        </button>

        {/* Bottom Buttons */}
        <div className="absolute left-[20px] top-[903px] flex gap-[17px]">
          <button
            className="w-[168px] h-[50px] border-3 border-[#d68641] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#d68641]"
            onClick={onDelete}
          >
            삭제하기
          </button>
          <button
            className="w-[168px] h-[50px] bg-[#ffe400] rounded-[10px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]"
            onClick={handleConfirm}
          >
            미션 수정하기
          </button>
        </div>

        {/* 아이콘 선택 모달 */}
        {isIconSelectOpen && (
          <ProductIconSelectModal
            selectedIconId={selectedIconId}
            onSelect={(iconId, iconSrc) => {
              setSelectedIconId(iconId);
              setSelectedIconSrc(iconSrc);
            }}
            onClose={() => setIsIconSelectOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
