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
    /**Number, the radius in pixels of the playable area */
    radius;

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

        //create circular border around the walkable floor.
        this.radius = Math.min(height, width)/2;
        let circ = (2 * Math.PI * this.radius);

        // walk around the circumference of a circle
        for (let theta = 0; theta <= 360; theta++){
            let radians = theta * Math.PI/180;
            let x = this.radius * Math.cos(radians);
            let y = this.radius * Math.sin(radians);

            // calculations need to consider the offset of the center not being at 0,0
            x = x + this.canvasWidth/2
            y = y + this.canvasHeight/2

            let tile = this.getTileIndexFromWorldCoordinates(x, y)
            if (tile){
                this.tiles[tile.x][tile.y].setType(TileTypes.WALL);
            } 

        }

    }


    /** Randomly generate the tile map of the current game floor.*/
    generateFloor(){
        this.clearFloor();
        //Set one tile to be the stairs:
        this.tiles[this.width - 3][3].setType(TileTypes.STAIRS)
        
        this.setRandomTile(TileTypes.HOLE)
        this.setRandomTile(TileTypes.HOLE)

        //Set one tile to be the player spawn.
        this.startTile = this.setRandomTile(TileTypes.START)

        //Set one tile to be the stairs:
        this.tiles[this.width - 3][3].setType(TileTypes.STAIRS)
    }

    /** Reset all of the tiles to their default settings */
    clearFloor(){
        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                if (this.tiles[c][r].type != TileTypes.WALL){
                    this.tiles[c][r].setType(TileTypes.FLOOR);
                }
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

    /**Draw the lines of the grid. and center dot */
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


        // center dot
        ctx.beginPath();
        ctx.arc(this.canvasWidth/2, this.canvasHeight/2, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath()

        //circular border
        ctx.beginPath();
        ctx.arc(this.canvasWidth/2, this.canvasHeight/2, this.radius, 0, Math.PI * 2);
        ctx.stroke()

    }

    /**Returns true if the given movableEntity is projected to be on the stair tile. */
    IsOnStairs(entity){
        let coords = this.getTileIndexFromWorldCoordinates(entity.targetX, entity.targetY);
        return this.tiles[coords.x][coords.y].type === TileTypes.STAIRS;
    }

    /** Returns the player's start position */
    getPlayerStart(){
        return {x: this.startTile.position.x, y: this.startTile.position.y};
    }

    /** Set a random tile in the grid to the given type */
    setRandomTile(type){
        let pos = this.getRandomTile();
        this.tiles[pos.x][pos.y].setType(type);
        return this.tiles[pos.x][pos.y];
    }   




    //HELPER METHODS - TILE GRID NAVIGATION

    /** Returns true if the given world position cooresponds to a valid walkable tile. */
    IsTileWalkable(x, y){
        let tile = this.getTileFromWorldCoordinates(x, y)

        if (tile instanceof Tile){
            return tile.isWalkable();
        }
        return false;
    }

    /** Returns true if the given moveable entities target position is valid and walkable. */
    IsProspectivePositionWalkable(entity){
        return this.IsTileWalkable(entity.targetX, entity.targetY)
    }

    /** Returns true if giving index is within the generated group of tiles. */
    isValidTileIndex(x, y){
        return (x >= 0 && x < this.width && y >=0 && y < this.height)
    }

    /** Returns a copy of the tile in the give position */
    getTileFromWorldCoordinates(xPosition, yPosition){
        let x = Math.floor(xPosition / this.tileSize);
        let y = Math.floor(yPosition / this.tileSize);

        if (this.isValidTileIndex(x,y)){
            return this.tiles[x][y];
        }
    }

    /**Returns the tile position nearest to the given world coordinates */
    getTileIndexFromWorldCoordinates(xPosition, yPosition){
        let x = Math.floor(xPosition / this.tileSize);
        let y = Math.floor(yPosition / this.tileSize);

        if (this.isValidTileIndex(x,y)){
            return {x: x, y: y};
        }
    }

    /**Returns the world coordinates that are snapped to the nearest tile. */
    getSnappedWorldCoordinates(xPosition, yPosition){
        let coords = this.getTileIndexFromWorldCoordinates(xPosition, yPosition);
        return this.tiles[coords.x][coords.y].position;
    }

    /**returns a random, non-wall, tile position in the grid */
    getRandomTile(){

        let x = 0;
        let y = 0;

        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        }while (this.tiles[x][y].type == TileTypes.WALL)
        
        return {x: x, y: y}
    }



    

}