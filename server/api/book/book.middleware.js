const bookService = require('./book.service');
const Book = require('../../dataBase/Book');
const { joiValidatorSchema } = require('./book.validator');
const { IMAGE_MAX_SIZE,  IMAGE_MIMETYPES } = require('../../configs/file.configs');
const { NotFound, BadRequest, Conflict } = require('../../errors/Apierror');
// const rolesEnum = require('../../configs/roles.enum');



module.exports = {
    getUserDynamically: (paramName, from, dbField = paramName) => async (req, res, next) => {
        try {
            const searchData = req[from][paramName];
            const book = await bookService.findBookByParams({ [dbField]: searchData });
	
            if (!book) {
                throw new NotFound('Book not found');
            }
	
            req.locals = { ...req.locals, book };
	
            next();
        } catch (e) {
            next(e);
        }
    },

    createValidator: async (req, res, next) => {
        try {
            const { error } = joiValidatorSchema.validate(req.body);
	
            if(error){
                throw new BadRequest(error);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
	
    isInfoRepeats:  async (req, res, next) => {
        try {
            const bookName = req.body?.bookName;

            if(await Book.findOne({bookName})){
                throw new Conflict('This book name used, try another one');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    // isUserRole: (requiredRoles)  => async (req, res, next) => { // TODO permission requets
    //     try {
    //         console.log("=============================");
    //         console.log(Object.values(rolesEnum));
    //         console.log("=============================");
    //         if (rolesEnum != requiredRoles) {
    //             throw new Conflict('Not enough permission');
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    checkBookAvatar: (req, res, next) => {
        try {
            if (!req.files?.avatar) {
                throw new BadRequest('No file');
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > IMAGE_MAX_SIZE) {
                throw new BadRequest(`File ${name} is too big`);
            }

            if (!IMAGE_MIMETYPES.includes(mimetype)) {
                throw new BadRequest('Not valid file type');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};