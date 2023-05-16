import { ReactElement } from "react";
import useViewportWidth from "@/hooks/calculateWidth";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export default function Footer(): ReactElement {
  const viewportWidth = useViewportWidth();

  return (
    <footer className="
    bg-[#00265F]
    md:px-[65px]
    px-[32px]
    text-white 
    font-montserrat
    flex
    flex-col
    justify-end
    min-w-full
    ">
      {viewportWidth >= 1024
        ?
        <FooterDesktop />
        :
        <FooterMobile />
      }
    </footer>
  );
}