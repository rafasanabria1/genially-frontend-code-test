import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import getRandomBox from "../utils/getRandom";
import { MainStore } from "../stores/MainStore"
import { SIZES } from "../utils/const";

test("Renders correctly the app", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe ('Add random box', () => {
    
    const store = MainStore.create ()

    test ('Check there are no boxes in the store', () => {

        expect (store.boxes.length).toBe (0)
    })
    
    test ('Check there si a box in the store', () => {

        const box = getRandomBox ()
        store.addBox (box)
        expect (store.boxes.length).toBe (1)
    })
})


describe ('Remove last box added', () => {
    
    const store = MainStore.create ()  
    const box1 = getRandomBox ()
    const box2 = getRandomBox ()
    store.addBox (box2)
    store.addBox (box1)

    test ('Check number of boxes is decremented', () => {

        expect (store.boxes.length).toBe (2)
        store.removeBox ()
        expect (store.boxes.length).toBe (1)
    })

    test ('Check last box is first box added', () => {

        expect (store.boxes[store.boxes.length - 1].id).toBe (box2.id);
    })
})


describe ('Toggle selected in box', () => {
    const box = getRandomBox ();
    const previousBox = {...box};
    
    test ('Check box is selected', () => {
        
        box.toggleSelected ()
        expect (box.selected).not.toBe (previousBox.selected)
    })

    test ('Check box is not selected again', () => {

        box.toggleSelected ()
        expect (box.selected).toBe (previousBox.selected)
    })
})

describe ('Show number of selected boxes', () => {
    
    const box1 = getRandomBox ()
    const box2 = getRandomBox ()
    const box3 = getRandomBox ()
    const store = MainStore.create ()
    
    box1.setSelected (true);
    box3.setSelected (true);

    store.addBox (box1)
    store.addBox (box2)
    store.addBox (box3)

    test ('Check number of selected boxes are correct', () => {

        expect (store.selectedBoxes.length).toBe (2)
    })

    test ('Check number of selected boxes are now 0', () => {

        store.boxes.map (box => box.setSelected (false))
        expect (store.selectedBoxes.length).toBe (0)
    })
})


describe ('Change color & move boxes', () => {
  
    const box1 = getRandomBox ()
    const box2 = getRandomBox ()
    const box3 = getRandomBox ()

    const previousBox1 = {...box1}
    const previousBox2 = {...box2}
    const previousBox3 = {...box3}
    
    const store = MainStore.create ()
    
    box1.setSelected (true)
    box3.setSelected (true)

    store.addBox (box1)
    store.addBox (box2)
    store.addBox (box3)
    
    const color = '#FF0000', dx = 15, dy = 20
    store.changeColorToSelectedBoxes (color)
    store.moveSelectedBoxes (dx, dy)
    
    test ('Check selected boxes 1 & 3 are moved', () => {
        
        const newLeft1 = Math.max (0, (Math.min (previousBox1.left + dx, (SIZES.CANVA.WIDTH - SIZES.BOX.WIDTH))))
        const newTop1 = Math.max (0, (Math.min (previousBox1.top + dy, (SIZES.CANVA.HEIGHT - SIZES.BOX.HEIGHT))))
    
        const newLeft3 = Math.max (0, (Math.min (previousBox3.left + dx, (SIZES.CANVA.WIDTH - SIZES.BOX.WIDTH))))
        const newTop3 = Math.max (0, (Math.min (previousBox3.top + dy, (SIZES.CANVA.HEIGHT - SIZES.BOX.HEIGHT))))
        
        expect (box1.left).toBe (newLeft1)
        expect (box1.top).toBe (newTop1)
        expect (box3.left).toBe (newLeft3)
        expect (box3.top).toBe (newTop3)
    })

    test ('Check selected boxes 1 & 3 are color changed', () => {
        
        expect (box1.color).toBe (color)
        expect (box3.color).toBe (color)
    })
    
    test ('Check unselected box 2 are not moved', () => {
        
        expect (box2.left).toBe (previousBox2.left)
        expect (box2.left).toBe (previousBox2.left)
    })

    test ('Check unselected box 2 are not color changed', () => {
        
        expect (box2.color).toBe (previousBox2.color)
    })
})


/*
describe ('Write/Read to localStorage', () => {
    
    const box1 = getRandomBox ()
    const box2 = getRandomBox ()
    const box3 = getRandomBox ()
    const store = MainStore.create ()


    test ('Check write when adding box', () => {

    })

    test ('Check write when removing box', () => {
        
    })

    test ('Check write when changin color to box', () => {
        
    })

    test ('Check write when moving box', () => {
        
    })

    test ('Check read from localStorage to restore previous state', () => {
        
    })
})

test ('Undo/Redo capabilities', () => {
    return false
})
*/