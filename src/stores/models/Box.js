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
    setColor (color) {
        if (! color.match (/^#[0-9A-F]{6}$/i)) return;
        self.color = color
    },
    setSelected (selected) {
        self.selected = selected
    },
    move (dx, dy) {
        const newLeft = Math.min (self.left + dx, (SIZES.CANVA.WIDTH - SIZES.BOX.WIDTH))
        const newTop = Math.min (self.top + dy, (SIZES.CANVA.HEIGHT - SIZES.BOX.HEIGHT))

        self.left = Math.max (0, newLeft)
        self.top = Math.max (0, newTop)
    }

  }));

export default BoxModel;
