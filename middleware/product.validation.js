const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string()
                  .required()
                  .label("title harus berupa string dan tidak kosong"),
        
        stock: Joi.number()
                  .integer()
                  .required()
                  .min(5)
                  .label("stock harus berupa nomor / angka")
                  .label("Stok minimal 5 dan tidak boleh kosong"),
        
        price: Joi.number()
                  .integer()
                  .required()
                  .min(0)
                  .max(50000000)
                  .label("price harus berupa nomor / angka")
                  .label("Maximum Rp 50.000.000 and not empty"),
                         
        CategoryId: Joi.number()
                       .integer()
                       .label("CategoryId harus nomor / angka dan tidak kosong"),
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