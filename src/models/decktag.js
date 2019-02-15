const deckTag = (sequelize, DataTypes) => {
  const DeckTag = sequelize.define("deckTag", {});
  return DeckTag;
};
export default deckTag;
