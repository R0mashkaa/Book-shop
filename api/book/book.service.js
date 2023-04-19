const Book = require('../../dataBase/Book');
const { fileService } = require('../../services');

module.exports = {
    getAllBooks: async () => {
        return await Book.find();
    },
  
    getSingleBook: async (bookId) => {
        return await Book.findById(bookId);
    },

    findBookByParams: (searchObject) => {
        return Book.findOne(searchObject);
    },
  
    createBook: async (userObject) => {
        return Book.create(userObject);
    },

    updateBook: async (bookId, bookNewData) => {
        return Book.findByIdAndUpdate(bookId, bookNewData);
    },

    deleteBook: async (bookId) => {
        return  Book.findByIdAndRemove(bookId);
    },


    getAvatarList: async (bookId) => {                                  // TODO REFACTOR FUNCTIONS BELOW
        const data = await Book.find(bookId).sort({ updatedAt: -1 });
        return data.map((avatar) => {
            return {
                'Link to avatar': avatar.avatarLink,
                'ID of avatar': avatar.id,
                'Added at': avatar.createdAt
            };
        });
    },
        
    addBookAvatar: async (linkToAvatar, bookId) => {
        return Book.create({ avatarLink: linkToAvatar, book: bookId });
    },

    deleteUserAvatar: async(avatarId) => {
        const deletedItem = await Book.findByIdAndDelete(avatarId);

        await fileService.deleteImageFromS3(deletedItem.avatarLink);
    },

    findAvatarById: async (avatarId) => {
        const data = await Book.find(avatarId);
        return data.map( (avatar) => avatar.avatarLink );
    },

    isActualAvatarEquals: async (avatarId, userId) => {
        let imageLink = await Book.find(avatarId);
        imageLink = imageLink.map((avatar) => avatar.avatarLink);
        
        let actualAvatarLink = await Book.find(userId);
        actualAvatarLink = actualAvatarLink.map((user) => user.actualAvatarLink); 
  
        if (imageLink.toString() === actualAvatarLink.toString()) {
            return true;
        }
        else {
            return false;
        }
    }

};