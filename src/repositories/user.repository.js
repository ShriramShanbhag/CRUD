import db from "../config/db.js";

const UserRepository = {
    create: async({name, email, password_hash }) => {
        const [user] = await db('users')
        .insert({name, email, password_hash})
        .returning('*');
        return user;
    },

    update: async(id, {name, email}) => {
        const [user] = await db('users')
        .where({id})
        .update({name, email})
        .returning('*');
        return user || null;
    },

    findById: async(id) => {
        const [user] = await db('users').where({id});
        return user || null;   
    },

    findAll: async () => {
        return db('users').select('*');
    },

    delete: async (id) => {
        const deletedCount = await db('users').where({id}).del();
        return deletedCount > 0;
    },

    findByEmail: async (email) => {
        const [user] = await db('users').where({email});
        return user || null;
    }
}

export default UserRepository;