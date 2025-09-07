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
    /** Whether or not this treasure has been collected, and should be destroyed */
    collected;

    constructor(x, y, type=TreasureTypes.GOLD){
        super(x,y);
        this.type  = type;
        this.collected = false;
    }

    getValue(){
        return this.type.value;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.xPosition, this.yPosition, TILESIZE, TILESIZE);
        ctx.fillStyle = this.type.color;
        ctx.fill();
        ctx.closePath();  
    }

    update(dt){
        
    }

    onCollision(other){
        console.log("collected!")
        this.collected = true;
    }
}