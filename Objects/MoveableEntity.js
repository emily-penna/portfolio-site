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
  
    constructor(health, speed, x = 0, y = 0){
        super(x, y);
        this.health = health;
        this.speed = speed;
    }

    //update the current position by the movement direction.
    move(direction){
        switch (direction){
            case Directions.UP:    
            case Directions.DOWN:
            case Directions.RIGHT:
            case Directions.LEFT:
                this.xPosition += direction.dx * this.speed * TILESIZE;
                this.yPosition += direction.dy * this.speed * TILESIZE;
            break;
            default:
                throw new Error("invalid direction")

        }
    }

    
}

