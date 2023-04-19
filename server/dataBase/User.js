const mongoose = require('mongoose');
const rolesEnum = require('../configs/roles.enum');

const secureFields = [ 'password' ];

const UserScheme = new mongoose.Schema({

    emailOrLogin: { type: String, trim: true },
    loginName: { type: String, trim: true, required: true },
    fullName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true }, 
    password: { type: String, required: true },
    age: { type: Number, default: '' },
    accountStatus: { type: String, default: 'Pending' },
    role: { type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER },
    actualAvatarLink: { type: String, default: '' },
},
{
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            for (const field of secureFields) {
                delete ret[field];
            }
	
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function(doc, ret) {
            for (const field of secureFields) {
                delete ret[field];
            }
	
            return ret;
        }
    }
}
);

module.exports = mongoose.model('User', UserScheme);