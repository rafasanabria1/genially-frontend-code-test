import BoxModel from "../stores/models/Box";
import uuid from "uuid/v4";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomBox = () => {

    return BoxModel.create({
        id: uuid(),
        color: getRandomColor(),
        left: 0,
        top: 0
      });
}

export default getRandomBox;
