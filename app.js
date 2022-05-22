const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product');


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/product", productRouter);


app.listen(3000, function () {
    console.log('Contoh server berjalan di port 3000!')
})