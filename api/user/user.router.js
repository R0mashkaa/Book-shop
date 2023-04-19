const userRouter = require('express').Router();

const controller = require('./user.controller');
const Usermdlwr = require('./user.middleware');


userRouter.get('/', controller.getAllUsers);
userRouter.post('/', Usermdlwr.createValidator, Usermdlwr.isEmailAndLoginExsist, controller.createUser);

userRouter.use('/:userId', Usermdlwr.getUserDynamically('userId','params','_id'));
userRouter.get('/:userId', controller.getUserById);
userRouter.put('/:userId',  Usermdlwr.createValidator, Usermdlwr.isEmailAndLoginExsist, controller.updateUser);
userRouter.delete('/:userId', controller.deleteUser);


module.exports = userRouter;