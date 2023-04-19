const mongoose = require('mongoose');

const BookScheme = new mongoose.Schema({

    bookName: { type: String, trim: true, required:true },
    author: { type: String, trim: true, required: true },
    releaseDate: { type: Number, trim: true, required: true },
    actualAvatarLink: { type: String, default: 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg' },
},
{
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Books', BookScheme);