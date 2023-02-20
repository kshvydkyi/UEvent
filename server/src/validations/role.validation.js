import { body } from 'express-validator';

export const roleValidationChainMethod = [
    body('title').exists({checkFalsy: true}).isString().withMessage('invalid format')
]