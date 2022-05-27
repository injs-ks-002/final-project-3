const { TransactionHistory, Product, User, Category } = require('../models/index')

exports.postTransaction = async (req, res) => {
    const body = req.body
    const id = req.id
    try {
        const product = await Product.findOne({
            where: {
                id: body.productId
            }
        })
        if (!product) {
            return res.status(404).send({
                status: 404,
                message: `Product by id '${body.productId}' is not found`
            })
        }
        if (product.dataValues.stock < body.quantity) {
            return res.status(422).send({
                status: 422,
                message: 'Quantity more than product stock'
            })
        }
    
        const user = await User.findOne({
            where: {
                id: id
            }
        })
        if (user.dataValues.balance < product.price) {
            return res.status(422).send({
                status: 422,
                message: 'Balance less than product price, please top up'
            })
        }
    
        let totalPrice = body.quantity * product.price
        let rupiah = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR'
        })
        let result = rupiah.format(totalPrice)

        TransactionHistory.beforeCreate(async () => {
            let currentStock = product.dataValues.stock - body.quantity
            let currentBalance = user.dataValues.balance - totalPrice
            const getCategory = await Category.findOne({
                where: {
                    id: product.dataValues.CategoryId
                }
            })
            let currentSoldProduct = getCategory.dataValues.sold_product_amount + body.quantity
            await Product.update({
                stock: currentStock
            }, {
                where: {
                    id: body.productId
                }
            })
            await User.update({
                balance: currentBalance
            }, {
                where: {
                    id: user.dataValues.id
                }
            })
            await Category.update({
                sold_product_amount: currentSoldProduct
            }, {
                where: {
                    id: getCategory.dataValues.id
                }
            })
        })
    
        TransactionHistory.create({
            UserId: id,
            ProductId: body.productId,
            quantity: body.quantity,
            total_price: totalPrice
        })
    
        res.status(201).send({
            "message": "You have successfully purchase the product",
            "transactionBill": {
                "total_price": `${result}`,
                "quantity": `${body.quantity}`,
                "product_name": `${product.title}`
            }
        })
    } catch(err) {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal server error'
        })
    }
}

exports.getTransactionForUser = async (req, res) => {
    const userId = req.id
    try {
        const transaction = await TransactionHistory.findAll({
            where: {
                UserId: userId
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            include: {
                model: Product,
                as: 'Product'
            }
        })
        if (!transaction) {
            return res.status(404).send({
                status: 404,
                message: 'Transaction data is not found'
            })
        }
    
        res.status(200).send({
            "transactionHistories": transaction
        })
    } catch(err) {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal server error'
        })
    }
}

exports.getTransactionForAdmin = async (req, res) => {
    const userId = req.id
    const userRole = req.role
    if (userRole == 'admin') {
        try {
            const transaction = await TransactionHistory.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: [
                    {
                        model: Product,
                        as: 'Product'
                    },
                    {
                        model: User,
                        as: 'User',
                        attributes: { exclude: ['password'] }
                    }
                ]
            })
            if (!transaction) {
                return res.status(404).send({
                    status: 404,
                    message: 'Transaction data is not found'
                })
            }
        
            res.status(200).send({
                "transactionHistories": transaction
            })
        } catch(err) {
            console.log(err)
            res.status(503).send({
                status: 503,
                message: 'Internal server error'
            })
        }
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}

exports.getTransactionById = async (req, res) => {
    const id = req.params.transactionId
    const userId = req.id
    const userRole = req.role
    if (userRole == 'admin') {
        try {
            const transaction = await TransactionHistory.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Product,
                    as: 'Product'
                }
            })
            if (!transaction) {
                return res.status(404).send({
                    status: 404,
                    message: 'Transaction data is not found'
                })
            }
        
            res.status(200).send(transaction)
        } catch(err) {
            console.log(err)
            res.status(503).send({
                status: 503,
                message: 'Internal server error'
            })
        }
    } else {
        try {
            const transaction = await TransactionHistory.findOne({
                where: {
                    id: id,
                    UserId: userId
                },
                include: {
                    model: Product,
                    as: 'Product'
                }
            })
            if (!transaction) {
                return res.status(404).send({
                    status: 404,
                    message: 'Transaction data is not found'
                })
            }
        
            res.status(200).send(transaction)
        } catch(err) {
            console.log(err)
            res.status(503).send({
                status: 503,
                message: 'Internal server error'
            })
        }
    }
}