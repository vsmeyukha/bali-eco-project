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
        // max-h-[579px] можно добавить, а можно и не добавлять
          className={`
            grid
            grid-cols-2
            grid-rows-[auto,1fr,1fr,1fr]
            gap-[16px]
            mx-auto
            w-full
          `}
        >
          <h2 className="font-oceanic-bold text-[#00265F] text-[32px] leading-[38px] col-start-1 col-span-2">Изменение климата</h2>
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

// import { ReactElement } from 'react';
// import { posts } from "@/utils/posts";
// import { getRandom } from "@/utils/utils";
// import { PostType } from "@/utils/types";
// import styles from '../../styles/dynamic-gap.module.css';
// import PostForMainPage from "@/components/MainPageLoggedIn/PostForMainPage";

// const ClimateChange: React.FC = (): ReactElement => {
//   const cuttedPosts: Array<PostType> = posts.slice(0, 4);
//   console.log(cuttedPosts[0].title);

//   return (
//     <div
//       // max-h-[579px] можно добавить, а можно и не добавлять
//         className={`
//           flex
//           flex-col
//           mx-auto
//           w-full
//         `}
//       >
//       <h2 className="font-oceanic-bold text-[#00265F] text-[32px] leading-[38px] col-span-2">Изменение климата</h2>
//       <div className='grid grid-cols-2 grid-rows-[1fr,1fr,1fr] gap-[16px] h-[500px]'>
//         {cuttedPosts.map((post, index) => {
//             if (index === 0) {
//               return (
//                 <PostForMainPage
//                   key={getRandom(1000)}
//                   title={post.title}
//                   text={post.text}
//                   date={post.date}
//                   photo={post.photo}
//                   id={post.id}
//                   layout="large"
//                 />)
//             } return (
//               <PostForMainPage
//                 key={getRandom(1000)}
//                 title={post.title}
//                 text={post.text}
//                 date={post.date}
//                 photo={post.photo}
//                 id={post.id}
//                 layout="small"
//               />)
//           })}
//       </div>
//       <h3 className='
//         line-clamp-2
//         text-[#00265F]
//         text-[24px]
//         leading-[28px]
//         font-oceanic-bold
//         row-start-5'
//       >
//         {cuttedPosts[0].title}
//       </h3>
//       <p className='
//         line-clamp-2
//         font-montserrat
//         font-normal
//         text-[18px]
//         leading-[26px]
//         text-[#00265F]
//         row-start-6'
//       >
//         {cuttedPosts[0].text}
//       </p>
//     </div>
//   )
// }

// export default ClimateChange;