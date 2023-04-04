import { ReactElement } from "react";
import TipsButton from "@/components/TipsButton";

const Tips: React.FC = (): ReactElement => {
  return (
    <div className="min-h-[1000px] bg-tips-blue-wave flex flex-col pl-[65px] pr-[65px] pt-[100px]">
      <h2 className="font-oceanic-bold text-[32px] leading-[38px] text-white mb-[32px]">Советы</h2>
      <div className="flex flex-col items-center">
        <h3 className="font-oceanic-bold text-[18px] leading-[26px] text-white max-w-[352px] text-center mb-[102px]">Получите простой и легко применимый эко-совет от ChatGPT</h3>
        <TipsButton />
      </div>
    </div>
  );
}

export default Tips;