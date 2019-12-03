const deck = (sequelize, DataTypes) => {
  const Deck = sequelize.define("deck", {
    deckName: {
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
        },
        len: {
          args: [0, 110],
          msg: "Description must be under 110 characters."
        }
      }
    },
    deckImageName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deckImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Deck.associate = models => {
    Deck.belongsTo(models.User);
    Deck.hasMany(models.Card, { onDelete: "CASCADE" });
    Deck.belongsToMany(models.Tag, {
      through: models.DeckTag,
      onDelete: "CASCADE"
    });
    Deck.belongsToMany(models.User, {
      as: "DeckBookmark",
      through: models.BookmarkedDeck,
      foreignKey: "deckId",
      onDelete: "CASCADE"
    });
  };
  return Deck;
};
export default deck;
