const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tag", {
    tagname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Tag name is required."
        }
      }
    }
  });
  Tag.associate = models => {
    Tag.belongsToMany(models.Deck, {
      through: models.DeckTag,
      onDelete: "CASCADE"
    });
  };
  return Tag;
};
export default tag;
