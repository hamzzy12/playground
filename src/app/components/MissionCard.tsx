import svgPaths from "@/imports/svg-disegqpe5s";
import imgImage46 from "figma:asset/5f0f538fb1547384976c70a598ea8abfa9121d35.png";
import imgImage47 from "figma:asset/06750638a04f2b3069b1057f814539a0302a2245.png";
import imgImage37 from "figma:asset/409eeaf8b8d3d94dd075d0b92daaa9b7111bd5df.png";

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  backgroundColor: string;
  bottomBarColor: string;
  status?: 'active' | 'completed' | 'expired' | 'in_progress';
}

interface MissionCardProps {
  mission: Mission;
  onClick?: () => void;
}

export default function MissionCard({ mission, onClick }: MissionCardProps) {
  return (
    <button 
      className="relative w-[361px] h-[146px] shrink-0 mx-auto mb-[15px] cursor-pointer active:scale-95 transition-transform"
      onClick={onClick}
    >
      {/* Shadow */}
      <div className="absolute bg-[#45270b] h-[146px] left-0 rounded-[8px] top-[6px] w-[361px]" />
      
      {/* Main Card Background */}
      <div
        className={`absolute h-[146px] left-0 rounded-[8px] top-0 w-[361px]`}
        style={{ backgroundColor: mission.status === 'in_progress' ? '#f5eaf8' : mission.backgroundColor }}
      />
      
      {/* Bottom Bar */}
      <div className="absolute h-[47px] left-0 top-[99px] w-[361px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 47">
          <path d={svgPaths.p2cc17800} fill={mission.bottomBarColor} />
        </svg>
      </div>
      
      {/* Reward Text */}
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-0 top-[104px] w-[361px] text-left leading-[1.5] not-italic text-[#492607] text-[18px] whitespace-nowrap pl-[16px]">
        보상 : 칭찬코인 +{mission.reward}
      </p>
      
      {/* Mission Title */}
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[17px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">
        {mission.title}
      </p>
      
      {/* Mission Description */}
      <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[84px] top-[51px] w-[260px] leading-[1.5] not-italic text-[#492607] text-[20px] text-left whitespace-nowrap">
        {mission.description}
      </p>
      
      {/* Book Icon */}
      <div className="absolute left-[9px] size-[66px] top-[15px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
      </div>
      
      {/* Completed Stamp */}
      {mission.status === 'completed' && (
        <div className="absolute h-[56px] left-[201px] top-[80px] w-[142px]">
          <img alt="마감됨" className="w-full h-full object-contain" src={imgImage47} />
        </div>
      )}

      {/* In Progress Stamp */}
      {mission.status === 'in_progress' && (
        <div className="absolute h-[56px] left-[201px] top-[80px] w-[142px]">
          <img alt="진행중" className="w-full h-full object-contain" src={imgImage37} />
        </div>
      )}
    </button>
  );
}