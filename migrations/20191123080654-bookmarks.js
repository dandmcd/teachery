"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          "bookmarkedDecks",
          {
            createdAt: {
              type: Sequelize.DATE,
              allowNull: false
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
            },
            deckId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              references: {
                model: "decks",
                key: "id"
              }
            },
            userId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              references: {
                model: "users",
                key: "id"
              }
            }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable("bookmarkedDecks", { transaction: t })
      ]);
    });
  }
};
