import { StaticImageData } from 'next/image';
import { ReactElement, ReactNode } from 'react';

export interface NavLink {
  title: string,
  link: string,
  id: number,
}

export interface NavLinkForBurger extends NavLink {
  icon: React.FC<React.SVGProps<SVGSVGElement>>,
}

export interface CredType {
  'ru': {
    'Разработка': string,
    'Дизайн': string,
    'copy': string,
  },
  'en': {
    'Development': string,
    'Design': string,
    'copy': string,
  }
}

export interface PostType {
  title: string,
  date: string,
  id: number,
  text: string,
  photo: StaticImageData,
  photoUrl?: string,
}

export interface QuickToolsMenuType {
  id?: number,
  icon:  React.FC<React.SVGProps<SVGSVGElement>>,
  text: string,
  href: string,
  children?: ReactNode,
  isDiv?: boolean,
}

export interface SmallPostOnMapInfo {
  id: number,
  icon: React.FC<React.SVGProps<SVGSVGElement>>,
  text: string,
}

export interface ToggleArticlesAndTipsType {
  en: Array<string>,
  ru: Array<string>,
}

export interface RegSignInPopup {
  title: string,
  buttonText: string,
  appleText: string,
  googleText: string,
  areYouRegistered: string,
  signIn: string,
}

export interface switchContent {
  code: string,
  label: string,
}