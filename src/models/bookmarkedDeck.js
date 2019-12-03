const bookmarkedDeck = (sequelize, DataTypes) => {
  const BookmarkedDeck = sequelize.define("bookmarkedDeck", {});
  return BookmarkedDeck;
};

export default bookmarkedDeck;
