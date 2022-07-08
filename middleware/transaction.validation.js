const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        productId: Joi.number()
            .integer()
            .required()
            .label("productId harus bilangan bulat dan tidak kosong"),

        quantity: Joi.number()
            .integer()
            .required()
            .label("quantity harus bilangan bulat dan tidak kosong")
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