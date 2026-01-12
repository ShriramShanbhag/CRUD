import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError("Authentication required", 401));
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: payload.userId,
            role: payload.userRole
        }
        next();
    } catch (error) {
        next(new AppError("Invalid or expired token", 401));
    }

}