/**
 * Reads player input when its the player's turn, and translates them to gameplay actions.
 */

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let currentInput = Directions.NONE;

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        currentInput = Directions.RIGHT;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        currentInput = Directions.LEFT;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        currentInput = Directions.UP;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        currentInput = Directions.DOWN;
    }
}
 
function keyUpHandler(e) {
    currentInput= Directions.NONE;
}


