  -- SOURCE: https://www3.ntu.edu.sg/home/ehchua/programming/sql/SampleDatabases.html, https://flaviocopes.com/mysql-how-to-install/
  SELECT 
   Orders.ShipName,
   Orders.ShipAddress,
   Orders.ShipCity,
   Orders.ShipRegion, 
   Orders.ShipPostalCode,
   Orders.ShipCountry,
   Orders.CustomerID,
   Customers.CompanyName AS CustomerName,
   Customers.Address,
   Customers.City,
   Customers.Region,
   Customers.PostalCode,
   Customers.Country,
   (Employees.FirstName + ' ' + Employees.LastName) AS Salesperson, 
   Orders.OrderID,
   Orders.OrderDate,
   Orders.RequiredDate,
   Orders.ShippedDate, 
   Shippers.CompanyName As ShipperName,
   `Order Details`.ProductID,
   Products.ProductName, 
   `Order Details`.UnitPrice,
   `Order Details`.Quantity,
   `Order Details`.Discount, 
   FLOOR(`Order Details`.UnitPrice*Quantity*(1-Discount)) AS ExtendedPrice,
         -- truncate to nearest dollars
   Orders.Freight
FROM Customers
   JOIN Orders ON Customers.CustomerID = Orders.CustomerID  
   JOIN Employees ON Employees.EmployeeID = Orders.EmployeeID    
   JOIN `Order Details` ON Orders.OrderID = `Order Details`.OrderID     
   JOIN Products ON Products.ProductID = `Order Details`.ProductID      
   JOIN Shippers ON Shippers.ShipperID = Orders.ShipVia;