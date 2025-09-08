/**
 * Public class for an Enemy.
 * An enemy can deal damage and will path towards the player.
 */
class Enemy extends MoveableEntity{

    // Number, how much damage it will deal to an entity on collision
    power;

    constructor(health, speed, power, x = 0, y = 0){
        super(health, speed, x, y);
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
            console.log('attack!!')
        }
        else if (other == TileTypes.HOLE){
            this.setFall();
        }
    }

    update(dt){
        super.update(dt);
    }


}