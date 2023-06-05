import Header from "@/components/Header";
import InstTwiFb from "@/components/InstTwiFb";
import ArticleContent from "@/components/ArticleContent";
import Footer from "@/components/Footer/Footer";

import { baliEnvironmentalThreats } from '../../utils/posts';

const Article = () => {
  return (
    <>
      <Header />
      <section className="bg-[#F5F5F5] w-full py-[60px] 1440px:px-[252px] xl:px-[200px] lg:px-[150px] sm:px-[64x] px-[32px]">
        <InstTwiFb fill="rgba(0, 38, 95, 0.8)" />
        <ArticleContent article={baliEnvironmentalThreats} />
      </section>
      <Footer />
    </>
  );
}

export default Article;