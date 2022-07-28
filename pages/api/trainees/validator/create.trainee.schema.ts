import Joi from "joi"
import CONST from '../../const'
export const TraineeSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    secondaryEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).allow(null, ''),
    primarySkills: Joi.string().required(),
    secondarySkills: Joi.string().allow(null, ''),
    batchId: Joi.string().allow(null, ''),
    resume: Joi.string().allow(null, ''),
    projectId: Joi.string().allow(null, ''),
    traningFeedback: Joi.string().allow(null, ''),
    joinedOn: Joi.date().raw().required(),
    trainingComplededOn: Joi.date().raw().allow(null, ''),
    rating: Joi.number().valid(0, 1, 2, 3, 4, 5),
    onInternship: Joi.boolean().default(false),
    type: Joi.string().default(CONST.RECORD_TYPE.TRAINEE),
    onBench: Joi.boolean().default(false),
    mentorName: Joi.string().allow(null, ''),
    trainingLevel: Joi.string().default(CONST.TRAINING_STAGE.BASIC).valid(CONST.TRAINING_STAGE.BASIC, CONST.TRAINING_STAGE.ADVANCED, CONST.TRAINING_STAGE.PROJECT_SPECIFIC),
    trainingStatus: Joi.string().default(CONST.TRAING_STATUS.NOT_STARTED).valid(CONST.TRAING_STATUS.NOT_STARTED, CONST.TRAING_STATUS.IN_PROGRESS, CONST.TRAING_STATUS.COMPLETED, CONST.TRAING_STATUS.ON_HOLD)
})