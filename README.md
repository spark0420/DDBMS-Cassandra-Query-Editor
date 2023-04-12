# Distributed Databases: Semester Project

## Instructions

![Instructions](assets/screenshots/Distributed%20Database%20-%20Semester%20Project.png)

## TODO LIST:

 + Host Website: Deploy App to a hosting service.
    + To see more details click [here](https://www.animaapp.com/blog/industry/8-free-react-app-hosting-services/) or [here](https://www.makeuseof.com/heroku-alternatives-free-full-stack-hosting/)

## Setup AWS Keyspaces

We use AWS CloudShell to configure our workspace.

References:

+ [Using the Amazon Keyspaces Toolkit from AWS CloudShell](https://github.com/aws-samples/amazon-keyspaces-toolkit/tree/master/aws-cloudshell)
+ [Generate service-specific credentials](https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.credentials.ssc.html)
+ [Using cqlsh to connect to Amazon Keyspaces](https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.cqlsh.html#using_cqlsh)
+ [Using a Cassandra Node.js client driver to access Amazon Keyspaces programmatically](https://docs.aws.amazon.com/keyspaces/latest/devguide/using_nodejs_driver.html)

### Create Cassandra Keyspace

```sh
aws keyspaces create-keyspace --keyspace-name 'cassandra'
```

### Create Tables

ProductSupplier table:

```sh
aws keyspaces create-table --keyspace-name 'cassandra' --table-name 'productsupplier' --schema-definition 'file://aws/keyspaces/cassandra/productsupplier/schema_definition.json'
```

Invoices table:

```sh
aws keyspaces create-table --keyspace-name 'cassandra' --table-name 'invoices' --schema-definition 'file://aws/keyspaces/cassandra/invoices/schema_definition.json'
```

Customers and Suppliers by City table:

```sh
aws keyspaces create-table --keyspace-name 'cassandra' --table-name 'customersandsuppliersbycity' --schema-definition 'file://aws/keyspaces/cassandra/customersandsuppliersbycity/schema_definition.json'
```

Sales by Category table:

```sh
aws keyspaces create-table --keyspace-name 'cassandra' --table-name 'salesbycategory' --schema-definition 'file://aws/keyspaces/cassandra/salesbycategory/schema_definition.json'
```

### KeySpaces Connection

Generate service-specific credentials using the AWS CLI:

```sh
aws iam create-service-specific-credential \
    --user-name "UserName" \
    --service-name cassandra.amazonaws.com
```

Connect to Amazon Keyspaces with the following command:

```sh
cqlsh-expansion cassandra.us-east-1.amazonaws.com 9142 --ssl -u "armando+1-at-812301871030" -p "JkZirBhrQxUUXEE99hhVnLu4HGwN3ksV0OskjFCMEwc="
```

### Populate Tables

Before writing any data run the following command:

```sql
CONSISTENCY LOCAL_QUORUM
```

ProductSupplier table:

```sql
COPY cassandra.productsupplier (supplierid,productid,categoryid,companyname,productname,categoryname,quantityperunit,unitsinstock,unitprice,discontinued) FROM 'data/csv/productsupplier.csv' WITH DELIMITER='|' AND HEADER=TRUE;
```

Invoices table:

```sql
COPY cassandra.invoices (shipname,shipaddress,shipcity,shipregion,shippostalcode,shipcountry,customerid,customername,address,city,region,postalcode,country,salesperson,orderid,orderdate,requireddate,shippeddate,shippername,productid,productname,unitprice,quantity,discount,extendedprice,freight) FROM 'data/csv/invoices.csv' WITH DELIMITER='|' AND HEADER=TRUE;
```

Customers and Suppliers by City table:

```sql
COPY cassandra.customersandsuppliersbycity (city,companyname,contactname,relationship) FROM 'data/csv/customersandsuppliersbycity.csv' WITH DELIMITER='|' AND HEADER=TRUE;
```

Sales by Category table:

```sql
COPY cassandra.salesbycategory (categoryid,categoryname,productname,productsales) FROM 'data/csv/salesbycategory.csv' WITH DELIMITER='|' AND HEADER=TRUE;
```

### Predefined SQL Queries

+ Inventory per Suppliers:

```sql
select supplierid, companyname, productid, productname from cassandra.productsupplier;
```

+ Products by Category:

```sql
select categoryid, productname, quantityperunit,unitsinstock, discontinued  from cassandra.productsupplier WHERE discontinued = 0 ALLOW FILTERING;
```

+ Products Above Average Price:

For example, let's say the Average Price is equals to $50.

```sql
select productname, unitprice from cassandra.productsupplier WHERE unitprice > 90 ALLOW FILTERING;
```

## Run Web Application

Set your credentials within `.env` in the  `server` directory:

+ REACT_APP_AWS_KEYSPACES_SERVICE_USERNAME="YOUR_SERVICE_USERNAME"
+ REACT_APP_AWS_KEYSPACES_SERVICE_PASSWORD="YOUR_SERVICE_PASSWORD"

Open two terminals and run:

```sh
cd server && npm i && npm start
cd client && npm i && npm start
```

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Website

![HomePage](assets/screenshots/Website%20template%201.png)

![NavigationMenu](assets/screenshots/Website%20template%202.png)

![QueryDB](assets/screenshots/Website%20template%203.png)
