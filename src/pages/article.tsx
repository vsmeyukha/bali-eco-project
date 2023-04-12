import Header from "@/components/Header";
import InstTwiFb from "@/components/InstTwiFb";
import ArticleContent from "@/components/ArticleContent";
import Footer from "@/components/Footer";

import { baliEnvironmentalThreats } from '../utils/posts';

const Article = () => {
  return (
    <>
      <Header />
      <section className="px-[65px] py-[60px] bg-[#F5F5F5]">
        <InstTwiFb fill="rgba(0, 38, 95, 0.8)" />
        <ArticleContent article={baliEnvironmentalThreats} />
      </section>
      <Footer />
    </>
  );
}

export default Article;