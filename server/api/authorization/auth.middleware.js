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
			const token = req.headers.authorization.split(' ')[1];

			if (!token) {
				return res.status(401).json({ message: 'Token doesn`t exist' });
			}

			const decoded = jwt.verify(token, config.get('jwtSecret'));
			req.user = decoded;
			next();
		} catch (e) {
			res.status(401).json({ message: 'Token doesn`t exist' });
		}
	},

	validateTokenDynamically: tokenType => async (req, res, next) => {
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

	validateActionToken: async (actionType, token) => {
		try {
			if (!token) {
				throw new Unauthorized('Token doesn`t exist');
			}

			OAuthService.validateToken(actionType, token);

			const actionTokenWithUser = await service.getActionTokenByParams({
				token,
				actionType,
			});

			if (!actionTokenWithUser) {
				throw new Unauthorized('Invalid token');
			}

			await service.deleteActionTokenByParams({ token });
			return actionTokenWithUser
		} catch (e) {
			console.log(e);
		}
	},
};
