const Joi = require("joi");

const registrationValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().required(),
  contact: Joi.string().required(),
  country: Joi.string().required(),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const createChildValidator = Joi.object({
  parentId: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().min(1).required(),
  gender: Joi.string().required(),
});

module.exports = {
  loginValidator,
  registrationValidator,
  createChildValidator,
};
