const Joi = require('joi')

const { AUTHOR_REGEXP } = require('../../configs/regexp.enum')

const joiValidatorSchema = Joi.object({
  bookName: Joi.string()
    .required()
    .min(4)
    .max(32)
    .error(new Error('Book name is not valid')),
  author: Joi.string()
    .regex(AUTHOR_REGEXP)
    .required()
    .min(4)
    .max(32)
    .error(new Error('Author name is not valid')),
  description: Joi.string()
    .max(256)
    .error(new Error('Description too long, maximum 256')),
  releaseDate: Joi.number()
    .required()
    .min(1450)
    .max(new Date().getFullYear() + 10)
    .error(
      new Error(
        `Release data is not valid from 1450 to ${
          new Date().getFullYear() + 10
        }`,
      ),
    ),
  tags: Joi.array().optional()
})

module.exports = {
  joiValidatorSchema,
}
