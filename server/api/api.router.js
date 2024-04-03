const apiRouter = require('express').Router();

const userRouter = require('./user/user.router');
const authRouter = require('./authorization/auth.router');
const bookRouter = require('./book/book.router');
const accountRouter = require('./account/account.router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/books', bookRouter);
apiRouter.use('/account', accountRouter);

module.exports = apiRouter;
