const service = require('./auth.service');
const { OAuthService } = require('../../services');
const { Unauthorized } = require('../../errors/ApiError');

module.exports = {
    validateTokenDynamically: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if(!token){
                throw new Unauthorized('Token doesn`t exist');
            }

            OAuthService.validateToken(tokenType, token);

            const tokenWithUser = await service.getByParams({ [tokenType]: token });    
            

            if (!tokenWithUser) {
                throw new Unauthorized('Token is invalid');
            }
      
            req.user = tokenWithUser.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateActionToken: (actionType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');
    
            if (!token) {
                throw new Unauthorized('No token');
            }
            
            OAuthService.validateToken(actionType, token);
            
            const actionTokenWithUser = await service.getActionTokenByParams({ token, actionType });
    
            if (!actionTokenWithUser) {
                throw new Unauthorized('Invalid token');
            }
    
            req.user = actionTokenWithUser.user;
            await service.deleteActionTokenByParams({ token });
            next();
        } catch (e) {
            next(e);
        }
    },
};