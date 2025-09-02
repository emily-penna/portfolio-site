/**
 * Reads player input when its the player's turn, and translates them to gameplay actions.
 */

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let currentInput = Directions.NONE;

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        currentInput = Directions.RIGHT;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
        currentInput = Directions.LEFT;

    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
        currentInput = Directions.UP;

    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
        currentInput = Directions.DOWN;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
    currentInput= Directions.NONE;
}


