const bookService = require('./book.service');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');
const { fileService } = require('../../services');

module.exports = { 

    getAllBook: async (req, res, next) => {
        try {
            const allBooksList = await bookService.getAllBooks();

            res.json(allBooksList);
        } catch (e) {
            next(e);
        }
    },

    getBookById: async (req, res, next) => {
        try {
            res.json(req.locals.book);
        } catch (e) {
            next(e);
        }
    },
  
    createBook: async (req, res, next) => {
        try {
            const createdBook = await bookService.createBook(req.body);

            res.status(CREATED).json(createdBook);
        } catch (e) {
            next(e);
        }
    },

    updateBook: async (req, res, next) => {
        try {
            const updatedBook = await bookService.updateBook(req.params.bookId, req.body);
			
            res.json(updatedBook);
        } catch (e) {
            next(e);
        }
    },

    deleteBook: async (req, res, next) => {
        try {
            await bookService.deleteBook(req.params.bookId);
			
            res.status(NO_CONTENT).json('Book deleted');
        } catch (e) {
            next(e);
        }
    },


    showAllBookAvatars: async (req, res, next) => {
        try {
            const avatars = await bookService.getAvatarList({ book: req.params.bookId });
            res.json(avatars);
        } catch (e) {
            next(e);
        }
    },

    uploadBookAvatar: async (req, res, next) => {
        try {
            const { bookId } = req.params;
            let avatarLinkData = await fileService.uploadFileToS3(req.files.avatar, bookId, 'book');

            avatarLinkData = 'https://rocket2proj.s3.us-east-1.amazonaws.com/' + avatarLinkData;
            await bookService.addBookAvatar(avatarLinkData, bookId);
            await bookService.updateBook(bookId, { actualAvatarLink: avatarLinkData });

            res.json(avatarLinkData);
        } catch (e) {
            next(e);
        }
    },
    
    deleteBookAvatar: async (req, res, next) => {
        try {
            const { avatarId, bookId } = req.params;
            const isImageEquals = await bookService.isActualAvatarEquals({ _id: avatarId, }, { _id: bookId });

            if (isImageEquals) {
                await bookService.updateBook(bookId, { actualAvatarLink: '' });
            }

            await bookService.deleteBookAvatar(avatarId);

            const avatars = await bookService.getAvatarList({ book: bookId });

            res.json(avatars);
        } catch (e) {
            next(e);
        }
    }

};