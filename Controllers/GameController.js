/**
 * Game controller contains the manages the gameplay loop.
 * Contains the update loop, manages game flow, translates input into game actions.
 * creates the other controllers and tells the other controllers when to do their tasks.
 */


class GameController {

    enemies; // EnemyController: manages all enemies on the current floor.
    treasure; // TreasureController: manages all treasure on the current floor.
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
        
        //The tile map.
        this.grid = new Grid(width, height, TILESIZE)

        this.enemies = new EnemyController;
        this.treasure = new TreasureController;
        

        // spawn the player at the bottom-center of the canvas.
        this.playerStart = this.grid.getSnappedWorldCoordinates(canvas.width / 2, canvas.height - 30)
        this.player = new Player();


        //the first game state is awaiting input.
        this.state = this.GameState.AWAITING_INPUT;

        this.setUpNewFloor();
    }

    update(input) {

        this.currentInput = input;

        switch(this.state){

            case this.GameState.AWAITING_INPUT:
                if (this.currentInput != Directions.NONE){
                    this.player.move(this.currentInput);
                    this.enemies.move();
                
                    if(this.grid.IsOnStairs(this.player)){
                        this.currentFloor++;
                        this.currentInput = Directions.NONE;
                        this.setUpNewFloor();
                    }


                    this.state = this.GameState.IN_TURN;
                }
                this.enemies.update();
                break;


            case this.GameState.IN_TURN:
                console.log("playing out turn!")

                // player has reached the exit
                
                if (currentInput == Directions.NONE){
                    this.state = this.GameState.AWAITING_INPUT;
                }
                break;

        }

    }

    draw(ctx){
        this.grid.draw(ctx);
        this.treasure.draw(ctx);
        this.enemies.draw(ctx)
        this.player.draw(ctx);

        //draw the lines of the grid
        if (DEBUG_MODE){
            this.grid.debugDraw(ctx)
        }
    }


    setUpNewFloor(){
        this.grid.generateFloor();
        this.player.setPosition(this.grid.startTile.position.x, this.grid.startTile.position.y);
        this.enemies.spawnEnemies(this.grid);   
        this.treasure.spawnTreasure(this.grid);           
        console.log(this.player.xPosition)
    }

}