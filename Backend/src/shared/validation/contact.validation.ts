import Joi from "joi";

export const createMessageValidation = {
  payload: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  }),
};
