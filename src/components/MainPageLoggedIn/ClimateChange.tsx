import { ReactElement } from 'react';
import { posts } from "@/utils/posts";
import { getRandom } from "@/utils/utils";
import { PostType } from "@/utils/types";
import styles from '../../styles/dynamic-gap.module.css';
import PostForMainPage from "@/components/MainPageLoggedIn/PostForMainPage";

const ClimateChange: React.FC = (): ReactElement => {
  const cuttedPosts: Array<PostType> = posts.slice(0, 4);

  return (
      <div
        className={`
          grid
          grid-cols-2
          grid-rows-[auto,1fr,1fr]
          gap-y-[32px]
          mx-auto
          max-h-[700px]
          max-w-[1382px]
          ${styles.dynamicGap}
        `}
      >
        <h2 className="font-oceanic-bold text-[#00265F] text-[32px] leading-[38px] col-span-2">Изменение климата</h2>
        {cuttedPosts.map((post, index) => {
          if (index === 0) {
            return (
              <PostForMainPage
                key={getRandom(1000)}
                title={post.title}
                text={post.text}
                date={post.date}
                photo={post.photo}
                id={post.id}
                layout="large"
              />)
          } return (
            <PostForMainPage
              key={getRandom(1000)}
              title={post.title}
              text={post.text}
              date={post.date}
              photo={post.photo}
              id={post.id}
              layout="small"
            />)
        })}
      </div>
  )
}

export default ClimateChange;