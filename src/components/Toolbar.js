import React from "react";
import { observer } from "mobx-react";
import getRandomBox from "../utils/getRandom";

function Toolbar({store}) {

    const handleAddBox = () => {
        const newBox = getRandomBox ();
        store.addBox (newBox)
    }

    const handleChangeColor = (e) => {
        store.changeColorToSelectedBoxes (e.target.value)
    }
    
    const handleRemoveBox = () => {
        store.removeBox ()
    }

    const handleUndo = () => {
        if (! store.history.canUndo) return
        store.history.undo ()
    }

    const handleRedo = () => {
        if (! store.history.canRedo) return
        store.history.redo ()
    }

  return (
    <div className="toolbar">
      <button onClick={handleAddBox}>Add Box</button>
      <button onClick={handleRemoveBox} disabled={store.boxes.length <= 0}>Remove Box</button>
      <input type="color" onChange={handleChangeColor}/>
      <span>
        {
            `${store.selectedBoxes.length <= 0 ? 'No' : store.selectedBoxes.length} boxes selected` 
        }
        </span>
        <button onClick={handleUndo} disabled={!store.history.canUndo}>Undo</button>
        <button onClick={handleRedo} disabled={!store.history.canRedo}>Redo</button>
    </div>
  );
}

export default observer(Toolbar);
