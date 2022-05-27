const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        productId: Joi.number()
            .integer()
            .required()
            .label("productId must be integer number and not empty"),

        quantity: Joi.number()
            .integer()
            .required()
            .label("quantity must be integer number and not empty")
    })
    
    const {error} = schema.validate(req.body)

    if (error) {
        return res.status(422).send({
            "status": 422,
            "message": error.details.map(x => x.context.label).join(', ')
        })
    } else {
        next()
    }
}