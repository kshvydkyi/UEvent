import { body } from 'express-validator';

export const createCompanyValidationChainMethod = [
    body('title')
    .exists({checkFalsy: true})
    .isString()
    .isLength({min: 3, max: 23})
    .withMessage('Invalid format in company title'),
    body('description')
    .exists({checkFalsy: true})
    .isString()
    .isLength({min: 10, max: 100})
    .withMessage('Invalid format in company description'),
    body('userId')
    .exists({checkFalsy: true})
    .isNumeric()
    .withMessage('Invalid format in company owner')
]

export const titleValidationChainMethod = [
    body('title')
    .exists({checkFalsy: true})
    .isString()
    .isLength({min: 3, max: 23})
    .withMessage('Invalid format in title'),
]

export const updateCompanyValidationChainMethod = [
    body('title')
    .exists({checkFalsy: true})
    .isString()
    .isLength({min: 3, max: 23})
    .withMessage('Invalid format in company title'),
    body('description')
    .exists({checkFalsy: true})
    .isString()
    .isLength({min: 10, max: 100})
    .withMessage('Invalid format in company description'),
]