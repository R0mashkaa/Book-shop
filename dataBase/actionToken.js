const mongoose = require('mongoose');

const ActionTokenScheme = new mongoose.Schema({
    tokenData: { type: String, trim: true, required: true },
    actionType: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('Action_Token', ActionTokenScheme);