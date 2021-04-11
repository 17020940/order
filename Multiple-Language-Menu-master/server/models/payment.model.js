module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payments", {
        orderId: Sequelize.BIGINT,
        totalBill: Sequelize.DOUBLE,
        paymentMoney: Sequelize.DOUBLE,
    });
    return Payment;
};
