import { ReactElement } from "react";
import { posts } from "@/utils/posts";
import { getRandom } from "@/utils/utils";
import { PostType } from "@/utils/types";
import PostForFour from "@/components/MainPageLoggedIn/PostForFour";

const Education: React.FC = (): ReactElement => {
  const cuttedPosts: Array<PostType> = posts.slice(0, 4);

  return (
    <div className="w-full flex flex-col items-center mt-[120px]">
      <div className="w-full flex flex-col">
        <h2
          className="
          font-oceanic-bold
          text-[#00265F]
          text-[32px]
          leading-[38px]
          self-start"
        >Образовательный контент</h2>
        <div className="
          w-full 
          flex
          flex-row
          lg:space-x-[16px]
          md:space-x-[12px]
          sm:space-x-[8px]
          space-x-[6px]
          mt-[32px]
          overflow-x-auto
          lg:overflow-x-visible"
        >
          {cuttedPosts.map((post) => {
            return (
              <PostForFour
                key={getRandom(1000)}
                title={post.title}
                text={post.text}
                photo={post.photo}
                id={post.id}
                date={post.date}
                photoUrl={post.photoUrl}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Education;