const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Unauthorized, ServerError, BadRequest } = require('../errors/Apierror');
const { ACCESS_TOKEH_SECRET, REFRESH_TOKEH_SECRET, FORGOT_PASSWORD_SECRET, CONFIRM_ACCOUNT_SECRET, EXPIRES_IN_ACCESS_TOKEN, EXPIRES_IN_REFRESH_TOKEN, EXPIRES_IN_CONFIRM_ACCOUNT_TOKEN, EXPIRES_IN_FORGOT_PASSWORD_TOKEN } = require('../configs/variables');
const { FORGOT_PASSWORD, CONFIRM_ACCOUNT } = require('../configs/actionTokenTypes.enum');

const hashPassword = userPassword => bcrypt.hash(userPassword, 10);

const checkPasswords = async (hashedUserPassword, userPassword) => {
	const isPasswordsEquals = await bcrypt.compare(userPassword, hashedUserPassword);

	if (!isPasswordsEquals) {
		throw new BadRequest('Email or password is wrong');
	}
};

const generateAccessTokenPair = (encodeData = {}) => {
	const accessToken = jwt.sign(encodeData, ACCESS_TOKEH_SECRET, {
		expiresIn: EXPIRES_IN_ACCESS_TOKEN
	});
	const refreshToken = jwt.sign(encodeData, REFRESH_TOKEH_SECRET, {
		expiresIn: EXPIRES_IN_REFRESH_TOKEN
	});

	return {
		accessToken,
		refreshToken,
	};
};

const generateActionToken = (actionType, encodeData = {}) => {
	let expiresIn = '';
	let secretWord = '';

	switch (actionType) {
		case FORGOT_PASSWORD:
			secretWord = FORGOT_PASSWORD_SECRET;
			expiresIn = EXPIRES_IN_FORGOT_PASSWORD_TOKEN;
			break;

		case CONFIRM_ACCOUNT:
			expiresIn = EXPIRES_IN_CONFIRM_ACCOUNT_TOKEN;
			secretWord = CONFIRM_ACCOUNT_SECRET;
			break;

		default:
			throw new ServerError('Wrong actionToken type');
	}

	return jwt.sign(encodeData, secretWord, { expiresIn });
};

const validateToken = (tokenType = '', tokenData = '') => {
	try {
		switch (tokenType) {
			case 'accessToken':
				tokenType = ACCESS_TOKEH_SECRET;
				break;

			case 'refreshToken':
				tokenType = REFRESH_TOKEH_SECRET;
				break;

			case 'Forgot password':
				tokenType = FORGOT_PASSWORD_SECRET;
				break;

			case 'Confirm account':
				tokenType = CONFIRM_ACCOUNT_SECRET;
				break;

			default:
				throw new BadRequest('Wrong token type');
		}

		return jwt.verify(tokenData, tokenType);
	} catch (e) {
		throw new Unauthorized(e.message || 'Token is invalid');
	}
};

module.exports = {
	hashPassword,
	checkPasswords,

	generateAccessTokenPair,
	generateActionToken,
	validateToken,
};
