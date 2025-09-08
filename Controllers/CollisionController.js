/**
 * Collision Controller checks for and resolves collisions between groups of Entities.
 * A collision only occurs if 2 entities share the same tile/space.
 */

class CollisionController {

    /** Resolve any collisions between a single moveable entity and a group of entities. */
    static resolveCollisions(entity, entities){

        entities.forEach(e => {

            if (e instanceof MoveableEntity){
                if (entity.targetX == e.targetX && entity.targetY == e.targetY){
                    entity.onCollision(e);
                    e.onCollision(entity);
                }
            }
            else {
                if (entity.targetX == e.xPosition && entity.targetY == e.yPosition){
                    entity.onCollision(e);
                    e.onCollision(entity);
                }
            }
            
            
        })
    }


    /** resolve collisions between moveable entities and the tile they are standing on */
    static resolveTileHazardCollisions(grid, other){

        // singleton collision
        if (other instanceof MoveableEntity){
            if (grid.getTileFromWorldCoordinates(other.targetX, other.targetY).type == TileTypes.HOLE){
                other.onCollision(TileTypes.HOLE);
            }
        } 
        // list of entities collisions
        else {
            other.forEach(e => {
            if (grid.getTileFromWorldCoordinates(e.targetX, e.targetY).type == TileTypes.HOLE){
                e.onCollision(TileTypes.HOLE);
            }
        })

        }

        

    }
}