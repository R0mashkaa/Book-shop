const authRouter = require('express').Router();

const controller = require('./auth.controller');
const authMdlwr = require('./auth.middleware');
const userMdlwr = require('../user/user.middleware');


authRouter.post('/', userMdlwr.emailOrLoginAuthorization, controller.userLogin);
authRouter.post('/logout', authMdlwr.validateTokenDynamically('accessToken'), controller.userLogoutSingleDevice);
authRouter.post('/logoutAll', authMdlwr.validateTokenDynamically('accessToken'), controller.userLogoutAllDevice);


module.exports = authRouter;