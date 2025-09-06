/**
 * Treasure Controller. manages the gold and treasure spawned in the level.
 */

class TreasureController{
    
    /** Array of all the treasure on the current floor. */
    treasure;

    constructor() {
        this.treasure = [];
    }
    
    // creates new enemies and adds them to the enemy list.
    // needs a reference to the map unfortunately... to make sure enemies spawn on tiles.
    spawnTreasure(grid) {
        this.treasure = [];
        
        for (let i = 0; i < 5; i++){
            let coords = grid.getSnappedWorldCoordinates(20, 20+i*50);
            let t = new Treasure(coords.x, coords.y);
            this.treasure.push(t);
        }
    }

    update(){
        // remove collected treasure from the game.
        this.treasure = this.treasure.filter(t => !t.collected);

        this.treasure.forEach(t => {
            t.update();
        });
    }

    // call the draw function of each enemy.
    draw(ctx) {
        this.treasure.forEach(t => {
            t.draw(ctx)
        });
    }
}