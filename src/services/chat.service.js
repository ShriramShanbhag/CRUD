import { PERMISSIONS } from "../config/permissions.js";
import AppError from "../errors/AppError.js";
import chatRepo from "../repositories/chat.repository.js";
import { assertResourceAccess } from "../utils/authorization.js";

const ChatService = { 
    getChatById: async ({actor, resourceId}) => {
        const chat =  await chatRepo.findById(resourceId);
        if(!chat) throw new AppError("Not found", 404)
        assertResourceAccess(actor, chat.user_id, PERMISSIONS.CHAT_READ);
        return chat;
    },
    getMyChats: async ({actor}) => {
        return await chatRepo.findAllByUserId(actor.id);
    },
    getAllChatsByUser: async ({actor, user_id}) => {
        assertResourceAccess(actor, user_id, PERMISSIONS.CHAT_READALL);
        return await chatRepo.findAllByUserId(user_id);
    },
    createChat: async ({actor, body}) => {
        if (!body.title || !body.url || !body.platform) {
            throw new AppError("Title, URL, and Platform are required", 400);
        }
        return chatRepo.create({
            ...body,
            user_id: actor.id
        })
    },
    deleteChat: async ({actor, resourceId}) => {
        const chat = await chatRepo.findById(resourceId);
        if(!chat) throw new AppError("Chat does not exist", 404);
        assertResourceAccess(actor, chat.user_id, PERMISSIONS.CHAT_DELETE);
        return chatRepo.delete(resourceId);
    },
}

export default ChatService;