import Joi from "joi";

export const ChatSchema = Joi.object({
    fromId: Joi.number().required(),
    toId: Joi.string().required(),
    text: Joi.string().required(),
})