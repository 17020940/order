module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customers", {
    name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    telephone: Sequelize.STRING,
    email: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Customer;
};
