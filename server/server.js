require('dotenv').config();

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const invoicesRoutes = require('./routes/invoices')  
const customersAndSuppliersByCityRoutes = require('./routes/customersandsuppliersbycity')  
const salesByCategoryRoutes = require('./routes/salesbycategory')  
const productsAboveAverageRoutes = require('./routes/productsaboveavarage')  
const productsByCategoryRoutes = require('./routes/productsbycategory')  
const inventoryPerSupplierRoutes = require('./routes/inventorypersupplier')
const { errorMonitor } = require('events')
const path  = require('path')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/invoices',  invoicesRoutes)
app.use('/customersandsuppliersbycity',  customersAndSuppliersByCityRoutes)
app.use('/salesbycategory',  salesByCategoryRoutes)
app.use('/productsaboveavarage',  productsAboveAverageRoutes)
app.use('/productsbycategory',  productsByCategoryRoutes)
app.use('/inventorypersupplier',  inventoryPerSupplierRoutes)

// app.use((req, res, next)=>{
    
//     const error = new Error('Not found') // Not found
//     error.status = 404
//     next(error)
// })

// app.use((error, req, res, next)=>{
//     res.status(error.status || 500)
//     res.json( {
//         error: {
//             message: error.message
//         }
//     })

// })

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

module.exports = app