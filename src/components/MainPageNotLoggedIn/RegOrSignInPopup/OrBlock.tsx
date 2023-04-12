import { ReactElement } from "react";

const OrBlock: React.FC = (): ReactElement => {
  return (
    <div className="flex flex-row items-center w-[440px] mt-[40px]">
      <div className="border-b border-1 border-[#00265F] border-opacity-10 w-full" />
      <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] mx-[12px]">или</p>
      <div className="border-b border-1 border-[#00265F] border-opacity-10 w-full" />
    </div>
  );
}

export default OrBlock;