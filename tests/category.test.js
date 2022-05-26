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
        Category.create.mockResolvedValue({
            type: 'Food'
        })
        await controller.postCategory(req, res)
        expect(res.statusCode).toBe(201)
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }

        const rejected = Promise.reject(errData)

        Category.create.mockResolvedValue(rejected)
        await controller.postCategory(req, res)
        expect(res.statusCode).toBe(503)
    })
})

beforeEach(() => {
    req = httpMocks.createRequest()
    req.headers["auth"]
    res = httpMocks.createResponse()
})
describe('CategoryController.getCategory', () => {
    it('should return 200', async () => {
        Category.findAll.mockResolvedValue({
            where: {
                id: 1
            }
        })
        await controller.getCategory(req, res)
        expect(res.statusCode).toBe(200)
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }

        const rejected = Promise.reject(errData)

        Category.findAll.mockResolvedValue(rejected)
        await controller.getCategory(req, res)
        expect(res.statusCode).toBe(503)
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
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }

        const rejected = Promise.reject(errData)

        Category.findOne.mockResolvedValue(rejected)
        await controller.patchCategory(req, res)
        expect(res.statusCode).toBe(503)
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
    })
    it('should return error', async () => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }

        const rejected = Promise.reject(errData)

        Category.findOne.mockResolvedValue(rejected)
        await controller.patchCategory(req, res)
        expect(res.statusCode).toBe(503)
    })
})