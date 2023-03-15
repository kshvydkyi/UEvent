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

export const updateEventValidationChainMethod = [
    body('title').exists({checkFalsy: true}).isString().withMessage("Invalid format"),
    body('description').exists({checkFalsy: true}).isString().withMessage("Invalid format"),
    body('company_id').exists({checkFalsy: true}).isNumeric().withMessage("Invalid format"),
    body('format_id').isNumeric().withMessage("Invalid format"),
    body('event_pic').isString().custom((value) => /\.(gif|jpg|JPG|jpeg|tiff|png)$/.test(value)).withMessage("Invalid format")
]