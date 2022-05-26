const {Category, Product, TransactionHistory} = require('../models/index')

exports.postCategory = async (req, res) => {
    const body = req.body
    const userId = req.id

    Category.beforeCreate(category => {
        category.sold_product_amount = 0
    })
    
    await Category.create({
        id: userId,
        type: body.type
    }).then( categories => {
        res.status(201).send({
            category: categories
        })
    }).catch(err => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: "Internal server error"
        })
    })
}

exports.getCategory = async (req, res) => {
    const userId = req.id
    await Category.findAll({
        where: {
            id: userId
        },
        order: [
            ['updatedAt', 'DESC']
        ],
        include: {
            model: Product,
            as: 'Products'
        }
    }).then(categories => {
        if (!categories) {
            return res.status(404).send({
                status: 404,
                message: "Category data is not found"
            })
        } else {
            res.status(200).send({
                "categories": categories
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: "Internal server error"
        })
    })
}

exports.patchCategory = async (req, res) => {
    var id = req.params.categoryId
    id = req.id
    const body = req.body
    await Category.findOne({
        where: {
            id: id
        }
    }).then( checkCategory => {
        if (!checkCategory) {
            res.status(404).send({
                status: 404,
                message: `Category by id '${id}' is not found`
            })
        } else {
            Category.update({
                type: body.type
            }, {
                where: {
                    id: id
                }
            }).then( categories => {
                if (!categories) {
                    return res.status(400).send({
                        status: 400,
                        message: 'Failed for update category'
                    })
                } else {
                    Category.findOne({
                        where: {
                            id: id
                        }
                    }).then(category => {
                        res.status(200).send({
                            "category": category
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
    }).catch( err => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal server error'
        })
    })
}

exports.deleteCategory = async (req, res) => {
    var id = req.params.categoryId
    id = req.id
    await Category.findOne({
        where: {
            id: id
        }
    }).then(checkCategory => {
        if (!checkCategory) {
            res.status(404).send({
                status: 404,
                message: `Category by id '${id}' is not found`
            })
        } else {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(categories => {
                if (!categories) {
                    res.status(400).send({
                        status: 400,
                        message: 'Failed for update category'
                    })
                } else {
                    res.status(200).send({
                        "message": "Category has been succesfully deleted"
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
    }).catch(err => {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal server error'
        })
    })
}