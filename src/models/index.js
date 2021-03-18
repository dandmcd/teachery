import Sequelize from "sequelize";

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
    }
  );
}

const models = {
  User: sequelize.import("./user"),
  Message: sequelize.import("./message"),
  Card: sequelize.import("./card"),
  Deck: sequelize.import("./deck"),
  Assignment: sequelize.import("./assignment"),
  AssignedTask: sequelize.import("./assigned.js"),
  Tag: sequelize.import("./tag"),
  DeckTag: sequelize.import("./decktag"),
  UserAssignment: sequelize.import("./userassignment.js"),
  BookmarkedDeck: sequelize.import("./bookmarkedDeck.js"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
