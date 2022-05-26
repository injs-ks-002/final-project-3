const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string()
                  .required()
                  .label("type must be string and not empty"),
        
        stock: Joi.number()
                  .integer()
                  .required()
                  .min(5)
                  .label("type must be number")
                  .label("Minimum 5 character and not empty"),
        
        price: Joi.number()
                  .integer()
                  .required()
                  .min(1)
                  .max(50000000)
                  .label("type must be number")
                  .label("Minimum 1 character and not empty"),
                         
        CategoryId: Joi.number()
                       .integer()
                       .label("type must be number and not empty"),
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