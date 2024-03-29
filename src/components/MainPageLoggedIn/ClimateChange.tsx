import { ReactElement } from 'react';
import PostForMainPage from "@/components/MainPageLoggedIn/PostForMainPage";
import useViewportWidth from '@/hooks/calculateWidth';
import ClimateCarousel from './ClimateCarousel';
import extractArticleChunks from '@/helpers/extractArticleChunks';

import { useTranslation } from 'next-i18next';

import { articles } from '@/data/climate-articles';

const ClimateChange: React.FC = (): ReactElement => {
  const viewportWidth = useViewportWidth();

  const { t } = useTranslation('mapPage');

  return (
      <div
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
      <h2
        className="
        font-oceanic-bold
        text-[#00265F]
        text-[32px]
        leading-[38px]
        col-start-1
        col-span-2"
      >
        {t('climateChange')}
      </h2>
          {viewportWidth >= 1024
            ?
            articles.map((article, index) => {
              const { titleChunk, textChunk, photoChunk } = extractArticleChunks(article);

              if (index === 0) {
                return (
                  <PostForMainPage
                    key={index}
                    title={titleChunk || 'Title not available'} 
                    lead={textChunk || 'Lead not available'}
                    photo={photoChunk}
                    id={article.id}
                    layout="large"
                  />)
              } return (
                <PostForMainPage
                  key={index}
                  title={titleChunk || 'Title not available'} 
                  lead={textChunk || 'Lead not available'}
                  photo={photoChunk}
                  id={article.id}
                  layout="small"
                />)
            })
            :
            <ClimateCarousel articles={articles} />
          }
      </div>
  )
}

export default ClimateChange;