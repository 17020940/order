module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    time_start: Sequelize.INTEGER,
    time_end: Sequelize.BIGINT,
    customerId: Sequelize.BIGINT,
  });
  return Order;
};
