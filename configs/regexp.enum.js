module.exports = {
    LOGIN_REGEXP: new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'),
    EMAIL_REGEXP: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEXP: new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),

    FULLNAME_REGEXP: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,

    BOOKNAME_REGEXP: /^[A-Za-zа-яА-Я0-9\s\-_,\\.:;()''""]+$/,
    AUTHOR_REGEXP: /^[a-zA-Zа-щьюяґєіїА-ЩЬЮЯҐЄІЇа-щьюяґєії ]+$/
};