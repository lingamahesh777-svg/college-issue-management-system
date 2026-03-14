import Joi from "joi";

export const createAnnouncementValidation = Joi.object({
  message: Joi.string().min(3).required(),
  image: Joi.any().optional(),
});

export const addCommentValidation = Joi.object({
  user: Joi.string().min(2).required(),
  comment: Joi.string().min(1).required(),
});
