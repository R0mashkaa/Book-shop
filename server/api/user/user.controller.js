const userService = require('./user.service');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');
const { fileService } = require('../../services');
const { sendConfirmAccount } = require('../authorization/auth.controller');

module.exports = {
    getMyProfile: async (req, res, next) => {
        try {
            res.json({
                ...req.user.toObject(),
            });
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUsersList = await userService.getAllUsers();

            res.json(allUsersList);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.locals.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body);
            sendConfirmAccount(createdUser);

            res.status(CREATED).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await userService.updateUser(req.params.userId, req.body);
			
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await userService.deleteUserById(req.params.userId);
			
            res.status(NO_CONTENT).json('User deleted');
        } catch (e) {
            next(e);
        }
    },


    showAllUserAvatars: async (req, res, next) => {
        try {
            const avatars = await userService.getAvatarList({ user: req.params.userId });
            res.json(avatars);
        } catch (e) {
            next(e);
        }
    },

    uploadUserAvatar: async (req, res, next) => {
        try {
            const { userId } = req.params;
            let avatarLinkData = await fileService.uploadFileToS3(req.files.avatar, req.params.userId, 'user');

            avatarLinkData = 'https://rocket2proj.s3.us-east-1.amazonaws.com/' + avatarLinkData;
            await userService.updateUser(userId, { actualAvatarLink: avatarLinkData });

            res.json(avatarLinkData);
        } catch (e) {
            next(e);
        }
    },
    
    deleteUserAvatar: async (req, res, next) => {   // TODO DONT WORK DELETE. Rework delete user avatar. Cant get avatar link from database
        try {
            const { userId } = req.params;            
            await userService.deleteUserAvatar(userId);
            await userService.updateUser(userId, { actualAvatarLink: '' });
            res.status(NO_CONTENT).json('Photo deleted');
        } catch (e) {
            next(e);
        }
    }
};