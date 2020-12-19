require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT_SERVER
app.use(express.json())

const productsRouter = require('./api/router/productRouter');
const userRouter = require('./api/router/userRouter');
const deliveryPointRouter = require('./api/router/deliveryPointsRouter');

app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/deliveryPoint', deliveryPointRouter);

app.listen(port,() => {
    console.log("Server in running on port ", port);
});