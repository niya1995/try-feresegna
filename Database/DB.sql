CREATE TYPE user_role_enum AS ENUM ('admin', 'operator', 'driver', 'passenger');

--implementing class table inheritance
--keeping the common things inside the users table and the specific ones inside the corresponding tables
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role user_role_enum
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE passenger (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE
);
--here i used the logic that we differ the roles by their email,password
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE operator (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) NOT NULL,
    license_expiry DATE,
    hire_date DATE DEFAULT CURRENT_DATE,
    city_id INTEGER,
    operator_name VARCHAR(100) NOT NULL
);