import React from "react";

import { observer } from "mobx-react";
import Box from "../components/Box";
import { SIZES } from "../utils/const";

function Canvas({ store }) {
  return (
    <div className="canva" style={{width: SIZES.CANVA.WIDTH, height: SIZES.CANVA.HEIGHT}}>
      {store.boxes.map((box, index) => (
        <Box
          id={box.id}
          key={index}
          color={box.color}
          left={box.left}
          top={box.top}
          width={box.width}
          height={box.height}
          box={box}
          moveSelectedBoxes={store.moveSelectedBoxes}
          history={store.history}
        />
      ))}
    </div>
  );
}

export default observer(Canvas);
