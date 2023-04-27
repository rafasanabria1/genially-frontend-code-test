import { types } from "mobx-state-tree";
import { SIZES } from "../../utils/const";

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: SIZES.BOX.WIDTH,
    height: SIZES.BOX.HEIGHT,
    color: "#FFF000",
    left: 0,
    top: 0,
    selected: false
  })
  .views(self => ({}))
  .actions(self => ({
    toggleSelected () {
        self.selected = !self.selected
    },
    changeColor (color) {
        if (! color.match (/^#[0-9A-F]{6}$/i)) return;
        self.color = color
    }
  }));

export default BoxModel;
