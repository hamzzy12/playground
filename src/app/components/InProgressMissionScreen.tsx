import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgImage17 from "figma:asset/81d088beb551828e97404c314253141a6045d342.png";
import imgImage14 from "figma:asset/6f18eead9b572899ad877ca3e47a89c821b19b36.png";
import MissionCompletedAlert from "./MissionCompletedAlert";

interface MissionData {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
}

export default function InProgressMissionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const mission = location.state?.mission as MissionData | undefined;

  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleComplete = () => {
    console.log("미션 완료:", {
      missionId: mission?.id,
      message,
      hasImage: !!uploadedImage,
    });
    // 알림 팝업 표시
    setShowAlert(true);
  };

  const handleConfirmAlert = () => {
    setShowAlert(false);
    // 미션 완료 상태로 홈 화면으로 이동
    navigate("/home", {
      state: {
        completedMissionId: mission?.id
      }
    });
  };

  const handleLater = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100">
      <div className="bg-[#6e8f3b] h-[852px] relative w-[393px]" data-name="진행중미션">
        {/* 배경 이미지 */}
        <div className="absolute h-[772px] left-0 top-[80px] w-[393px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[100.09%] left-[-1.08%] max-w-none top-[-0.04%] w-[102.42%]"
              src={imgImage17}
            />
          </div>
        </div>

        {/* 헤더 타이틀 */}
        <div className="-translate-x-1/2 absolute h-[87px] left-[calc(50%+0.5px)] top-[42px] w-[262px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgImage14}
          />
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 top-[62px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[24px] text-[#492607] whitespace-nowrap">
          진행중 미션
        </p>

        {/* 메세지 라벨 */}
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[153px] leading-[1.5] text-[20px] text-white">
          메세지
        </p>

        {/* 메세지 입력 영역 */}
        <div className="absolute left-[20px] top-[193px] w-[353px] h-[296px]">
          <div className="absolute bg-[#733e14] border-4 border-[#cb721e] border-solid inset-0 rounded-[8px]" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="엄마한테 자랑 한마디 남겨볼까?"
            className="absolute inset-0 bg-transparent p-[20px] font-['ONE_Mobile_POP_OTF:Regular',sans-serif] text-[18px] text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none resize-none"
          />
        </div>

        {/* 사진 업로드 라벨 */}
        <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] left-[20px] top-[513px] leading-[1.5] text-[20px] text-white">
          사진 업로드 (선택)
        </p>

        {/* 사진 업로드 버튼 */}
        <div className="absolute left-[20px] top-[553px] flex gap-[10px]">
          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* + 버튼 */}
          <div
            className="cursor-pointer active:scale-95 transition-transform"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="bg-[#733e14] border-4 border-[#cb721e] border-solid rounded-[8px] size-[78px] flex items-center justify-center">
              <span className="text-[#cb721e] text-[40px] font-bold">+</span>
            </div>
          </div>

          {/* 업로드된 이미지 미리보기 */}
          {uploadedImage && (
            <div className="relative">
              <div className="bg-[#733e14] border-4 border-[#cb721e] border-solid rounded-[8px] size-[78px] overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="업로드된 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 삭제 버튼 */}
              <button
                onClick={handleRemoveImage}
                className="absolute -top-[8px] -right-[8px] bg-red-500 text-white rounded-full w-[24px] h-[24px] flex items-center justify-center text-[14px] font-bold"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 미션완료 버튼 */}
        <button
          className="absolute h-[50px] left-[113px] top-[692px] w-[167px] cursor-pointer active:scale-95 transition-transform"
          onClick={handleComplete}
        >
          <div className="absolute bg-[#ffe400] inset-0 rounded-[10px]" />
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] text-[18px] text-[#492607]">
            미션완료
          </p>
        </button>

        {/* 나중에 버튼 */}
        <button
          className="absolute h-[50px] left-[113px] top-[752px] w-[167px] cursor-pointer active:scale-95 transition-transform"
          onClick={handleLater}
        >
          <div className="absolute border-3 border-[#d68641] border-solid inset-0 rounded-[10px]" />
          <p className="absolute font-['ONE_Mobile_POP_OTF:Regular',sans-serif] inset-0 flex items-center justify-center leading-[1.5] text-[#d68641] text-[18px]">
            나중에
          </p>
        </button>

        {/* 미션 완료 알림 팝업 */}
        {showAlert && (
          <MissionCompletedAlert onConfirm={handleConfirmAlert} />
        )}
      </div>
    </div>
  );
}
