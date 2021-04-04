-- Database Queries
-- Find all customers with postal code 1010,return 3 of them
SELECT
  *
FROM Customers
WHERE
  postalcode = 1010
  LIMIT 3
-- Find the phone number for the supplier with the id 11
SELECT
  phone
FROM suppliers
where
  supplierid = 11;
-- List first 10 orders placed, sorted descending by the order date
SELECT
  *
FROM orders
order by
  orderdate desc
limit
  10;
-- Find all customers that live in London, Madrid, or Brazil
SELECT
  *
FROM Customers
WHERE
  city = "Madrid"
  OR city = "London"
  OR Country = "Brazil";
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into customers (
    customername,
    contactname,
    address,
    city,
    postalcode,
    country
  )
values(
    "The Shire",
    "Bilbo Baggins",
    "1 Hobbit-Hole",
    " Bag End",
    111,
    "Middle Earth"
  );
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update customers
set
  postalcode = 11112122
where
  customerid = 93 -- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT
  city,
  COUNT(*) AS `cities`
FROM customers
GROUP BY
  city -- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT
  SupplierName
FROM Suppliers
WHERE
  LENGTH(SupplierName) > 20