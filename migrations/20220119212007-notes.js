"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "notes",
          {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              unique: true,
            },
            createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            assignedTaskId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              references: {
                model: "assignedTasks",
                key: "id",
              },
            },
            userId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              references: {
                model: "users",
                key: "id",
              },
            },
            text: {
              type: Sequelize.STRING,
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("notes", { transaction: t }),
      ]);
    });
  },
};
