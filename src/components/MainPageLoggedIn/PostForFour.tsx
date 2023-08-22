import Link from "next/link";
import { PostType } from "@/utils/types";
import { ArticlePreviewType } from "./PostForMainPage";

const PostForFour: React.FC<ArticlePreviewType> = ({title, id, lead, photo, photoUrl}: ArticlePreviewType) => {
  return (
    <Link
      href={`/eco-life/${id}`}
      className="
      bg-cover 
      bg-center 
      flex 
      flex-col-reverse 
      rounded-[8px] 
      w-1/3 
      lg:w-1/4 
      h-[210px] 
      lg:h-[333px]
      lg:shrink
      shrink-0
      min-w-[170px]
      hover:transform
      hover:scale-105
      duration-200"
      style={{
        backgroundImage: `url(${photoUrl})`,
      }}
    >
      <div
        className="
        flex 
        flex-col
        justify-between
        bg-[#00265F99]
        rounded-b-[8px]
        bg-opacity-60
        px-[16px]
        pt-[16px]
        pb-[28px]
        text-white"
      >
        <h3
          className="font-oceanic-bold text-[18px] leading-[26px] line-clamp-2"
        >
          {title}
        </h3>
        <p
          className="font-montserrat text-[14px] leadinf-17px line-clamp-2"
        >
          {lead}
        </p>
      </div>
    </Link>
  )
}

export default PostForFour;