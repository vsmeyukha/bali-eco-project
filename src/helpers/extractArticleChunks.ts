import { StaticImageData } from "next/image";
import { ArticleType } from "@/data/climate-articles";

const extractArticleChunks = (article: ArticleType) => {
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

  return { titleChunk, textChunk, photoChunk };
}

export default extractArticleChunks;