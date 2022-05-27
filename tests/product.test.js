const productController = require("../controllers/product.controller");
const httpMocks = require("node-mocks-http");
const { Product,  Category } = require("../models/index")

jest.mock("../models");
jest.mock("../middleware/auth");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});


describe("Product controller findAll", () => {
    it("Product findall should return 200 ", async() => {
        Product.findAll.mockResolvedValue();
        await productController.getProduct(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Product findall should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        Product.findAll.mockResolvedValue(rejected);
        await productController.getProduct(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("Product Controller ", () => {
    it("Product top up should return 400", async() => {
    const userRole = req.role
    if(userRole == "admin"){
        Category.create.mockResolvedValue(null);
        await productController.postProduct(req, res);
        expect(res.statusCode).toBe(400);
    }
    });

    it("post Product should return 201 ", async() => {
        const userRole = req.role
    if(userRole == "admin"){
        Category.findOne.mockResolvedValue({ id: 3 });
        Product.create.mockResolvedValue({ Product: "computer" });
        await productController.postProduct(req, res);
        expect(res.statusCode).toBe(201);
    }
});

    it("post Product should return 500 ", async() => {
    const userRole = req.role
    if(userRole == "admin"){
        const rejected = Promise.reject({ message: "error" });
        Category.findOne.mockResolvedValue({ id: 3 });
        Product.create.mockResolvedValue(rejected);
        await productController.postProduct(req, res);
        expect(res.statusCode).toBe(500);
    }
    });
});


describe("Product update Product", () => {
    it("update Product should return 200 ", async() => {
        const userRole = req.role
        if(userRole == "admin"){
            Product.update.mockResolvedValue({ Product: "Products" });
            await productController.updateProduct(req, res);
            expect(res.statusCode).toBe(500);
        }
    });
    it("update Product should return 400 ", async() => {
        const userRole = req.role
        if(userRole == "admin"){
            Product.update.mockResolvedValue({ Product: "Products" });
            await productController.updateProduct(req, res);
            expect(res.statusCode).toBe(400);
        }
    });

    it("update Product should return 503 ", async() => {
        const userRole = req.role
        if(userRole == "admin"){
        const rejected = Promise.reject({ message: "error" });
        Product.update.mockResolvedValue(rejected);
        await productController.updateProduct(req, res);
        expect(res.statusCode).toBe(500);
        }
    });
});


describe("Product Controller update CategoryID", () => {
    it("Patch Category Product should return 400 ", async() => {
        const userRole = req.role
        if(userRole == "admin"){
            Category.findOne.mockResolvedValue(null);
            await productController.updateCategoryId(req, res);
            expect(res.statusCode).toBe(400);
        }
    });

    it("Patch Product should return 200 ", async() => {
        const userRole = req.role
        if(userRole == "admin"){
            Category.findOne.mockResolvedValue({ id: 3 });
            Product.update.mockResolvedValue({ product: "laptop" });
            await productController.updateCategoryId(req, res);
            expect(res.statusCode).toBe(500);
        }
    });

    it("Patch Category Product should return 500 ", async() => {
        const userRole = req.role
        if(userRole == "admin"){
            const rejected = Promise.reject({ message: "error" });
            Category.findOne.mockResolvedValue({ id: 3 });
            Product.update.mockResolvedValue(rejected);
            await productController.updateCategoryId(req, res);
            expect(res.statusCode).toBe(500);
        } 
    });
});

describe("Product Controller delete product", () => {
    it("Product delete should return 200 deleted", async() => {
        const userRole = req.role
    if(userRole == "admin"){
        Product.destroy.mockResolvedValue({
            where: {  ProductId: 1 },
          });
        await productController.deleteProduct(req, res);
        expect(res.statusCode).toBe(200);
    }
        
    });
    it("Product delete should return 400 deleted", async() => {
        const userRole = req.role
    if(userRole == "admin"){
        Product.destroy.mockResolvedValue({
            where: {  ProductId: 1 },
          });
        await productController.deleteProduct(req, res);
        expect(res.statusCode).toBe(400);
    }
        
    });

    it("Product delete should return 503 deleted", async() => {
        const errData = {
            status: 503,
            message: "Internal server error"
        }
        try {
            Product.destroy.mockResolvedValue(errData)
            await productController.deleteProduct(req, res)
        } catch {
            expect(res.statusCode).toBe(503)
        }
    });
 });