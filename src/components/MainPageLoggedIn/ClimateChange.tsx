import { ReactElement } from 'react';
import { posts } from "@/utils/posts";
import { getRandom } from "@/utils/utils";
import { PostType } from "@/utils/types";
import styles from '../../styles/dynamic-gap.module.css';
import PostForMainPage from "@/components/MainPageLoggedIn/PostForMainPage";
import useViewportWidth from '@/hooks/calculateWidth';
import ClimateCarousel from './ClimateCarousel';

const ClimateChange: React.FC = (): ReactElement => {
  const cuttedPosts: Array<PostType> = posts.slice(0, 4);

  const viewportWidth = useViewportWidth();

  return (
      <div
        // max-h-[579px] можно добавить, а можно и не добавлять
          className={`
            lg:grid
            lg:grid-cols-2
            lg:grid-rows-[auto,1fr,1fr,1fr]
            lg:gap-[16px]
            mx-auto
            w-full
            flex
            flex-col
          `}
        >
          <h2 className="font-oceanic-bold text-[#00265F] text-[32px] leading-[38px] col-start-1 col-span-2">Изменение климата</h2>
          {viewportWidth >= 1024
            ?
            cuttedPosts.map((post, index) => {
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
            })
            :
            <ClimateCarousel />
          }
      </div>
  )
}

export default ClimateChange;