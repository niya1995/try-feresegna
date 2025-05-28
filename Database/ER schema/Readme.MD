# Bus Management System Database

## Overview
This database is designed to manage a **Bus Management System**. It handles users, buses, trips, routes, bookings, and other related entities. The database uses a relational structure with foreign key constraints to maintain data integrity and enforce relationships between tables.

The database schema is normalized and supports the following features:
- User roles (e.g., superadmin, admin, driver, user).
- Management of buses, trips, and routes.
- Booking system with seat management and pricing.
- Feedback system for users to rate trips.

---

## ER Diagram
Attach the ER diagram here (e.g., as an image or link). The ER diagram visually represents the relationships between tables in the database.

---

## Database Structure

### 1. **Users and Roles**
- **`users`**: Stores common user information (e.g., name, password, role).
- **`user_contacts`**: Stores contact details for users (e.g., phone number, email).
- **`superadmins`**: Stores superadmin-specific details.
- **`admins`**: Stores admin-specific details, including the city they manage.
- **`drivers`**: Stores driver-specific details (e.g., license number, status).

### 2. **Cities and Routes**
- **`cities`**: Stores city information (e.g., name).
- **`routes`**: Stores route information, including departure and destination cities and distance.
- **`driver_assignments`**: Tracks which drivers are assigned to specific routes by admins.

### 3. **Buses and Trips**
- **`buses`**: Stores bus information (e.g., plate number, capacity, assigned driver).
- **`trips`**: Stores trip details (e.g., departure time, price, available seats).
- **`route_trip_association`**: A junction table to handle the many-to-many relationship between routes and trips.

### 4. **Seats and Bookings**
- **`seats`**: Stores seat details for buses (e.g., seat number, type).
- **`booking`**: Tracks user bookings, including the trip, seat, and payment status.
- **`seat_prices`**: Stores pricing information for specific seats on trips.

### 5. **Feedback**
- **`user_feedback`**: Allows users to provide feedback and ratings for trips.

---

## Table Relationships
### Key Relationships:
1. **Users**:
   - `user_contacts` references `users` via `user_id`.
   - `superadmins`, `admins`, and `drivers` reference `users` via `user_id`.

2. **Cities and Routes**:
   - `routes` references `cities` via `departure_city_id` and `destination_city_id`.
   - `driver_assignments` references `routes` via `route_id`.

3. **Buses and Trips**:
   - `trips` references `buses` via `bus_id`.
   - `route_trip_association` links `routes` and `trips`.

4. **Seats and Bookings**:
   - `seats` references `buses` via `bus_id`.
   - `booking` references `users`, `trips`, and `seats`.
   - `seat_prices` references `trips` and `seats`.

---

## Features
### 1. **User Management**
- Supports multiple user roles: superadmin, admin, driver, and regular user.
- Each user can have multiple contact details.

### 2. **Route and Trip Management**
- Routes connect cities with departure and destination points.
- Trips are associated with buses and routes.

### 3. **Seat and Booking Management**
- Tracks seat availability and types (e.g., window, aisle).
- Allows users to book seats on specific trips.
- Supports payment statuses (e.g., pending, paid, failed).

### 4. **Feedback System**
- Users can provide feedback and ratings for trips.

