const {TransactionHistory, Product, User, Category} = require('../models/index')
const controller = require('../controllers/transaction.controller')
const httpMocks = require('node-mocks-http')

jest.mock('../models/index')

let req, res, next

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["auth"]
    res = httpMocks.createResponse()
})
describe('TransactionController.postTransaction', () => {
    it('should return 201', async () => {
        const id = req.id
        Product.findOne.mockResolvedValue({
            where: {
                id: 1
            }
        })
        User.findOne.mockResolvedValue({
            where: {
                id: id
            }
        })
        TransactionHistory.create.mockResolvedValue({
            UserId: 1,
            ProductId: 1,
            quantity: 1,
            total_price: 1
        })
        await controller.postTransaction(req, res)
        expect(res.statusCode).toBe(503)
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            TransactionHistory.create.mockResolvedValue(errData)
            await controller.postTransaction(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["auth"]
    res = httpMocks.createResponse()
})
describe('TransactionController.getTransactionForUser', () => {
    it('should return 200', async () => {
        const id = req.id
        TransactionHistory.findAll.mockResolvedValue({
            where: {
                UserId: id
            }
        })
        await controller.getTransactionForUser(req, res)
        expect(res.statusCode).toBe(200)
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            TransactionHistory.findAll.mockResolvedValue(errData)
            await controller.getTransactionForUser(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["auth"]
    res = httpMocks.createResponse()
})
describe('TransactionController.getTransactionForAdmin', () => {
    it('should return 200', async () => {
        const id = req.id
        const userRole = req.role
        if (userRole == 'admin') {
            TransactionHistory.findAll.mockResolvedValue()
            await controller.getTransactionForAdmin(req, res)
            expect(res.statusCode).toBe(200)
        }
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            TransactionHistory.findAll.mockResolvedValue(errData)
            await controller.getTransactionForAdmin(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["auth"]
    res = httpMocks.createResponse()
})
describe('TransactionController.getTransactionById', () => {
    it('should return 200', async () => {
        const id = req.id
        const userRole = req.role
        if (userRole == 'admin') {
            TransactionHistory.findAll.mockResolvedValue({
                where: {
                    id: id
                }
            })
            await controller.getTransactionById(req, res)
            expect(res.statusCode).toBe(200)
        }
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            TransactionHistory.findAll.mockResolvedValue(errData)
            await controller.getTransactionById(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})