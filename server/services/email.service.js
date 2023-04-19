const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('node:path');

const templatesInfo = require('../emailTemplates');
const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASS, FRONTEND_URL } = require ('../configs/variables');
const { ServerError } = require('../errors/Apierror');

const sendMail = (reciverEmail, emailType, context = {}) => { 
    context = context || {};
    const HBSoptions = {
        extName: '.hbs',
        viewPath: path.join(global.rootPath, 'emailTemplates', 'views'),
        viewEngine: {
            defaultLayout: 'main',
            layoutsDir: path.join(global.rootPath, 'emailTemplates', 'layouts'),
            partialsDir: path.join(global.rootPath, 'emailTemplates', 'partials'),
            extname: '.hbs'
        },
    };
    
    const templateConfig = templatesInfo[emailType];
    
    if(!templateConfig) {
        throw new ServerError('Wrong template name');
    }

    Object.assign(context  || {}, { frontendURL: FRONTEND_URL } );

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASS 
        }
    });

    transporter.use('compile', hbs(HBSoptions));

    return transporter.sendMail({
        from: 'No reply',
        to: reciverEmail,
        subject: emailType,
        template: templateConfig.templateName,
        context
    });
};

module.exports = {
    sendMail
};