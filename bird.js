const BIRD_SPEED = 0.5 
const birdElement = document.querySelector('[data-bird]');
let timeSinceLastJump = Number.POSITIVE_INFINITY
const JUMP_DURATION = 150

export function updateBird(delta){
    if(timeSinceLastJump < JUMP_DURATION){
        setTop( getTop()- BIRD_SPEED * delta )
    } else {
        setTop( getTop()+ BIRD_SPEED * delta )
    }
    timeSinceLastJump += delta
}

export function setUpBird(){
    setTop(window.innerHeight/2)
    document.removeEventListener('keydown',handleJump)
    document.addEventListener('keydown',handleJump)
}

export function getBirdRect(){
    return birdElement.getBoundingClientRect()
}

function setTop(top){
birdElement.style.setProperty('--bird-top',top)
}

function getTop(){
return parseFloat(getComputedStyle(birdElement).getPropertyValue("--bird-top"))
}
function handleJump(e){
    if (e.code !== "Space") return

    timeSinceLastJump = 0
}