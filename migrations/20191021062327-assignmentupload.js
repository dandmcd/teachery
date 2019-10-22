"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "assignments",
          "documentName",
          { type: Sequelize.STRING },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "assignments",
          "documentUrl",
          { type: Sequelize.STRING },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("assignments", "documentName", {
          transaction: t
        }),
        queryInterface.removeColumn("assignments", "documentUrl", {
          transaction: t
        })
      ]);
    });
  }
};
