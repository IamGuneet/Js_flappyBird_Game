import { updateBird , setUpBird ,getBirdRect} from "./bird.js";
import { updatePipes ,setupPipes  , getPassesPipesCount, getPipeRects} from "./pipe.js";

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
    updatePipes(delta)
    updateBird(delta)
   if(checkLose()) return handleLoose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}
function checkLose(){
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect,rect ))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function handleStart(){ 
title.classList.add("hide")
lastTime = null
setupPipes()
setUpBird()
window.requestAnimationFrame(updateLoop)
}

function isCollision(rect1,rect2){
    return(
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top 
    )
}

function handleLoose(){
    setTimeout(() => {
        title.classList.remove("hide")
        subTitle.classList.remove("hide")
        subTitle.textContent = `Score : ${getPassesPipesCount()} ` 
        document.addEventListener("keypress",handleStart,{once: true})    
    },100)
}