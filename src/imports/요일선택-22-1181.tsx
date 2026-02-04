import imgImage87 from "figma:asset/107224774074739467c6ced065f389fbadb99d3c.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage88 from "figma:asset/b6651ec52b5cef36f4df76d8cfbd7e18cdeae7b9.png";

function Group() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-3 border-[#d68641] border-solid inset-[-1.5px] pointer-events-none rounded-[11.5px]" />
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_36.02%_22%_35.24%] leading-[1.5] not-italic text-[#d68641] text-[18px] text-center">나중에</p>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute h-[50px] left-[113px] top-[636px] w-[167px]" data-name="시작버튼">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[24%_31.23%_22%_31.05%] leading-[1.5] not-italic text-[#492607] text-[18px] text-center">선택완료</p>
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute h-[50px] left-[113px] top-[576px] w-[167px]" data-name="시작버튼">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[50px] top-[231px]">
      <div className="absolute bg-[#ffe400] h-[60px] left-[50px] rounded-[8px] top-[231px] w-[83px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[29.11%_70.74%_67.72%_17.3%] leading-[1.5] not-italic text-[#492607] text-[18px]">첫째주</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[50px] top-[416px]">
      <div className="absolute bg-[#ffe400] left-[50px] rounded-[8px] size-[60px] top-[416px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[50.82%_78.63%_46.01%_17.3%] leading-[1.5] not-italic text-[#492607] text-[18px]">월</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[50px] top-[231px]">
      <div className="absolute bg-[#733e14] h-[60px] left-[143px] rounded-[8px] top-[231px] w-[83px]" />
      <div className="absolute bg-[#733e14] h-[60px] left-[238px] rounded-[8px] top-[231px] w-[83px]" />
      <div className="absolute bg-[#733e14] h-[60px] left-[50px] rounded-[8px] top-[301px] w-[83px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[29.11%_47.33%_67.72%_40.97%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">둘째주</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[29.11%_22.65%_67.72%_65.14%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">셋째주</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[37.32%_70.48%_59.51%_17.3%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">넷째주</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="요일선택">
      <div className="absolute bg-[rgba(0,0,0,0.8)] inset-[0_-0.25%_0_0]" />
      <div className="absolute h-[717px] left-[28px] top-0 w-[334px]" data-name="image 87">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[111.73%] left-0 max-w-none top-[-11.72%] w-full" src={imgImage87} />
        </div>
      </div>
      <Component1 />
      <Component2 />
      <div className="-translate-x-1/2 absolute h-[65px] left-[calc(50%-1.5px)] top-[97px] w-[194px]" data-name="image 14">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[22.42%_76.59%_74.06%_15.01%] leading-[1.5] not-italic text-[20px] text-white">주수</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[44.13%_67.18%_52.35%_15.01%] leading-[1.5] not-italic text-[20px] text-white">요일선택</p>
      <Group2 />
      <Group4 />
      <Group3 />
      <div className="absolute bg-[#733e14] left-[120px] rounded-[8px] size-[60px] top-[416px]" />
      <div className="absolute bg-[#733e14] left-[190px] rounded-[8px] size-[60px] top-[416px]" />
      <div className="absolute bg-[#733e14] left-[260px] rounded-[8px] size-[60px] top-[416px]" />
      <div className="absolute bg-[#733e14] left-[50px] rounded-[8px] size-[60px] top-[486px]" />
      <div className="absolute bg-[#733e14] left-[120px] rounded-[8px] size-[60px] top-[486px]" />
      <div className="absolute bg-[#733e14] left-[190px] rounded-[8px] size-[60px] top-[486px]" />
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[50.82%_59.8%_46.01%_35.88%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">화</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[50.82%_42.49%_46.01%_53.69%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">수</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[50.82%_24.68%_46.01%_71.5%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">목</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[58.92%_77.61%_37.91%_18.58%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">금</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[58.92%_59.8%_37.91%_36.39%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">토</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[58.92%_41.98%_37.91%_53.94%] leading-[1.5] not-italic text-[18px] text-[rgba(255,255,255,0.3)]">일</p>
      <div className="absolute h-[30px] left-[164px] top-[112px] w-[67px]" data-name="image 88">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage88} />
      </div>
    </div>
  );
}