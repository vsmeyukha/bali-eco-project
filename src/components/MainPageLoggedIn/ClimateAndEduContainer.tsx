import { ReactElement, ReactNode } from "react";

const ClimateAndEduContainer: React.FC<{children: ReactNode}> = ({children}): ReactElement => {
  return (
    <div className="bg-[#F5F5F5] w-full pt-[120px] pb-[90px] 1440px:px-[152px] xl:px-[100px] lg:px-[50px] sm:px-[32px] px-[16px]">
      {children}
    </div>
  )
}

export default ClimateAndEduContainer;