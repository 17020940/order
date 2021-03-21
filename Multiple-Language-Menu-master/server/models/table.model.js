module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("tables", {
      name: Sequelize.STRING,
      restaurantId: Sequelize.BIGINT,
    });
    return Table;
  };
  