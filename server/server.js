require('dotenv').config();

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

//const productRoutes = require('./routes/products')  
//const ordersRoutes = require('./routes/orders')  
const casRoutes = require('./routes/productsupplier')
const { errorMonitor } = require('events')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//app.use('/products',  productRoutes)
//app.use('/orders',  ordersRoutes)
app.use('/productsupplier',  casRoutes)

app.use((req, res, next)=>{
    
    const error = new Error('Not found') // Not found
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json( {
        error: {
            message: error.message
        }
    })

})

module.exports = app