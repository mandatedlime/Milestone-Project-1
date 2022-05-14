// setting the variable for the zombie
const zombieElem = document.querySelector("[data-dino]")
const JUMP_SPEED = .45
const GRAVITY = .011
const ZOMBIE_FRAME_COUNT = 2
const FRAME_TIME = 100

// sending the function to app.js
let isJumping
export function setupZombie() {
    isJumping = false
}

export function updateZombie(delta, speedScale) {
    handleRun()
    handleJump()
}

function handleRun() {
    if (isJumping) {
        zombieElem.src = "imgs/Walk(3).png"
        return
    }
}

function handleJump(){

}