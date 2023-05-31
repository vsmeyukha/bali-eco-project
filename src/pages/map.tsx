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
import AddPostPopup from "@/components/MainPageLoggedIn/addPostPopup";

import { usePopper } from "react-popper";

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

  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState<boolean>(false);

  const handleAddPostPopupOpen = (): void => {
    setIsAddPostPopupOpen(true);
  }

  const handleAddPostPopupClose = (): void => {
    setIsAddPostPopupOpen(false);
  }

  const viewportWidth = useViewportWidth();

  return (
    <section className="w-full relative" onClick={handlePopupClose}>
      <Header />
      <PublishPhoto openPopup={handleAddPostPopupOpen} />
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
      <AddPostPopup open={isAddPostPopupOpen} onClose={handleAddPostPopupClose} />
      <div className="w-full h-[500px] bg-gray-500 flex flex-col justify-center items-center">
        <div className="bg-red-500 w-[300px] h-[300px] mx-auto flex flex-col items-center hover:translate-x-full">
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default LoggedInMain;