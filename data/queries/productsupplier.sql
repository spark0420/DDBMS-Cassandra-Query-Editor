-- SOURCE: https://www3.ntu.edu.sg/home/ehchua/programming/sql/SampleDatabases.html, https://flaviocopes.com/mysql-how-to-install/
SELECT
	s.SupplierID,
	p.ProductID,
    c.CategoryID,
	s.CompanyName,
	p.ProductName,
    c.CategoryName,
    p.QuantityPerUnit,
    p.UnitsInStock, 
    p.UnitPrice,
    p.Discontinued
FROM Products p 
INNER JOIN Suppliers s ON p.SupplierID = s.SupplierID
INNER JOIN Categories c ON c.CategoryID = p.CategoryID
ORDER BY s.SupplierID asc;