function Group() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_31.23%_22%_31.05%] leading-[1.5] not-italic text-[#492607] text-[18px] text-center">도전하기</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="시작버튼">
      <Group />
    </div>
  );
}