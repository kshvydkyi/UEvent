import { body } from 'express-validator';

export const eventCreateValidationChainMethod = [
    body('title')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("invalid format of title"),
    body('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("invalid format of description"),
    body('format_id')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("invalid format of formatId"),
    body('company_id')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('invalid format of companyId'),
    // body('dateStart')
    //     .exists({ checkFalsy: true })
    //     .isISO8601()
    //     .withMessage('invalid format of dateStart')
]