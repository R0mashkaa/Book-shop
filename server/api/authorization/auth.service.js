const OAuth = require('../../database/OAuth');
const ActionToken = require('../../database/actionToken');


module.exports = {
    createOauthPair: (tokenData) => {
        return OAuth.create(tokenData);
    },
	
    getByParams: (searchData = {}) => {
        return OAuth.findOne(searchData).populate('user');
    },
	
    deleteOneByParams(deleteData = {}) {
        return OAuth.deleteOne(deleteData);
    },
	
    deleteManyByParams(deleteData = {}) {
        return OAuth.deleteMany(deleteData);
    },

    
    createActionToken: (tokenData) => {
        return ActionToken.create(tokenData);
    },

    deleteActionTokenByParams: (deleteData) => {
        return ActionToken.deleteOne(deleteData);
    },

    getActionTokenByParams: (searchData = {}) => {
        return ActionToken.findOne(searchData).populate('user');
    },
};