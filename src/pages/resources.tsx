import { ReactElement } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import Popup from "@/components/informationPopups/InformationPopup";
import { Tab } from '@headlessui/react';
import { toggleArticlesAndTips } from "@/utils/consts";
import { posts } from "@/utils/posts";
import Post from "@/components/Post";
import { getRandom } from "@/utils/utils";
import TipsButton from "@/components/TipsButton";

const Resources: React.FC = (): ReactElement => {
  const tabClassesSelected = 'min-w-[150px] rounded-lg py-2.5 text-sm font-medium font-montserrat leading-5 text-[#4CAF50] ring-white ring-opacity-60 ring-offset-2 ring-offset-[#4CAF50] focus:outline-none focus:ring-2 bg-white shadow';

  const tabClassesNotSelected = 'min-w-[150px] rounded-lg py-2.5 text-sm font-medium font-montserrat leading-5 text-[#4CAF50] ring-white ring-opacity-60 ring-offset-2 ring-offset-[#4CAF50] focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white';
  
  return (
    <>
      <Header />
      <section className="bg-[#4CAF50] min-h-screen flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center px-2 py-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex max-w-md space-x-1 rounded-xl bg-blue-900/20 p-1">
              {toggleArticlesAndTips.ru.map((item, index) => {
                return (
                  <Tab
                    key={index}
                    className={
                      ({ selected }) => selected ? tabClassesSelected : tabClassesNotSelected
                    }
                  >{item}</Tab>
                )
              })}
            </Tab.List>
            <Tab.Panels className="flex flex-col items-center mt-[36px]">
              <Tab.Panel className='rounded-xl bg-white p-3 grid grid-cols-3 gap-[12px] w-auto mx-auto' >
                {posts.map(post => {
                  return (
                    <Post key={getRandom(1000)} title={post.title} text={post.text} date={post.date} photo={post.photo} id={post.id} />
                  )
                })}
              </Tab.Panel>
              <Tab.Panel className="flex flex-col items-center">
                <TipsButton />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      <Footer />      
      </section>
    </>
  )
}

export default Resources;