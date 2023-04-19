const { WELCOME, BANNED, FORGOT_PASSWORD } = require ('../configs/emailTypes.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'Welcome',
        subject: 'Welcome to the platform'
    },

    [FORGOT_PASSWORD]: {
        templateName: 'ForgotPassword',
        subject: 'Forgot password'
    },

    [BANNED]: {
        templateName: 'Banned',
        subject: 'Your account was banned'
    }
};