import userSerivice from "../services/user.service.js";
export const createUser = async(req, res, next) => {
    try {
        const user = await userSerivice.createUser({actor: req.user, body: req.body});
        if(user) {
            res.status(201).json(user);
        }
    } catch (error) {
        next(error);
    }
}
export const getUserById = async(req, res, next) => {
    try {
        const user = await userSerivice.getUserById({
            resourceId: req.params.id, 
            actor: req.user
        });
        if(!user) return res.status(404).send("User does not exist");
        res.json(user)
    } catch (error) {
        next(error)
    }
}
export const getAllUsers = async(req, res, next) => {
    try {
        const users = await userSerivice.getAllUsers(req.user);
        return res.json(users);
    } catch (error) {
        next(error);
    }
}
export const getMe = async(req, res, next) => {
    try {
        const user = await userSerivice.getMe({actor: req.user});
        return res.json(user)
    } catch (error) {
        next(error);
    }
}
export const updateUser = async(req, res, next) => {
    try {
        const user = await userSerivice.updateUser({
            resourceId: req.params.id, 
            actor: req.user, 
            body: req.body,
        });
        if(user) {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async(req, res, next) => {
    try {
        
        const deleted = await userSerivice.deleteUser({
            resourceId: req.params.id, 
            actor: req.user,
        });
        if(deleted) return res.status(204).send();
        res.json(404).send('User does not exist');
    } catch (error) {
        next(error)
    }
}