  -- SOURCE: https://www3.ntu.edu.sg/home/ehchua/programming/sql/SampleDatabases.html, https://flaviocopes.com/mysql-how-to-install/
SELECT 
   City, 
   CompanyName, 
   ContactName, 
   'Customers' AS Relationship 
FROM Customers
UNION  -- Union two result sets (of same column numbers), remove duplicates
SELECT City, 
   CompanyName, 
   ContactName, 
   'Suppliers'
FROM Suppliers 
ORDER BY City, CompanyName;