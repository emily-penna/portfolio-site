/**
 * Public class for a Player.
 * A player is controlled by the user.
 * Has a health bar and can gain gold (points)
 */
class Player extends MoveableEntity{

    /**
     * Construct a Player Entity
     * @param {Number} [x] 
     * @param {Number} [y] 
     */
    constructor(x = 0, y = 0){

        super(PLAYER_HEALTH, PLAYER_SPEED, x, y);  

        // START VARIABLE DECLARATIONS ---------------------------------

        /**
         * how much gold the player has collected, represents score.
         * @type {Number}
         */
        this.gold;

        // END VARIABLE DECLARATIONS -----------------------------------
        
        this.gold = 0;
    }

    /**
     * return all variables to their default value. Used on gameover.
     */
    reset(){
        this.gold =- 0
        this.health = PLAYER_HEALTH;
        this.size = this.startingSize;
    }

    // draw the player on the canvas
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.xPosition, this.yPosition, this.size, this.size);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();  
    }

    onCollision(other){
        if (other instanceof Enemy){
            this.health -= other.power;
            console.log(this.health);
            this.setBounceBack();
        } 
        else if (other instanceof Treasure){
            this.gold += other.getValue();
            console.log(this.gold);
        } 
        else if (other == TileTypes.HOLE){ 
            this.health = 0;   
            this.setFall()    
        }
    }

    update(dt){
        super.update(dt);
    }

    
}