import { body } from 'express-validator';

export const registerValidateChainMethod = [
    body('login')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Login must be a string')
    .isLength({ min: 3, max: 24 })
    .withMessage('Length must be 3-24 characters')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the username'),
  body('password')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Password must be a string')
    .custom((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value))
    .withMessage('Password is weak'),
  body('confirmPassword')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Password confirmation must be a string')
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
    }),
    body('email')
      .isEmail()
      .withMessage("invalid format"),
    body('fullName')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('invalid format')
];

export const loginValidateChainMethod = [
    body('login').exists({ checkFalsy: true }).isString().withMessage('Login must be a string'),
    body('password').exists({ checkFalsy: true }).isString().withMessage('Password must be a string')
];

export const updatePasswordValidateChainMethod = [
    body('password')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Password must be a string')
      .custom((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value))
      .withMessage('Password is weak'),
    body('confirmPassword')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Password confirmation must be a string')
      .custom(async (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
      })
  ];