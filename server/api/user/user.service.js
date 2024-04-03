const User = require('../../dataBase/User');
const { OAuthService, fileService } = require('../../services');

module.exports = {
	getAllUsers: async () => {
		return await User.find();
	},

	getSingleUser: async userId => {
		return await User.findById(userId);
	},

	findUserByParams: searchObject => {
		return User.findOne(searchObject);
	},

	createUser: async userObject => {
		const hashPassword = await OAuthService.hashPassword(userObject.password);
		return User.create({ ...userObject, password: hashPassword });
	},

	updateUser: async (userId, userNewData) => {
		return User.findByIdAndUpdate(userId, userNewData);
	},

	deleteUserById: async userId => {
		return User.findByIdAndRemove(userId);
	},

	getAvatarList: async userId => {
		const data = await User.find(userId).sort({ updatedAt: -1 });
		return data.map(avatar => {
			return {
				'Link to avatar': avatar.avatarLink,
				'ID of avatar': avatar.id,
				'Added at': avatar.createdAt,
			};
		});
	},

	deleteUserAvatar: async avatarId => {
		const deletedItem = await User.findByIdAndDelete(avatarId);

		await fileService.deleteImageFromS3(deletedItem.avatarLink);
	},

	findAvatarById: async avatarId => {
		const data = await User.find(avatarId);
		return data.map(avatar => avatar.avatarLink);
	},

	isActualAvatarEquals: async (avatarId, userId) => {
		let imageLink = await User.find(avatarId);
		imageLink = imageLink.map(avatar => avatar.avatarLink);

		let actualAvatarLink = await User.find(userId);
		actualAvatarLink = actualAvatarLink.map(user => user.actualAvatarLink);

		if (imageLink.toString() === actualAvatarLink.toString()) {
			return true;
		} else {
			return false;
		}
	},
};
