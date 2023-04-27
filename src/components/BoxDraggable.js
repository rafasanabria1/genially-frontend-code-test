import React from "react";
import { observer } from "mobx-react";

function BoxDraggable(props) {
    
  return (
    <div
      id={props.id}
      className="box"
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`,
        border: props.box.selected ? 'solid 1px black' : 'none',
        fontWeight: props.box.selected ? 'bold' : 'inherit'
      }}
      onClick={props.box.toggleSelected}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
