/***
 * Represents a tile in the map grid.
 */

// Possible tile types.
TileTypes = Object.freeze(
    {
        FLOOR: {name: "floor", walkable: true, color: "brown"},  
        HOLE: {name: "hole", walkable: false, color: "black"},
        STAIRS: {name: "stairs", walkable: true, color: "blue"},
        START: {name: "start", walkable: true, color: "yellow"},
        WALL: {name: "wall", walkable: false, color: "navy"}

    }
);

class Tile {

    //Type of the tile. Dictates its behavior when interacted with by an Entity.
    type;

    //Tile positions originate in the top left corner of the tile.
    //Number, x Coordinate of the current tile. In world coordinates. constant.
    xPosition;
    //Number, y Coordinate of the current tile. In world coordinates. constant.
    yPosition;

    //World position:
    position;


    constructor(x, y, type = TileTypes.FLOOR) {
        this.type = type;
        this.xPosition = x;
        this.yPosition = y;

        this.position = {x: x, y: y}
        
    }

    setType(type){
        this.type = type;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.xPosition, this.yPosition, TILESIZE, TILESIZE);
        ctx.fillStyle = this.type.color;
        ctx.fill();
        ctx.closePath();  
    }
}