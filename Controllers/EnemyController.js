/**
 * Enemy Controller spawns and manages enemy actions.
 * Controls all of the enemies on their turn.
 */

// import {Enemy} from "../Objects/Enemy.js"

class EnemyController {

    enemies; // array of all enemies on the current floor.

    constructor() {
        this.enemies = [];
    }
    
    // creates new enemies and adds them to the enemy list.
    // needs a reference to the map unfortunately... to make sure enemies spawn on tiles.
    spawnEnemies(grid) {
        for (let i = 0; i < 5; i++){
            let coords = grid.getSnappedWorldCoordinates(20+i*100, 50);
            let e = new Enemy(5, 1, 1, coords.x, coords.y);
            this.enemies.push(e);
        }
    }

    update(){
        this.enemies.forEach(e => {
            e.update();
        });
    }

    // call the draw function of each enemy.
    draw(ctx) {
        this.enemies.forEach(e => {
            e.draw(ctx)
        });
    }

    /**move all enemies once */
    move(){
        this.enemies.forEach(e => {
            e.move(this.getRandomDirection());
        });
    }


    /**Return a random movement direction. Uniform disribution. */
    getRandomDirection(){
        let dir = Math.floor(Math.random() * 4 + 1); //random number between 1 and 4

        switch(dir){
            case 1:
                return Directions.UP;
            case 2:
                return Directions.DOWN;
            case 3:
                return Directions.LEFT;
            case 4:
                return Directions.RIGHT;
            default:
                throw new Error("invalid direction")
        }

    }

}