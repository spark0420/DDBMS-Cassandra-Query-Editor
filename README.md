# Distributed Databases: Semester Project

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

## Instructions

![Instructions](src/assets/screenshots/Distributed%20Database%20-%20Semester%20Project.png)

## Run Web Application

Open your terminal and run:

```sh
npm install
npm start
```

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Predefined SQL Queries (TODO: MODIFY THIS SECTION WITH OUR QUERIES)

+ select * from customers
+ select * from categories
+ select * from employee_territories
+ select * from order_details
+ select * from orders
+ select * from products
+ select * from regions
+ select * from shippers
+ select * from suppliers
+ select * from territories

## Website

![HomePage](src/assets/screenshots/Website%20template%201.png)

![NavigationMenu](src/assets/screenshots/Website%20template%202.png)

![QueryDB](src/assets/screenshots/Website%20template%203.png)
