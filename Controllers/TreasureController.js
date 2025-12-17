/**
 * Treasure Controller. manages the gold and treasure spawned in the level.
 */
class TreasureController{
    
    constructor() {

        // START VARIABLE DECLARATIONS ---------------------------------

        /** 
         * Array of all the treasure on the current floor. 
         * @type {Treasure[]}
         * */
        this.treasure;

        /**
         * the rate of how many treasures should be spawned, as a function of the current floor.
         * @type {Number}
         * */
        this.spawnRate = 0.75; 

        // END VARIABLE DECLARATIONS ------------------------------------

        this.treasure = [];
    }
    
    /**
     * creates new enemies and adds them to the enemy list.
     * needs a reference to the map to make sure treasure spawns on tiles.
     * 
     * @param {Grid} grid 
     * @param {Number} floor 
     */
    spawnTreasure(grid, floor) {
        this.treasure = [];

        for (let i = 1; i < floor * this.spawnRate; i++){
            let coords = grid.getRandomSnappedWorldPosition()
            let t = new Treasure(coords.x, coords.y);
            this.treasure.push(t);
        }
    }

    /**
     * Update each treasure, remove collected treasure
     * @param {Number} dt 
     */
    update(dt){
        // remove collected treasure from the game.
        this.treasure = this.treasure.filter(t => !t.collected);

        this.treasure.forEach(t => {
            t.update(dt);
        });
    }

    /**
     * call the draw function of each treasure.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.treasure.forEach(t => {
            t.draw(ctx)
        });
    }
}