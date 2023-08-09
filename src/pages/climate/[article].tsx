import { useEffect } from 'react';

import type {
  GetStaticProps,
  GetStaticPaths,
} from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


import { ArticleType } from '@/data/climate-articles';

import Header from "@/components/Header";
import InstTwiFb from "@/components/InstTwiFb";
import ArticleContent from "@/components/ArticleContent";
import Footer from "@/components/Footer/Footer";

import { articles } from "@/data/climate-articles";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map(article => (
    {
      params: {article: article.id.toString()}
    }
  ));

  return {paths, fallback: false};
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params || typeof params.article !== 'string') {
    return {
      notFound: true,
    }
  }

  const article = articles.find(article => article.id.toString() === params.article);

  const typedLocale = locale as string;
  
  return {
    props: {
      article,
      ...(await serverSideTranslations(
        typedLocale,
        [
          'headerMenu',
          'footer',
          'quickToolsPopup',
        ],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

const Article = ({ article }: { article: ArticleType }) => {
  const { i18n } = useTranslation();

    // ? устанавливаем для страницы ранее выбранный пользователем язык, если он сохранен в localStorage
    useEffect(() => { 
      const defaultLang = localStorage.getItem('language');
      if (defaultLang) {
        i18n.changeLanguage(defaultLang);
      }
    }, [i18n]);
  
  return (
    <>
      <Header />
      <section className="bg-[#F5F5F5] w-full py-[60px] 1440px:px-[252px] xl:px-[200px] lg:px-[150px] sm:px-[64x] px-[32px]">
        <InstTwiFb fill="rgba(0, 38, 95, 0.8)" />
        <ArticleContent article={article.chunks} />
      </section>
      <Footer />
    </>
  );
}

export default Article;