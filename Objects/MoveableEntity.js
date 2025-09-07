/**
 * Enum cardinal directions.
 * @readonly
 * @enum {{name: string, dx: Number, dy: Number}}
 */
const Directions = Object.freeze(
    {
        UP: {name: "up", dx: 0, dy: -1},
        DOWN: {name: "down", dx: 0, dy: 1},
        RIGHT: {name: 'right', dx: 1, dy: 0},
        LEFT: {name: 'left', dx: -1, dy: 0},
        NONE: {name: 'none', dx: 0, dy: 0}
    }
);


/**
 * Public class for a MovableObject.
 * A moveable object is an entity that can update its position.
 */
class MoveableEntity extends Entity{

    //Number, how much damage the obj can take before being destroyed
    health; 
    //Number, how many tiles the obj can move per turn
    speed;

    // INTERPOLATION PARAMETER
    /**Number, x Position before the lerp. */
    previousX;
    /**Number, y Position before the lerp. */
    previousY;

    /**Number, Target x position. Allow for lerping between current to target */
    targetX;
    /**Number, Target y position. Allow for lerping between current to target */
    targetY;

    /** time elapsed since the start of the interpolation */
    elapsedTime;
    /** At what point in the turn time should the movement interpolation be complete. value between 0-1 */
    interpolationTime = 0.6;

    /** The current direction headed, used to recalculate target if running into wall */
    currentDirection;
    /** How far this entity is pushed into the wall on a bounce back */
    slamFactor = 0.1;
  
    constructor(health, speed, x = 0, y = 0){
        super(x, y);
        this.health = health;
        this.speed = speed;

        this.targetX = this.previousX = x;
        this.targetY = this.previousY = y;
    }

    //update the current position by the movement direction.
    move(direction){

        //snap to the target position for safety.
        this.xPosition = this.targetX;
        this.yPosition = this.targetY;
        //Save the previous position. Reset interpolation parameters.
        this.previousX = this.xPosition;
        this.previousY = this.yPosition;
        this.elapsedTime = 0;

        switch (direction){
            case Directions.UP:    
            case Directions.DOWN:
            case Directions.RIGHT:
            case Directions.LEFT:
                this.currentDirection = direction;
                this.targetX = this.xPosition + (direction.dx * this.speed * TILESIZE);
                this.targetY = this.yPosition + (direction.dy * this.speed * TILESIZE);
            break;
            default:
                throw new Error("invalid direction")

        }
    }

    /** Move to target, then move back to original position */
    setBounceBack(){
        // how far the player is pushed into the wall
        this.targetX = this.xPosition + (this.currentDirection.dx * this.speed * TILESIZE) * this.slamFactor;
        this.targetY = this.yPosition + (this.currentDirection.dy * this.speed * TILESIZE) * this.slamFactor;

        // reverse the flow of movement.
        this.xPosition = this.targetX;
        this.yPosition = this.targetY;
        this.targetX = this.previousX;
        this.targetY = this.previousY;
        this.previousX = this.xPosition;
        this.previousY = this.yPosition;
    }

    setPosition(x, y){
        super.setPosition(x,y);
        this.targetX = this.previousX = x;
        this.targetY = this.previousY = y;
    }

    /** lerp the current position towards the target position */
    update(dt){

        //linear interpolation
        this.elapsedTime += dt;
        // ensure alpha does not exceed 1;
        let alpha = Math.min(this.elapsedTime / (TURN_TIME * this.interpolationTime), 1);


        if (!approximatelyEqual(this.xPosition, this.targetX, 0.1)){
            this.xPosition = (1-alpha)*this.previousX + alpha * this.targetX;
        } else {
            // snap to target if approximately equal
            this.xPosition = this.targetX;
        }

        if (!approximatelyEqual(this.yPosition, this.targetY, 0.1)){
            this.yPosition = (1-alpha)*this.previousY + alpha * this.targetY;
        } else {
            //snap to target if approximately equal
            this.yPosition = this.targetY;
        }

    }

    
}

