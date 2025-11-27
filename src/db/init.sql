-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price NUMERIC(10, 2)
);

-- Create orders table if it doesn't exist, with references to users and products
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Reference to the users table
    product_id INT REFERENCES products(id) ON DELETE CASCADE,  -- Reference to the products table
    quantity INT DEFAULT 1,  -- Optionally track quantity of product ordered
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Use TIMESTAMP instead of VARCHAR for date
);
