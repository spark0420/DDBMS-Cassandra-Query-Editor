require('dotenv').config();

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const productsAboveAverageRoutes = require('./routes/productsaboveavarage')  
const productsByCategoryRoutes = require('./routes/productsbycategory')  
const inventoryPerSupplierRoutes = require('./routes/inventorypersupplier')
const { errorMonitor } = require('events')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/productsaboveavarage',  productsAboveAverageRoutes)
app.use('/productsbycategory',  productsByCategoryRoutes)
app.use('/inventorypersupplier',  inventoryPerSupplierRoutes)

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