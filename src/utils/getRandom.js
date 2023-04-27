import BoxModel from "../stores/models/Box";
import uuid from "uuid/v4";
import { SIZES } from "./const";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const getRandomNumber = (min, max) => {

    return Math.floor(Math.random() * (max - min) ) + min;
}

const getRandomBox = () => {

    return BoxModel.create({
        id: uuid(),
        color: getRandomColor(),
        left: getRandomNumber (0, SIZES.CANVA.WIDTH - SIZES.BOX.WIDTH),
        top: getRandomNumber (0, SIZES.CANVA.HEIGHT - SIZES.BOX.HEIGHT)
      });
}

export default getRandomBox;
