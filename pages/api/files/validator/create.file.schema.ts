import Joi from "joi"

export const Fileschema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().allow(null, ''),
    id: Joi.string().required(),
    operation: Joi.string().required().default("getObject").valid("getObject", "putObject")
})