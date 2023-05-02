const Joi = require('joi');

const { AUTHOR_REGEXP } = require('../../configs/regexp.enum');

const joiValidatorSchema = Joi.object({

    bookName: Joi.string().required().min(4).max(32).error(new Error('Book name is not valid')),
    author: Joi.string().regex(AUTHOR_REGEXP).required().min(4).max(32).error(new Error('Author name is not valid')),
    releaseDate: Joi.number().required().min(1450).max(new Date().getFullYear() + 10).error(new Error(`Release data is not valid from 1450 to ${new Date().getFullYear() + 10}`)),

});


module.exports = {
    joiValidatorSchema
};