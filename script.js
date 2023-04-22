import { updateBird , setUpBird ,getBirdRect} from "./bird.js";

document.addEventListener("keypress",handleStart,{once: true})
const title = document.querySelector("[data-title]");
const subTitle = document.querySelector("[data-subtitle]");

let lastTime
function updateLoop(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
   if(checkLose()) return handleLoose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}
function checkLose(){
    const birdRect = getBirdRect()

    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld
}

function handleStart(){ 
title.classList.add("hide")
lastTime = null
setUpBird()
window.requestAnimationFrame(updateLoop)
}

function handleLoose(){
    setTimeout(() => {
        title.classList.remove("hide")
        subTitle.classList.remove("hide")
        subTitle.textContent = "Score: 0"
        document.addEventListener("keypress",handleStart,{once: true})    
    },100)
}