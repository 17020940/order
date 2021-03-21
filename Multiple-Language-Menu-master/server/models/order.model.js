module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    time_start: Sequelize.DATE,
    time_end: Sequelize.DATE,
    tableId: Sequelize.BIGINT,
    customerId: Sequelize.BIGINT,
  });
  return Order;
};
