require('dotenv').config();

const express = require('express')
const cassandra = require('cassandra-driver')
const fs = require('fs')

let cert = fs.readFileSync('./sf-class2-root.crt')

const auth = new cassandra.auth.PlainTextAuthProvider(process.env.REACT_APP_AWS_KEYSPACES_SERVICE_USERNAME, process.env.REACT_APP_AWS_KEYSPACES_SERVICE_PASSWORD);
const sslOptions1 = {
        ca: [ cert],      
        host: 'cassandra.us-east-1.amazonaws.com',
        rejectUnauthorized: true
};
const client = new cassandra.Client({
        contactPoints: ['cassandra.us-east-1.amazonaws.com'],
        localDataCenter: 'us-east-1',
        authProvider: auth,
        sslOptions: sslOptions1,
        protocolOptions: { port: 9142 }
});
const query = 'select supplierid, companyname, productid, productname from cassandra.productsupplier';


console.log('----Debug: client', client)

const router = express.Router()

router.get('/', async (req, res, next) => {
    console.log('----Debug: before')
    const dataObj =  await client.execute(query)
    const dataArray = dataObj.rows
    // console.log('----Debug: data', dataArray)
    // res.status(200).json({
    //     message:'Handeling GET request to cas',
    //     data: data

    // })
    res.header("Access-Control-Allow-Origin", "*")
    res.status(200).json(JSON.stringify(dataArray))
})

module.exports  = router
