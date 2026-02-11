import { useNavigate } from "react-router-dom";
import imgImage29 from "figma:asset/cf324f7116373cd3d9f07fc7bb4cd7ec486d632b.png";
import imgImage21 from "figma:asset/7fbe153e758dd697ac3336ffcf323c31e859859d.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";

interface ModeChangePopupProps {
  onClose: () => void;
}

export default function ModeChangePopup({ onClose }: ModeChangePopupProps) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-[60]">
      {/* 어두운 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      {/* 두루마리 프레임 배경 */}
      <div className="-translate-x-1/2 absolute h-[439px] left-1/2 top-[-1px] w-[333px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.8%] left-0 max-w-none top-[-2.77%] w-full" src={imgImage29} />
        </div>
      </div>

      {/* 모드변경 타이틀 */}
      <div className="-translate-x-1/2 absolute h-[65px] left-1/2 top-[201px] w-[194px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <p className="-translate-x-1/2 absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] left-1/2 not-italic text-[22px] text-center text-white top-[213px]">
        모드변경
      </p>

      {/* 싱글모드 버튼 */}
      <button
        className="-translate-x-1/2 absolute h-[64px] left-1/2 top-[285px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => {
          onClose();
          navigate("/solo-home");
        }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-[#492607] text-center">
          싱글모드
        </p>
      </button>

      {/* 부모모드 버튼 */}
      <button
        className="-translate-x-1/2 absolute h-[64px] left-1/2 top-[359px] w-[278px] cursor-pointer active:scale-95 transition-transform"
        onClick={() => {
          onClose();
          navigate("/parent-home");
        }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
        <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-[#492607] text-center">
          부모모드
        </p>
      </button>
    </div>
  );
}
