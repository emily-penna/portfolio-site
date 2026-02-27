/**
 * Game Constants.
 */

//GLOBAL
/** the size of a tile on the grid, in pixels */
export const TILESIZE = 20; 
/** the time in milliseconds it takes for a turn to resolve */
export const TURN_TIME = 200;

//PLAYER
/** The starting hit points of the player */
export const PLAYER_HEALTH = 5;
/** The number of tiles the player moves with an input. */
export const PLAYER_SPEED = 1;

//MAP
/** Debug Mode. Draw a line grid and circle of the playable area */
export const DEBUG_MODE = false;

/**
 * Global Enums
 */

/**
 * Enum cardinal directions.
 * @readonly
 * @enum {{name: string, dx: Number, dy: Number}}
 */
export const Directions = Object.freeze(
    {
        UP: {name: "up", dx: 0, dy: -1},
        DOWN: {name: "down", dx: 0, dy: 1},
        RIGHT: {name: 'right', dx: 1, dy: 0},
        LEFT: {name: 'left', dx: -1, dy: 0},
        NONE: {name: 'none', dx: 0, dy: 0}
    }
);



/**
 * Global Functions
 */

/** Returns true if the two values are equal to eachother within a difference of epsilon */
export function approximatelyEqual(a, b, epsilon){
    return Math.abs(a - b) <= epsilon
}

