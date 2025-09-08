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
                if (entity.xPosition == e.xPosition && entity.yPosition == e.yPosition){
                    entity.onCollision(e);
                    e.onCollision(entity);
                }
            }
            
            
        })
    }
}