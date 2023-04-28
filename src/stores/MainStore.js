import { onSnapshot, types } from "mobx-state-tree";
import BoxModel from "./models/Box";
import getRandomBox from "../utils/getRandom";
import { LOCALSTORAGE_ITEM_NAME } from "../utils/const";
import { UndoManager } from "mst-middlewares"

export const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
    history: types.optional (UndoManager, {})
  })
  .actions(self => {

    const historyManager = self.history
    return {
      addBox(box) {
        self.boxes.push(box);
      },
      removeBox() {
        if (self.boxes.length <= 0) return
        self.boxes.pop ()
      },
      changeColorToSelectedBoxes (color) {
        self.selectedBoxes.map (box => box.setColor (color))
      },
      moveSelectedBoxes (dx, dy) {
        self.selectedBoxes.map (box => box.move (dx, dy))
      }
    };
  })
  .views(self => {
    return {
        get selectedBoxes () {
            return self.boxes.filter (box => box.selected)
        }
    }
  });

  let store = null
  if (localStorage.getItem (LOCALSTORAGE_ITEM_NAME)) {
    const initialState = JSON.parse (localStorage.getItem (LOCALSTORAGE_ITEM_NAME))
    store = MainStore.create (initialState)
  } else {
    store = MainStore.create ()
    const box1 = getRandomBox ();
    store.addBox(box1);
  }

  onSnapshot (store, snapshot => {
    localStorage.setItem (LOCALSTORAGE_ITEM_NAME, JSON.stringify (snapshot))
  })

export default store;
