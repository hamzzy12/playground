import imgImage23 from "figma:asset/41b1d4ad88809f9a926beece0f1973d68b05dfe4.png";
import imgImage21 from "figma:asset/7fbe153e758dd697ac3336ffcf323c31e859859d.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage24 from "figma:asset/c6680846773d8124fed6e936bb9a26a76ad51397.png";

export default function Component({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white h-[852px] relative w-[393px]"} data-name="부모/자식선택">
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-[0_-0.25%_0_0]" />
      <div className="absolute h-[669px] left-[28px] top-0 w-[333px]" data-name="image 23">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.3%] left-0 max-w-none top-[-3.3%] w-full" src={imgImage23} />
        </div>
      </div>
      <div className="absolute h-[64px] left-[56px] top-[274px] w-[278px]" data-name="image 21">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
      </div>
      <div className="absolute h-[64px] left-[56px] top-[348px] w-[278px]" data-name="image 22">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
      </div>
      <div className="absolute h-[64px] left-[56px] top-[422px] w-[278px]" data-name="image 26">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
      </div>
      <div className="absolute h-[64px] left-[56px] top-[496px] w-[278px]" data-name="image 27">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage21} />
      </div>
      <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-1.5px)] top-[187px] w-[194px]" data-name="image 14">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <div className="absolute h-[31px] left-[143px] top-[201px] w-[104px]" data-name="image 24">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage24} />
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[34.15%_43.51%_62.32%_42.75%] leading-[1.5] not-italic text-[#492607] text-[20px] text-center">나자신</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[42.84%_46.06%_53.64%_45.55%] leading-[1.5] not-italic text-[#492607] text-[20px] text-center">부모</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[51.53%_45.8%_44.95%_45.04%] leading-[1.5] not-italic text-[#492607] text-[20px] text-center">자식</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[60.21%_35.62%_36.27%_35.11%] leading-[1.5] not-italic text-[#492607] text-[20px] text-center">기타 직접 입력</p>
    </div>
  );
}