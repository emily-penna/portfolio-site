/**
 * Game controller contains the manages the gameplay loop.
 * Contains the update loop, manages game flow, translates input into game actions.
 * creates the other controllers and tells the other controllers when to do their tasks.
 */


class GameController {

    enemies; // EnemyController: manages all enemies on the current floor.
    player; // PlayerModel: player character. Controlled by the user.
    grid; //Grid: contains the tilemap. Dictates where entities can move.

    // Possible game states.
    GameState = Object.freeze(
        {
            AWAITING_INPUT: "awaiting",  //game state waiting for player input. idle animataions for all entities
            IN_TURN: "in turn" // animating through each entitiy groups turn. player inputs are not read.
        }
    );

    state; //GameState: current game state.
    currentInput = Directions.NONE; //The last read user input.

    // the current floor/level. Affects tile map generation.
    currentFloor = 1;
    

    // width: game canvas width
    // height: game canvas height
    constructor(width, height) {
        this.enemies = new EnemyController;
        this.enemies.spawnEnemies();

        // spawn the player at the bottom-center of the canvas.
        this.player = new Player(canvas.width / 2, canvas.height - 30);

        //The tile map.
        this.grid = new Grid(width, height, TILESIZE)

        //the first game state is awaiting input.
        this.state = this.GameState.AWAITING_INPUT;

        this.setUpFloor();
    }

    update(input) {

        this.currentInput = input;

        switch(this.state){

            case this.GameState.AWAITING_INPUT:
                if (this.currentInput != Directions.NONE){
                    this.player.move(this.currentInput);
                    this.state = this.GameState.IN_TURN;
                }
                this.enemies.update();
                break;


            case this.GameState.IN_TURN:
                console.log("playing turn!")
                if (currentInput == Directions.NONE){
                    this.state = this.GameState.AWAITING_INPUT;
                }
                break;

        }

    }

    draw(ctx){
        this.grid.draw(ctx);
        this.enemies.draw(ctx)
        this.player.draw(ctx);
    }


    setUpFloor(){
        this.grid.generateFloor();
    }

}