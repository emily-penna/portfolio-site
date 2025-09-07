/**
 * Abstract class entity
 * An entity is an object that exists in the tile grid and can be collided with.
 * 
 * @class Entity
 */

class Entity {

    //Number, x Coordinate of the current tile obj is standing on.
    xPosition;
    //Number, y Coordinate of the current tile obj is standing on.
    yPosition;
    
    constructor(x = 0, y = 0){
       this.setPosition(x, y);
    }

    //what should happen on a collision with this object by another entity
    onCollision(other){
        throw new Error("Method 'onCollision()' must be implemented.")
    }

    setPosition(x, y){
        this.xPosition = x;
        this.yPosition = y;
    }

    draw(canvas){
        throw new Error("Method 'draw()' must be implemented.")
    }


    update(dt){
        throw new Error("Method 'update(dt)' must be implemented.")
    }
}