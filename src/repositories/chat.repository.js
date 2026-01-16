import db from "../config/db.js";

const ChatRepository = {
    create: async({title, platform, url, user_id}) => {
        const [chats] = await db('chats')
        .insert({title, platform, url, user_id})
        .returning('*');
        return chats
    },
    update: async(id, {title, platform, url}) => {
        const [chats] = await db('chats')
        .where({id})
        .update({title, platform, url})
        .returning('*');
        return chats;
    },
    findById: async(id) => {
        const [chats] = await db('chats')
        .where({id})
        return chats || null;
    },
    findAllByUserId: async(user_id) => {
        const chats = await db('chats').where({user_id})
        return chats || []
    },
    delete: async(id) => {
        const deletedCount = await db('chats').where({id}).del();
        return deletedCount > 0;
    }
}

export default ChatRepository;