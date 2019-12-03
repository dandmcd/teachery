"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "assignedTasks",
          "updatedDocumentName",
          { type: Sequelize.STRING },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "assignedTasks",
          "updatedDocumentUrl",
          { type: Sequelize.STRING },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("assignedTasks", "updatedDocumentName", {
          transaction: t
        }),
        queryInterface.removeColumn("assignedTasks", "updatedDocumentUrl", {
          transaction: t
        })
      ]);
    });
  }
};
