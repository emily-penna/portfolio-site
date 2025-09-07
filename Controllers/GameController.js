/**
 * Game controller contains the manages the gameplay loop.
 * Contains the update loop, manages game flow, translates input into game actions.
 * creates the other controllers and tells the other controllers when to do their tasks.
 * Manages communication between controllers.
 */


class GameController {

    enemies; // EnemyController: manages all enemies on the current floor.
    treasure; // TreasureController: manages all treasure on the current floor.
    player; // PlayerModel: player character. Controlled by the user.
    /** Grid: contains the tilemap. Dictates where entities can move.*/
    grid; 

    // Possible game states.
    GameState = Object.freeze(
        {
            AWAITING_INPUT: "awaiting",  //game state waiting for player input. idle animataions for all entities
            RESOLVING_INPUT: "in turn", // animating through each entitiy groups turn. player inputs are not read.
            PROGRESSING_FLOOR: "next" // transition to next floor of the spire.
        }
    );

    state; //GameState: current game state.
    currentInput = Directions.NONE; //The last read user input.

    // the current floor/level. Affects tile map generation.
    currentFloor = 1;

    // the time elapsed in the current turn;
    elapsedTime = 0;
    

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

    update(dt, input) {
        // Read player input
        this.currentInput = input;

        // console.log(this.state);
        switch(this.state){
            case this.GameState.AWAITING_INPUT:
                this.elapsedTime = 0;
                //If we receive a new player input
                if (this.currentInput != Directions.NONE){
                    // move the player in the corresponding direction
                    this.player.move(this.currentInput);
            
                    // check if the player has completed the floor
                    if(this.grid.IsOnStairs(this.player)){
                        this.state = this.GameState.PROGRESSING_FLOOR;
                        this.currentFloor++;
                        this.setUpNewFloor();

                    } else {
                        this.state = this.GameState.RESOLVING_INPUT;

                        // move all enemies
                        // this.enemies.move();
                        //TODO: check for collisions
                        CollisionController.resolveCollisions(this.player, this.enemies.enemies);
                        CollisionController.resolveCollisions(this.player, this.treasure.treasure);

                    }
                }
                break;

            // wait for all movement & animations to resolve before allowing next player input.
            case this.GameState.RESOLVING_INPUT:
            case this.GameState.PROGRESSING_FLOOR:
                this.elapsedTime += dt;
                if (this.elapsedTime >= TURN_TIME){
                    this.state = this.GameState.AWAITING_INPUT;
                }
                break;
        }

        this.treasure.update(dt);
        this.enemies.update(dt);
        this.player.update(dt);

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
        this.currentInput = Directions.NONE;

        this.grid.generateFloor();
        this.player.setPosition(this.grid.getPlayerStart().x, this.grid.getPlayerStart().y);
        // this.enemies.spawnEnemies(this.grid);   
        // this.treasure.spawnTreasure(this.grid);           
    }

}