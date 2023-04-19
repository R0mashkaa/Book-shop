const userService = require('./user.service');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');
const { fileService } = require('../../services');
const { BadRequest } = require('../../errors/Apierror');

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
            let avatarLinkData = await fileService.uploadFileToS3(req.files.avatar, userId, 'user');

            avatarLinkData = 'https://rocket2proj.s3.us-east-1.amazonaws.com/' + avatarLinkData;
            await userService.addUserAvatar(avatarLinkData, userId);
            await userService.updateUser(userId, { actualAvatarLink: avatarLinkData });

            res.json(avatarLinkData);
        } catch (e) {
            next(e);
        }
    },

    updateUserAvatar: async (req, res, next) => {
        try {
            const { avatarId, userId } = req.params;

            if (!avatarId) {
                throw new BadRequest('avatar ID not found');
            }

            const newAvatarLink = await userService.findAvatarById({ _id: avatarId });
            
            await userService.updateUser( userId, { actualAvatarLink: newAvatarLink.toString() });

            res.json({ 'newLink': newAvatarLink } );
        } catch (e) {
            next(e);
        }
    },
    
    deleteUserAvatar: async (req, res, next) => {
        try {
            const { avatarId, userId } = req.params;
            const isImageEquals = await userService.isActualAvatarEquals({ _id: avatarId, }, { _id: userId });

            if (isImageEquals) {
                await userService.updateUser(userId, { actualAvatarLink: '' });
            }

            await userService.deleteUserAvatar(avatarId);

            const avatars = await userService.getAvatarList({ user: userId });

            res.json(avatars);
        } catch (e) {
            next(e);
        }
    }

};