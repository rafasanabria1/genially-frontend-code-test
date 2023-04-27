import { types } from "mobx-state-tree";
import BoxModel from "./models/Box";
import getRandomBox from "../utils/getRandom";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel)
  })
  .actions(self => {
    return {
      addBox(box) {
        self.boxes.push(box);
      },
      removeBox() {
        if (self.boxes.length <= 0) return
        self.boxes.pop ()
      }
    };
  })
  .views(self => {
    return {
        get selectedBoxes () {
            return self.boxes.filter (box => box.selected).length
        }
    }
  });

const store = MainStore.create();

const box1 = getRandomBox ();

store.addBox(box1);

export default store;
