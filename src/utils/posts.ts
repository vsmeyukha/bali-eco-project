import Manatee from '../../public/images/backgrounds/manatee.png';
import { PostType } from './types';
import { StaticImageData } from "next/image";

export const posts: Array<PostType> = [
  {
    title: "Dawn in Dunbridge: A Day in the Life of a Quaint Town",
    date: '22.11.1991',
    id: 1,
    text: "As the early morning sun peeked over the hills, the small town of Dunbridge began to stir. The smell of freshly baked bread wafted through the streets, as the bakery got an early start to the day. Children laughed and shouted, racing each other to the schoolyard, while elders looked on with gentle smiles.",
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: "The Swift Tides of Technology: From Luxury to Necessity",
    date: '',
    id: 2,
    text: "In the world of technology, things change rapidly. Just a decade ago, smartphones were considered a luxury. Today, they are a necessity. Constantly evolving tech shapes our lives in myriad ways, from how we communicate to how we work, learn, and entertain ourselves.",
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: "Urban Symphony: The Unending Rhythm of the City",
    date: '',
    id: 3,
    text: "The sound of the city is an orchestration of honking horns, murmuring chatter, and the distant wail of a siren. Skyscrapers stretch towards the sky, reaching for the clouds. Pedestrians, like tiny ants from this height, scurry about, each engrossed in their own world.",
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: "Whispers of the Forest: A Journey into Tranquility",
    date: '',
    id: 4,
    text: "Wandering through the forest, the quiet was almost deafening. The only sounds were the occasional rustling of leaves, a distant bird song, and the whisper of the wind through the trees. It was a world untouched, a tranquil haven away from the bustle of modern life.",
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: 'ololo5',
    date: '',
    id: 5,
    text: 'ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo',
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: 'ololo1',
    date: '22.11.1991',
    id: 1,
    text: 'ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo',
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: 'ololo2',
    date: '',
    id: 2,
    text: 'ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo',
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: 'ololo3',
    date: '',
    id: 3,
    text: 'ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo',
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: 'ololo4',
    date: '',
    id: 4,
    text: 'ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo',
    photo: Manatee,
    photoUrl: Manatee.src,
  },
  {
    title: 'ololo5',
    date: '',
    id: 5,
    text: 'ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo ololoo loloolo loololoolol oololoololo ololoololoo loloololool oloololoolo loololoolol oololoololo ololoololo',
    photo: Manatee,
    photoUrl: Manatee.src,
  },
];

export interface ArticleChunkType {
  type: "heading" | "subheading" | "lead" | "paragraph" | "image",
  content: string,
  src?: StaticImageData,
}

export const baliEnvironmentalThreats: Array<ArticleChunkType> = [
  {
    type: "heading",
    content: "Bali's Battle with Plastic Pollution",
  },
  {
    type: "image",
    content: "Manatee",
    src: Manatee
  },
  {
    type: "lead",
    content: "Bali, often called the Island of the Gods, is known for its picturesque landscapes, rich culture, and warm hospitality. However, this tropical paradise is facing a significant environmental threat - plastic pollution. The island and the surrounding oceans are choking on plastic waste, and urgent action is needed to prevent further damage.",
  },
  {
    type: "subheading",
    content: "The Scale of the Problem",
  },
  {
    type: "paragraph",
    content: "Bali produces around 3,800 tons of waste per day, and a significant portion of it is plastic. Due to inadequate waste management infrastructure and a lack of public awareness, much of this waste ends up in rivers, oceans, and even on the island's pristine beaches. As a result, Bali is experiencing not only aesthetic and ecological issues but also severe economic consequences, as the tourism industry suffers from the pollution.",
  },
  {
    type: "subheading",
    content: "Impact on Marine Life",
  },
  {
    type: "paragraph",
    content: "The plastic pollution problem in Bali is not limited to its shores. The surrounding waters are also heavily affected, putting marine life at risk. Plastic waste in the ocean can entangle or be ingested by marine animals, leading to injury or death. Furthermore, microplastics resulting from the degradation of larger plastic items can enter the food chain, posing threats to both marine and human life.",
  },
  {
    type: "subheading",
    content: "Initiatives to Combat Plastic Pollution",
  },
  {
    type: "paragraph",
    content: "Recognizing the severity of the issue, both the local government and non-profit organizations have taken steps to address plastic pollution in Bali. In 2019, Bali banned single-use plastics, including plastic bags, straws, and Styrofoam. Numerous beach clean-ups and educational campaigns have also been organized to raise awareness about the importance of proper waste disposal and the dangers of plastic pollution.",
  },
  {
    type: "subheading",
    content: "The Role of Individuals",
  },
  {
    type: "paragraph",
    content: "While government initiatives and non-profit efforts are crucial, individual actions also play a significant role in mitigating plastic pollution. Tourists and locals alike can contribute by reducing their consumption of single-use plastics, disposing of waste responsibly, and supporting businesses that prioritize eco-friendly practices.",
  },
  {
    type: "paragraph",
    content: "In conclusion, plastic pollution is a pressing environmental issue in Bali, with severe consequences for the island's ecosystem, marine life, and economy. Concerted efforts from government bodies, non-profit organizations, and individuals are necessary to tackle this challenge and preserve the natural beauty of Bali for future generations.",
  },
];
