import { ReactElement } from "react";
import Image from "next/image";
import { ArticleChunkType } from "@/data/climate-articles";

// ? ArticleContent component renders an article based on provided chunks of content.
// ? Each chunk can represent a title, subheading, lead, paragraph, or image.

// ? @param {Array<ArticleChunkType>} article - An array of chunks representing various parts of an article.
// ? @returns {ReactElement} A React component rendering the structured article content.

// ? Компонент содержимого статьи отображает статью на основе предоставленных фрагментов.
// ? Каждый фрагмент может представлять собой заголовок, подзаголовок, вводную часть, абзац или изображение.

// ? @param {Array<ArticleChunkType>} article - массив фрагментов, представляющих различные части статьи.
// ? @returns {ReactElement} Компонент React, отображающий структурированное содержимое статьи.

const ArticleContent: React.FC<{article: Array<ArticleChunkType>}> = ({article}): ReactElement => {
  return (
    <section className="w-full">
      {article.map((chunk, index) => {
        switch (chunk.type) {
          // ? Renders the main title of the article
          // ? Отображает заголовок статьи
          case 'title':
            return (
              <h2 key={index} className="font-oceanic-bold text-[32px] leading-[38px] text-[#00265F] mt-[24px]">{chunk.content}</h2>
            );
          // ? Renders subheadings within the article
          // ? Отображает подзаголовки статьи
          case 'subheading':
            return (
              <h3 key={index} className="font-montserrat-bold text-[24px] leading-[28px] text-[#00265F] mt-[24px]">{chunk.content}</h3>
            );
          // ? Renders the lead section of the article
          // ? Отображает лид статьи
          case 'lead':
            return (
              <p key={index} className="font-montserrat-bold text-[20px] leading-[24px] text-[#00265F] mt-[24px]">{chunk.content}</p>
            );
          // ? Renders standard paragraphs within the article
          // ? Отображает обычные абзацы статьи
          case 'paragraph':
            return (
              <p key={index} className="font-montserrat text-[20px] leading-[24px] text-[#00265F] mt-[24px]">{chunk.content}</p>
            );
          // ? Renders images within the article with associated alt text
          // ? Отображает фотографии в статье
          case 'image':
            return (
              chunk.src && <Image key={index} src={chunk.src} alt={chunk.content} className="mt-[24px] rounded-[10px] max-h-[670px] object-cover object-top" />
            );
          // ? For any other type not defined, we render nothing
          // ? Если тип не определен, возвращаем null
          default:
            return null;
        }
      })}
    </section>
  );
}

export default ArticleContent;