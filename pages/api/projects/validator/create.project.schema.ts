import Joi from "joi"
import CONST from '../../const'

export const Projectschema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    manager: Joi.string().required(),
    description: Joi.string().allow(null, ''),
    pmEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    type: Joi.string().default(CONST.RECORD_TYPE.PROJECT),
    disabled: Joi.boolean().default(false),
    internal: Joi.boolean().default(false)
})