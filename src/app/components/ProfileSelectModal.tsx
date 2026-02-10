import { useState } from "react";
import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage90 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";
import imgRectangle31 from "figma:asset/508ac9b065db524ed603dc0378c5d78cbbf23ff5.png";
import imgRectangle32 from "figma:asset/c64f822686c4bd0690d445a8f4dce0df3c0bba36.png";
import imgRectangle33 from "figma:asset/5e78257806ea55fb5db8e29170f3f75d1554a882.png";
import imgRectangle34 from "figma:asset/a5034f3978ced473b918a45d6f2940d377e84db2.png";
import imgGroupTab from "figma:asset/29e2f438328f041bda0d77aa9135b0bdc87fb08d.svg";
import imgTabBorder from "figma:asset/0920cfbb338ed2eacb744a771bc98a485e6a31d2.svg";
import imgCheckmark from "figma:asset/db948d78db40676ed8a77c50b3adff627f7395c6.svg";

interface ProfileSelectModalProps {
  onClose: () => void;
  onConfirm?: (profileId: string, borderId?: string) => void;
}

const PROFILES = [
  { id: "p1", image: imgRectangle31 },
  { id: "p2", image: imgRectangle33 },
  { id: "p3", image: imgRectangle34 },
  { id: "p4", image: imgRectangle32 },
];

const BORDERS = [
  { id: "b1", color: "#37e59a" },
  { id: "b2", color: "#ffb0ef" },
  { id: "b3", color: "#ffe550" },
  { id: "b4", color: "#ff7878" },
];

const LEFT_POSITIONS = [49, 126, 203, 280];

const textOutline = '2px 0 0 #713925, -2px 0 0 #713925, 0 2px 0 #713925, 0 -2px 0 #713925, 1.4px 1.4px 0 #713925, -1.4px 1.4px 0 #713925, 1.4px -1.4px 0 #713925, -1.4px -1.4px 0 #713925, 2px 0.7px 0 #713925, -2px 0.7px 0 #713925, 2px -0.7px 0 #713925, -2px -0.7px 0 #713925, 0.7px 2px 0 #713925, -0.7px 2px 0 #713925, 0.7px -2px 0 #713925, -0.7px -2px 0 #713925';
const titleOutline = '3px 0 0 #45270B, -3px 0 0 #45270B, 0 3px 0 #45270B, 0 -3px 0 #45270B, 2.1px 2.1px 0 #45270B, -2.1px 2.1px 0 #45270B, 2.1px -2.1px 0 #45270B, -2.1px -2.1px 0 #45270B, 3px 1px 0 #45270B, -3px 1px 0 #45270B, 3px -1px 0 #45270B, -3px -1px 0 #45270B, 1px 3px 0 #45270B, -1px 3px 0 #45270B, 1px -3px 0 #45270B, -1px -3px 0 #45270B';

export default function ProfileSelectModal({ onClose, onConfirm }: ProfileSelectModalProps) {
  const [selectedProfileId, setSelectedProfileId] = useState("p1");
  const [selectedBorderId, setSelectedBorderId] = useState("b1");
  const [activeTab, setActiveTab] = useState<"profile" | "border">("profile");

  const handleConfirm = () => {
    onConfirm?.(selectedProfileId, selectedBorderId);
    onClose();
  };

  const selectedProfile = PROFILES.find((p) => p.id === selectedProfileId);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center" onClick={onClose}>
      {/* 어두운 배경 */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.9)]" />

      {/* 393px 컨테이너 */}
      <div className="relative w-[393px] h-[852px] mt-[-100px]" onClick={(e) => e.stopPropagation()}>
        {/* 나무 프레임 */}
        <div className="absolute h-[669px] left-[29px] top-[-1px] w-[333px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full" src={imgImage23} />
          </div>
        </div>

        {/* 타이틀 배너 */}
        <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-2.5px)] top-[184px] w-[194px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <p
          className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[197.5px] text-[22px] text-center text-white top-[196px]"
          style={{ textShadow: titleOutline }}
        >
          프로필선택
        </p>

        {/* 현재 프로필 미리보기 */}
        {activeTab === "profile" ? (
          <div className="absolute left-[66px] rounded-[8px] size-[63px] top-[269px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={selectedProfile?.image ?? imgRectangle31} />
          </div>
        ) : (
          <div className="absolute left-[66px] top-[269px] size-[63px]">
            <div className="absolute bg-[#5bb675] rounded-[8px] inset-0" />
            <div className="absolute h-[49px] left-[2.8px] top-[11.2px] w-[56px] overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[134.55%] left-0 max-w-none top-[-0.13%] w-[112.5%]" src={imgImage90} />
            </div>
          </div>
        )}
        <p
          className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[191.5px] -translate-x-1/2 text-[16px] text-center text-white top-[275px]"
          style={{ textShadow: textOutline }}
        >
          프로필 얻는 조건
        </p>
        <p
          className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-[140px] text-[18px] text-white top-[300px]"
          style={{ textShadow: textOutline }}
        >
          기본프로필
        </p>

        {/* 탭 바: 프로필 / 테두리 */}
        <div className="absolute h-[37px] left-[49px] top-[348px] w-[293px]">
          <img alt="" className="block max-w-none size-full" src={imgGroupTab} />
        </div>
        {/* 활성 탭 하이라이트 */}
        {activeTab === "profile" ? (
          <div className="absolute bg-[#b9915e] border-2 border-[#f0c58f] border-solid h-[37px] rounded-[8px] top-[348px] w-[147px] left-[49px]" />
        ) : (
          <div className="absolute h-[37px] left-[194.5px] top-[348px] w-[147px]">
            <img alt="" className="block max-w-none size-full" src={imgTabBorder} />
          </div>
        )}
        <p
          className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-center text-white top-[353px] left-[122.65px] -translate-x-1/2 cursor-pointer z-10 whitespace-pre-wrap"
          style={{ opacity: activeTab === "profile" ? 1 : 0.3, textShadow: textOutline }}
          onClick={() => setActiveTab("profile")}
        >
          프로필
        </p>
        <p
          className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] text-center text-white top-[353px] left-[269.3px] -translate-x-1/2 cursor-pointer z-10 whitespace-pre-wrap"
          style={{ opacity: activeTab === "border" ? 1 : 0.3, textShadow: textOutline }}
          onClick={() => setActiveTab("border")}
        >
          테두리
        </p>

        {/* 프로필 탭 - 프로필 그리드 */}
        {activeTab === "profile" && PROFILES.map((profile, index) => {
          const left = LEFT_POSITIONS[index];
          const isSelected = selectedProfileId === profile.id;

          return (
            <div
              key={profile.id}
              className="absolute size-[63px] cursor-pointer active:scale-95 transition-transform"
              style={{ left: `${left}px`, top: "403px" }}
              onClick={() => setSelectedProfileId(profile.id)}
            >
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={profile.image} />
              {isSelected && (
                <div className="absolute inset-[-3.17%]">
                  <img alt="selected" className="block max-w-none size-full" src={imgCheckmark} />
                </div>
              )}
            </div>
          );
        })}

        {/* 테두리 탭 - 테두리 그리드 */}
        {activeTab === "border" && BORDERS.map((border, index) => {
          const left = LEFT_POSITIONS[index];
          const isSelected = selectedBorderId === border.id;

          return (
            <div
              key={border.id}
              className="absolute size-[63px] cursor-pointer active:scale-95 transition-transform"
              style={{ left: `${left}px`, top: "403px" }}
              onClick={() => setSelectedBorderId(border.id)}
            >
              <div
                className="absolute inset-0 rounded-[8px]"
                style={{ border: `5px solid ${border.color}` }}
              />
              {isSelected && (
                <div className="absolute inset-[-3.17%]">
                  <img alt="selected" className="block max-w-none size-full" src={imgCheckmark} />
                </div>
              )}
            </div>
          );
        })}

        {/* 나중에 버튼 */}
        <button
          className="absolute left-[52px] top-[588px] w-[135px] h-[50px] cursor-pointer active:scale-95 transition-transform"
          onClick={onClose}
        >
          <div className="absolute border-3 border-[#d68641] border-solid inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#d68641]">
            나중에
          </p>
        </button>

        {/* 변경 버튼 */}
        <button
          className="absolute left-[202px] top-[588px] w-[137px] h-[50px] cursor-pointer active:scale-95 transition-transform"
          onClick={handleConfirm}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[#492607]">
            변경
          </p>
        </button>
      </div>
    </div>
  );
}
