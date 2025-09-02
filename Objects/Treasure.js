/**
 * Collectable gold in the level. The player collides with the treasure to collect it.
 */

// Possible tile types.
 /** The amount of gold rewarded to the player on collection */
TreasureTypes = Object.freeze(
    {
        GOLD: {value: 1, color: "gold"},  
        CHEST: {value: 5, color: "gold"},
    }
);

class Treasure extends Entity{

    /** The type of treasure. Dictates value and texture. */
    type; 

    constructor(x, y, type=TreasureTypes.GOLD){
        super(x,y);
        this.type  = type;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.xPosition, this.yPosition, TILESIZE, TILESIZE);
        ctx.fillStyle = this.type.color;
        ctx.fill();
        ctx.closePath();  
    }
}