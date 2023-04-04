import { ReactElement } from "react";
import { posts } from "@/utils/posts";
import { getRandom } from "@/utils/utils";
import { PostType } from "@/utils/types";
import PostForFour from "@/components/MainPageLoggedIn/PostForFour";

const Education: React.FC = (): ReactElement => {
  const cuttedPosts: Array<PostType> = posts.slice(0, 4);

  return (
    <div className=" flex flex-col items-center mx-[65px] mt-[120px]">
      <div className="flex flex-col">
        <h2
          className="
          font-oceanic-bold
          text-[#00265F]
          text-[32px]
          leading-[38px]
          self-start"
        >Образовательный контент</h2>
        <div className="flex flex-row space-x-[30px] mt-[32px]">
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