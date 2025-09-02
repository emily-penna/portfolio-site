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
    spawnEnemies() {
        for (let i = 0; i < 5; i++){
            let e = new Enemy(5, 1, 1, 10+i*100, 10);
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

}