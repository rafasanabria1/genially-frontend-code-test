import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import getRandomBox from "../utils/getRandom";
import { MainStore } from "../stores/MainStore"
import { SIZES } from "../utils/const";
import { getSnapshot, onSnapshot } from "mobx-state-tree";

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


describe ('Write/Read to localStorage', () => {
    
    const box1 = getRandomBox ()
    const box2 = getRandomBox ()
    const store = MainStore.create ()
    const localStorageItemName = 'test-wr-genially'
    
    const previousColor = box1.color;
    const newColor = '#FF0000'

    const previousLeft = box1.left
    const previousTop = box1.top
    const dx = 15
    const dy = 20
    const newLeft = Math.max (0, (Math.min (previousLeft + dx, (SIZES.CANVA.WIDTH - SIZES.BOX.WIDTH))))
    const newTop = Math.max (0, (Math.min (previousTop + dy, (SIZES.CANVA.HEIGHT - SIZES.BOX.HEIGHT))))


    const json1 = JSON.stringify ({"boxes":[{...box1}],"history":{"history":[{"patches":[{"op":"add","path":"/boxes/0","value":{...box1}}],"inversePatches":[{"op":"remove","path":"/boxes/0"}]}],"undoIdx":1}})
    const json2 = JSON.stringify ({"boxes":[{...box1},{...box2}],"history":{"history":[{"patches":[{"op":"add","path":"/boxes/0","value":{...box1}}],"inversePatches":[{"op":"remove","path":"/boxes/0"}]},{"patches":[{"op":"add","path":"/boxes/1","value":{...box2}}],"inversePatches":[{"op":"remove","path":"/boxes/1"}]}],"undoIdx":2}})
    const json3 = JSON.stringify ({"boxes":[{...box1}],"history":{"history":[{"patches":[{"op":"add","path":"/boxes/0","value":{...box1}}],"inversePatches":[{"op":"remove","path":"/boxes/0"}]},{"patches":[{"op":"add","path":"/boxes/1","value":{...box2}}],"inversePatches":[{"op":"remove","path":"/boxes/1"}]},{"patches":[{"op":"remove","path":"/boxes/1"}],"inversePatches":[{"op":"add","path":"/boxes/1","value":{...box2}}]}],"undoIdx":3}})
    const json4 = JSON.stringify ({"boxes":[{...box1, selected: true, color: newColor}],"history":{"history":[{"patches":[{"op":"add","path":"/boxes/0","value":{...box1}}],"inversePatches":[{"op":"remove","path":"/boxes/0"}]},{"patches":[{"op":"add","path":"/boxes/1","value":{...box2}}],"inversePatches":[{"op":"remove","path":"/boxes/1"}]},{"patches":[{"op":"remove","path":"/boxes/1"}],"inversePatches":[{"op":"add","path":"/boxes/1","value":{...box2}}]},{"patches":[{"op":"replace","path":"/boxes/0/selected","value":true}],"inversePatches":[{"op":"replace","path":"/boxes/0/selected","value":false}]},{"patches":[{"op":"replace","path":"/boxes/0/color","value":newColor}],"inversePatches":[{"op":"replace","path":"/boxes/0/color","value":previousColor}]}],"undoIdx":5}})
    const json5 = JSON.stringify ({"boxes":[{...box1, selected: true, color: newColor, left: newLeft, top: newTop}],"history":{"history":[{"patches":[{"op":"add","path":"/boxes/0","value":{...box1}}],"inversePatches":[{"op":"remove","path":"/boxes/0"}]},{"patches":[{"op":"add","path":"/boxes/1","value":{...box2}}],"inversePatches":[{"op":"remove","path":"/boxes/1"}]},{"patches":[{"op":"remove","path":"/boxes/1"}],"inversePatches":[{"op":"add","path":"/boxes/1","value":{...box2}}]},{"patches":[{"op":"replace","path":"/boxes/0/selected","value":true}],"inversePatches":[{"op":"replace","path":"/boxes/0/selected","value":false}]},{"patches":[{"op":"replace","path":"/boxes/0/color","value":newColor}],"inversePatches":[{"op":"replace","path":"/boxes/0/color","value":previousColor}]},{"patches":[{"op":"replace","path":"/boxes/0/left","value":newLeft},{"op":"replace","path":"/boxes/0/top","value":newTop}],"inversePatches":[{"op":"replace","path":"/boxes/0/left","value":previousLeft},{"op":"replace","path":"/boxes/0/top","value":previousTop}]}],"undoIdx":6}})

    onSnapshot (store, snapshot => {
        localStorage.setItem (localStorageItemName, JSON.stringify (snapshot))
    })

    test ('Check write when adding box', () => {

        store.addBox (box1)
        const read1 = localStorage.getItem (localStorageItemName)
        
        expect (read1).toBe (json1)
        
        store.addBox (box2)
        const read2 = localStorage.getItem (localStorageItemName)

        expect (read2).toBe (json2)
    })
    
    test ('Check write when removing box', () => {
        
        store.removeBox ()
        const read3 = localStorage.getItem (localStorageItemName)
        
        expect (read3).toBe (json3)
    })

    test ('Check write when changing color to box', () => {
        
        box1.setSelected (true)
        store.changeColorToSelectedBoxes (newColor)
        const read4 = localStorage.getItem (localStorageItemName)
        
        expect (read4).toBe (json4)
    })

    test ('Check write when moving box', () => {
        
        store.moveSelectedBoxes (dx, dy)
        const read5 = localStorage.getItem (localStorageItemName)
        
        expect (read5).toBe (json5)
    })

    test ('Check read from localStorage to restore previous state', () => {
        
        const read6 = localStorage.getItem (localStorageItemName)
        const storeRestored = MainStore.create (JSON.parse(read6))

        expect (read6).toBe (JSON.stringify (getSnapshot (storeRestored)))
    })

    localStorage.removeItem (localStorageItemName)
})

describe ('Undo/Redo capabilities', () => {

    const box1 = getRandomBox ()
    const box1Id = box1.id
    const box2 = getRandomBox ()
    const store = MainStore.create ()
    const historyManager = store.history
    
    const previousColor = box1.color
    const newColor = '#FF0000'

    const previousLeft = box1.left
    const previousTop = box1.top
    const dx = 15
    const dy = 20
    const newLeft = Math.max (0, (Math.min (previousLeft + dx, (SIZES.CANVA.WIDTH - SIZES.BOX.WIDTH))))
    const newTop = Math.max (0, (Math.min (previousTop + dy, (SIZES.CANVA.HEIGHT - SIZES.BOX.HEIGHT))))

    test ('Check undo add box', () => {

        store.addBox (box2)
        store.addBox (box1)
        historyManager.undo ()

        expect (store.boxes.length).toBe (1)
        expect (store.boxes[0].id).toBe (box2.id)
    })

    test ('Check redo add box', () => {

        historyManager.redo ()

        expect (store.boxes.length).toBe (2)
        expect (store.boxes[1].id).toBe (box1Id)
    })

    test ('Check undo change color', () => {

        store.boxes[1].toggleSelected()
        store.changeColorToSelectedBoxes (newColor)
        historyManager.undo ()

        expect (store.boxes[1].color).toBe (previousColor)
    })


    test ('Check redo change color', () => {

        historyManager.redo ()

        expect (store.boxes[1].color).toBe (newColor)
    })

    test ('Check undo move box', () => {

        store.moveSelectedBoxes (dx, dy)
        historyManager.undo ()

        expect (store.boxes[1].left).toBe (previousLeft)
        expect (store.boxes[1].top).toBe (previousTop)
    })

    test ('Check redo move box', () => {

        historyManager.redo ()

        expect (store.boxes[1].left).toBe (newLeft)
        expect (store.boxes[1].top).toBe (newTop)
    })
})