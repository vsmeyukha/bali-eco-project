import { ReactElement, useState, useRef } from "react";
import Header from "@/components/Header";
import PublishPhoto from "@/components/MainPageLoggedIn/PublishPhoto";
import MapComponent from "@/components/MainPageLoggedIn/map/GoogleMaps";
import ClimateAndEduContainer from "@/components/MainPageLoggedIn/ClimateAndEduContainer";
import ClimateChange from "@/components/MainPageLoggedIn/ClimateChange";
import Education from "@/components/MainPageLoggedIn/Education";
import AboutUs from "@/components/MainPageLoggedIn/AboutUs";
import Tips from "@/components/MainPageLoggedIn/Tips";
import Volunteers from "@/components/MainPageLoggedIn/Volunteers";
import Footer from "@/components/Footer/Footer";
import Popup from "@/components/Popup";
import BigPostOnMap from "@/components/MainPageLoggedIn/map/postOnMap/BigPostOnMap";
import useViewportWidth from "@/hooks/calculateWidth";
import PublishPhotoButton from "@/components/MainPageLoggedIn/PublishPhotoButton";

const LoggedInMain: React.FC = (): ReactElement => {
  const [isBigPopupOpen, setIsBigPopupOpen] = useState<boolean>(false);

  const handleBigPopupOpen = (): void => {
    setIsBigPopupOpen(true);
  }

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopupClose = (e: React.MouseEvent): void => {
    if (isBigPopupOpen === true && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setIsBigPopupOpen(false);
    }
  }

  const viewportWidth = useViewportWidth();

  return (
    <section className="w-full relative" onClick={handlePopupClose}>
      <Header />
      <PublishPhoto />
      <MapComponent handleBigPopupOpen={handleBigPopupOpen} />
      {
        viewportWidth < 1024
        &&
        <PublishPhotoButton />
      }
      <ClimateAndEduContainer>
        <ClimateChange />
        <Education />
      </ClimateAndEduContainer>
      <AboutUs />
      <Tips />
      <Volunteers />
      <BigPostOnMap ref={popupRef} isBigPopupOpen={isBigPopupOpen} />
      {/* <div className="overflow-x-auto space-x-[10px] flex flex-row whitespace-nowrap">
          <div className="flex-shrink-0 bg-red-500 w-1/2 h-[100px]"></div>
          <div className="flex-shrink-0 bg-red-500 w-1/2 h-[100px]"></div>
          <div className="flex-shrink-0 bg-red-500 w-1/2 h-[100px]"></div>
          <div className="flex-shrink-0 bg-red-500 w-1/2 h-[100px]"></div>
          <div className="flex-shrink-0 bg-red-500 w-1/2 h-[100px]"></div>
        </div>
      <div className="flex overflow-x-auto whitespace-nowrap">
        <div className="flex-shrink-0 w-[200px] h-[200px] bg-red-500 m-2"></div>
        <div className="flex-shrink-0 w-[200px] h-[200px] bg-blue-500 m-2"></div>
        <div className="flex-shrink-0 w-[200px] h-[200px] bg-green-500 m-2"></div>
        <div className="flex-shrink-0 w-[200px] h-[200px] bg-yellow-500 m-2"></div>
      </div> */}

      <Footer />
      {/* <Popup /> */}
    </section>
  )
}

export default LoggedInMain;