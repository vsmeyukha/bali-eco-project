import { PostType } from "@/utils/types";
import Image from "next/image";
import { ReactElement } from "react";

interface StylesType {
  [key: string]: string,
}

interface PostForMainPageType extends PostType {
  layout: string,
}

const PostForMainPage: React.FC<PostForMainPageType> = ({title, date, id, text, photo, layout }: PostForMainPageType): ReactElement => {
    // ? Styles for the large post on the left
  const largePostStyles: StylesType = {
    div: 'row-span-3 max-w-[558px]',
    image: 'max-w-[676px] max-h-[415px] rounded-[8px]',
    title: 'line-clamp-2 text-[#00265F] text-[24px] leading-[28px] font-oceanic-bold mt-[16px]',
    text: 'line-clamp-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F] mt-[7px]',
    date: 'line-clamp-2'
  } 

  // Styles for the smaller posts on the right
  const smallPostStyles: StylesType = {
    div: 'grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-x-[30px] place-items-start',
    image: 'min-w-0 max-w-[205px] max-h-[160px] rounded-[8px] row-span-2',
    title: 'line-clamp-2 col-start-2 align-self-start text-[#00265F] text-[20px] leading-[26px] font-oceanic-bold',
    text: 'line-clamp-2 col-start-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F] mt-[12px]',
    date: 'line-clamp-2 col-start-2'
  }

  const postStyles: StylesType = layout === 'large' ? largePostStyles : smallPostStyles;

  return (
    <div className={postStyles.div}>
      <Image src={photo} alt={title} className={postStyles.image} />
      <h3 className={postStyles.title}>{ title }</h3>
      <p className={postStyles.text}>{ text }</p>
    </div>
  );
}

export default PostForMainPage;