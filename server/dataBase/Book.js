const mongoose = require('mongoose');

const BookScheme = new mongoose.Schema({

    bookName: { type: String, trim: true, required:true },
    author: { type: String, trim: true, required: true },
    description: { type: String, trim: true,},
    releaseDate: { type: String, trim: true, required: true },
    actualAvatarLink: { type: String, default: '' },
},
{
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Books', BookScheme);