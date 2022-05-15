import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

// setting the variable for the zombie
const zombieElem = document.querySelector("[data-zombie]")
const JUMP_SPEED = .45
const GRAVITY = 0.0015
const ZOMBIE_FRAME_COUNT = 2
const FRAME_TIME = 100

// setting varibles for zombie animation
let isJumping
let zombieFrame
let currentFrameTime
let yVelocity

// sending the function to app.js
export function setupZombie() {
    isJumping = false
    zombieFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(zombieElem,"--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateZombie(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getZombieRect() {
    return zombieElem.getBoundingClientRect()
}

export function setZombieLose() {
    zombieElem.src = "imgs/Walk (1).png"
}

// everytime this function is called it updates frame time by multiplying the delta/time with the speedscale so that the animation can keep up
function handleRun(delta, speedScale) {
    if (isJumping) {
        zombieElem.src = "imgs/Walk (3).png"
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        zombieFrame = (zombieFrame + 1) % ZOMBIE_FRAME_COUNT
        zombieElem.src = `imgs/zombie-run-${zombieFrame}.png` 
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return
    
    incrementCustomProperty(zombieElem, "--bottom", yVelocity * delta)
    
    if (getCustomProperty(zombieElem, "--bottom") <= 0) {
        setCustomProperty(zombieElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}