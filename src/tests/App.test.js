import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import getRandomBox from "../utils/getRandom";
import { MainStore } from "../stores/MainStore"

test("Renders correctly the app", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test ('Toggle selected in box', () => {
    const box = getRandomBox ();
    const previousSelected = box.selected;
    box.toggleSelected ()
    expect (box.selected).toBe (! previousSelected)
    box.toggleSelected ()
    expect (box.selected).toBe (previousSelected)
})

test ('Show num of selected boxes', () => {
    
    const box1 = getRandomBox ()
    const box2 = getRandomBox ()
    const box3 = getRandomBox ()

    const store = MainStore.create ()
    store.addBox (box1)
    store.addBox (box2)
    store.addBox (box3)

    store.boxes[0].toggleSelected ();
    expect (store.selectedBoxes.length).toBe (1)

    store.boxes[1].setSelected (true);
    expect (store.selectedBoxes.length).toBe (2)

    store.boxes.map (box => box.setSelected (false))
    expect (store.selectedBoxes.length).toBe (0)
})
/*
test ('Add random box', () => {
    return false
})

test ('Remove last box added', () => {
    return false
})

test ('Change color to boxes selected', () => {
    return false
})

test ('Move boxes selected', () => {
    return false
})

test ('Write/Read to localStorage', () => {
    return false
})

test ('Undo/Redo capabilities', () => {
    return false
})
*/