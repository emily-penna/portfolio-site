/**
 * Abstract class entity
 * An entity is an object that exists in the tile grid and can be collided with.
 * 
 * @class Entity
 */
class Entity {

    /**
     * Construct an Entity
     * @param {Number} [x] 
     * @param {Number} [y] 
     */
    constructor(x = 0, y = 0){

        // START VARIABLE DECLARATION ---------------------------------

        /**
         * x Coordinate of the current tile obj is standing on.
         * @type {Number}
         * */
        this.xPosition;

        /**
         * y Coordinate of the current tile obj is standing on.
         * @type {Number}
         */
        this.yPosition;

        // END VARIABLE DECLARATION -----------------------------------
        
        this.setPosition(x, y);
    }

    /**
     * What should happen on a collision with this object by another entity
     * @param {Entity} other 
     */
    onCollision(other){
        throw new Error("Method 'onCollision()' must be implemented.")
    }

    /**
     * Sets the Entites position as the given coordinates
     * @param {Number} x 
     * @param {Number} y 
     */
    setPosition(x, y){
        this.xPosition = x;
        this.yPosition = y;
    }

    /**
     * Draw the Entity
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx){
        throw new Error("Method 'draw()' must be implemented.")
    }

    /**
     * How the Entity should update every frame
     * @param {Number} dt 
     */
    update(dt){
        throw new Error("Method 'update(dt)' must be implemented.")
    }
}