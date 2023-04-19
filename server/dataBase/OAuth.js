const mongoose = require('mongoose');

const OAuthScheme = new mongoose.Schema({
    accessToken: { type: String, trim: true, required: true },
    refreshToken: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'User', required: true },
},
{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('OAuth', OAuthScheme);