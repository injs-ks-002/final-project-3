const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        type: Joi.string()
            .required()
            .label("type must be string and not empty")
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

exports.validationForPatch = (req, res, next) => {
    const schema = Joi.object({
        type: Joi.string()
            .required()
            .label("type must be string and not empty")
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