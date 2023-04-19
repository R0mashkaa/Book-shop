const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP, LOGIN_REGEXP, FULLNAME_REGEXP} = require('../../configs/regexp.enum');

const joiValidatorSchema = Joi.object({

    loginName: Joi.string().regex(LOGIN_REGEXP).required().min(4).max(32).error(new Error('Login is not valid')),
    fullName: Joi.string().regex(FULLNAME_REGEXP).required().min(4).max(32).error(new Error('Name is not valid')),
    email: Joi.string().regex(EMAIL_REGEXP).required().error(new Error('Email is not valid')),
    password: Joi.string().regex(PASSWORD_REGEXP).required().error(new Error('Password is not valid')),

    age: Joi.number().min(14).max(99).error(new Error('Age is not valid. Age must be more than 14 and less than 99')),
});


module.exports = {
    joiValidatorSchema
};