import { ReactElement, ReactNode, useState } from "react";
import { posts } from "@/utils/posts";
import { getRandom } from "@/utils/utils";
import { ecoTips } from '../utils/shortAdvices';

const TipsButton: React.FC = (): ReactElement => {
  const [random, setRandom] = useState<number | null>(null);

  const handleRandom = (): void => {
    setRandom(getRandom(50));
  }

  return (
    <>    
      <button
        className="
        bg-white
        text-[#4CAF50]
        text-[20px]
        leading-[26px]
        font-montserrat-black
        rounded-full
        h-[200px]
        w-[200px]
        flex
        flex-col
        justify-center
        items-center
        hover:transform
        hover:scale-110
        duration-300"
        type="button"
        onClick={() => handleRandom()}
      >
        <p className="text-[20px] leading-[26px] font-montserrat-black max-w-[110px]">Получить совет</p>
      </button>
      {random !== null ?
        <div className="max-w-[700px] bg-[#2196F3] rounded-[24px] mt-[74px]">
          <h1
            className="
              pr-[24px]
              pl-[24px]
              my-[24px]
              font-montserrat
              text-[32px]
              leading-[40px]
              text-center
              text-white w-full"
          >{random !== null && ecoTips[random]}</h1>
        </div>
        :
        <div className="min-w-[676px] min-h-[198px] bg-[#2196F3] rounded-[10px] mt-[74px] flex justify-center items-center">
          <h1
            className="
              pr-[24px]
              pl-[24px]
              my-[24px]
              font-montserrat
              text-[20px]
              leading-[24px]
              text-center
              text-white w-full"
          >Здесь будет ответ ChatGPT</h1>
        </div>
      }
    </>
  )
}

export default TipsButton;