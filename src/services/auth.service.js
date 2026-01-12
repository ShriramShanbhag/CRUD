import AppError from "../errors/AppError.js";
import userRepo from "../repositories/user.repository.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10; 

const AuthService = {
    register: async ({name, email, password}) => {
        const userExists = await userRepo.findByEmail(email);
        if(userExists) {
            throw new AppError("Email already in use", 409)
        }
        // hash the passowrd
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await userRepo.create({
            name, 
            email, 
            password_hash
        })

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        }

    },
    login: async ({email, password}) => {
        const user = await userRepo.findByEmail(email);
        if(!user) {
            throw new AppError("Incorrect username or password", 401);
        }
        // Check if password hash matches hash for the user stored in DB
       const match = await bcrypt.compare(password, user.password_hash);
        // if yes, return the token
        if(!match) {
            throw new AppError("Incorrect username or password", 401);
        }
        const token = jwt.sign({userId: user.id, userRole: user.role}, process.env.JWT_SECRET, { expiresIn: '7d' });
        return {
            user : {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    }
}

export default AuthService;