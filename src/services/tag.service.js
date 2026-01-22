import { PERMISSIONS } from "../config/permissions.js";
import AppError from "../errors/AppError.js"
import tagRepo from "../repositories/tag.repository.js"
import chatRepo from "../repositories/chat.repository.js"
import { assertResourceAccess } from "../utils/authorization.js"

const TagService = {
    getTagById: async ({actor, resourceId}) => {
        const tag = await tagRepo.findById(resourceId);
        if(!tag) throw new AppError('Not found', 404);
        return tag;
    },
    getAllTags: async () => {
        return await tagRepo.findAll();
    },
    createTag: async ({actor, body}) => {
        if(actor.role !== 'admin') throw new AppError('Forbidden', 403);
        const {name} = body || {};
        if(!name) throw new AppError("Name can't be empty", 400);
        const existing = await tagRepo.findByName({name});
        if(existing) throw new AppError('Tag already exists', 409);
        return await tagRepo.create({name});
    },
    updateTag: async ({actor, resourceId, body}) => {
        if(actor.role !== 'admin') throw new AppError('Forbidden', 403);
        const {name} = body || {};
        if(!name) throw new AppError("Name can't be empty", 400);
        const tag = await tagRepo.findById(resourceId);
        if(!tag) throw new AppError('Not found', 404);
        return await tagRepo.update({id: resourceId, name});
    },
    deleteTag: async ({actor, resourceId}) => {
        if(actor.role !== 'admin') throw new AppError('Forbidden', 403);
        const tag = await tagRepo.findById(resourceId);
        if(!tag) throw new AppError('Not found', 404);
        return await tagRepo.delete(resourceId);
    },
    attachTagToChat: async ({actor, chatId, tagId, tagName}) => {
        const chat = await chatRepo.findById(chatId);
        if(!chat) throw new AppError('Chat does not exist', 404);
        assertResourceAccess(actor, chat.user_id, PERMISSIONS.CHAT_UPDATE);
        let tag = null;
        if(tagId) {
            tag = await tagRepo.findById(tagId);
        } else if(tagName) {
            tag = await tagRepo.findByName({name: tagName});
        }
        if(!tag) throw new AppError('Tag not found', 404);

        return await tagRepo.attachToChat({chatId, tagId: tag.id});
    },
    detachTagFromChat: async ({actor, chatId, tagId}) => {
        const chat = await chatRepo.findById(chatId);
        if(!chat) throw new AppError('Chat does not exist', 404);
        assertResourceAccess(actor, chat.user_id, PERMISSIONS.CHAT_UPDATE);
        const tag = await tagRepo.findById(tagId);
        if(!tag) throw new AppError('Tag not found', 404);

        return await tagRepo.detachFromChat({chatId, tagId});
    }
}

export default TagService;