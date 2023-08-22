import { ReactElement } from "react";
import { StaticImageData } from "next/image";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { posts } from "@/utils/posts";
import { PostType } from "@/utils/types";
import PostForMainPage from "@/components/MainPageLoggedIn/PostForMainPage";
import LeftArrow from '../../../public/images/svgs/icons/leftArrow.svg';
import RightArrow from '../../../public/images/svgs/icons/rightArrow.svg';
import Manatee from '../../../public/images/backgrounds/manatee.png';
import Image from "next/image";

import { AllArticlesType } from "@/data/climate-articles";

const ClimateCarousel: React.FC<{articles: AllArticlesType}> = ({articles}): ReactElement => {
  const cuttedPosts: PostType[] = posts.slice(0, 4);

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
      {articles.map((article, index) => {
        let titleChunk;
        let textChunk;
        let photoChunk: StaticImageData | null = null;
        
        article.chunks.find(chunk => {
          if (chunk.type === 'title') {
            titleChunk = chunk.content;
          }
        });

        article.chunks.find(chunk => {
          if (chunk.type === 'lead') {
            textChunk = chunk.content;
          }
        });

        article.chunks.find(chunk => {
          if (chunk.type === 'image') {
            photoChunk = chunk.src as StaticImageData;
          }
        });
        return (
          <PostForMainPage
            key={index}
            title={titleChunk || 'Title not available'}
            lead={textChunk || 'Lead not available'}
            photo={photoChunk}
            id={article.id}
            layout="large"
          />
        )
      })}
    </Carousel>
  );
}

export default ClimateCarousel;