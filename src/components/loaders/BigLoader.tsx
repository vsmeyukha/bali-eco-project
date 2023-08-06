import { ReactElement } from "react";
import MediumLoader from "./MediumLoader";

const BigLoader: React.FC = (): ReactElement => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <MediumLoader />
    </div>
  );
};


export default BigLoader;
