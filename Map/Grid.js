/**
 * class grid
 */

class Grid {

    // Number, the width in pixels of the canvas
    canvasWidth;
    // Number, the height in pixels of the canvas
    canvasHeight;

    // Number, the number of pixels wide each tile of the grid will be
    tileSize;
    // Number, the height in tiles of the canvas
    height; 
    //  Number, the width in tiles of the canvas
    width;

    // n x n matrix of tile objects.
    tiles;


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

        // this.tiles = [this.width][this.height]
        console.log(this.tiles)

        // populate the tiles matrix with generic tile objects.
        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r] = (new Tile(c * this.tileSize, r * this.tileSize))
            }
        }

    }


    // Randomly generate the tile map of the current game floor.
    generateFloor(){
        this.clearFloor();
        //Set one tile to be the stairs:
        this.tiles[this.width - 3][3].setType(TileTypes.STAIRS)

    }

    // Reset all of the tiles to their default settings
    clearFloor(){
        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r].setType(TileTypes.FLOOR);
            }
        }

    }

    // Draw all of the tiles in the grid, and the debug lines.
    draw(ctx){

        for (let c = 0; c < this.width; c++){
            for (let r = 0; r < this.height; r++){
                this.tiles[c][r].draw(ctx);
                // console.log(this.tiles[c][r])

            }
        }


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



    //HELPER METHODS - TILE GRID NAVIGATION

}