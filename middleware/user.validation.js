const Joi = require('joi')

exports.validationRegister = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
                  .email()
                  .required()
                  .label("email harus berupa string dan tidak kosong"),
        
        full_name: Joi.string()
                      .required()
                      .label("full_name harus berupa string dan tidak kosong"),
        
        password: Joi.string()
                     .required()
                     .min(6)
                     .max(10)
                     .label("password harus berupa string dan tidak kosong")
                     .label("Minimum 1 character and not empty"),

        gender: Joi.required()
                   .valid('male', 'female')
                   .label("gender harus berupa string dan tidak kosong"),

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
                  .label("email harus berupa string dan tidak kosong"),
        
        password: Joi.string()
                     .required()
                     .min(6)
                     .max(10)
                     .label("Maaf, kata sandi Anda salah. Harap periksa kembali kata sandi Anda."),
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
                  .label("email harus berupa string dan tidak kosong"),
        
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
                    .label("balance maximum Rp 100.000.000 and not empty"),

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