import { ReactElement } from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { posts } from "@/utils/posts";
import { PostType } from "@/utils/types";
import PostForMainPage from "@/components/MainPageLoggedIn/PostForMainPage";
import LeftArrow from '../../../public/images/svgs/icons/leftArrow.svg';
import RightArrow from '../../../public/images/svgs/icons/rightArrow.svg';
import Manatee from '../../../public/images/backgrounds/manatee.png';
import Image from "next/image";

const ClimateCarousel: React.FC = (): ReactElement => {
  const cuttedPosts: PostType[] = posts.slice(0, 4);

  // ? расклад такой: если использовать array.map, то начинает все ломаться на ширине 555 пикселей. если использовать просто несколько PostForMainPage, ведет себя лучше, но на супермаленьком разрешении типа там 400 с чем-то тоже ломается. если вытащить весь код из PostForMainPage и несколько раз его повторить тут, то все шикарно работает. как так???

  // ? на малых разрешениях тоже не работает толком, на 390 мин ширина 395 получается 

  return (
    <Carousel
      className="relative mt-[16px] w-full box-border"
      showStatus={false}
      showIndicators={false}
      useKeyboardArrows={true}
      swipeable={true}
      showThumbs={false}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        (<button className="absolute top-[200px] left-[10px] z-10" onClick={onClickHandler} disabled={!hasPrev}>
          <LeftArrow className={`text-white ${!hasPrev && 'opacity-20'}`} />
        </button>)
      }
      renderArrowNext={(onClickHandler, hasPrev) =>
        (<button className="absolute top-[200px] right-[10px] z-10" onClick={onClickHandler} disabled={!hasPrev}>
          <RightArrow className={`text-white ${!hasPrev && 'opacity-20'}`} />
        </button>)
      }
    >
      {cuttedPosts.map((post, index) => {
        return (
          <PostForMainPage
            key={index}
            title={post.title}
            text={post.text}
            date={post.date}
            photo={post.photo}
            id={post.id}
            layout="large"
          />
        )
      })}

      {/* <div className="lg:row-start-2 lg:row-span-3 flex flex-col w-full">
        <div className="h-[415px] relative w-full">
          <Image src={Manatee} alt="hui" className="rounded-[8px] object-cover object-center" fill />
        </div>
        <h3 className="line-clamp-2 text-[#00265F] text-[24px] leading-[28px] font-oceanic-bold mt-[16px] text-left">{cuttedPosts[0].title}</h3>
        <p className="line-clamp-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F] mt-[7px] text-left">{cuttedPosts[0].text}</p>
      </div>

      <div className="lg:row-start-2 lg:row-span-3 flex flex-col w-full">
        <div className="h-[415px] relative w-full">
          <Image src={Manatee} alt="hui" className="rounded-[8px] object-cover object-center" fill />
        </div>
        <h3 className="line-clamp-2 text-[#00265F] text-[24px] leading-[28px] font-oceanic-bold mt-[16px] text-left">{cuttedPosts[1].title}</h3>
        <p className="line-clamp-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F] mt-[7px] text-left">{cuttedPosts[1].text}</p>
      </div>

      <div className="lg:row-start-2 lg:row-span-3 flex flex-col w-full">
        <div className="h-[415px] relative w-full">
          <Image src={Manatee} alt="hui" className="rounded-[8px] object-cover object-center" fill />
        </div>
        <h3 className="line-clamp-2 text-[#00265F] text-[24px] leading-[28px] font-oceanic-bold mt-[16px] text-left">{cuttedPosts[2].title}</h3>
        <p className="line-clamp-2 font-montserrat font-normal text-[18px] leading-[26px] text-[#00265F] mt-[7px] text-left">{cuttedPosts[0].text}</p>
      </div> */}

      {/* <PostForMainPage
        title={cuttedPosts[0].title}
        text={cuttedPosts[0].text}
        date={cuttedPosts[0].date}
        photo={cuttedPosts[0].photo}
        id={cuttedPosts[0].id}
        layout="large"
      />

      <PostForMainPage
        title={cuttedPosts[1].title}
        text={cuttedPosts[1].text}
        date={cuttedPosts[1].date}
        photo={cuttedPosts[1].photo}
        id={cuttedPosts[1].id}
        layout="large"
      />

      <PostForMainPage
        title={cuttedPosts[2].title}
        text={cuttedPosts[2].text}
        date={cuttedPosts[2].date}
        photo={cuttedPosts[2].photo}
        id={cuttedPosts[2].id}
        layout="large"
      /> */}
    </Carousel>
  );
}

export default ClimateCarousel;