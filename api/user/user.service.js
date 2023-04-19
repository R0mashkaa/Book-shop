const User = require('../../dataBase/User');
const Avatar = require('../../dataBase/userAvatar');
const { OAuthService, fileService } = require('../../services');

module.exports = {
    getAllUsers: async () => {
        return await User.find();
    },
  
    getSingleUser: async (userId) => {
        return await User.findById(userId);
    },

    findUserByParams: (searchObject) => {
        return User.findOne(searchObject);
    },
  
    createUser: async (userObject) => {
        const hashPassword = await OAuthService.hashPassword(userObject.password);
        return User.create({ ...userObject, password: hashPassword });
    },

    updateUser: async (userId, userNewData) => {
        return User.findByIdAndUpdate(userId, userNewData);
    },

    deleteUserById: async (userId) => {
        return  User.findByIdAndRemove(userId);
    },


    getAvatarList: async (userId) => {
        const data = await Avatar.find(userId).sort({ updatedAt: -1 });
        return data.map((avatar) => {
            return {
                'Link to avatar': avatar.avatarLink,
                'ID of avatar': avatar.id,
                'Added at': avatar.createdAt
            };
        });
    },
        
    addUserAvatar: async (linkToAvatar, userId) => {
        return Avatar.create( {avatarLink: linkToAvatar, user: userId });
    },

    deleteUserAvatar: async(avatarId) => {
        const deletedItem = await Avatar.findByIdAndDelete(avatarId);

        await fileService.deleteImageFromS3(deletedItem.avatarLink);
    },

    findAvatarById: async (avatarId) => {
        const data = await Avatar.find(avatarId);
        return data.map( (avatar) => avatar.avatarLink );
    },

    isActualAvatarEquals: async (avatarId, userId) => {
        let imageLink = await Avatar.find(avatarId);
        imageLink = imageLink.map((avatar) => avatar.avatarLink);
        
        let actualAvatarLink = await User.find(userId);
        actualAvatarLink = actualAvatarLink.map((user) => user.actualAvatarLink); 
  
        if (imageLink.toString() === actualAvatarLink.toString()) {
            return true;
        }
        else {
            return false;
        }
    }

};