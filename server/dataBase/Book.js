const mongoose = require('mongoose');

const BookScheme = new mongoose.Schema({

    bookName: { type: String, trim: true, required:true },
    author: { type: String, trim: true, required: true },
    releaseDate: { type: Number, trim: true, required: true },
    actualAvatarLink: { type: String, default: '' },
},
{
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Books', BookScheme);