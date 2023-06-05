import { StaticImageData } from "next/image";

import Manatee from '../../public/images/backgrounds/manatee.png';
import Jellyfish from '../../public/images/backgrounds/jellyfish.png';
import Jungle from '../../public/images/backgrounds/jungle.png';
import TRex from '../../public/images/backgrounds/T-rex.png';

export interface ArticleChunkType {
  type: "title" | "subheading" | "lead" | "paragraph" | "image" | "id",
  content: string,
  src?: StaticImageData,
}

export type ArticleType = {
  id: number,
  chunks: Array<ArticleChunkType>,
}

type AllArticlesType = Array<ArticleType>;

export const articles: AllArticlesType = [
  {
    id: 1,
    chunks: [
      {
        type: "title",
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
    ],
  },
  {
    id: 2,
    chunks: [
      {
        type: "title",
        content: "Water Shortages: Bali's Looming Crisis",
      },
      {
        type: "image",
        content: "Dry Riverbed",
        src: Jellyfish,
      },
      {
        type: "lead",
        content: "Despite being in the tropical zone and receiving heavy annual rainfall, Bali faces a serious water crisis. Overuse of groundwater resources and changing climate patterns have led to a scarcity of clean water on the island.",
      },
      {
        type: "subheading",
        content: "Understanding the Crisis",
      },
      {
        type: "paragraph",
        content: "The exponential growth of tourism and industry in Bali has led to a significant increase in water consumption. Underground water sources are being depleted faster than they can be replenished, leading to a critical shortage. Furthermore, changing rain patterns due to climate change are exacerbating the problem.",
      },
      {
        type: "subheading",
        content: "Implications of the Crisis",
      },
      {
        type: "paragraph",
        content: "Water scarcity affects not only human consumption but also agriculture, which remains a significant part of Bali’s economy. This could lead to food shortages and destabilize the island's economy. Additionally, a lack of clean water can lead to health problems among the population.",
      },
      {
        type: "subheading",
        content: "Solutions to the Crisis",
      },
      {
        type: "paragraph",
        content: "Addressing the water crisis requires a comprehensive strategy, including improved management of water resources, investment in infrastructure, and raising public awareness about water conservation. Several initiatives are already underway to tackle the problem, but greater commitment and action are required from both government and individuals to ensure a sustainable future for Bali.",
      },
    ],
  },
  {
    id: 3,
    chunks: [
      {
        type: "title",
        content: "Bali's Deforestation Dilemma",
      },
      {
        type: "image",
        content: "Cleared Forest",
        src: Jungle,
      },
      {
        type: "lead",
        content: "Bali’s lush rainforests are disappearing at an alarming rate. Deforestation, driven by agricultural expansion, urbanization, and illegal logging, is causing significant damage to the island's biodiversity and contributing to climate change.",
      },
      {
        type: "subheading",
        content: "The Current Situation",
      },
      {
        type: "paragraph",
        content: "As demand for land increases due to Bali's booming tourism industry and population growth, forests are being cleared at an unprecedented pace. This loss of forest cover not only leads to habitat loss for numerous species but also disrupts local climate patterns and leads to soil erosion.",
      },
      {
        type: "subheading",
        content: "Climate Impact",
      },
      {
        type: "paragraph",
        content: "Deforestation significantly contributes to climate change by releasing large amounts of carbon dioxide stored in trees. Furthermore, the loss of forest cover reduces the island’s ability to absorb existing carbon dioxide, exacerbating global warming.",
      },
      {
        type: "subheading",
        content: "Efforts to Mitigate Deforestation",
      },
      {
        type: "paragraph",
        content: "Various initiatives have been launched to halt and reverse deforestation in Bali. These include reforestation projects, stricter regulation and enforcement against illegal logging, and efforts to promote sustainable farming and tourism practices. However, addressing this issue requires a concerted effort from government, communities, and individuals alike.",
      },
    ],
  },
  {
    id: 4,
    chunks: [
      {
        type: "title",
        content: "Rising Sea Levels Threaten Bali's Coastline",
      },
      {
        type: "image",
        content: "Flooding Beach",
        src: TRex,
      },
      {
        type: "lead",
        content: "Global climate change has led to rising sea levels, and Bali is feeling the impact. Increased coastal erosion and frequent flooding pose a significant threat to communities and the tourism industry, which heavily relies on the island's beautiful beaches.",
      },
      {
        type: "subheading",
        content: "Understanding the Threat",
      },
      {
        type: "paragraph",
        content: "As global temperatures rise, polar ice melts and sea levels increase. For Bali, this means more frequent and severe coastal flooding and erosion. Low-lying areas are particularly vulnerable, with some facing the risk of complete submersion in the future.",
      },
      {
        type: "subheading",
        content: "Impact on Communities and Economy",
      },
      {
        type: "paragraph",
        content: "Coastal communities, many of which rely on fishing for their livelihood, are at high risk due to rising sea levels. In addition, flooding and erosion could damage properties and infrastructure, threatening Bali's booming tourism industry.",
      },
      {
        type: "subheading",
        content: "Mitigating the Effects",
      },
      {
        type: "paragraph",
        content: "Efforts to mitigate the effects of rising sea levels include building sea walls, restoring mangrove forests which act as natural barriers, and developing strategies for coastal management. At the same time, reducing global greenhouse gas emissions is crucial to slow the rate of sea level rise.",
      },
    ],
  },
];