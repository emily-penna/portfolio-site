/**
 * Game Constants.
 */

//GLOBAL
/** the size of a tile on the grid, in pixels */
const TILESIZE = 20; 
/** the time in milliseconds it takes for a turn to resolve */
const TURN_TIME = 200;

//PLAYER
const PLAYER_HEALTH = 5;
const PLAYER_SPEED = 1;

//MAP
const DEBUG_MODE = false;

/**
 * Functions
 */

function approximatelyEqual(a, b, epsilon){
    return Math.abs(a - b) <= epsilon
}