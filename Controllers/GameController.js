// Possible game states.
const GameState = Object.freeze(
    {
        AWAITING_INPUT: "awaiting",  //game state waiting for player input. idle animataions for all entities
        RESOLVING_INPUT: "in turn", // animating through each entitiy groups turn. player inputs are not read.
        PROGRESSING_FLOOR: "next" // transition to next floor of the spire.
    }
);

/**
 * Game controller contains the manages the gameplay loop.
 * Contains the update loop, manages game flow, translates input into game actions.
 * creates the other controllers and tells the other controllers when to do their tasks.
 * Manages communication between controllers.
 */

class GameController {

    /**
     * Construct the game controller
     * @param {Number} width game canvas width, in pixels
     * @param {Number} height game canvas height, in pixels
     */
    constructor(width, height) {

        // START VARIABLE DECLARATION ----------------------------------

        /**
         * Manages all enemies on the current floor.
         * @type {EnemyController}
         */
        this.enemies;

        /**
         * manages all treasure on the current floor.
         * @type {TreasureController}
         */
        this.treasure;

        /**
         * Player character. Controlled by the user.
         * @type {Player}
         */
        this.player;

        /** 
         * Contains the tilemap. Dictates where entities can move.
         * @type {Grid}
         */
        this.grid; 

        /**
         * Current game state.
         * @type {GameState}
         */
        this.state;

        /**
         * The last read user input.
         * @type {Directions}
         */
        this.currentInput = Directions.NONE;

        /**
         * The current floor/level. Affects tile map generation and entity spawns.
         * @type {Number}
         */
        this.currentFloor = 1;

        /**
         * The time elapsed in the current turn;
         * @type {Number}
         */
        this.elapsedTime = 0;
    

        // END VARIABLE DECLARATION ------------------------------------
        
        //The tile map.
        this.grid = new Grid(width, height, TILESIZE)

        this.enemies = new EnemyController;
        this.treasure = new TreasureController;

        // spawn the player at the bottom-center of the canvas.
        this.playerStart = this.grid.getSnappedWorldCoordinates(width / 2, height - 30)
        this.player = new Player();

        //the first game state is awaiting input.
        this.state = GameState.AWAITING_INPUT;

        this.setUpNewFloor();
    }

    /**
     * Update the game and manage the current game state
     * 
     * @param {Number} dt 
     * @param {Directions} input 
     */
    update(dt, input) {
        // Read player input
        this.currentInput = input;

        // console.log(this.state);
        switch(this.state){
            case GameState.AWAITING_INPUT:
                this.elapsedTime = 0;
                //If we receive a new player input
                if (this.currentInput != Directions.NONE){
                    // move the player in the corresponding direction
                    this.player.move(this.currentInput);

                    // if player is heading towards an unwalkable position, reset its position.
                    if(!this.grid.IsProspectivePositionWalkable(this.player)){
                        this.player.setBounceBack();
                    }
            
                    // check if the player has completed the floor
                    if(this.grid.IsOnStairs(this.player)){
                        this.state = GameState.PROGRESSING_FLOOR;
                        this.currentFloor++;
                        this.setUpNewFloor();

                    } else {
                        this.state = GameState.RESOLVING_INPUT;

                        // Move all enemies
                        this.enemies.move(this.grid);
                        // Check for collisions
                        CollisionController.resolveCollisions(this.player, this.enemies.enemies);
                        CollisionController.resolveCollisions(this.player, this.treasure.treasure);
                        CollisionController.resolveTileHazardCollisions(this.grid, this.player);
                        CollisionController.resolveTileHazardCollisions(this.grid, this.enemies.enemies);
                    }
                }
                break;

            // wait for all movement & animations to resolve before allowing next player input.
            case GameState.RESOLVING_INPUT:
            case GameState.PROGRESSING_FLOOR:
                this.elapsedTime += dt;
                if (this.elapsedTime >= TURN_TIME){
                    this.checkGameOver();
                    this.state = GameState.AWAITING_INPUT;
                }
                break;
        }

        this.treasure.update(dt);
        this.enemies.update(dt);
        this.player.update(dt);

    }

    /**
     * Draw all gameplay elements to the canvas
     * @param {CanvasRenderingContext2D} ctx 
     */
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


    /**
     * Generate the next floor of the game. Set the player at the start
     */
    setUpNewFloor(){
        this.currentInput = Directions.NONE;

        this.grid.generateFloor(this.currentFloor);
        this.player.setPosition(this.grid.getPlayerStart().x, this.grid.getPlayerStart().y);
        this.enemies.spawnEnemies(this.grid, this.currentFloor);   
        this.treasure.spawnTreasure(this.grid, this.currentFloor);           
    }

    /**
     * Returns true of the player has experienced a game over. 
     * @returns {boolean}
     */
    checkGameOver(){
        if (this.player.health <= 0){
            console.log("Gameover!")
            this.resetGame();
            return true;
        }
        return false;
    }

    /**
     * Resets all values to their default, and begin a new game.
     */
    resetGame(){
        this.player.reset();
        this.currentFloor = 1;
        this.setUpNewFloor();
    }

}