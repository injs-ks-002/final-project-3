const fs = require('fs')
const db = require('../config/db');
const Product = require("../models/index").Product;
const User = require("../models/index").User;
const jwt = require('jsonwebtoken');
const product = require('../models/product');

exports.getProduct = async (req, res) => {
    return Product.findAll().then(products=> {
        res.status(200).send({
            status : "SUCCES",
            data: products
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            status : "FAIL",
            message : 'INTERNAL SERVER ERROR'
        })
    })
}

exports.postProduct = async (req, res) => {
    const CategoryId = req.id;
    const body = req.body;
    const title = body.title;
    const price = body.price;
    const stock = body.stock;

    await Product.create({
        title: title,
        price: price,
        stock: stock,
        CategoryId : CategoryId
    })
    .then(product => {
        res.status(201).json({
           id: product.id,
           title: product.title,
           price: product.price,
           stock: product.stock,
           data : product
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            status : "FAIL",
            message : "Gagal membuat Product"
        })
    })
}

exports.updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const title = req.body.title;
    const price = req.body.price;
    const stock = req.body.stock;
    const dataProduct = {
        title,
        price,
        stock,
    };
    await Product.update(dataProduct, {
        where : { id: productId},
        returning: true,
    })
    .then((product) => {
        res.status(200).json({
            product: product[1]
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(503).json({
            message: "INTERNAL SERVER",
            error :error,
        });
    })
}


exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;
    Product.destroy({
      where: {  id: productId },
    })
    .then (() => {
        res.status(200).json({
            message: "Your Photo has been succesfully deleted",
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "INTERNAL SERVER",
            error: error,
        });
    })
}