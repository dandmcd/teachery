const bookmarkedDeck = (sequelize, DataTypes) => {
  const BookmarkedDeck = sequelize.define("bookmarkedDeck", {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "A bookmarked deck must have a user."
        }
      }
    },
    deckId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "A bookmarked deck needs a deck."
        }
      }
    }
  });
  BookmarkedDeck.associate = models => {
    BookmarkedDeck.belongsToMany(models.Deck, {
      through: models.UserBookmark,
      onDelete: "CASCADE"
    });
  };
  return BookmarkedDeck;
};
export default bookmarkedDeck;
