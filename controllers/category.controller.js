const {Category, Product, TransactionHistory} = require('../models/index')

exports.postCategory = async (req, res) => {
    const body = req.body
    const userId = req.id
    const userRole = req.role
    if (userRole == 'admin') {
        Category.beforeCreate(category => {
            category.sold_product_amount = 0
        })
        
        await Category.create({
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
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}

exports.getCategory = async (req, res) => {
    const userRole = req.role
    if (userRole == 'admin') {
        await Category.findAll({
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
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}

exports.patchCategory = async (req, res) => {
    const id = req.params.categoryId
    const body = req.body
    const userRole = req.role
    if (userRole == 'admin') {
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
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.categoryId
    const userRole = req.role
    if (userRole == 'admin') {
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
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}