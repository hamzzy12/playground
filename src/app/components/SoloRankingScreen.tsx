import React from "react";
import { useNavigate } from "react-router-dom";

// PNG assets
import imgImage91 from "figma:asset/33a8e1b3207d3e946a3d1319a80807089cbbc3fa.png";
import imgImage47 from "figma:asset/149ffd9965dec6b119823221359b74045abf60b7.png";
import imgImage49 from "figma:asset/f80d92b0aa5fe352e0affa98dc34d4f5654cddc2.png";
import imgImage48 from "figma:asset/f62dd14ca55f929a3069b8da15c4902593663f9e.png";

// SVG assets
import imgVector22 from "figma:asset/ac37bd0c3d0d990bb2642034e2cfe1791ec3a1f8.svg";
import imgRectangle37 from "figma:asset/7c5b950176e7b0a6632354748cb19863eac4d456.svg";
import imgRectangle38 from "figma:asset/a98e8ac5fd1261f40c027743d1d284180424a3c6.svg";
import imgRectangle39 from "figma:asset/bbefd5291c67080b31f41491680cc68e98248bef.svg";
import imgRectangle40 from "figma:asset/29a9e2eaca1e3d374a8d637c9b0e3e01cdd41f87.svg";
import imgRectangle41 from "figma:asset/24adb0753ff5cf6ed07f9ad608b6c253c8d6a70a.svg";
import imgGroup136 from "figma:asset/2ca55e557641122c4ce2844cca0d89da75051eda.svg";
import imgVector19 from "figma:asset/a6bef69b5a9d7573cfab1c1cc44969ab6a13b2b0.svg";
import imgGroup137 from "figma:asset/e810e3e67965e19a477e21eb8b164c873a1b4d1d.svg";
import imgVector17 from "figma:asset/36eccd2a926dfdac2825db977f0bbc4eb018e29b.svg";
import imgVector from "figma:asset/bd24ae2c372257c19de59ea06492d6044453042f.svg";
import imgVector1 from "figma:asset/05c8d006d8a38c69725d1d45b374c0edca5ba86d.svg";
import imgVector2 from "figma:asset/07a06ebafa1b80470b94286e7595318b82708b7f.svg";
import imgGroup144 from "figma:asset/d84ca5995fad81fcac3bf8627d8254efd012c9e1.svg";
import imgGroup145 from "figma:asset/138ce17bfdeff204e250d47c9baa84ad16783603.svg";
import imgVector3 from "figma:asset/027404b8e12a16e973b2ddeea3924dc414bfdb87.svg";
import imgVector4 from "figma:asset/92dbf6c6e1ddd2c8999f46fa5d81508dc1b5056d.svg";
import imgGroup150 from "figma:asset/0f08cbf75f27c473b51a791067b37d86016b7757.svg";
import imgGroup138 from "figma:asset/6f422f5dd49685855da6077c534e83dfabd9dd48.svg";
import imgVector18 from "figma:asset/6301c2e3c283df1d0ed07442c54e742ce4ec7398.svg";
import imgGroup148 from "figma:asset/b2d72f248e8603ffeb51677511be5edc0d420d68.svg";
import imgGroup149 from "figma:asset/5e01411da4a715cbf71a3544044d4aa0bfd2f23e.svg";

// Podium badge PNG images
import imgGroup1381 from "figma:asset/5549a4e9db06efb6771b1b78672cdcc6f9ad92dd.png";
import imgGroup1391 from "figma:asset/19c5bd4edf08dde7a9c35d5c13b7726737972316.png";
import imgGroup1401 from "figma:asset/c268cb1f97f5f8ccd535a1d5d18c1d91ec14bfaf.png";

function getRankBadgeSvg(rank: number): string {
  switch (rank) {
    case 1: return imgRectangle40;
    case 2: return imgRectangle39;
    case 3: return imgRectangle38;
    default: return imgRectangle37;
  }
}

function getRankBgColor(rank: number): string {
  switch (rank) {
    case 1: return "#fff9d4";
    case 2: return "#eeece8";
    case 3: return "#f2d2be";
    default: return "#f2e1be";
  }
}

interface RankingUser {
  rank: number;
  name: string;
  score: number;
  profileImg: string;
}

const ProfileImage = ({ src, size = 66 }: { src: string; size?: number }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }}>
    <div className="rounded-[8px] overflow-hidden bg-[#072] size-full">
      <div className="relative w-full h-full overflow-hidden">
        <img
          alt=""
          className="absolute left-0 top-[-0.13%] w-[112.5%] h-[134.55%] max-w-none"
          src={src}
        />
      </div>
    </div>
    <div className="absolute inset-0 border-[5px] border-[#00da62] border-solid rounded-[8px] pointer-events-none" />
  </div>
);

const RankItem = ({ user }: { user: RankingUser }) => {
  const bgColor = getRankBgColor(user.rank);
  const badgeSvg = getRankBadgeSvg(user.rank);

  return (
    <div className="relative w-[367px] mx-auto mb-[16px]">
      <div className="absolute top-[11px] left-0 w-full h-[82px] bg-[#45270b] rounded-[8px]" />
      <div className="relative w-full h-[87px] rounded-[8px] overflow-hidden" style={{ backgroundColor: bgColor }}>
        <div className="absolute left-0 top-0 w-[64px] h-[87px] rotate-180">
          <img alt="" className="block w-full h-full" src={badgeSvg} />
        </div>
        <p
          className="absolute left-0 top-0 w-[64px] h-[87px] flex items-center justify-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[26px] text-center text-white leading-[1.5]"
          style={{ textShadow: "0px -3px 0 #603D1D, 0px 3px 0 #603D1D, -3px 0px 0 #603D1D, 3px 0px 0 #603D1D, -2px -2px 0 #603D1D, 2px -2px 0 #603D1D, -2px 2px 0 #603D1D, 2px 2px 0 #603D1D, -1px -3px 0 #603D1D, 1px -3px 0 #603D1D, -1px 3px 0 #603D1D, 1px 3px 0 #603D1D, -3px -1px 0 #603D1D, 3px -1px 0 #603D1D, -3px 1px 0 #603D1D, 3px 1px 0 #603D1D" }}
        >
          {user.rank}
        </p>
        <div className="absolute left-[75px] top-[10px]">
          <ProfileImage src={user.profileImg} />
        </div>
        <p className="absolute left-[152px] top-[28px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-[#603d1d] leading-[1.5]">
          {user.name}
        </p>
        <p className="absolute right-[16px] top-[24px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[26px] text-[#603d1d] text-right leading-[1.5]">
          {user.score}
        </p>
      </div>
    </div>
  );
};

const NAMES = [
  "이현호", "김민서", "박지우", "최서연", "정하은",
  "한도윤", "윤서준", "임지호", "송예린", "오시우",
  "강예준", "조수아", "신지안", "장하윤", "황시온",
  "권도현", "유나은", "문서윤", "배주원", "전이준",
];

const SAMPLE_RANKINGS: RankingUser[] = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: NAMES[i % NAMES.length],
  score: Math.max(100 - i, 1),
  profileImg: imgImage91,
}));

const MY_RANKING = {
  displayRank: "-",
  name: "김쭈니",
  score: 3,
  profileImg: imgImage91,
};

export default function SoloRankingScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e]">
      <div className="relative w-[393px] h-[852px] overflow-hidden">
        <div className="absolute left-[-2px] top-0 w-[395px] h-[803px] bg-[#603d1d]" />
        <div className="absolute left-[-2px] top-0 w-[395px] h-[226px] bg-[#27323f]" />

        <div className="absolute left-0 top-[194px] w-[393px] h-[32px]">
          <img alt="" className="block w-full h-full" src={imgVector22} />
        </div>

        <div className="absolute left-0 top-0 w-[55px] h-[226.5px]">
          <div className="absolute inset-[0_-4.54%_-0.15%_-0.74%]">
            <img alt="" className="block w-full h-full max-w-none" src={imgGroup149} />
          </div>
        </div>

        <div className="absolute left-[338px] top-0 w-[55px] h-[226.5px] flex items-center justify-center">
          <div className="-scale-y-100 rotate-180 relative w-[55px] h-[226.5px]">
            <div className="absolute inset-[0_-4.54%_-0.15%_-0.74%]">
              <img alt="" className="block w-full h-full max-w-none" src={imgGroup148} />
            </div>
          </div>
        </div>

        <p
          className="absolute top-[16px] left-0 w-full text-center font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[26px] text-white leading-[1.5] whitespace-nowrap"
          style={{
            textShadow: "0px -3px 0 #1a1a2e, 0px 3px 0 #1a1a2e, -3px 0px 0 #1a1a2e, 3px 0px 0 #1a1a2e, -2px -2px 0 #1a1a2e, 2px -2px 0 #1a1a2e, -2px 2px 0 #1a1a2e, 2px 2px 0 #1a1a2e, -1px -3px 0 #1a1a2e, 1px -3px 0 #1a1a2e, -1px 3px 0 #1a1a2e, 1px 3px 0 #1a1a2e, -3px -1px 0 #1a1a2e, 3px -1px 0 #1a1a2e, -3px 1px 0 #1a1a2e, 3px 1px 0 #1a1a2e",
          }}
        >
          2월 미션연속 성공순위
        </p>

        <div className="absolute left-[129px] top-[134px] w-[133.37px] h-[40.13px]">
          <div className="absolute inset-[-2.97%_0_0_0]">
            <img alt="" className="block w-full h-full max-w-none" src={imgGroup150} />
          </div>
        </div>

        <div className="absolute left-[66px] top-[69px] w-[42px] h-[29.88px]">
          <div className="absolute inset-[-10.04%_-7.14%_-18.71%_-7.14%]">
            <img alt="" className="block w-full h-full max-w-none" src={imgGroup144} />
          </div>
        </div>

        <div className="absolute left-[283px] top-[69px] w-[42px] h-[29.88px]">
          <div className="absolute inset-[-10.04%_-7.14%_-18.71%_-7.14%]">
            <img alt="" className="block w-full h-full max-w-none" src={imgGroup145} />
          </div>
        </div>

        {/* 2nd place */}
        <div className="absolute left-[60px] top-[114px]">
          <ProfileImage src={imgImage91} size={54} />
        </div>
        <div className="absolute left-[39px] top-[152px] w-[94px] h-[46px]">
          <img alt="" className="block w-full h-full" src={imgVector18} />
        </div>
        <p
          className="absolute left-[67px] top-[171px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-white leading-[1.5]"
          style={{ textShadow: "0px -2px 0 #27323f, 0px 2px 0 #27323f, -2px 0px 0 #27323f, 2px 0px 0 #27323f, -1px -2px 0 #27323f, 1px -2px 0 #27323f, -1px 2px 0 #27323f, 1px 2px 0 #27323f, -2px -1px 0 #27323f, 2px -1px 0 #27323f, -2px 1px 0 #27323f, 2px 1px 0 #27323f" }}
        >
          김민서
        </p>
        <div className="absolute left-[50px] top-[194px] w-[77px] h-[28px]">
          <img alt="" className="block w-full h-full object-cover" src={imgGroup1391} />
        </div>

        {/* 1st place */}
        <div className="absolute left-[163px] top-[83px]">
          <ProfileImage src={imgImage91} size={66} />
        </div>
        <div className="absolute left-[148px] top-[138px] w-[94px] h-[46px]">
          <img alt="" className="block w-full h-full" src={imgVector17} />
        </div>
        <p
          className="absolute left-[176px] top-[154px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-white leading-[1.5]"
          style={{ textShadow: "0px -2px 0 #27323f, 0px 2px 0 #27323f, -2px 0px 0 #27323f, 2px 0px 0 #27323f, -1px -2px 0 #27323f, 1px -2px 0 #27323f, -1px 2px 0 #27323f, 1px 2px 0 #27323f, -2px -1px 0 #27323f, 2px -1px 0 #27323f, -2px 1px 0 #27323f, 2px 1px 0 #27323f" }}
        >
          이현호
        </p>
        <div className="absolute left-[147px] top-[179px] w-[97px] h-[35px]">
          <img alt="" className="block w-full h-full object-cover" src={imgGroup1381} />
        </div>

        {/* 3rd place */}
        <div className="absolute left-[278px] top-[114px]">
          <ProfileImage src={imgImage91} size={54} />
        </div>
        <div className="absolute left-[257px] top-[152px] w-[94px] h-[46px]">
          <img alt="" className="block w-full h-full" src={imgVector19} />
        </div>
        <p
          className="absolute left-[285px] top-[171px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[16px] text-white leading-[1.5]"
          style={{ textShadow: "0px -2px 0 #27323f, 0px 2px 0 #27323f, -2px 0px 0 #27323f, 2px 0px 0 #27323f, -1px -2px 0 #27323f, 1px -2px 0 #27323f, -1px 2px 0 #27323f, 1px 2px 0 #27323f, -2px -1px 0 #27323f, 2px -1px 0 #27323f, -2px 1px 0 #27323f, 2px 1px 0 #27323f" }}
        >
          박지우
        </p>
        <div className="absolute left-[267px] top-[195px] w-[76px] h-[27px]">
          <img alt="" className="block w-full h-full object-cover" src={imgGroup1401} />
        </div>

        {/* Crown */}
        <div className="absolute left-[183px] top-[61px] w-[26px] h-[15px]">
          <div className="absolute inset-[-13.33%_-7.69%]">
            <img alt="" className="block w-full h-full max-w-none" src={imgVector} />
          </div>
        </div>

        {/* Star decorations */}
        <div className="absolute left-[217px] top-[67px] w-[12px] h-[13px]">
          <img alt="" className="block w-full h-full max-w-none" src={imgVector1} />
        </div>
        <div className="absolute left-[235px] top-[80px] w-[12px] h-[13px]">
          <img alt="" className="block w-full h-full max-w-none" src={imgVector1} />
        </div>
        <div className="absolute left-[158px] top-[100px] w-[12px] h-[13px]">
          <img alt="" className="block w-full h-full max-w-none" src={imgVector1} />
        </div>
        <div className="absolute left-[149px] top-[79px] w-[8px] h-[9px]">
          <img alt="" className="block w-full h-full max-w-none" src={imgVector2} />
        </div>
        <div className="absolute left-[229px] top-[99px] w-[8px] h-[9px]">
          <img alt="" className="block w-full h-full max-w-none" src={imgVector2} />
        </div>

        {/* Ranking List */}
        <div className="absolute left-0 top-[255px] w-full bottom-[136px] overflow-y-auto">
          <div className="pt-0">
            {SAMPLE_RANKINGS.map((user) => (
              <RankItem key={user.rank} user={user} />
            ))}
          </div>
        </div>

        {/* My Rank Bar */}
        <div className="absolute left-0 top-[716px] w-[393px] h-[87px] bg-[#875224]">
          <div className="absolute left-0 top-0 w-[77px] h-full bg-[#b46927]" />
          <p className="absolute left-[11px] top-[4px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-center text-white leading-[1.5]">
            내순위
          </p>
          <p className="absolute left-[31px] top-[36px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-center text-white leading-[1.5]">
            {MY_RANKING.displayRank}
          </p>
          <div className="absolute left-[88px] top-[12px]">
            <ProfileImage src={MY_RANKING.profileImg} />
          </div>
          <p className="absolute left-[164px] top-[28px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[20px] text-white leading-[1.5]">
            {MY_RANKING.name}
          </p>
          <p className="absolute right-[26px] top-[22px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[26px] text-white leading-[1.5]">
            {MY_RANKING.score}
          </p>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute left-0 top-[803px] w-[393px] h-[49px] bg-[#311d0c]">
          <div className="absolute left-[125px] bottom-[3px] w-[134px] h-[46px]">
            <img alt="" className="block w-full h-full" src={imgRectangle41} />
          </div>

          {/* 미션홈 → /solo-home */}
          <button
            className="absolute left-[37px] bottom-[10px] w-[57px] h-[26px] opacity-30 cursor-pointer"
            onClick={() => navigate("/solo-home")}
          >
            <img alt="미션홈" className="w-full h-full object-cover rounded-[8px]" src={imgImage47} />
          </button>

          {/* 랭킹전 (Active) */}
          <div className="absolute left-[162px] bottom-[10px] w-[60px] h-[26px]">
            <img alt="랭킹전" className="w-full h-full object-cover" src={imgImage48} />
          </div>

          {/* 성장보고서 */}
          <button
            className="absolute left-[277px] bottom-[10px] w-[96px] h-[26px] opacity-30 cursor-pointer"
            onClick={() => {/* TODO */}}
          >
            <img alt="성장보고서" className="w-full h-full object-cover" src={imgImage49} />
          </button>
        </div>
      </div>
    </div>
  );
}
