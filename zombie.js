// setting the variable for the zombie
const zombieElem = document.querySelector("[data-zombie]")
const JUMP_SPEED = .45
const GRAVITY = .011
const ZOMBIE_FRAME_COUNT = 2
const FRAME_TIME = 100

// setting varibles for zombie animation
let isJumping
let zombieFrame
let currentFrameTime
// sending the function to app.js
export function setupZombie() {
    isJumping = false
    zombieFrame = 0
    currentFrameTime = 0
}

export function updateZombie(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump()
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

function handleJump(){

}