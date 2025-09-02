/**
 * Public class for a Player.
 * A player is controlled by the user.
 * Has a health bar and can gain gold (points)
 */
class Player extends MoveableEntity{

    //how much gold the player has collected, represents score.
    gold;
    

    constructor(x = 0, y = 0){
        super(PLAYER_HEALTH, PLAYER_SPEED, x, y);  
        this.gold = 0;
    }

    // draw the player on the canvas
    draw(canvas){
        canvas.beginPath();
        canvas.arc(this.xPosition, this.yPosition, 10, 0, Math.PI * 2);
        canvas.fillStyle = "#0095DD";
        canvas.fill();
        canvas.closePath();
    }

    onCollision(other){
        if (other instanceof Enemy){
            health -= other.damage;
        }
    }

    
}