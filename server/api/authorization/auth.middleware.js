const service = require('./auth.service');
const { OAuthService } = require('../../services');
const { Unauthorized } = require('../../errors/Apierror');
// const jwt = require('jsonwebtoken');


module.exports = {



    checkInputs: (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next();
        }

        try {

            const token = req.headers.authorization.split(' ')[1];// "Bearer TOKEN"

            if (!token) {
                return res.status(401).json({ message: 'Нет авторизации' });
            }

            // const decoded = jwt.verify(token, config.get('jwtSecret'));
            // req.user = decoded;
            next();

        } catch (e) {
            res.status(401).json({ message: 'Нет авторизации' });
        }
    },

    validateTokenDynamically: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
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