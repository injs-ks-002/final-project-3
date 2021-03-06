const User = require("../models/index").User;
const bcrypt = require('bcrypt')
const { generateToken } = require ('../middleware/auth.js');

exports.getUser = async (req, res) => {
    const userRole = req.role
    if(userRole == "admin") {
        User.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            attributes: { exclude: ['password'] }
        }).then(users => {
            return res.status(200).send({
                status : "SUCCES",
                data: users
            })
        }).catch(e => {
            console.log(e)
            return res.status(500).send({
                status : "FAIL",
                message : 'INTERNAL SERVER ERROR'
            })
        })
    } else {
        res.status(401).send({
            message : "Only admin can access"
        })
    }
}

exports.signUp = async(req, res) => {
    const body = req.body;
    const full_name = body.full_name;
    const email = body.email;
    const gender = body.gender;
    const password = body.password;
    let rupiah = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR'
    })
    User.beforeCreate(user => {
        user.balance = 0
        user.role = "customer"
        
    })
    return User.findOne({
        where: {
            email: email,
        },
    }).then((user) => {
        if (user) {
            return res.status(400).send({
                message: "Email already Exist",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        return User.create({
                full_name: full_name,
                email: email,
                password: hash,
                gender: gender,
            })
            .then(() => {
                User.findOne({
                    where : { email: email}
                }).then(user =>{
                    user = {
                        id : user.id,
                        full_name : user.full_name,
                        email : user.email,
                        balance: rupiah.format(user.balance),
                        createdAt : user.createdAt,
                        
                    }
                    res.status(201).json(user)
                })
                    
            })
            .catch((e) => {
                console.log(e);
                res.status(500).send({
                    message : "INTERNAL SERVER ERORR"
                });
            });
});
};

exports.signIn = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    return User.findOne({
            where: {
                email: email,
            },
        })
        .then(user => {
            if (!user) {
                return res.status(400).send({
                    message: "Email Not Found please Sign UP",
                });
            }

            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return res.status(400).send({
                    message: "email and password not match",
                });
            }
            const token = generateToken({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role : user.role,
            });
            res.status(200).send({
                status: "SUKSES",
                token: token,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send({
                status : "FAIL",
                message : "Gagal login"
        });
});
}

exports.patchUser = async (req, res) => {
    const id = req.id
    const body = req.body

        await User.findOne({
        where: {
            id: req.id
        }
    }).then( checkUser => {
        if (!checkUser) {
            res.status(404).send({
                status: 404,
                message: `User by id '${id}' is not found`
            })
        } else {
            User.update({
                balance: body.balance
            }, {
                where: {
                    id: id
                }
            }).then( user => {
                if (!user) {
                    res.status(400).send({
                        status: 400,
                        message: 'Failed for update Product'
                    })
                } else {
                    User.findOne({
                        where : {
                            id : id
                        }
                    }).then(user => {
                        let rupiah = new Intl.NumberFormat('id', {
                            style: 'currency',
                            currency: 'IDR'
                        })
                        let result = rupiah.format(body.balance)
                        res.status(200).json({
                            message: `Your balance has been successfully update to ${result}`,
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
    })
}

exports.updateUser = async (req, res) => {
    const id = req.id
    const full_name = req.body.full_name;
    const email = req.body.email;
    const dataUser = {
        full_name,
        email,
      };
      await User.update(dataUser,
          { where: { id: id },
          returning : true,
        })
        .then((user) => {
            User.findOne({
                where : { id: id}
            }).then(user =>{
                user = {
                    id : user.id,
                    full_name : user.full_name,
                    email : user.email,
                    createdAt : user.createdAt,
                    updatedAt : user.updatedAt,
                }
                res.status(200).json(user)
            })
                
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "INTERNAL SERVER EROR",
                error: error,
            });
        })
}

exports.deleteUser = (req, res) => {
    const id = req.params.userId;
    User.destroy({
      where: {  id: req.params.id },
    })
    .then (() => {
        res.status(200).json({
            message: "Your account has been succesfully deleted",
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "INTERNAL SERVER",
            error: error,
        });
    })
}