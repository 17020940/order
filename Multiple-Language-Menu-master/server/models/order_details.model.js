module.exports = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define("order_details", {
    orderId: Sequelize.BIGINT,
    itemId: Sequelize.BIGINT,
    quantity: Sequelize.INTEGER,
    parentId: Sequelize.BIGINT,
    status: Sequelize.INTEGER
  });
  return OrderDetail;
};
