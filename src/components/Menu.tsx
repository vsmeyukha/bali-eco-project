import { ReactElement } from "react";
import Link from "next/link";
import { NavLink } from "@/utils/types";
import { navListRu } from "@/utils/consts";

export default function Menu(): ReactElement {
  return (
    <nav className="flex mr-[74px] font-montserrat font-medium">
      <ul className="flex flex-row items-center">
        {navListRu.map((paragraph: NavLink) => (
          <li
            key={paragraph.id}
            className="
            not-first
            ml-[24px]
            text-[20px]
            leading-[24px]
            hover:underline
            transition-all
            duration-300
            ease-in-out"
          >
            <Link href={paragraph.link}> { paragraph.title } </Link>
          </li>))}
      </ul>
  </nav>
  )
}