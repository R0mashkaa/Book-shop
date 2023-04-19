const mongoose = require('mongoose');

const userAvatarScheme = new mongoose.Schema({
    avatarLink: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('user_avatar', userAvatarScheme);