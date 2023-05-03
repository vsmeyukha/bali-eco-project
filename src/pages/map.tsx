import { ReactElement } from "react";
import Header from "@/components/Header";
import PublishPhoto from "@/components/MainPageLoggedIn/PublishPhoto";
import MapComponent from "@/components/MainPageLoggedIn/map/GoogleMaps";
import ClimateAndEduContainer from "@/components/MainPageLoggedIn/ClimateAndEduContainer";
import ClimateChange from "@/components/MainPageLoggedIn/ClimateChange";
import Education from "@/components/MainPageLoggedIn/Education";
import AboutUs from "@/components/MainPageLoggedIn/AboutUs";
import Tips from "@/components/MainPageLoggedIn/Tips";
import Volunteers from "@/components/MainPageLoggedIn/Volunteers";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import PostOnMap from "@/components/MainPageLoggedIn/map/postOnMap/PostOnMap";

const LoggedInMain: React.FC = (): ReactElement => {
  return (
    <section className="min-w-screen">
      <Header />
      <PublishPhoto />
      <MapComponent />
      <ClimateAndEduContainer>
        <ClimateChange />
        <Education />
      </ClimateAndEduContainer>
      <AboutUs />
      <Tips />
      <Volunteers />
      <Footer />
      <Popup />
    </section>
  )
}

export default LoggedInMain;