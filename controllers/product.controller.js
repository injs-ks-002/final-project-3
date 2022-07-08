const Product = require("../models/index").Product;
const Category = require("../models/index").Category


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
     let rupiah = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR'
        })
        let result = rupiah.format(price)
        const category = await Category.findOne({
            where : {id: CategoryId}
        })
        if(!category){
            return res.status(404).send({
                status:404,
                message: `Category by id '${CategoryId}' is not found`
            })
        }
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
               price: result,
               stock: product.stock,
               CategoryId : product.CategoryId,
               createdAt : product.createdAt,
               updatedAt : product.updatedAt
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
    }else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
    
}