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
    const body = req.body;
    const CategoryId = body.CategoryId;
    const title = body.title;
    const price = body.price;
    const stock = body.stock;
    const userRole = req.role
    if(userRole == "admin"){
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
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
    
}

exports.patchProduct = async (req, res) => {
    const id = req.params.productId
    const body = req.body
    const userRole = req.role
    if(userRole == "admin"){
        await Product.findOne({
        where: {
            id: id
        }
    }).then( checkProduct => {
        if (!checkProduct) {
            res.status(404).send({
                status: 404,
                message: `Product by id '${id}' is not found`
            })
        } else {
            Product.update({
                CategoryId: body.CategoryId
            }, {
                where: {
                    id: id
                }
            }).then( product => {
                if (!product) {
                    res.status(400).send({
                        status: 400,
                        message: 'Failed for update Product'
                    })
                } else {
                    Product.findOne({
                        where : {
                            id : id
                        }
                    }).then(product => {
                        res.status(200).send({
                            "Product": product
                        })
                    })      
                }
            }).catch( err => {
                console.log(err)
                res.status(503).send({
                    status: 503,
                    message: 'Internal server error'
                })
            })
        }
    })
    }else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
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
    const userRole = req.role
    if(userRole == "admin"){
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
    }else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;
    const userRole = req.role
    if(userRole == "admin"){
        Product.destroy({
            where: {  id: productId, Ca },
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
    }else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
    
}