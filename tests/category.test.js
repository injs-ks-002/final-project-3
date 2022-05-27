const {Category} = require('../models/index')
const controller = require('../controllers/category.controller')
const httpMocks = require('node-mocks-http')

jest.mock('../models/index')

let req, res, next

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["auth"]
    res = httpMocks.createResponse()
})
describe('CategoryController.postCategory', () => {
    it('should return 201', async () => {
        const userRole = req.role
        if (userRole == 'admin') {
            Category.create.mockResolvedValue({
                type: 'Food'
            })
            await controller.postCategory(req, res)
            expect(res.statusCode).toBe(201)
        }
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            Category.create.mockResolvedValue(errData)
            await controller.postCategory(req, res)
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
describe('CategoryController.getCategory', () => {
    it('should return 200', async () => {
        const userRole = req.role
        if (userRole == 'admin') {
            Category.findAll.mockResolvedValue({
                where: {
                    id: 1
                }
            })
            await controller.getCategory(req, res)
            expect(res.statusCode).toBe(200)
        }
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            Category.findAll.mockResolvedValue(errData)
            await controller.getCategory(req, res)
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
describe('CategoryController.patchCategory', () => {
    it('should return 200', async () => {
        const id = req.id
        const userRole = req.role
        if (userRole == 'admin') {
            Category.findOne.mockResolvedValue({
                where: {
                    id: id
                }
            })
            Category.update.mockResolvedValue({
                type: 'Food'
            }, {
                where: {
                    id: id
                }
            })
            await controller.patchCategory(req, res)
            expect(res.statusCode).toBe(200)
        }
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            Category.findOne.mockResolvedValue(errData)
            await controller.patchCategory(req, res)
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
describe('CategoryController.deleteCategory', () => {
    it('should return 200', async () => {
        const id = req.id
        const userRole = req.role
        if (userRole == 'admin') {
            Category.findOne.mockResolvedValue({
                where: {
                    id: id
                }
            })
            Category.destroy.mockResolvedValue({
                where: {
                    id: id
                }
            })
            await controller.deleteCategory(req, res)
            expect(res.statusCode).toBe(200)
        }
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            Category.findOne.mockResolvedValue(errData)
            await controller.deleteCategory(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    })
})