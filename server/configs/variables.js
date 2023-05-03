module.exports = {
    PORT: process.env.PORT || 3001,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CONFIRMACCOUNT_URL:process.env.CONFIRMACCOUNTURL,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bookShop',

    ACCESS_TOKEH_SECRET: process.env.ACCESS_TOKEH_SECRET || 'ThIsMuStBeSeCrEtMaYbE_4ccess',
    REFRESH_TOKEH_SECRET: process.env.REFRESH_TOKEH_SECRET || 'ThIsMuStBeSeCrEtMaYbE_Refresh',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS,

    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,

};