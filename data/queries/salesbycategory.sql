-- SOURCE: https://www3.ntu.edu.sg/home/ehchua/programming/sql/SampleDatabases.html, https://flaviocopes.com/mysql-how-to-install/
SELECT
   Categories.CategoryID, 
   Categories.CategoryName, 
   Products.ProductName, 
   Sum(`Order Details Extended`.ExtendedPrice) AS ProductSales
FROM Categories 
   JOIN Products ON Categories.CategoryID = Products.CategoryID
   JOIN `Order Details Extended` ON Products.ProductID = `Order Details Extended`.ProductID
   JOIN Orders ON Orders.OrderID = `Order Details Extended`.OrderID 
WHERE Orders.OrderDate BETWEEN '1997-01-01' And '1997-12-31'
GROUP BY
   Categories.CategoryID,
   Categories.CategoryName,
   Products.ProductName;

