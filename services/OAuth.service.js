const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequest, Unauthorized, ServerError } = require('../errors/Apierror');
const { ACCESS_TOKEH_SECRET, REFRESH_TOKEH_SECRET } = require ('../configs/variables');
const { FORGOT_PASSWORD, CONFIRM_ACCOUNT } = require('../configs/actionTokenTypes.enum');

const hashPassword = (userPassword) => bcrypt.hash(userPassword, 10);

const checkPasswords = async (hashedUserPassword, userPassword) => {
    const isPasswordsEquals = await bcrypt.compare(userPassword, hashedUserPassword); 

    if(!isPasswordsEquals){
        throw new BadRequest('Email or password is wrong');
    }
};

const generateAccessTokenPair = (encodeData = {}) => {
    const accessToken = jwt.sign(encodeData, ACCESS_TOKEH_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(encodeData, REFRESH_TOKEH_SECRET, {expiresIn: '30d'});


    return {
        accessToken,
        refreshToken
    };
};

const generateActionToken = (actionType, encodeData = {}) => {
    let expiresIn = '24h';
    let secretWord = '';

    switch(actionType){
    case FORGOT_PASSWORD:
        secretWord = 'Forgot password';
        break;

    case CONFIRM_ACCOUNT:
        expiresIn = '72h',
        secretWord = 'Confirm account';
        break;

    default:
        throw new ServerError('Wrong actionToken type');
    }

    return jwt.sign(encodeData, secretWord, { expiresIn });
};

const validateToken = (tokenType = '', tokenData = '') => {
    try{
        switch(tokenType) {
        case 'accessToken':
            tokenType = ACCESS_TOKEH_SECRET;
            break;

        case 'refreshToken':
            tokenType = REFRESH_TOKEH_SECRET;
            break;
        
        case 'Forgot password':
            tokenType = FORGOT_PASSWORD;
            break;
            
        
        case 'Confirm account':
            tokenType = CONFIRM_ACCOUNT;
            break;
            
        default:
            throw new BadRequest('Wrong token type');
        }

        return jwt.verify(tokenData, tokenType);
    }
    catch(e){
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

