import { ReactElement } from "react";

const PublishPhotoButton: React.FC = (): ReactElement => {
  return (
    <div className="w-full flex justify-center mt-[30px] mb-[60px]">
      <button className="w-[246px] h-[40px] mx-auto bg-[#2196F3] rounded-[8px] font-montserrat font-bold text-[16px] leading-[20px] text-white">
        Опубликовать фото
      </button>
    </div>
  );
}

export default PublishPhotoButton;