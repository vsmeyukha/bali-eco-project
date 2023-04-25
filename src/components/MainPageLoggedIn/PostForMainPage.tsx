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
    div: 'row-start-2 row-span-3 flex flex-col',
    imageWrapperDiv: 'h-[415px] relative',
    image: 'rounded-[8px] object-cover object-center',
    title: 'line-clamp-2 text-[#00265F] text-[24px] leading-[28px] font-oceanic-bold mt-[16px]',
    text: 'line-clamp-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F] mt-[7px]',
    date: 'line-clamp-2'
  } 

  // Styles for the smaller posts on the right
  const smallPostStyles: StylesType = {
    div: 'col-start-2 relative grid grid-cols-[1fr,auto] auto-rows-min gap-[16px] place-items-start',
    imageWrapperDiv: 'w-[176px] row-span-2',
    image: 'min-w-0 max-h-full rounded-[8px] object-cover object-center max-w-[176px]',
    title: 'line-clamp-2 col-start-2 text-[#00265F] text-[20px] leading-[26px] font-oceanic-bold',
    text: 'line-clamp-2 col-start-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F]',
    date: 'line-clamp-2 col-start-2'
  }

  const postStyles: StylesType = layout === 'large' ? largePostStyles : smallPostStyles;
  return (
    <div className={postStyles.div}>
      <div className={postStyles.imageWrapperDiv}>
        <Image src={photo} alt={title} className={postStyles.image} fill />
      </div>
      <h3 className={postStyles.title}>{ title }</h3>
      <p className={postStyles.text}>{ text }</p>
    </div>
  );
}

export default PostForMainPage;