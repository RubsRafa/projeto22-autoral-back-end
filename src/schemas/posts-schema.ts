import { PostParams } from '../protocols';
import Joi from 'joi';

const isText = /^[\w\s]+$/;
const isImage = /\.(jpg|jpeg|png|gif)$/i;
const isVideo = /\.(mp4|avi|mov|wmv)$/i;

export const postsSchema = Joi.object<PostParams>({
    type: Joi.number().required(),
    video: Joi.string().regex(isVideo),
    image: Joi.string().regex(isImage),
    text: Joi.string().regex(isText),
})