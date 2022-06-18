const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string()
                  .required()
                  .label("title must be string and not empty"),
        
        stock: Joi.number()
                  .integer()
                  .required()
                  .min(5)
                  .label("stock must be number")
                  .label("Minimum 5 stock and not empty"),
        
        price: Joi.number()
                  .integer()
                  .required()
                  .min(0)
                  .max(50000000)
                  .label("price must be number")
                  .label("Maximum Rp 50.000.000 and not empty"),
                         
        CategoryId: Joi.number()
                       .integer()
                       .label("CategoryId must be number and not empty"),
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