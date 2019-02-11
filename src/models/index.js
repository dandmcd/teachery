import Sequelize from "sequelize";

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
  });
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres"
    }
  );
}

const models = {
  User: sequelize.import("./user"),
  Message: sequelize.import("./message"),
  Card: sequelize.import("./card"),
  Deck: sequelize.import("./deck"),
  Assignment: sequelize.import("./assignment"),
  Tag: sequelize.import("./tag"),
  DeckTag: sequelize.import("./decktag")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
