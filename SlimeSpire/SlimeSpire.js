import * as SlimeSpire from "./Controllers/GameController.js"
import * as InputController from "./Controllers/InputController.js"

const canvas = document.getElementById("gameWindow");
const ctx = canvas.getContext("2d");
const game = new SlimeSpire.GameController(canvas.width, canvas.height);
let startTime = Date.now();

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${game.currentFloor}`, canvas.width - 30, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);

    //draw UI above game
    drawLives()
}

function update() {
    let frameTime = Date.now()
    let deltaTime = frameTime - startTime;
    let framerate = (1/(deltaTime)) * 1000;
    startTime = frameTime;
    // console.log(deltaTime);

    game.update(deltaTime, InputController.currentInput);
    draw()
}

// call the update every 10 ms  
setInterval(update, 10);


