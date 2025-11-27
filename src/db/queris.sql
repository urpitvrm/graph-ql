-- ================================
-- USERS TABLE QUERIES
-- ================================

-- Get all users
SELECT * FROM users ORDER BY id ASC;

-- Get single user
SELECT * FROM users WHERE id = $1;

-- Insert user
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING *;

-- Update user
UPDATE users
SET name = $1, email = $2
WHERE id = $3
RETURNING *;

-- Delete user
DELETE FROM users WHERE id = $1 RETURNING *;



-- ================================
-- PRODUCTS TABLE QUERIES
-- ================================

-- Get all products
SELECT * FROM products ORDER BY id ASC;

-- Get single product
SELECT * FROM products WHERE id = $1;

-- Insert product
INSERT INTO products (name, price)
VALUES ($1, $2)
RETURNING *;

-- Update product
UPDATE products
SET name = $1, price = $2
WHERE id = $3
RETURNING *;

-- Delete product
DELETE FROM products WHERE id = $1 RETURNING *;

-- ================================
-- ORDERS TABLE QUERIES
-- ================================

-- Get all orders
SELECT * FROM orders ORDER BY id ASC;

-- Get single order
SELECT * FROM orders WHERE id = $1;

-- Insert order
INSERT INTO orders (user_id, product_id, quantity)
VALUES ($1, $2, $3)
RETURNING *;

-- Update order
UPDATE orders
SET user_id = $1,
    product_id = $2,
    quantity = $3,
    order_date = $4
WHERE id = $5
RETURNING *;

-- Delete order
DELETE FROM orders WHERE id = $1 RETURNING *;
