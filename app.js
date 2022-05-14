import { setupGround, updateGround } from "./ground.js"
import { updateZombie, setupZombie } from "./zombie.js"

// sets world scale
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 100
const SPEED_SCALE_INCREASE = 0.0001

// creating the worldElem
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")


// funtion to scale the world
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart,  { once: true})


// create update loop to update positons on screen
let lastTime
let speedScale
let score
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }

    const delta = time - lastTime
    
    updateGround(delta, speedScale)
    updateZombie(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}

// functions to update speed, score and start.
function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta){
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null
    setupGround()
    setupZombie()
    startScreenElem.classList.add("hide")
    speedScale = 1
    score = 0
    window.requestAnimationFrame(update)
}


// setting the screen size
function setPixelToWorldScale() {

    // if our window is wider than our world then we need to pixel scale based on width , other wise base it on height
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
    {
       worldToPixelScale = window.innerWidth / WORLD_WIDTH 
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }


    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.width = `${WORLD_HEIGHT * worldToPixelScale}px`

}

