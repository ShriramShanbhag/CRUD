import userRepo from "../repositories/user.repository.js"
import AppError from "../errors/AppError.js";
import { assertOwnershipOrAdmin, assertOwnership, assertAdmin, assertCanAccessUser } from "../utils/authorization.js";
import { toUserResponse } from "../serializers/user.serializer.js";
const UserSerivice = {
    createUser: async ({name, email}) => {
        if(!name || !email) {
            throw new Error("Name and email are required");
        }
        const userExists = await userRepo.findByEmail(email);
        if(userExists) {
            throw new Error("User with this email already exists");
        }
        return userRepo.create({name, email});
    },
    getAllUsers: async (actor) => {
        assertAdmin(actor);
        const users = await userRepo.findAll();
        if(!users) {
            throw new AppError("No users found", 404);
        }
        return users.map((u) => toUserResponse(u));
    },  
    getUserById: async ({resourceId, actorId, actorRole}) => {
        assertOwnershipOrAdmin(actorId, resourceId);
        const user = await userRepo.findById(resourceId);
        if(!user) {
            throw new AppError("User not found", 404);
        } 
        return toUserResponse(user);
    },
    getMe: async({actor}) => {
        console.log(actor)
        const user = await userRepo.findById(actor.id);
        if(!user) {
            throw new AppError("Something went wrong");
        }
        return toUserResponse(user);
    },
    updateUser: async ({resourceId, actor, body}) => {
        assertCanAccessUser(actor, resourceId)
        const user = await userRepo.findById(resourceId);
        if(!user) {
            throw new AppError("User not found", 404);
        }
        if(body.email) {
            const userWithEmail = await userRepo.findByEmail(body.email);
            if(userWithEmail && userWithEmail.id !== id) {
                throw new Error("Another user with this email already exists");
            }
        }
        return userRepo.update(id, {name: body.name, email: body.email});
    },
    deleteUser: async ({actor, resourceId}) => {
        assertCanAccessUser(actor, resourceId)
        const user = await userRepo.findById(resourceId);
        if(!user) {
            throw new AppError("User not found", 404);
        }
        return userRepo.delete(id);
    }
}

export default UserSerivice;