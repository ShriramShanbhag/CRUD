import db from "../config/db.js";

const TagRepository = {
    create: async ({name}) => {
        const [tags] = await db('tags').insert({name}).returning('*');
        return tags
    },
    findByName: async ({name}) => {
        const [tags] = await db('tags').where({name});
        return tags || null;
    },
    findById: async (id) => {
        const [tags] = await db('tags').where({id});
        return tags || null;
    },
    findAll: async () => {
        const tags = await db('tags').select('*');
        return tags || [];
    },
    update: async ({id, name}) => {
        const [tags] = await db('tags').where({id}).update({name}).returning('*');
        return tags || null;
    },
    delete: async (id) => {
        const deletedCount = await db('tags').where({id}).del();
        return deletedCount > 0;
    },
    attachToChat: async ({chatId, tagId}) => {
        const [tag] = await db('tags').where({id: tagId});
        if(!tag) return null;
        const exists = await db('chat_tags').where({chat_id: chatId, tag_id: tagId}).first();
        if(exists) return tag;
        await db('chat_tags').insert({chat_id: chatId, tag_id: tagId});
        return tag;
    },
    detachFromChat: async ({chatId, tagId}) => {
        const deleted = await db('chat_tags').where({chat_id: chatId, tag_id: tagId}).del();
        return deleted > 0;
    }
}

export default TagRepository;