import { StaticImageData } from "next/image";
import { z } from 'zod';

import {
  NavLink,
  NavLinkForBurger,
  CredType,
  QuickToolsMenuType,
  ToggleArticlesAndTipsType,
  RegSignInPopup
} from "./types";

import { getRandom } from "./utils";

import Tool from '../../public/images/svgs/icons/tool.svg';
import Clock from '../../public/images/svgs/icons/clock.svg';
import Globe from '../../public/images/svgs/icons/globe.svg';
import Laptop from '../../public/images/svgs/icons/laptop.svg';
import Exit from '../../public/images/svgs/icons/exit.svg';

import GeoTag from '../../public/images/svgs/icons/geotag.svg';
import Quotation from '../../public/images/svgs/icons/quotation.svg';
import Dialog from '../../public/images/svgs/icons/dialog.svg';
import Dirt from '../../public/images/svgs/icons/dirt.svg';

import BaliEcoStay from '../../public/images/volunteers/baliEcoStay.png';
import Biorock from '../../public/images/volunteers/biorock.png';
import Coral from '../../public/images/volunteers/coral.png';
import Fish from '../../public/images/volunteers/fish.png';
import Lini from '../../public/images/volunteers/lini.png';
import Turtle from '../../public/images/volunteers/turtle.png';

import mapIcon from '../../public/images/svgs/icons/mapIcon.svg';
import factsIcon from '../../public/images/svgs/icons/factsIcon.svg';
import volunteersIcon from '../../public/images/svgs/icons/volunteersIcon.svg';
import aboutUsIcon from '../../public/images/svgs/icons/aboutUsIcon.svg';

import { RegTranslationKeys, SignInTranslationKeys } from "@/helpers/handleSubmit";

const navListRu: NavLink[] = [
  {
    titleKey: 'map',
    link: '/map',
    id: 1,
  },
  {
    titleKey: 'facts',
    link: '/resources',
    id: 2,
  },
  {
    titleKey: 'volunteers',
    link: '/organizations',
    id: 3,
  },
  {
    titleKey: 'aboutUs',
    link: '/aboutUs',
    id: 4,
  },
];

const navListForBurgerRu: NavLinkForBurger[] = [
  {
    titleKey: 'map',
    link: '/map',
    icon: mapIcon,
    id: getRandom(1000),
  },
  {
    titleKey: 'facts',
    link: '/resources',
    icon: factsIcon,
    id: getRandom(1000),
  },
  {
    titleKey: 'volunteers',
    link: '/organizations',
    icon: volunteersIcon,
    id: getRandom(1000),
  },
  {
    titleKey: 'aboutUs',
    link: '/aboutUs',
    icon: aboutUsIcon,
    id: getRandom(1000),
  },
];

const aboutUsContents = [
  {
    aboutUsTitle: 'aboutUsTitle1',
    aboutUsDesc: 'aboutUsDesc1'
  },
  {
    aboutUsTitle: 'aboutUsTitle2',
    aboutUsDesc: 'aboutUsDesc2'
  },
  {
    aboutUsTitle: 'aboutUsTitle3',
    aboutUsDesc: 'aboutUsDesc3'
  },
  {
    aboutUsTitle: 'aboutUsTitle4',
    aboutUsDesc: 'aboutUsDesc4'
  },
]

const credits: CredType = {
  'ru': {
    'Разработка': ' Виктор Смеюха',
    'Дизайн': 'Наталия Деева',
    'copy': '2023',
  },
  'en': {
    'Development': 'Victor Smeyukha',
    'Design': 'Nataly Deeva',
    'copy': '2023',
  }
}

const participateButton = {
  'en': 'Donate',
  'ru': 'Помочь'
}

const register = {
  'en': 'Sign up',
  'ru': 'Зарегистрироваться',
}

const logIn = {
  en: 'Sign in',
  'ru': 'Войти',
}

const projectName = 'BaliGreenMap';

const projectNameHeader: string = 'BALI GREEN MAP';

const projectDescription: string = 'Откройте для себя "зеленую сторону" Бали: Общайтесь, сотрудничайте и вносите свой вклад в создание более чистого и зеленого Бали.';

const projectDescriptionContinue: string = 'Наше приложение дает возможность жителям, туристам и организациям объединить усилия для решения уникальных экологических проблем Бали. Благодаря удобной платформе, которая сочетает в себе отчеты о загрязнении в режиме реального времени, мероприятия по очистке с геометками и поддерживающее сообщество, мы революционизируем способ, которым люди предпринимают действия по защите и восстановлению природной красоты острова.';

const projectDescriptionEnd: string = 'В отличие от других экологических приложений, наша платформа специально адаптирована для решения уникальных экологических проблем';

const toggleArticlesAndTips: ToggleArticlesAndTipsType = {
  en: ['Articles', 'Tips'],
  ru: [  'Статьи', 'Советы'],
}

const quickToolsMenu: Array<QuickToolsMenuType> = [
  {
    id: 1,
    icon: Tool,
    titleKey: 'settings',
    href: '/profile',
  },
  // {
  //   id: 2,
  //   icon: Clock,
  //   titleKey: 'history',
  //   href: '/',
  // },
  {
    id: 3,
    icon: Globe,
    titleKey: 'language',
    href: '/',
  },
  {
    id: 4,
    icon: Laptop,
    titleKey: 'darkTheme',
    href: '/',
  },
  {
    id: 5,
    icon: Exit,
    titleKey: 'signOut',
    href: '/',
  },
];

const volunteersImages: Array<StaticImageData> = [Lini, Turtle, BaliEcoStay, Biorock, Fish, Coral];

const regPopup: RegSignInPopup = {
  title: 'Регистрация',
  buttonText: 'Зарегистрироваться',
  appleText: 'Зарегистрироваться с Apple',
  googleText: 'Зарегистрироваться с Google',
  areYouRegistered: 'Уже зарегистрированы?',
  signIn: 'Войти',
}

const signInPopup: RegSignInPopup = {
  title: 'Вход',
  buttonText: 'Войти',
  appleText: 'Войти с Apple',
  googleText: 'Войти с Google',
  areYouRegistered: 'Еще не зарегистрированы?',
  signIn: 'Зарегистрироваться',
}

// ? коды ошибок аутентификации
const firebaseErrorCodes = z.enum([
  "auth/user-not-found",
  "auth/wrong-password",
  "auth/invalid-email",
  "auth/user-disabled",
  "auth/too-many-requests",
  "auth/email-already-in-use",
  "auth/operation-not-allowed",
  "auth/network-request-failed",
  "auth/popup-closed-by-user",
  ""
]);

// ? типизируем ошибку firebase, это enum нескольких отдаваемых файрбейсом ошибок
export type firebaseErrorCode = z.infer<typeof firebaseErrorCodes>;

// ? типизация мапинга ошибок - она частично включает в себя записи из firebaseErrorCodes, а также стринги или null
type ErrorMessageMapping = Partial<Record<firebaseErrorCode, string | null>>;

// ? мапим ошибки и наименования текстов в локалях
const errorMessages: ErrorMessageMapping = {
  "auth/user-not-found": "authErrors:userNotFound",
  "auth/wrong-password": "authErrors:wrongPassword",
  "auth/invalid-email": "authErrors:invalidEmail",
  "auth/email-already-in-use": "authErrors:emailAlreadyInUse",
  "auth/network-request-failed": "authErrors:networkRequestFailed",
  "": null,
}

const RegTranslationKeys: RegTranslationKeys = {
  inProcess: 'registrationInProcess',
  success: 'registrationSuccessful',
  inProcessFallback: 'Registration...',
  successFallback: 'Success!',
  default: 'Register',
  defaultFallback: 'Register'
}

const SignInTranslationKeys: SignInTranslationKeys = {
  inProcess: 'signInInProcess',
  success: 'signInSuccessful',
  inProcessFallback: 'Signing in...',
  successFallback: 'Success!',
  default: 'SignIn',
  defaultFallback: 'Sign In'
};

export {
  navListRu,
  navListForBurgerRu,
  credits,
  participateButton,
  register,
  projectName,
  projectDescription,
  projectDescriptionContinue,
  projectNameHeader,
  logIn,
  toggleArticlesAndTips,
  projectDescriptionEnd,
  quickToolsMenu,
  volunteersImages,
  regPopup,
  signInPopup,
  aboutUsContents,
  firebaseErrorCodes,
  errorMessages,
  RegTranslationKeys,
  SignInTranslationKeys
};