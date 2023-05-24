import { ReactElement, useState } from "react";
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
        <div
          className="
          max-w-[700px]
          lg:max-h-[168px]
          bg-[#2196F3]
          rounded-[24px]
          lg:mt-[74px]
          md:mt-[50px]
          sm:mt-[40px]
          mt-[30px]
          lg:overflow-auto"
        >
          <h2
            className="
              px-[24px]
              my-[24px]
              font-montserrat
              text-[32px]
              leading-[40px]
              text-center
              text-white 
              w-full"
          >{random !== null && ecoTips[random]}</h2>
        </div>
        :
        <div
          className="
          xl:min-w-[676px]
          xl:min-h-[198px]
          bg-[#2196F3]
          rounded-[10px]
          lg:mt-[74px]
          md:mt-[50px]
          sm:mt-[40px]
          mt-[30px]
          flex
          justify-center
          items-center"
        >
          <h2
            className="
              pr-[24px]
              pl-[24px]
              my-[24px]
              font-montserrat
              text-[20px]
              leading-[24px]
              text-center
              text-white 
              w-full"
          >Здесь будет ответ ChatGPT</h2>
        </div>
      }
    </>
  )
}

export default TipsButton;