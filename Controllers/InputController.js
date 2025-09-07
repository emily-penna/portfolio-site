/**
 * Reads player input when its the player's turn, and translates them to gameplay actions.
 */

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let inputHistory = [Directions.NONE];
let currentInput = Directions.NONE;

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        currentInput = Directions.RIGHT;
        inputHistory.push(currentInput);
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        currentInput = Directions.LEFT;
        inputHistory.push(currentInput);
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        currentInput = Directions.UP;
        inputHistory.push(currentInput);
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        currentInput = Directions.DOWN;
        inputHistory.push(currentInput);
    }
}
 
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        inputHistory = inputHistory.filter(i => i != Directions.RIGHT);
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        inputHistory = inputHistory.filter(i => i != Directions.LEFT);
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        inputHistory = inputHistory.filter(i => i != Directions.UP);
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        inputHistory = inputHistory.filter(i => i != Directions.DOWN);
    }

    // get latest stored input.
    currentInput= inputHistory[inputHistory.length - 1];
}


