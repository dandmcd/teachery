"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn("assignedTasks", "status", {
        type: Sequelize.STRING,
        allowNull: false
      })
      .then(() => {
        const pgEnumDropQuery = queryInterface.QueryGenerator.pgEnumDrop(
          "assignedTasks",
          "status"
        );

        return queryInterface.sequelize.query(pgEnumDropQuery);
      })
      .then(() => {
        return queryInterface.changeColumn("assignedTasks", "status", {
          type: Sequelize.ENUM("INCOMPLETE", "COMPLETE", "REVIEWING", "GRADED"),
          allowNull: false
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn("assignedTasks", "status", {
        type: Sequelize.STRING,
        allowNull: false
      })
      .then(() => {
        const pgEnumDropQuery = queryInterface.QueryGenerator.pgEnumDrop(
          "assignedTasks",
          "status"
        );

        return queryInterface.sequelize.query(pgEnumDropQuery);
      })
      .then(() => {
        return queryInterface.changeColumn("assignedTasks", "status", {
          type: Sequelize.ENUM("INCOMPLETE", "COMPLETE", "REVIEWING", "GRADED"),
          allowNull: false
        });
      });
  }
};
