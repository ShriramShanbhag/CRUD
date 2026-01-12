import AppError from "../errors/AppError.js";

export const assertOwnership = (actorId, resourceOwnerId) => {
    console.log("Verifying ownership: ", "resourceId: ", resourceOwnerId, "actorId: ", actorId)
    if(actorId != resourceOwnerId){
        throw new AppError("Forbidden", 403);
    }
}

export const assertOwnershipOrAdmin = (actorId, actorRole, resourceId) => {
    if(actorRole === 'admin') return;
    assertOwnership(actorId, resourceId);
}

export const assertAdmin = (actor) => {
    if(actor.role !== 'admin') {
        throw new AppError("Forbidden", 403);
    }
}

export const assertCanAccessUser = (actor, resourceId) => {
    if(!actor) throw new AppError("Not Authenticated", 401)
    if(actor.role === 'admin') return;
    if(actor.id != resourceId) throw new AppError("Forbidden", 403);
}