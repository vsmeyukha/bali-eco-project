import { ReactElement } from "react";

const BigLoader: React.FC = (): ReactElement => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div
        className="
          h-[100px]
          w-[100px]
          mr-[12px]
          animate-spin 
          rounded-full 
          border-4
          border-solid
          border-[#2196F3]
          border-r-transparent
          align-[-0.125em]
          motion-reduce:animate-[spin_2.5s_linear_infinite]"
        >
      </div>
    </div>
  );
};


export default BigLoader;
