"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "decks",
          "deckImageName",
          { type: Sequelize.STRING },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "decks",
          "deckImageUrl",
          { type: Sequelize.STRING },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("decks", "deckImageName", {
          transaction: t
        }),
        queryInterface.removeColumn("decks", "deckImageUrl", { transaction: t })
      ]);
    });
  }
};
