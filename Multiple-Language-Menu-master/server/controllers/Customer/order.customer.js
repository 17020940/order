const db = require("../../models/index");
const Category = db.category;
const Item = db.item;
const Customer = db.customer;
const Order = db.order;
const Table = db.table;
const OrderDetail = db.order_detail;
const Restaurant = db.restaurant;
const Payment = db.payment;
const sequelize = db.sequelize;
const imageToBase64 = require('image-to-base64');
const { QueryTypes } = require('sequelize');
const e = require("express");

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
                time_start: new Date(),
                tableId: req.body.tableId,
                customerId: customer.dataValues.id,
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
                where: { orderId: req.body.orderId, status: 0 }
            },

        );


        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        if (!req.body.orderId) {
            return res.status(200).send({ success: true, error: "Invalid param" });
        }

        let staleOrder = await OrderDetail.findAll({
            where: {
                orderId: req.body.orderId,
                itemId: req.body.itemId,
                status: 0
            }
        })

        await OrderDetail.update(
            {
                status: 3,
            },

            {
                where: {
                    orderId: req.body.orderId,
                    itemId: req.body.itemId,
                    status: 0
                }
            },

        );

        let newOrder = await OrderDetail.create({
            orderId: req.body.orderId,
            itemId: req.body.itemId,
            quantity: req.body.quantity,
            status: 0
        });

        await OrderDetail.update(
            {
                childrenId: newOrder.id
            },

            {
                where: { id: staleOrder.map(e => e.dataValues).map(e => e.id) }
            },

        );


        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        if (!req.body.orderId) {
            return res.status(200).send({ success: true, error: "Invalid param" });
        }


        await OrderDetail.update(
            {
                status: 4
            },

            {
                where: {
                    orderId: req.body.orderId,
                    itemId: req.body.itemId,
                    status: 0
                }
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
        sql += "    ( CASE od.status WHEN 0 THEN 0 ELSE 1 END ) AS type,";
        sql += "    i.id AS itemId,";
        sql += "    i.name,";
        sql += "    SUM( quantity) AS quantity"
        sql += " FROM ";
        sql += "	order_details od";
        sql += "	JOIN items i ON od.itemId = i.id";
        sql += " WHERE";
        sql += "    od.status IN (0,1,2)";
        sql += "    AND od.orderId = :orderId";
        sql += " GROUP BY"
        sql += "    od.itemId,"
        sql += "    type"
        sql += " ORDER BY";
        sql += "    type"
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


exports.getKey = async (req, res) => {
    try {
        let restaurant = await Restaurant.findOne({
            where: {
                id: req.query.restaurantId,
            },
        });
        res.status(200).send(restaurant.dataValues.api_key);
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.getOrderPOS = async (req, res) => {
    try {
        sql = " SELECT";
        sql += "    t.name AS tableName,"
        sql += "    t.id AS tableId,"
        sql += "    od.orderId,"
        sql += "    i.id AS itemId,"
        sql += "    i.price,"
        sql += "    i.name AS itemName, SUM(od.quantity) AS quantity"
        sql += " FROM"
        sql += "    orders o"
        sql += "    JOIN `tables` t ON o.tableId = t.id"
        sql += "    JOIN order_details od ON od.orderId = o.id"
        sql += "    JOIN items i ON i.id = od.itemId"
        sql += " WHERE"
        sql += "    o.time_end IS NULL"
        sql += "    AND od.status = 1"
        sql += "    AND t.restaurantId = :restaurantId"
        sql += " GROUP BY"
        sql += "     t.id, i.id"
        const orderDetails = await sequelize.query(
            sql,
            {
                replacements: { restaurantId: req.query.restaurantId },
                type: QueryTypes.SELECT
            }
        );
        const response = [];
        orderDetails.forEach(data => {
            let isNotInRes = response.filter(e => e.tableId == data.tableId).length == 0;
            if (isNotInRes) {
                let orderTable = orderDetails.filter(e => e.tableId == data.tableId);
                let items = [];
                orderTable.forEach(e => {
                    let item = {};
                    item.name = e.itemName;
                    item.id = e.itemId;
                    item.quantity = e.quantity;
                    item.price = e.price;
                    items.push(item);
                })
                let dataRes = {};
                dataRes.tableId = data.tableId;
                dataRes.tableName = data.tableName;
                dataRes.orderId = data.orderId;
                dataRes.items = items;
                response.push(dataRes);
            }
        })
        res.status(200).send(response);


    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.resolveOrder = async (req, res) => {
    try {
        await OrderDetail.update(
            {
                status: 2
            },

            {
                where: { orderId: req.body.orderId, status: 1 }
            },

        );
        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.getPaymentPOS = async (req, res) => {
    try {
        sql = " SELECT";
        sql += "    t.name AS tableName,"
        sql += "    t.id AS tableId,"
        sql += "    od.orderId,"
        sql += "    i.id AS itemId,"
        sql += "    i.price,"
        sql += "    i.name AS itemName, SUM(od.quantity) AS quantity"
        sql += " FROM"
        sql += "    orders o"
        sql += "    JOIN `tables` t ON o.tableId = t.id"
        sql += "    JOIN order_details od ON od.orderId = o.id"
        sql += "    JOIN items i ON i.id = od.itemId"
        sql += " WHERE"
        sql += "    o.time_end IS NULL"
        sql += "    AND od.status IN (1,2)"
        sql += "    AND t.restaurantId = :restaurantId"
        sql += " GROUP BY"
        sql += "     t.id, i.id"
        const orderDetails = await sequelize.query(
            sql,
            {
                replacements: { restaurantId: req.query.restaurantId },
                type: QueryTypes.SELECT
            }
        );
        const response = [];
        orderDetails.forEach(data => {
            let isNotInRes = response.filter(e => e.tableId == data.tableId).length == 0;
            if (isNotInRes) {
                let orderTable = orderDetails.filter(e => e.tableId == data.tableId);
                let items = [];
                orderTable.forEach(e => {
                    let item = {};
                    item.name = e.itemName;
                    item.id = e.itemId;
                    item.quantity = e.quantity;
                    item.price = e.price;
                    items.push(item);
                })
                let dataRes = {};
                dataRes.tableId = data.tableId;
                dataRes.tableName = data.tableName;
                dataRes.orderId = data.orderId;
                dataRes.items = items;
                response.push(dataRes);
            }
        })
        res.status(200).send(response);


    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};

exports.paymentPOS = async (req, res) => {
    try {
        await Order.update(
            {
                time_end: new Date()
            },

            {
                where: { id: req.body.orderId }
            },
        )

        const payment = await Payment.create({
            orderId: req.body.orderId,
            totalBill: req.body.total,
            paymentMoney: req.body.paymentMoney
        })

        res.status(200).send({ success: true, data: payment });

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error: error.message });
    }
};


