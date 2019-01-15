const deck = (sequelize, DataTypes) => {
  const Deck = sequelize.define("deck", {
    deckname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A deck must have a name."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A deck must have a description."
        }
      }
    }
  });

  Deck.associate = models => {
    Deck.belongsTo(models.User);
    Deck.hasMany(models.Card, { onDelete: "CASCADE" });
  };
  return Deck;
};
export default deck;
