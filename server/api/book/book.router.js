const bookRouter = require('express').Router();

const controller = require('./book.controller');
const service = require('./book.service');
const bookMdlwr = require('./book.middleware');

bookRouter.get('/', controller.getAllBook);
bookRouter.post( '/', bookMdlwr.createValidator, bookMdlwr.isInfoRepeats, controller.createBook);
bookRouter.get('/:keyword', service.getBookByParams);

// bookRouter.use('/:bookId', bookMdlwr.getUserDynamically('bookId','params','_id'));
bookRouter.get('/:bookId', controller.getBookById);
bookRouter.put('/:bookId', bookMdlwr.createValidator, controller.updateBook);

bookRouter.delete('/:bookId', controller.deleteBook);

module.exports = bookRouter;
