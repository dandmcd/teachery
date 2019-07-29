const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tag", {
    tagName: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "A tag with this name already exists for this deck."
      },
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
