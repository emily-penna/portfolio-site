

/** The amount of gold rewarded to the player on collection */
const TreasureTypes = Object.freeze(
    {
        GOLD: {value: 1, color: "gold"},  
        CHEST: {value: 5, color: "gold"},
    }
);

/**
 * Collectable gold in the level. The player collides with the treasure to collect it.
 */
class Treasure extends Entity{

    /**
     * Construct a Treasure Entity
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {TreasureTypes} type 
     */
    constructor(x, y, type=TreasureTypes.GOLD){
        super(x,y);

        // START VARIABLE DECLARATIONS ---------------------------------

        /** 
         * The type of treasure. Dictates value and texture. 
         * @type {TreasureTypes}
         * */
        this.type; 

        /** 
         * Whether or not this treasure has been collected, and should be destroyed 
         * @type {boolean}
         * */
        this.collected;

        // END VARIABLE DECLARATIONS -----------------------------------
        
        this.type  = type;
        this.collected = false;
    }

    /**
     * Returns the gold value of this Treasure
     * @returns {Number}
     */
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