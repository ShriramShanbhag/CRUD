import chatService from "../services/chat.service.js";
export const getChatById = async (req, res, next) => {
    try {
        const chat = await chatService.getChatById({
            actor: req.user,
            resourceId: req.params.id
        });
        if(!chat) return res.status(404).send("Chat not found");
        res.json(chat)
    } catch (error) {
        next(error);
    }
}

export const getMyChats = async (req, res, next) => {
    try {
        const chat = await chatService.getMyChats({
            actor: req.user
        })
        res.json(chat);
    } catch (error) {
        next(error);
    }
}

export const deleteChat = async (req, res, next) => {
    try {
        const deleted = await chatService.deleteChat({
            actor: req.user,
            resourceId: req.params.id
        });
        if(deleted) return res.status(200).send("Chat deleted successfully");
        res.status(500).send("Unable to delete");
    } catch (error) {
        next(error);
    }
}

export const createChat = async (req, res, next) => {
    try {
        const chat = await chatService.createChat({
            actor: req.user,
            body: req.body
        })
        res.status(201).json(chat);
    } catch (error) {
        next(error);
    }
}