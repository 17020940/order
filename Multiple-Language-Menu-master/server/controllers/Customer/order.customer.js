const db = require("../../models/index");
const Category = db.category;

exports.getCategories = async (req, res) => {
    try {
        let listCategory = await Category.findAll({
            attributes: ['id', 'name'],
            where: {
                restaurantId: req.query.restaurantId,
            },

        });
        res.status(200).send({
            success: true,
            data: listCategory,
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.getItem = async (req, res) => { };

exports.orderItem = (req, res) => { };

exports.orderHistory = (req, res) => { };

