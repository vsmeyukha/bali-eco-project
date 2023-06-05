import { ReactElement } from "react";
import Image from "next/image";
import { ArticleChunkType } from "@/data/climate-articles";

const ArticleContent: React.FC<{article: Array<ArticleChunkType>}> = ({article}): ReactElement => {
  return (
    <section className="w-full">
      {article.map((chunk, index) => {
        switch (chunk.type) {
          case 'title':
            return (
              <h2 className="font-oceanic-bold text-[32px] leading-[38px] text-[#00265F] mt-[24px]">{chunk.content}</h2>
            );
          case 'subheading':
            return (
              <h3 className="font-montserrat-bold text-[24px] leading-[28px] text-[#00265F] mt-[24px]">{chunk.content}</h3>
            );
          case 'lead':
            return (
              <p className="font-montserrat-bold text-[20px] leading-[24px] text-[#00265F] mt-[24px]">{chunk.content}</p>
            );
          case 'paragraph':
            return (
              <p className="font-montserrat text-[20px] leading-[24px] text-[#00265F] mt-[24px]">{chunk.content}</p>
            );
          case 'image':
            return (
              chunk.src && <Image src={chunk.src} alt={chunk.content} className="mt-[24px] rounded-[10px] max-h-[670px] object-cover object-top" />
            );
          default:
            return null;
        }
      })}
    </section>
  );
}

export default ArticleContent;