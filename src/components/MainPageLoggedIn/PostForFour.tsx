import { PostType } from "@/utils/types";

const PostForFour: React.FC<PostType> = ({title, date, id, text, photo, photoUrl}: PostType) => {
  return (
    <div
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
      "
      style={{
        backgroundImage: `url(${photoUrl})`,
      }}
      >
      <div className="flex flex-col justify-between bg-[#00265F99] rounded-b-[8px] bg-opacity-60 px-[16px] pt-[16px] pb-[28px] text-white">
        <h3 className="font-oceanic-bold text-[18px] leading-[26px] line-clamp-2">{ title }</h3>
        <p className="font-montserrat text-[14px] leadinf-17px line-clamp-2">{ text }</p>
      </div>
    </div>
  )
}

export default PostForFour;