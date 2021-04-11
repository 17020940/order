module.exports = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define("order_details", {
    orderId: Sequelize.BIGINT,
    itemId: Sequelize.BIGINT,
    quantity: Sequelize.INTEGER,
    childrenId: Sequelize.BIGINT,
    status: Sequelize.INTEGER
  });
  return OrderDetail;
};
