import nike from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/nike.png"
import free from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/free.png"
import GTA_1 from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/GTA-Characters-PNG-Pic.png"
import Apex_1 from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Apex-Legends-Download-PNG-Image.png"
import love1 from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/love/Water-Fire-Heart-Transparent-PNG.png"
import sport_1 from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/sport/Footballer-PNG-Picture.png"
import dmc1 from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/game/Devil-May-Cry-PNG-Free-Download.png"
import kerm from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/kids/3D-PNG-Photos.png"
import minion from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/kids/Kevin-Minion-PNG-Clipart.png"
import mario from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/kids/Mario-PNG-Free-Download.png"
import water from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/fantacy/3D-PNG-File.png"
import dancing_girl from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/fantacy/Dance-Girl-PNG-Free-Download.png"
import halloween from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/fantacy/Halloween-Tree-PNG-File.png"
import insect from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/fantacy/Fly-PNG-Pic.png"
import naruto_ashura from "/home/mohamad/Desktop/myprojects/front_end/vidly/src/assets/Designs/anime/Naruto-Ashura-PNG-Picture.png"

const Designs = [
  {
    id: 1,
    design_append_category: {
      id: 1,
      type_name: "sport",
    },
    name: "nike",
    image: nike,
    // image: "../../assets/free.png",
  },
  {
    id: 2,
    design_append_category: {
      id: 1,
      type_name: "sport",
    },
    name: "free",
    image: free,
  },
  {
    id: 3,
    design_append_category: {
      id: 8,
      type_name: "game",
    },
    name: "GTA_1",
    image: GTA_1,
  },
  {
    id: 4,
    design_append_category: {
      id: 8,
      type_name: "game",
    },
    name: "Apex_1",
    image: Apex_1,
  },
  {
    id: 5,
    design_append_category: {
      id: 6,
      type_name: "love",
    },
    name: "love1",
    image: love1,
  },
  {
    id: 6,
    design_append_category: {
      id: 1,
      type_name: "sport",
    },
    name: "sport_1",
    image: sport_1,
  },
  {
    id: 7,
    design_append_category: {
      id: 8,
      type_name: "game",
    },
    name: "dmc1",
    image: dmc1,
  },
  {
    id: 13,
    design_append_category: {
      id: 7,
      type_name: "kids",
    },
    name: "kerm",
    image: kerm,
  },
  {
    id: 14,
    design_append_category: {
      id: 7,
      type_name: "kids",
    },
    name: "menion",
    image: minion,
  },
  {
    id: 15,
    design_append_category: {
      id: 7,
      type_name: "kids",
    },
    name: "mario",
    image: mario,
  },
  {
    id: 16,
    design_append_category: {
      id: 4,
      type_name: "fantasy",
    },
    name: "water",
    image: water,
  },
  {
    id: 17,
    design_append_category: {
      id: 4,
      type_name: "fantasy",
    },
    name: "dancing_girl",
    image: dancing_girl,
  },
  {
    id: 18,
    design_append_category: {
      id: 4,
      type_name: "fantasy",
    },
    name: "halloween",
    image: halloween,
  },
  {
    id: 19,
    design_append_category: {
      id: 4,
      type_name: "fantasy",
    },
    name: "insect",
    image: insect,
  },
  {
    id: 20,
    design_append_category: {
      id: 9,
      type_name: "anime",
    },
    name: "naruto_ashura",
    image: naruto_ashura,
  },
]

export function getDesign(id) {
  return Designs.find((d) => d.id === id)
}

export default Designs
