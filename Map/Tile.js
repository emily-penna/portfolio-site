/** 
 * All Possible tile types and their attributes 
 * @readonly
 * @enum {{name: string, walkable: boolean, color: string}}
 * */
const TileTypes = Object.freeze(
    {
        FLOOR: {name: "floor", walkable: true, color: "brown"},  
        HOLE: {name: "hole", walkable: true, color: "black"},
        STAIRS: {name: "stairs", walkable: true, color: "blue"},
        START: {name: "start", walkable: true, color: "gray"},
        WALL: {name: "wall", walkable: false, color: "navy"}

    }
);

/**
 * Represents a tile in the map grid.
 */
class Tile {

    constructor(x, y, type = TileTypes.FLOOR) {

        // START VARIABLE DECLARATIONS -------------------------------

        /**
         * Type of the tile. Dictates its behavior when interacted with by an Entity.
         * @type {TileTypes}
         * */
        this.type;

        //Tile positions originate in the top left corner of the tile.
        /**
         * x Coordinate of the current tile. In world coordinates. constant.
         * @type {Number}
         * */
        this.xPosition;

        /**
         * y Coordinate of the current tile. In world coordinates. constant.
         * @type {Number}
         * */
        this.yPosition;

        /**
         * World position, as coordinates
         * @type {{x: Number, y: Number}}
         * */
        this.position

        // END VARIABLE DECLARATIONS ---------------------------------

        this.type = type;
        
        this.xPosition = x;
        this.yPosition = y;

        this.position = {x: x, y: y}
        
    }

    /**
     * Change the type of the tile to the given type
     * @param {TileTypes} type 
     */
    setType(type){
        this.type = type;
    }

    /**
     * Returns true if Tile allows an entity to walk upon it
     * @returns {boolean}
     */
    isWalkable(){
        return this.type.walkable;
    }

    /**
     * Draw all of the tiles in the grid
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.xPosition, this.yPosition, TILESIZE, TILESIZE);
        ctx.fillStyle = this.type.color;
        ctx.fill();
        ctx.closePath();  
    }
}