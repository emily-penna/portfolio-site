/**
 * Game Constants.
 */

//GLOBAL
/** the size of a tile on the grid, in pixels */
const TILESIZE = 15; 
/** the time in milliseconds it takes for a turn to resolve */
const TURN_TIME = 200;

//PLAYER
/** The starting hit points of the player */
const PLAYER_HEALTH = 5;
/** The number of tiles the player moves with an input. */
const PLAYER_SPEED = 1;

//MAP
/** Debug Mode. Draw a line grid and circle of the playable area */
const DEBUG_MODE = false;

/**
 * Global Functions
 */

/** Returns true if the two values are equal to eachother within a difference of epsilon */
function approximatelyEqual(a, b, epsilon){
    return Math.abs(a - b) <= epsilon
}