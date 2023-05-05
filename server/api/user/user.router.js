const userRouter = require('express').Router();

const controller = require('./user.controller');
const userMdlwr = require('./user.middleware');


userRouter.get('/', controller.getAllUsers);
userRouter.post('/', userMdlwr.createValidator, userMdlwr.isEmailAndLoginExsist, controller.createUser);

userRouter.use('/:userId', userMdlwr.getUserDynamically('userId','params','_id'));
userRouter.get('/:userId', controller.getUserById);
userRouter.put('/:userId',  userMdlwr.createValidator, userMdlwr.isEmailAndLoginExsist, controller.updateUser);
userRouter.delete('/:userId', controller.deleteUser);


module.exports = userRouter;