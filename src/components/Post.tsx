import { ReactElement } from "react";
import { PostType } from "@/utils/types";
import Image from "next/image";

const Post: React.FC<PostType> = ({ title, date, id, text, photo}: PostType): ReactElement => {
  return (
    <div className="shadow-md hover:shadow-[#4CAF50] duration-300 max-w-[350px] rounded-[12px] m-[12px] pb-[12px] flex flex-col">
      <Image src={photo} alt={title} className="rounded-[8px] mt-[16px] mx-auto max-w-[320px] max-h-[320px]" />
      <h1 className="font-oceanic-bold text-[#4CAF50] text-[32px] leading-[36px] mr-[12px] ml-[12px] mt-[12px]">{title}</h1>
      <p className="max-w-full mr-[12px] ml-[12px] mt-[12px] line-clamp-2 font-roboto-thin text-[20px] leading-[24px]">{text}...</p>
      <p className="mr-[12px] mt-[12px] font-roboto-thin text-[#4CAF50] text-[12px] leading-[14px] text-right">{date}</p>
    </div>
  );
};


export default Post;