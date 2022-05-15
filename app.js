// import { setupGround, updateGround } from "./ground.js"
// import { updateZombie, setupZombie, getZombieRect, setZombieLose } from "./zombie.js"
// import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

// sets world scale
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 100
const SPEED_SCALE_INCREASE = 0.00001

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
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}
// making the lose logic 
function checkLose() {
    const zombieRect = getZombieRect()
    return getCactusRects().some(rect => isCollision(rect, zombieRect))
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom && 
        rect1.right > rect2.left && 
        rect1.bottom > rect2.top
        )
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
    setupCactus()
    startScreenElem.classList.add("hide")
    speedScale = 1
    score = 0
    window.requestAnimationFrame(update)
}

// function that handles all Losing code
function handleLose() {
    setZombieLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide")
        alert("You Lose")
    }, 100)
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

