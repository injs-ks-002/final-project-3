const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category.route')
const transactionRouter = require('./routes/transaction.route')


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/product", productRouter);
app.use('/categories', categoryRouter)
app.use('/transactions', transactionRouter)


app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`)
})