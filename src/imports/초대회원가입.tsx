import imgImage20 from "figma:asset/03d18b0705eb33c048b11cf3194ca32f0d463be7.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage19 from "figma:asset/f3138f69f4a0667feabf1394df9cea9fc0ed336e.png";
import imgImage18 from "figma:asset/b582ab9ec41e0373445c90f23527c50a90385640.png";

function Component({ className }: { className?: string }) {
  return (
    <div className={className || "h-[50px] relative w-[199px]"} data-name="시작버튼">
      <div className="absolute contents inset-0">
        <div className="absolute bg-[#7b3a00] inset-0 rounded-[10px]" />
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_17.57%_22%_9.06%] leading-[1.5] not-italic text-[#c5afa5] text-[18px]">관계가 어떻게 되요?</p>
      </div>
    </div>
  );
}

export default function Component1({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#6f8f3b] h-[852px] relative w-[393px]"} data-name="초대_회원가입">
      <div className="-translate-x-1/2 absolute h-[625px] left-1/2 top-0 w-[357px]" data-name="image 20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[114.08%] left-[-0.07%] max-w-none top-[-14.08%] w-[100.14%]" src={imgImage20} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[78px] left-[calc(50%+0.5px)] top-[215.5px] w-[234px]" data-name="image 14">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <div className="absolute h-[50px] left-[91px] top-[493px] w-[205px]" data-name="시작버튼">
        <div className="absolute contents inset-0">
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_41.23%_22%_41.23%] leading-[1.5] not-italic text-[#492607] text-[18px] text-center">신규가입</p>
        </div>
      </div>
      <Component className="absolute h-[50px] left-[97px] top-[373px] w-[199px]" />
      <div className="absolute h-[50px] left-[97px] top-[433px] w-[199px]" data-name="시작버튼">
        <div className="absolute contents inset-0">
          <div className="absolute bg-[#7b3a00] inset-0 rounded-[10px]" />
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_17.57%_22%_9.06%] leading-[1.5] not-italic text-[#c5afa5] text-[18px]">이름 입력</p>
        </div>
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[38.73%_21.88%_58.1%_20.61%] leading-[1.5] not-italic text-[18px] text-center text-white">미션놀이터에 오신것을 환영해요</p>
      <div className="absolute h-[36px] left-[140px] top-[235px] w-[113px]" data-name="image 19">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage19} />
      </div>
      <div className="absolute h-[142px] left-[127px] top-[57px] w-[147px]" data-name="image 18">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage18} />
      </div>
    </div>
  );
}