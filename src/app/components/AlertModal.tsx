interface AlertModalProps {
  /** 모달 본문 (한 줄 또는 여러 줄). string 또는 ReactNode 허용 */
  message: React.ReactNode;
  /** 우측 상단/중앙 타이틀. 기본 "안내" */
  title?: string;
  /** 확인 버튼 라벨. 기본 "확인" */
  confirmLabel?: string;
  onClose: () => void;
}

/**
 * 공용 안내(알림) 모달.
 * 브라우저 alert() 대체 — 디자인 통일, 키보드/포커스 제어 가능, 재사용 가능.
 * 미션 제안 시 매주/매월 + 스케줄 누락 같은 검증 실패 안내에 사용.
 */
export default function AlertModal({
  message,
  title = "안내",
  confirmLabel = "확인",
  onClose,
}: AlertModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 모달 컨테이너 */}
      <div
        className="relative w-[300px] bg-white rounded-[12px] p-[24px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#492607] mb-[12px]">
          {title}
        </p>
        <div className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[15px] text-[#733e14] mb-[24px] leading-[1.5]">
          {message}
        </div>
        <button
          onClick={onClose}
          className="w-full h-[44px] rounded-[8px] bg-[#ffe400] active:scale-95 transition-transform"
        >
          <p className="font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-[#492607]">
            {confirmLabel}
          </p>
        </button>
      </div>
    </div>
  );
}
