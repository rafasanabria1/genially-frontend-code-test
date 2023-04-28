import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import interact from "interactjs";

function BoxDraggable(props) {
    
    const boxRef = useRef(null)
    
    useEffect (() => {
        interact (boxRef.current).draggable ({
            listeners: {
                start () {
                    props.history.startGroup(() => {})
                },
                end () {
                    props.history.stopGroup(() => {})
                },
                move (event) {
                    props.box.setSelected (true)
                    props.moveSelectedBoxes (event.dx, event.dy)
                },
              }
        }).on ('tap', props.box.toggleSelected)
    }, [props])

  return (
    <div
      id={props.id}
      className="box"
      style={{
        backgroundColor: props.color,
        width: `${props.width}px`,
        height: `${props.height}px`,
        transform: `translate(${props.left}px, ${props.top}px)`,
        border: props.box.selected ? 'solid 2px black' : 'none',
        fontWeight: props.box.selected ? 'bold' : 'inherit'
      }}
      ref={boxRef}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
