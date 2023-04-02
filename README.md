# Distributed Databases: Semester Project

## Instructions

![Instructions](src/assets/screenshots/Distributed%20Database%20-%20Semester%20Project.png)

## TODO LIST:

+ Add AWS KeySpaces connection in [useData.js](https://github.com/arm-diaz/DDBMS-Cassandra-Query-Editor/blob/main/src/hooks/useData.js)
  + Right now, it is quering data from a repository endpoint.
+ Modify Query Names in Navigation Panel [constants.js](https://github.com/arm-diaz/DDBMS-Cassandra-Query-Editor/blob/main/src/constants/constants.js)
  + Right now, it has the table names of the database. We should use the Business Logic Name, such as:
    + Inventory for supplier
    + Current products
    + Products by category
    + Customers and suppliers
    + Order details
    + Invoices
    + etc.
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

### KeySpaces Connection

Generate service-specific credentials using the AWS CLI:

```sh
aws iam create-service-specific-credential \
    --user-name alice \
    --service-name cassandra.amazonaws.com
```

Connect to Amazon Keyspaces with the following command:

```sh
cqlsh-expansion cassandra.us-east-1.amazonaws.com 9142 --ssl -u "ServiceUserName" -p "ServicePassword"
```

### Populate Tables

ProductSupplier table:

```sql
COPY cassandra.productsupplier (supplierid,productid,categoryid,companyname,productname,categoryname,quantityperunit,unitsinstock,unitprice,discontinued) FROM 'data/productsupplier.csv' WITH DELIMITER='|' AND HEADER=TRUE;
```

### Predefined SQL Queries: (TODO: ADD THESE QUERIES IN THE EDITOR)

+ Inventory per Suppliers:

```sql
select supplierid, companyname, productid, productname from cassandra.productsupplier;
```

+ Products by Category:

```sql
select categoryid, productname, quantityperunit,unitsinstock, discontinued  from cassandra.productsupplier WHERE discontinued = 0 ALLOW FILTERING;
```

+ Products Above "X" Price:

For example, let's say X is equals to 90.

```sql
select productname, unitprice from cassandra.productsupplier WHERE unitprice > 90 ALLOW FILTERING;
```

## Run Web Application

Open your terminal and run:

```sh
npm install
npm start
npm run deploy
```

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Website

![HomePage](src/assets/screenshots/Website%20template%201.png)

![NavigationMenu](src/assets/screenshots/Website%20template%202.png)

![QueryDB](src/assets/screenshots/Website%20template%203.png)
