const db = require("../../models/index");
const Category = db.category;
const Item = db.item;
const imageToBase64 = require('image-to-base64');
const { response } = require("express");

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
            attributes: ['id', 'name', 'price'],
            where: {
                categoryId: req.query.categoryId,
                status_change: 0
            },

        });

        // data = items.map(item => {
        //     imageToBase64("D:/avatar.jpg")
        //     .then(data => {
        //         item.image = "data:image/jpeg:base64," + data;
        //         return item;
        //     })
        //     .catch(e => console.log(e));
        // })
        let data = await Promise.all(
            items.map(async item => {
                const data = await imageToBase64("D:/avatar.jpg")
                
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

exports.orderItem = (req, res) => { };

exports.orderHistory = (req, res) => { };

