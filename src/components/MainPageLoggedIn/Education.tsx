import { ReactElement } from "react";
import { StaticImageData } from "next/image";
import { posts } from "@/utils/posts";
import { getRandom } from "@/utils/utils";
import { PostType } from "@/utils/types";
import PostForFour from "@/components/MainPageLoggedIn/PostForFour";
import extractArticleChunks from "@/helpers/extractArticleChunks";

import { articles } from '../../data/edu-articles';

import DefaultImage from '../../../public/images/backgrounds/Porsche.jpg';

const Education: React.FC = (): ReactElement => {
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
          {articles.map((article, index) => {
            const { titleChunk, textChunk, photoChunk } = extractArticleChunks(article);

            let photoUrl: string;
            photoChunk ? photoUrl = (photoChunk as StaticImageData).src : photoUrl = DefaultImage.src;

            return (
              <PostForFour
                key={index}
                title={titleChunk || 'Title not available'}
                lead={textChunk || 'Lead not available'}
                photo={photoChunk}
                id={article.id}
                photoUrl={photoUrl}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Education;