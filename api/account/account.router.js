const accountRouter = require('express').Router();

const userController = require('../user/user.controller');
const authController = require('../authorization/auth.controller');
const authMdlwr = require ('../authorization/auth.middleware');
const userMdlwr = require('../user/user.middleware');
const { FORGOT_PASSWORD, CONFIRM_ACCOUNT } = require ('../../configs/actionTokenTypes.enum');


accountRouter.get('/Profile', authMdlwr.validateTokenDynamically('accessToken'), userController.getMyProfile);

accountRouter.post('/confirmation', userMdlwr.getUserDynamically('email','body'), authController.sendConfirmAccount);
accountRouter.patch('/confirmation', authMdlwr.validateActionToken(CONFIRM_ACCOUNT), authController.setConfirmAccount);

accountRouter.post('/password/forgot', userMdlwr.getUserDynamically('email','body'), authController.sendForgotPasswordEmail);
accountRouter.patch('/password/forgot', authMdlwr.validateActionToken(FORGOT_PASSWORD), authController.setForgotPassword);

accountRouter.post('/refresh', userMdlwr.getUserDynamically('email', 'body'), authMdlwr.validateTokenDynamically('refreshToken'), authController.refreshToken);

accountRouter.patch('/:userId/avatar/:avatarId', authMdlwr.validateTokenDynamically('accessToken'), userController.updateUserAvatar);
accountRouter.use('/:userId', authMdlwr.validateTokenDynamically('accessToken'), userMdlwr.getUserDynamically('userId','params','_id'));
accountRouter.get('/:userId/avatar', userController.showAllUserAvatars);
accountRouter.post('/:userId/avatar', userMdlwr.checkUserAvatar, userController.uploadUserAvatar);
accountRouter.delete('/:userId/avatar/:avatarId', userController.deleteUserAvatar);


module.exports = accountRouter;
