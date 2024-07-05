import Joi from "joi";

export const validateBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
