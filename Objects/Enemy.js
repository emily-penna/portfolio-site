/**
 * Public class for an Enemy.
 * An enemy can deal damage and will path towards the player.
 */
class Enemy extends MoveableEntity{

   
    /**
     * Construct an Enemy
     * 
     * @param {Number} health 
     * @param {Number} speed 
     * @param {Number} power 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(health, speed, power, x = 0, y = 0){

        super(health, speed, x, y);

        // START VARIABLE DECLARATIONS --------------------------------

        /**
         * How much damage it will deal to an entity on collision
         * @type {Number}
         */
        this.power;

        // END VARIABLE DECLARATIONS ----------------------------------
        
        this.power = power;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.xPosition, this.yPosition, this.size, this.size);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();  
    }

    onCollision(other){
        if (other instanceof Player){
            //damage dealing is handled by the player
            //enemies do not bounce back on collision with the player. 
            console.log('attack!!')
            this.setBounceBack();
        }
        else if (other == TileTypes.HOLE){
            this.setFall();
        }
    }

    update(dt){
        super.update(dt);
    }


}