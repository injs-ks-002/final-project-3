const Joi = require('joi')

exports.validationRegister = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
                  .email()
                  .required()
                  .label("type must be string and not empty"),
        
        full_name: Joi.string()
                      .required()
                      .label("type must be string and not empty"),
        
        password: Joi.string()
                     .required()
                     .min(6)
                     .max(10)
                     .label("type must be string")
                     .label("Minimum 1 character and not empty"),

        gender: Joi.required()
                   .valid('male', 'female')
                   .label("type must be string and not empty"),

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

exports.validationLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
                  .email()
                  .required()
                  .label("type must be string and not empty"),
        
        password: Joi.string()
                     .required()
                     .min(6)
                     .max(10),
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

exports.validationUpdate = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
                  .email()
                  .required()
                  .label("type must be string and not empty"),
        
        full_name: Joi.string()
                      .required(),
        
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

exports.validationTopup = (req, res, next) => {
    const schema = Joi.object({
        balance: Joi.number()
                    .integer()
                    .min(0)
                    .max(100000000)
                    .required()
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