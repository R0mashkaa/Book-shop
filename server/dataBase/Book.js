const mongoose = require('mongoose')
const bookTagsEnum = require ('../configs/bookTagsEnum')

const BookScheme = new mongoose.Schema(
  {
    bookName: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    releaseDate: { type: String, trim: true, required: true },
    actualAvatarLink: { type: String, default: '' },
    tags: { type: [String], enum: bookTagsEnum }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

module.exports = mongoose.model('Books', BookScheme)
