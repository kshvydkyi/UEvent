import { body } from 'express-validator';

export const createLocationValidationChainMethod = [
    body('title').exists({checkFalsy: true}).isString().withMessage("invalid Format"),
    body('description').exists({checkFalsy: true}).isString().withMessage("invalid Format"),
    body('country').exists({checkFalsy: true}).isString().withMessage("invalid Format"),
    body('city').exists({checkFalsy: true}).isString().withMessage("invalid Format"),
    body('street').exists({checkFalsy: true}).isString().withMessage("invalid Format"),
    body('house').exists({checkFalsy: true}).isString().withMessage("invalid Format"),
]