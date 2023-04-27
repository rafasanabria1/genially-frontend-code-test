import React from "react";
import { observer } from "mobx-react";
import getRandomBox from "../utils/getRandom";

function Toolbar({store}) {

    const handleAddBox = () => {

        const newBox = getRandomBox ();
        store.addBox (newBox)
    }

  return (
    <div className="toolbar">
      <button onClick={handleAddBox}>Add Box</button>
      <button>Remove Box</button>
      <input type="color" />
      <span>
        {
            `${store.selectedBoxes <= 0 ? 'No' : store.selectedBoxes} boxes selected` 
        }
        </span>
    </div>
  );
}

export default observer(Toolbar);
