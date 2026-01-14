import AppError from "../errors/AppError.js";
import { ROLE_PERMISSIONS } from "../config/permissions.js";

const verifyOwnership = (actor, resourceId) => {
    return actor.id == resourceId;
}

export const assertResourceAccess = (actor, resourceId, permissionType) => {
    if(actor.role === 'admin') return;
    if(!verifyOwnership(actor, resourceId)) {
        throw new AppError('Forbidden', 403);
    }
}

