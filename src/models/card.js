const card = (sequelize, DataTypes) => {
  const Card = sequelize.define("card", {
    deckId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "A card must have a deck associated with it."
        }
      }
    },
    front: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Front of the card must have text."
        }
      }
    },
    pictureName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    back: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Card.associate = models => {
    Card.belongsTo(models.Deck);
  };
  return Card;
};
export default card;
