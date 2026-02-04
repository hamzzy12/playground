import imgImage91 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#072] left-0 rounded-[8px] size-[45px] top-0" />
      <div className="absolute h-[35px] left-[2px] top-[8px] w-[40px]" data-name="image 91">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[134.55%] left-0 max-w-none top-[-0.13%] w-[112.5%]" src={imgImage91} />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group1 />
      <div className="absolute border-3 border-[#00da62] border-solid left-0 rounded-[8px] size-[45px] top-0" />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Group2 />
    </div>
  );
}