import Joi from "joi"
import CONST from '../../const'

export const Userschema = Joi.object({
    name: Joi.string().required(),
    // type: Joi.string().valid('user', 'trainee', 'batch', 'project'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    photoURL: Joi.string().allow(null, ''),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    type: Joi.string().default(CONST.RECORD_TYPE.USER),
    disabled: Joi.boolean().default(false)
})