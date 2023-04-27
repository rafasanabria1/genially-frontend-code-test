import React from "react";
import { observer } from "mobx-react";

function Toolbar({store}) {
  return (
    <div className="toolbar">
      <button>Add Box</button>
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
