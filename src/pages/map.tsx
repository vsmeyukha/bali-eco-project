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
      <Footer />
    </section>
  )
}

export default LoggedInMain;