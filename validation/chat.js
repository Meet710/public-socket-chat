const Joi = require('joi')
const APIError = require('../utils/APIError')

exports.validateUser = (req, res, next) => {
    let payload = Joi.object({
        name: Joi.string().regex(/^[A-Za-z\s]+$/).min(3).required().messages({
            'string.pattern.base': 'Enter Valid Name',
            'any.required': `Enter The Name`,
            'string.min': 'Enter at least 3 characters in Name'
        }),
        
        email:Joi.string().email({ tlds: { allow: false } }).custom((value, helpers) => {
            if (value !== value.toLowerCase()) {
                return helpers.message('Email must be in lowercase');
            }
            return value;
        }).required().messages({
            'string.base': 'Enter a valid email address',
            'string.email': 'Enter a valid email address',
            'any.required': 'Enter the email'
        }),

        dob: Joi.date()
        .requ
        .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)) // Setting the maximum date to 18 years ago
        .messages({
            'date.base': "Enter a valid date",
            'any.required': 'Enter the date of birth',
            'date.max': 'You must be at least 18 years old',
        }),
        username: Joi.string().pattern(/^[a-z]+[0-9]+$/).min(4).required().messages({
            'string.pattern.base': 'Enter Valid Username',
            'any.required':'Enter the username'
        }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required().messages({
            'string.pattern.base': 'Enter Valid password',
            'any.required': `Enter the password`  
        })
       
        
    });
    let validation = payload.validate(req.body)
    if (validation.error) {
        throw new APIError(validation.error.message,422)
      }
      next();
}

exports.validateLogin = (req, res, next) => { 
    let payload = Joi.object({
        username: Joi.string().pattern(/^[a-z]+[0-9]+$/).min(4).required().messages({
            'string.pattern.base': 'Enter Valid Username',
            'string.min': 'Enter at least 4 characters in Username'
        }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required().messages({
            'string.pattern.base': 'Enter Valid password',
            'any.required': `Enter the password`  
        }),
        room: Joi.string().regex(/^[A-Za-z]+$/).required().messages({
            'string.pattern.base': 'Select Valid Room',
            'any.required': `Select Room`,
           
        }),
    });
    let validation = payload.validate(req.body)
    if (validation.error) {
        throw new APIError(validation.error.message,'422')
      }
      next();
}