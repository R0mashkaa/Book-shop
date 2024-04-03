const accountRouter = require('express').Router();

const userController = require('../user/user.controller');
const authController = require('../authorization/auth.controller');
const authMdlwr = require('../authorization/auth.middleware');
const userMdlwr = require('../user/user.middleware');


accountRouter.post('/sendConfirmation', userMdlwr.getUserDynamically('email', 'body'), authController.sendConfirmAccount);
accountRouter.get('/confirmation/:actionToken', authController.setConfirmAccount);

accountRouter.post('/password/sendForgot', userMdlwr.getUserDynamically('email', 'body'), authController.sendForgotPasswordEmail);
accountRouter.get('/password/forgot/:actionToken', authController.setForgotPassword);

accountRouter.post('/refresh', userMdlwr.getUserDynamically('email', 'body'), authMdlwr.validateTokenDynamically('refreshToken'), authController.refreshToken);

accountRouter.use('/:userId',authMdlwr.validateTokenDynamically('accessToken'),userMdlwr.getUserDynamically('userId', 'params', '_id'));
accountRouter.get('/profile', userController.getMyProfile);
accountRouter.get('/:userId/avatar', userController.showAllUserAvatars);
accountRouter.post('/:userId/avatar',userMdlwr.checkUserAvatar,userController.uploadUserAvatar);
accountRouter.delete('/:userId/avatar/:avatarId', userController.deleteUserAvatar);

module.exports = accountRouter;
