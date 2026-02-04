import React from "react";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage81 from "figma:asset/e78ae5719f36a2856ac49c4272131bc9fc8971dc.png";
import imgImage80 from "figma:asset/31e2d2c939565faff030878e9b4da0ee4efcf906.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import imgImage13 from "figma:asset/a14963193f556e2d9f09861159985994a20f1c33.png";
import imgImage55 from "figma:asset/965fb9e3672f1b431deadafeb12eb3a91fa0e0fb.png";

interface InvitationScreenProps {
  onBack: () => void;
  onAccept: () => void;
}

export default function InvitationScreen({ onBack, onAccept }: InvitationScreenProps) {
  return (
    <div className="bg-[#6e8f3b] h-[852px] relative w-[393px] overflow-hidden">
      {/* Background Image (Paper/Scroll) */}
      <div className="absolute h-[772px] left-0 top-[80px] w-[393px] z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="Background Scroll" className="absolute h-[100.09%] left-[-1.08%] max-w-none top-[-0.04%] w-[102.42%]" src={imgImage17} />
        </div>
      </div>

      {/* Header Image (Wood Sign) */}
      <div className="-translate-x-1/2 absolute h-[87px] left-[calc(50%+0.5px)] top-[42px] w-[262px] z-20">
        <img alt="Wood Sign" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage14} />
      </div>

      {/* Title Text on Wood Sign */}
      <div className="absolute h-[36px] left-[111px] top-[65.5px] w-[172px] z-30">
        <img alt="Title Text" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
      </div>

      {/* Content Text: "구몬학습지 풀기" */}
      <div className="-translate-x-1/2 absolute w-full text-center top-[170px] left-1/2 z-20 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607]">
        <p className="text-[25px] font-bold mb-2">구몬학습지 풀기</p>
        <p className="text-[18px] font-bold">p7~p15까지 할 수 있지?</p>
      </div>

      {/* Inner Images (Characters/Decorations) */}
      <div className="absolute h-[475px] left-[18px] top-[110px] w-[354px] z-10">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-30 pointer-events-none size-full" src={imgImage81} />
      </div>
      <div className="absolute h-[477px] left-[18px] top-[98px] w-[354px] z-10">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage80} />
      </div>

      {/* Info Box: Praise Coin */}
      <div className="absolute left-[32px] top-[440px] w-[325px] h-[92px] z-20">
        <div className="absolute inset-0 bg-[#F2CF99] rounded-[10px]">
             {/* Using a simple div background instead of SVG path for reliability if path is missing */}
        </div>
        
        {/* Coin Icon */}
        <div className="absolute left-[10px] top-[10px] w-[70px] h-[70px] flex items-center justify-center">
             <div className="relative w-[50px] h-[50px] bg-[#c17d13] rounded-[10px] flex items-center justify-center border-2 border-[#ffdf95]">
                <div className="absolute inset-0 border-2 border-[#ffdf95] rounded-[10px] pointer-events-none"></div>
                <img alt="Coin" className="w-[43px] h-[43px] object-cover" src={imgImage55} />
             </div>
        </div>

        {/* Text */}
        <div className="absolute left-[80px] top-[14px] text-[#492607] font-['ONE_Mobile_POP_OTF:Regular',sans-serif]">
            <p className="text-[18px] font-bold mb-1">칭찬코인이란?</p>
            <p className="text-[13px] leading-[1.3]">상점에서 부모님이 올려놓은 원하는<br/>상품으로 교환할 수 있는 코인이에요</p>
        </div>
      </div>

      {/* Bottom Section */}
      
      {/* Reward Text */}
      <div className="absolute top-[615px] left-[16px] w-[359px] h-[60px] z-20">
        <div className="relative size-full flex items-center justify-center">
          <div className="absolute bg-[#512808] inset-0 rounded-[10px]" />
          <p className="relative z-10 font-['ONE_Mobile_POP_OTF:Regular',sans-serif] leading-[1.5] not-italic text-[18px] text-center text-white">보상 : 칭찬코인 +1</p>
        </div>
      </div>

      {/* Challenge Button (Accept) */}
      <div className="absolute top-[692px] left-[113px] w-[167px] h-[50px] z-30 cursor-pointer" onClick={onAccept}>
          <div className="absolute inset-0 bg-[#ffe400] rounded-[10px] shadow-md hover:bg-[#ffed4d] active:scale-95 transition-transform" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#492607] text-[18px] font-bold">도전하기</p>
      </div>

      {/* Reject Button (Back) */}
      <div className="absolute top-[752px] left-[113px] w-[167px] h-[50px] z-30 cursor-pointer" onClick={onBack}>
          <div className="absolute inset-0 border-3 border-[#d68641] rounded-[10px] hover:bg-[#d68641] hover:bg-opacity-10 active:scale-95 transition-transform" />
          <p className="absolute inset-0 flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[#d68641] text-[18px] font-bold">거절하기</p>
      </div>

      {/* Mission Accept Text (Bottom Black Box?) */}
      {/* The figma code had a black box at top=692px with text "미션수락하기", but also a yellow button "도전하기" at the same top position?
          Looking at the screenshot, there is a big yellow button "도전하기" and below it a brown outline button "거절하기".
          There is also a dark brown bar "보상 : 칭찬코인 +1" above the buttons.
          
          In the provided code:
          - div at top=692, w=359, bg=#0e0d0d (Black), text="미션수락하기". This looks weird if "도전하기" is also there.
          - div at top=692, w=167, bg=#ffe400 (Yellow), text="도전하기".
          
          Wait, looking at the Figma code provided:
          - "미션수락하기" box has `left-[16px] top-[692px] w-[359px]`.
          - "도전하기" box has `left-[113px] top-[692px] w-[167px]`.
          
          This implies they overlap or are alternatives.
          BUT looking at the SCREENSHOT:
          - The yellow button says "도전하기" (Challenge).
          - The outline button says "거절하기" (Reject).
          - The "보상 : 칭찬코인 +1" bar is above them.
          
          The "미션수락하기" (Accept Mission) text/box might be a hidden layer or a mistake in the export if it conflicts. 
          The screenshot clearly shows "도전하기" in a wide yellow button?
          Actually, the screenshot shows:
          [ Dark Brown Bar: 보상 : 칭찬코인 +1 ]
          [ Yellow Button: 도전하기 ] -> This looks wide? No, in the screenshot it looks wide (width of the dark bar above it? No, slightly narrower? Or maybe centered?)
          
          Let's re-examine the screenshot.
          The "보상" bar is full width (minus margins).
          The "도전하기" button is below it, looks like a yellow rounded rectangle, centered text.
          The "거절하기" button is below that, outline.
          
          In the user code:
          - "도전하기" has `w-[167px]` and `left-[113px]`. 113*2 + 167 = 226+167 = 393. So it is centered (113 left, 113 right).
          
          But the screenshot shows "도전하기" looks wider than "거절하기"?
          Actually in the screenshot, "도전하기" and "거절하기" seem to have similar widths?
          Wait, "거절하기" in code is `w-[167px] left-[113px]`.
          "도전하기" in code is `w-[167px] left-[113px]`.
          So they are same width and position?
          BUT "도전하기" is at top `692px`.
          "거절하기" is at top `752px`.
          
          So "도전하기" is above "거절하기".
          
          And there is another div: `top-[692px] w-[359px] left-[16px]` with text "미션수락하기".
          This one overlaps with "도전하기".
          Maybe "미션수락하기" is the label for the section or a different state?
          In the screenshot, I only see "도전하기". I will ignore "미션수락하기" box if it conflicts, or maybe render what is visible in the screenshot.
          The screenshot shows "도전하기" button is Yellow.
          The code has a yellow button for "도전하기".
          
          However, the code ALSO has a black box for "미션수락하기" at the SAME top position (692).
          The screenshot does NOT show a black box saying "미션수락하기".
          I will stick to the screenshot visuals: Yellow "도전하기" button.
          I will assume "미션수락하기" is a hidden layer in Figma.
          
      */}

    </div>
  );
}
