import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage63 from "figma:asset/67b776f37d98a218bd6499f227365db338cd0a13.png";

interface ComponentProps {
  className?: string;
  onClose?: () => void;
}

interface InputFieldProps {
  placeholder: string;
  className?: string;
}

function InputField({ placeholder, className }: InputFieldProps) {
  return (
    <div className={`relative h-[60px] ${className}`}>
      <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
      <p className="absolute inset-0 flex items-center px-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-[rgba(255,255,255,0.3)]">
        {placeholder}
      </p>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

function ActionButton({ label, variant, onClick }: ActionButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <div
      className="relative h-[50px] w-[167px] cursor-pointer active:scale-95 transition-transform"
      onClick={onClick}
    >
      {isPrimary ? (
        <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
      ) : (
        <div className="absolute inset-0 rounded-[10px] border-3 border-[#d68641] border-solid" />
      )}
      <p className={`absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[18px] ${isPrimary ? 'text-[#492607]' : 'text-[#d68641]'}`}>
        {label}
      </p>
    </div>
  );
}

export default function MissionCreateModal({ className, onClose }: ComponentProps) {
  return (
    <div className={className || "bg-[#6e8f3b] h-[852px] relative w-[393px]"} data-name="상품올리기">
      {/* 배경 이미지 */}
      <div className="absolute h-[772px] left-0 top-[80px] w-[393px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.09%] left-[-1.08%] max-w-none top-[-0.04%] w-[102.42%]" src={imgImage17} />
        </div>
      </div>

      {/* 헤더 배너 */}
      <div className="absolute h-[87px] left-1/2 -translate-x-1/2 top-[42px] w-[262px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>

      {/* 미션제안하기 타이틀 이미지 */}
      <div className="absolute h-[36px] left-[112px] top-[63px] w-[169px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage63} />
      </div>

      {/* 섹션 라벨들 */}
      <p className="absolute left-[29px] top-[153px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
        미션완료일 정하기
      </p>
      <p className="absolute left-[29px] top-[268px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
        미션제안하기
      </p>
      <p className="absolute left-[20px] top-[453px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] text-[20px] text-white">
        보상으로 받을 칭찬코인 개수
      </p>

      {/* 날짜 입력 필드들 */}
      <div className="absolute top-[193px] left-[20px] flex gap-[15px]">
        <InputField placeholder="미션 시작일" className="w-[169px]" />
        <InputField placeholder="미션 완료일" className="w-[169px]" />
      </div>

      {/* 미션 내용 입력 */}
      <InputField placeholder="제안할 미션 내용" className="absolute top-[308px] left-[20px] w-[353px]" />

      {/* 추가 내용 입력 */}
      <InputField placeholder="추가내용(선택)" className="absolute top-[378px] left-[20px] w-[353px]" />

      {/* 코인 개수 입력 */}
      <InputField placeholder="칭찬코인 개수 입력" className="absolute top-[493px] left-[20px] w-[353px]" />

      {/* 액션 버튼들 */}
      <div className="absolute top-[692px] left-[113px]">
        <ActionButton label="미션 만들기" variant="primary" onClick={onClose} />
      </div>
      <div className="absolute top-[752px] left-[113px]">
        <ActionButton label="나중에" variant="secondary" onClick={onClose} />
      </div>
    </div>
  );
}
