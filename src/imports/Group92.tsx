import svgPaths from "./svg-uurowocuep";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage37 from "figma:asset/8e84a045d8b268a46a68ba2858691647755a8a10.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
      <div className="absolute bg-[#f8dee0] h-[146px] left-0 rounded-[8px] top-0 w-[361px]" />
      <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
          <path d={svgPaths.p2cc17800} fill="var(--fill-0, #EF7C80)" id="Rectangle 35" />
        </svg>
      </div>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[71.71%_59.28%_10.53%_4.99%] leading-[1.5] not-italic text-[#492607] text-[18px] text-center">보상 : 칭찬코인 +1</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[9.87%_41%_70.39%_24.1%] leading-[1.5] not-italic text-[#492607] text-[20px]">줄넘기 연습하기</p>
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-[33.55%_45.71%_46.71%_24.1%] leading-[1.5] not-italic text-[#492607] text-[20px]">같이 운동하자</p>
      <div className="absolute left-[13px] size-[66px] top-[15px]" data-name="image 46">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
      </div>
      <div className="absolute h-[56px] left-[205px] top-[80px] w-[142px]" data-name="image 37">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage37} />
      </div>
    </div>
  );
}