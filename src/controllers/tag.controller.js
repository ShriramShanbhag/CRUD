import tagService from "../services/tag.service.js";

export const createTag = async ({req, res, next}) => {
    try {
        const tag = await tagService.createTag({
            actor: req.user,
            body: req.body
        })
        res.status(201).json(tag); 
    } catch (error) {
        next(error);
    }
}

export const getAllTags = async ({req, res, next}) => {
    try {
        const tags = await tagService.getAllTags()
        res.status(200).json(tags);
    } catch (error) {
        next(error)
    }
}

export const deleteTag = async ({req, res, next}) => {
    try {
        const deleted = await tagService.deleteTag({
            actor: req.user,
            resourceId: req.params.id
        })
        if(!deleted) return res.status(500).send("Failed to delete. Something went wrong");
        res.status(200).send(`Deleted tag successfully`);
    } catch (error) {
        next(error)
    }
}

export const updateTag = async ({req, res, next}) => {
    try {
        const tag = await tagService.updateTag({
            actor: req.user,
            resourceId: req.params.id,
            body: req.body
        })
        if(tag) return res.status(200).json(tag);
        res.status(500).send("Failed to update. Something went wrong")
    } catch (error) {
        next(error);
    }
}

export const addTagToChat = async ({req, res, next}) => {
    try {
        const { chatId, tagId, tagName } = req.body
        const tag = await tagService.attachTagToChat({
            actor: req.user,
            chatId,
            tagId,
            tagName
        })
        if(tag) return res.status(200).send();
        res.status(500).send("Failed adding tag to the chat");
    } catch (error) {
        next(error)
    }
}

export const detachTagFromChat = async ({req, res, next}) => {
    try {
        const { chatId } = req.body;
        const detached = await tagService.detachTagFromChat({
            actor: req.user,
            chatId,
            tagId: req.params.tagId
        })
        if(detached) return res.json(200).send();
        res.json(500).send("Failed to remove tag")
    } catch (error) {
        next(error);
    }
}