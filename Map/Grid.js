/**
 * The Grid holds the matrix of floor tiles.
 */

class Grid {

    /**
     * Create a grid of tiles.
     * @param {Number} width the width in pixels of the canvas
     * @param {Number} height the height in pixels of the canvas
     * @param {Number} tileSize the size of a tile on the grid, in pixels
     */
    constructor(width, height, tileSize){

        // START VARIABLE DECLARATIONS ---------------------------------

        /**
         * the width in pixels of the canvas
         * @type {number}
         * */
        this.canvasWidth;

        /**
         * the height in pixels of the canvas 
         * @type {number}
         * */
        this.canvasHeight;

        /**
         * the number of pixels wide each tile of the grid will be 
         * @type {number}
         * */
        this.tileSize;

        /**
         * the height in tiles of the canvas 
         * @type {number}
         * */
        this.height; 

        /**
         * the width in tiles of the canvas 
         * @type {number}
         * */
        this.width;

        /**
         * the radius in pixels of the playable area 
         * @type {number}
         * */
        this.radius;

        /**
         * width x height matrix of tile objects.
         * @type {number[][]}
         * */
        this.tiles;

        /**
         * Reference to the starttile, where the player spawns 
         * @type {Tile}
         * */
        this.startTile;

        /**
         * the rate of how many hole tiles should be spawned, 
         * as a function of the current floor. 
         * @type {number}
         * */
        this.spawnRate = 2; 

        // END VARIABLE DECLARATIONS ---------------------------------

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
        // right isosceles triangle, furthest point is radical 2 * radius
        // Can alter the max position to change the thickness of tower wall.
        // Potentially add a sky texture past the wall?
        // let maxPos = Math.pow(2, 0.5)* Math.max(height,width)/2;
        let maxPos = Math.pow(2, 0.5)*this.radius;

        // walk around the circumference of a circle
        for (let theta = 0; theta <= 360; theta++){
            let radians = theta * Math.PI/180;
            //walk from the radius onwards.
            for(let r = this.radius; r <= maxPos; r++){
                
                let x = r * Math.cos(radians);
                let y = r * Math.sin(radians);

                // calculations need to consider the offset of the center not being at 0,0
                x = x + this.canvasWidth/2
                y = y + this.canvasHeight/2

                let tile = this.getTileIndexFromWorldCoordinates(x, y)
                if (tile){
                    this.tiles[tile.x][tile.y].setType(TileTypes.WALL);
                } else {
                    // cut walking around the radius early if we already hit out of bounds
                    break;
                }
            }
            
        }

    }


    /**
     * Randomly generate the tile map of the current game floor.
     * @param {Number} floorNum The current floor of the room we are generating
     */
    generateFloor(floorNum){
        this.clearFloor();
        
        for (let i = 0; i < floorNum * this.spawnRate; i++){
            this.setRandomTile(TileTypes.HOLE)
        }

        //Set one tile to be the player spawn.
        this.startTile = this.setRandomTile(TileTypes.START)

        //Set one tile to be the stairs:
        this.setRandomTile(TileTypes.STAIRS)
    }

    /** 
     * Reset all of the tiles to their default settings 
     * */
    clearFloor(){
        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                if (this.tiles[c][r].type != TileTypes.WALL){
                    this.tiles[c][r].setType(TileTypes.FLOOR);
                }
            }
        }

    }

    /**
     * Draw all of the tiles in the grid
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx){

        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r].draw(ctx);
                // console.log(this.tiles[c][r])
            }
        }

    }

    /**
     * Draw a line grid and circle of the playable area 
     * @param {CanvasRenderingContext2D} ctx 
     */
    debugDraw(ctx){

        ctx.beginPath();
        ctx.strokeStyle ="white";

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

 
    /**
     * Returns true if the given movableEntity is projected to be on the stair tile.
     * @param {Entity} entity 
     * @returns {boolean}
     */
    IsOnStairs(entity){
        let coords = this.getTileIndexFromWorldCoordinates(entity.targetX, entity.targetY);
        return this.tiles[coords.x][coords.y].type === TileTypes.STAIRS;
    }

    
    /**
     * Returns the player's start position
     * @returns {{x: Number, y: Number}}
     */
    getPlayerStart(){
        return {x: this.startTile.position.x, y: this.startTile.position.y};
    }

    /**
     * Set a random tile in the grid to the given type
     * @param {TileTypes} type 
     * @returns {Tile}
     */
    setRandomTile(type){
        let pos = this.getRandomTilePosition();
        this.tiles[pos.x][pos.y].setType(type);
        return this.tiles[pos.x][pos.y];
    }   




    //HELPER METHODS - TILE GRID NAVIGATION

    /** 
     * Returns true if the given world position cooresponds to a valid walkable tile. 
     * @param {number} x the x world position.
     * @param {number} y the y world position.
     * @returns {boolean} 
     */
    IsTileWalkable(x, y){
        let tile = this.getTileFromWorldCoordinates(x, y)

        if (tile instanceof Tile){
            return tile.isWalkable();
        }
        return false;
    }

    /**
     * Returns true if the given moveable entities target position is valid and walkable. 
     * @param {Entity} entity 
     * @returns {boolean}
     */
    IsProspectivePositionWalkable(entity){
        return this.IsTileWalkable(entity.targetX, entity.targetY)
    }

    /**
     * Returns true if giving index is within the generated group of tiles.
     * @param {Number} x 
     * @param {Number} y 
     * @returns {boolean}
     */
    isValidTileIndex(x, y){
        return (x >= 0 && x < this.width && y >=0 && y < this.height)
    }

    /**
     * Returns a copy of the tile in the given position 
     * @param {Number} xPosition 
     * @param {Number} yPosition 
     * @returns {Tile}
     */
    getTileFromWorldCoordinates(xPosition, yPosition){
        let x = Math.floor(xPosition / this.tileSize);
        let y = Math.floor(yPosition / this.tileSize);

        if (this.isValidTileIndex(x,y)){
            return this.tiles[x][y];
        }
    }

    
    /**
     * Returns the tile position nearest to the given world coordinates
     * @param {Number} xPosition 
     * @param {Number} yPosition 
     * @returns {{x: Number, y: Number}} grid indices
     */
    getTileIndexFromWorldCoordinates(xPosition, yPosition){
        let x = Math.floor(xPosition / this.tileSize);
        let y = Math.floor(yPosition / this.tileSize);

        if (this.isValidTileIndex(x,y)){
            return {x: x, y: y};
        }
    }


    /**
     * Returns the world coordinates that are snapped to the nearest tile.
     * @param {Number} xPosition 
     * @param {Number} yPosition 
     * @returns {{x: Number, y: Number}} world coordinates
     */
    getSnappedWorldCoordinates(xPosition, yPosition){
        let coords = this.getTileIndexFromWorldCoordinates(xPosition, yPosition);
        return this.tiles[coords.x][coords.y].position;
    }

    /**
     * Returns a random, non-wall, tile position in the grid 
     * @returns {{x: Number, y: Number}} grid indices
     */
    getRandomTilePosition(){

        let x = 0;
        let y = 0;

        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        }while (!this.tiles[x][y].isWalkable())
        
        return {x: x, y: y}
    }

    /**
     * Get the world coordiantes of a random tile on the grid
     * @returns {{x: Number, y: Number}} world coordinates
     */
    getRandomSnappedWorldPosition(){
        let pos = this.getRandomTilePosition()
        let tile = this.tiles[pos.x][pos.y];
        return {x: tile.xPosition, y: tile.yPosition}
    }



    

}