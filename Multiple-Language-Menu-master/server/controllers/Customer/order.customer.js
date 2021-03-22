const db = require("../../models/index");
const Category = db.category;
const Item = db.item;
const Customer = db.customer;
const Order = db.order;
const Table = db.table;
const imageToBase64 = require('image-to-base64');
const { response } = require("express");

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
                tableId: req.body.tableId,
                time_end: null
            },
        });

        if (order) {
            if (order.dataValues.customerId != customer.dataValues.id) {
                res.status(500).send({ success: false, error: "Table is already in use by other" });
                return;
            }
        } else {
            order = await Order.create({
                time_start: new Date(),
                tableId: req.body.tableId,
                customerId: customer.dataValues.id
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

        let imageFoler = "C:/Users/DUC_NHA/Pictures/datn/";
        let data = await Promise.all(
            items.map(async item => {
                // const data = await imageToBase64(imageFoler + item.dataValues.image_item)
                const data = await imageToBase64("C:/Users/Administrator/Pictures/datn/ca-hoi.jpg")
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

        console.log(tables)

        res.status(200).send({
            success: true,
            data: tables,
        });

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
    
}

exports.orderItem = (req, res) => { };

exports.orderHistory = (req, res) => { };

