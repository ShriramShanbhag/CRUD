import AppError from "../errors/AppError.js";
import { ROLE_PERMISSIONS } from "../config/permissions.js";

export const requirePermission = (requiredPermission) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        const userPermissions = ROLE_PERMISSIONS[userRole] || [];

        if(!userPermissions.includes(requiredPermission)) {
            return next(new AppError("Forbidden", 403));
        }

        next();
    }
}