const decktag = (sequelize, DataTypes) => {
  const DeckTag = sequelize.define("decktag", {});
  return DeckTag;
};
export default decktag;
