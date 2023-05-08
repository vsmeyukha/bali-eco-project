import { StaticImageData } from "next/image";

import { NavLink, CredType, QuickToolsMenuType, ToggleArticlesAndTipsType, RegSignInPopup, SmallPostOnMapInfo } from "./types";
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

const navListRu: NavLink[] = [
  {
    title: 'Карта',
    link: '/map',
    id: getRandom(1000),
  },
  {
    title: 'Образовательный контент',
    link: '/resources',
    id: getRandom(1000),
  },
  {
    title: 'Эко-волонтерские организации',
    link: '/organizations',
    id: getRandom(1000),
  },
  {
    title: 'О нас',
    link: '/aboutUs',
    id: getRandom(1000),
  },
];

const navListEng: NavLink[] = [
  {
    title: 'Ocean pollution',
    link: '/pollution',
    id: getRandom(1000),
  },
  {
    title: 'Climate change',
    link: '/climateChange',
    id: getRandom(1000),
  },
  {
    title: 'Solution',
    link: '/solution',
    id: getRandom(1000),
  },
  {
    title: 'News',
    link: '/news',
    id: getRandom(1000),
  },
  {
    title: 'Resources',
    link: '/resources',
    id: getRandom(1000),
  },
  {
    title: 'About us',
    link: '/aboutUs',
    id: getRandom(1000),
  }
];

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
    text: 'Настройки',
    href: '/profile',
  },
  {
    id: 2,
    icon: Clock,
    text: 'История',
    href: '/',
  },
  {
    id: 3,
    icon: Globe,
    text: 'Язык',
    href: '/',
  },
  {
    id: 4,
    icon: Laptop,
    text: 'Темная тема',
    href: '/',
  },
  {
    id: 5,
    icon: Exit,
    text: 'Выход',
    href: '/',
  },
];

const smallPostOnMapInfo: Array<SmallPostOnMapInfo> = [
  {
    id: 1,
    icon: GeoTag,
    text: `Деревня Чангу, Северная Кута`,
  },
  {
    id: 2,
    icon: Quotation,
    text: 'Крутая терраса',
  },
  {
    id: 3,
    icon: Dialog,
    text: 'Комментарии (2)',
  },
  {
    id: 4,
    icon: Dirt,
    text: 'Отметки "Грязно" (1)',
  }
]

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

export {
  navListRu,
  navListEng,
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
  smallPostOnMapInfo,
};