# 🚌 FeresegnaBUS Reservation System

## Overview

This project is a robust and scalable **bus reservation system** built with SQL for backend data modeling. It supports a hierarchical user model, dynamic seat pricing, trip management, real-time seat bookings, and feedback collection. Designed to handle operations in multi-city environments with a clean distinction between administrative and operational responsibilities.

---

## 🚀 Features

- Role-based user management (`superadmin`, `admin`, `driver`, `user`)
- Admin-to-driver and driver-to-multiple-cities relationships
- Route and trip association with flexible stop support (many-to-many)
- Real-time seat availability tracking
- Configurable seat types (window, aisle, back-row, etc.)
- Booking and payment status management
- User feedback and rating system
- Designed with normalization and scalability in mind

---

## 🧱 Database Schema Highlights

### User & Role System

- `users`: Base table for all users with enum-based roles
- `superadmins`, `admins`, `drivers`: Role-specific extensions of users
- `admins` manage one `city`
- `drivers` can work in multiple cities (many-to-many with `DriverCity`)

### Cities & Routes

- `cities`: Unique cities in the system
- `routes`: Distance-based connections between cities
- `route_trip_association`: Allows a trip to span multiple routes (e.g., stops)

### Vehicles & Trips

- `buses`: Linked to a driver and stores capacity
- `trips`: Scheduled bus journeys with prices and departure times
- `seats`: Configured per bus, linked to bookings
- `seat_prices`: Individual seat-level dynamic pricing per trip

### Bookings & Payments

- `booking`: Stores trip-seat-user association, payment status
- `payment_status_enum`: Enum for tracking `pending`, `paid`, `failed`

### Feedback

- `user_feedback`: Users can rate and comment on trips (1–5 stars)

---
