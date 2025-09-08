/**
 * Treasure Controller. manages the gold and treasure spawned in the level.
 */

class TreasureController{
    
    /** Array of all the treasure on the current floor. */
    treasure;
    spawnRate = 0.75; // the rate of how many treasures should be spawned, as a function of the current floor.

    constructor() {
        this.treasure = [];
    }
    
    // creates new enemies and adds them to the enemy list.
    // needs a reference to the map unfortunately... to make sure enemies spawn on tiles.
    spawnTreasure(grid, floor) {
        this.treasure = [];

        for (let i = 1; i < floor * this.spawnRate; i++){
            let coords = grid.getRandomSnappedWorldPosition()
            let t = new Treasure(coords.x, coords.y);
            this.treasure.push(t);
        }
    }

    update(dt){
        // remove collected treasure from the game.
        this.treasure = this.treasure.filter(t => !t.collected);

        this.treasure.forEach(t => {
            t.update(dt);
        });
    }

    // call the draw function of each enemy.
    draw(ctx) {
        this.treasure.forEach(t => {
            t.draw(ctx)
        });
    }
}