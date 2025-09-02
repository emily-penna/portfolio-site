/**
 * The Grid holds the matrix of floor tiles.
 */

class Grid {

    /**Number, the width in pixels of the canvas */
    canvasWidth;
    /**Number, the height in pixels of the canvas */
    canvasHeight;

    /**Number, the number of pixels wide each tile of the grid will be */
    tileSize;
    /**Number, the height in tiles of the canvas */
    height; 
    /**Number, the width in tiles of the canvas */
    width;

    /** n x n matrix of tile objects.*/
    tiles;

    /**Reference to the starttile */
    startTile;


    constructor(width, height, tileSize){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.tileSize = tileSize;

        this.width = Math.ceil(this.canvasWidth / tileSize);
        this.height = Math.ceil(this.canvasHeight / tileSize);

        // NOTE: initalizing the matrix this way as opposed to:
        // this.tiles = Array(this.width).fill(new Array(this.height));
        // was necessary to prevent each column of the matrix from being the exact same (share the same reference)
        this.tiles = Array(this.width);
        for (let c = 0; c < this.width; c++){
            this.tiles[c] = Array(this.height);
        }

        // populate the tiles matrix with generic tile objects.
        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r] = (new Tile(c * this.tileSize, r * this.tileSize))
            }
        }

    }


    /** Randomly generate the tile map of the current game floor.*/
    generateFloor(){
        this.clearFloor();
        //Set one tile to be the stairs:
        this.tiles[this.width - 3][3].setType(TileTypes.STAIRS)
        
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)
        this.tiles[this.getRandomTile().x][this.getRandomTile().y].setType(TileTypes.HOLE)

        //Set one tile to be the player spawn.
        this.startTile = this.tiles[this.getRandomTile().x][this.getRandomTile().y]
        this.startTile.setType(TileTypes.START)

        //Set one tile to be the stairs:
        this.tiles[this.width - 3][3].setType(TileTypes.STAIRS)
    }

    /** Reset all of the tiles to their default settings */
    clearFloor(){
        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r].setType(TileTypes.FLOOR);
            }
        }

    }

    /**Draw all of the tiles in the grid */
    draw(ctx){

        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r].draw(ctx);
                // console.log(this.tiles[c][r])

            }
        }

    }

    /**Draw the lines of the grid. */
    debugDraw(ctx){

        ctx.beginPath();

        // draw horizontal grid lines
        for (let r = 0; r < this.height; r++){
            ctx.moveTo(0, r * this.tileSize);
            ctx.lineTo(this.canvasWidth, r * this.tileSize)
        }

        // draw vertical grid lines
        for (let c = 0; c < this.width; c++){
        ctx.moveTo(c * this.tileSize, 0);
        ctx.lineTo(c * this.tileSize, this.canvasHeight) 
        }
        ctx.stroke();

    }

    /**Returns true if the given entity is on the stair tile. */
    IsOnStairs(entity){
        let coords = this.getTileCoordinatesFromWorldCoordinates(entity.xPosition, entity.yPosition);
        return this.tiles[coords.x][coords.y].type === TileTypes.STAIRS;
    }



    //HELPER METHODS - TILE GRID NAVIGATION

    /**Returns the tile position nearest to the given world coordinates */
    getTileCoordinatesFromWorldCoordinates(xPosition, yPosition){
        let x = Math.floor(xPosition / this.tileSize);
        let y = Math.floor(yPosition / this.tileSize);

        return {x: x, y: y};
    }

    /**Returns the world coordinates that are snapped to the nearest tile. */
    getSnappedWorldCoordinates(xPosition, yPosition){
        let coords = this.getTileCoordinatesFromWorldCoordinates(xPosition, yPosition);
        return this.tiles[coords.x][coords.y].position;
    }

    /**returns a random tile position in the grid */
    getRandomTile(){
        return {x: Math.floor(Math.random() * this.width), y: Math.floor(Math.random() * this.height)}
    }



    

}