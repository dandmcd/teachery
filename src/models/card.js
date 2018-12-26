const card = (sequelize, DataTypes) => {
  const Card = sequelize.define("card", {
    front: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Front of the card must have text."
        }
      }
    },
    back: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Back of the card must have text."
        }
      }
    }
  });
  Card.associate = models => {
    Card.belongsTo(models.Deck);
  };
  return Card;
};
export default card;
