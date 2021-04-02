const db = require("../../models/index");
const Category = db.category;
const Item = db.item;
const Customer = db.customer;
const Order = db.order;
const Table = db.table;
const OrderDetail = db.order_detail;
const sequelize = db.sequelize;
const imageToBase64 = require('image-to-base64');
const { QueryTypes } = require('sequelize');

exports.createOrderSession = async (req, res) => {
    try {
        let customer = await Customer.findOne({
            where: {
                telephone: req.body.telephone
            }
        })

        if (!customer) {
            customer = await Customer.create({
                name: req.body.name,
                telephone: req.body.telephone,
                email: req.body.email
            })
        }

        let order = await Order.findOne({
            where: {
                customerId: customer.dataValues.id,
                time_end: null
            },
        });

        if (order) {
            if (order.dataValues.tableId != req.body.tableId) {
                return res.status(200).send({ success: false, error: "Invalid table" });
            }
        } else {
            order = await Order.create({
                time_start: new Date(new Date().getTime() + 7 * 60 * 100),
                tableId: req.body.tableId,
                customerId: customer.dataValues.id,
                createdAt: new Date(new Date().getTime() + 7 * 60 * 100)
            })
        }

        res.status(200).send({
            success: true,
            data: order
        });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

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

exports.getItem = async (req, res) => {
    try {
        let items = await Item.findAll({
            attributes: ['id', 'name', 'price', 'image_item'],
            where: {
                categoryId: req.query.categoryId
            },

        });

        // let imageFoler = "C:/Users/DUC_NHA/Pictures/datn/";
        let imageFoler = "C:/Users/Administrator/Pictures/datn/";
        let data = await Promise.all(
            items.map(async item => {
                const data = await imageToBase64(imageFoler + item.dataValues.image_item)
                // const data = await imageToBase64("C:/Users/Administrator/Pictures/datn/ca-hoi.jpg")
                item.dataValues.image = "data:image/jpeg;base64," + data;
                return item;
            })
        )
        res.status(200).send({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.getTable = async (req, res) => {
    try {
        let tables = await Table.findAll({
            attributes: ['id', 'name'],
            where: {
                restaurantId: req.query.restaurantId
            }
        })

        res.status(200).send({
            success: true,
            data: tables,
        });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }

}

exports.orderItem = async (req, res) => {
    try {
        if (!req.body.orderId || !req.body.itemId || !req.body.quantity || req.body.quantity < 0) {
            return res.status(200).send({ success: true, error: "Invalid param" });
        }
        let orderDetail = await OrderDetail.create({
            orderId: req.body.orderId,
            itemId: req.body.itemId,
            quantity: req.body.quantity,
            status: 0
        });
        res.status(200).send({ success: true, data: orderDetail });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        if (!req.body.orderId) {
            return res.status(200).send({ success: true, error: "Invalid param" });
        }
        await OrderDetail.update(
            {
                status: 1
            },

            {
                where: { orderId: req.body.orderId, status: 0}
            },

        );
        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.getOrderDetail = async (req, res) => {
    try {
        sql = " SELECT";
        sql += "    od.status,";
        sql += "    i.name,";
        sql += "    SUM( quantity) AS quantity"
        sql += " FROM ";
        sql += "	order_details od";
        sql += "	JOIN items i ON od.itemId = i.id";
        sql += " WHERE";
        sql += "    od.status IN (0,1,2)";
        sql += "    AND od.orderId = :orderId";
        sql += " GROUP BY"
        sql += "    od.itemId"
        sql += " ORDER BY";
        sql += "    status"
        const orderDetails = await sequelize.query(
            sql,
            {
                replacements: { orderId: req.query.orderId },
                type: QueryTypes.SELECT
            }
        );
        res.status(200).send({ success: true, data: orderDetails });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};


