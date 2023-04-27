import React from "react";
import { observer } from "mobx-react";
import getRandomBox from "../utils/getRandom";
import { historyManager } from "../stores/MainStore";

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
        if (! historyManager.canUndo) return
        historyManager.undo ()
    }

    const handleRedo = () => {
        if (! historyManager.canRedo) return
        historyManager.redo ()
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
        <button onClick={handleUndo} disabled={!historyManager.canUndo}>Undo</button>
        <button onClick={handleRedo} disabled={!historyManager.canRedo}>Redo</button>
    </div>
  );
}

export default observer(Toolbar);
