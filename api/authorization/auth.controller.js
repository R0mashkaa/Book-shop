const authService = require('./auth.service');
const userService = require('../user/user.service');
const { OAuthService, emailService } = require('../../services');
const { NO_CONTENT } = require('../../errors/error.codes');
const { BadRequest, Conflict, Unauthorized } = require('../../errors/Apierror');
const { FRONTEND_URL } = require('../../configs/variables');
const { FORGOT_PASSWORD, WELCOME } = require('../../configs/emailTypes.enum');
const { FORGOT_PASSWORD: forgotPasswordAction, CONFIRM_ACCOUNT: сonfirmAccountAction } = require('../../configs/actionTokenTypes.enum');

module.exports = {
    userLogin: async (req, res, next) => {
        try {
            const user = req.locals.user;

            if (user.accountStatus === 'Pending') {
                throw new BadRequest('Account not confirmed.');
            }

            if (user.accountStatus === 'Banned') {
                throw new Unauthorized('Your account banned.');
            }

            await OAuthService.checkPasswords(user.password, req.body.password);
            const tokenPair = OAuthService.generateAccessTokenPair( { ...user } );
            await authService.createOauthPair({ ...tokenPair, user: user._id });
			
            res.json({
                ...tokenPair,
                user
            });
        } catch (e) {
            next(e);
        }
    },

    userLogoutSingleDevice: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            await authService.deleteOneByParams({ accessToken });
	
            res.status(NO_CONTENT).json('Logouted');
        } catch (e) {
            next(e);
        }
    },

    userLogoutAllDevice: async (req, res, next) => {
        try {
            await authService.deleteManyByParams({ user: req.user._id });

            res.status(NO_CONTENT).json('Logouted on all devices');
        } catch (e) {
            next(e);
        }
    },

    sendForgotPasswordEmail: async (req, res, next) => {
        try {
            const user = req.locals.user;
            const forgotPasswordToken = OAuthService.generateActionToken(
                forgotPasswordAction,
                { email: user.email }
            );
            
            await authService.createActionToken({
                actionType: forgotPasswordAction,
                tokenData: forgotPasswordToken,
                user: req.locals.user._id
            });

            const forgotPassURL = `${FRONTEND_URL}/password/forgot?token=${forgotPasswordToken}`;

            await emailService.sendMail(user.email, FORGOT_PASSWORD, { forgotPassURL } );

            res.json('Email sent'); 
        } catch (e) {
            next(e);
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const { _id: userId } = req.user;

            const hashPassword = await OAuthService.hashPassword(req.body.password);
            await userService.updateUser(userId, { password: hashPassword });
            await authService.deleteManyByParams({ user: userId });
            
            res.json('Password changed. Logouted from all devices'); 
        } catch (e) {
            next(e);
        }
    },

    sendConfirmAccount: async (req, res, next) => {
        try {
            const user = req.locals.user;

            if (user.accountStatus != 'Pending') {
                throw new Conflict('You account is confirmed');
            }

            const confirmAccountToken = OAuthService.generateActionToken(
                сonfirmAccountAction,
                { email: user.email }
            );
            
            await authService.createActionToken({
                actionType: сonfirmAccountAction,
                tokenData: confirmAccountToken,
                user: req.locals.user._id
            });

            const confirmAccountURL = `${FRONTEND_URL}/api/auth/confirmation/${confirmAccountToken}`;

            await emailService.sendMail(user.email, WELCOME, { confirmAccountURL, name: user.loginName });

            res.json('Email sent');
        } catch (e) {
            next(e);
        }
    },

    setConfirmAccount: async (req, res, next) => {
        try {
            const { _id: userId } = req.user;
            await userService.updateUser(userId, { accountStatus: 'Active' });
            
            res.json('Account confirmed'); 
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const user = req.user;
            const refreshToken = req.get('Authorization');

            await userService.deleteOneByParams({ refreshToken });
            const updatedTokenPair = OAuthService.generateAccessTokenPair({ ...user });

            await userService.createOauthPair({ ...updatedTokenPair, user: user._id });
            res.json({ 
                ...updatedTokenPair,
                user 
            });
        } catch (e) {
            next(e);
        }
    }
};