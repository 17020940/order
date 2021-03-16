const db = require("../../models/index");
const Category = db.category;
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
    imageToBase64("C:/Users/DUC_NHA/Downloads/chivas-38-years.jpg")
    .then(response => {
        res.status(200).send({
            success: true,
            data: response,
        });
    })
    .catch(error => {
        res.status(500).send({ success: false, error: error.message });
    })
};

exports.orderItem = (req, res) => { };

exports.orderHistory = (req, res) => { };

