# Pickle Guide Cebu - Backend Documentation

## Overview
This is the backend API for Pickle Guide Cebu, built with Node.js, Express, and MySQL. It handles data persistence for venues, user reviews, admin management, and public court submissions.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (using `mysql2` driver)
- **Authentication:** JWT (JSON Web Tokens) in HttpOnly Cookies
- **Environment Management:** `dotenv`

## Project Structure
```
server/
├── config/         # Database configuration
├── controllers/    # Request logic
├── database/       # SQL schemas
├── middleware/     # Auth & validation
├── routes/         # API endpoints
└── server.js       # Entry point
```

## Current Features

### 1. Database Schema
- **Courts**: Stores venue details (name, location, price, contact, etc.).
- **Reviews**: Stores user ratings and comments for venues.
- **Admins**: Stores admin credentials and roles (`admin`, `super_admin`).
- **Court Submissions**: Stores user-suggested venues pending approval.

### 2. Authentication & Authorization
- **JWT Middleware (`auth.js`)**: Verifies identity via HttpOnly cookies.
- **Role Middleware (`role.js`)**: Enforces permissions (`adminOnly`, `superAdminOnly`, `allowRoles`).

### 3. API Endpoints

#### Public Routes (`/api`)
| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Health check | Implemented |
| `GET` | `/courts` | Get all approved courts | Implemented |
| `GET` | `/courts/:id` | Get single court details | Implemented |
| `POST` | `/submissions` | User submits a new court | Implemented |

#### Admin Routes (`/api/admin` - *To be mounted*)
*(Protected by Auth + Role Middleware)*

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/courts` | Create a new court directly | Controller Ready |
| `GET` | `/courts/:id` | Get court for editing | Controller Ready |
| `PUT` | `/courts/:id` | Update court details | Controller Ready |
| `DELETE` | `/courts/:id` | Delete a court | Controller Ready |
| `POST` | `/submissions/:id/approve` | Approve user submission | Controller Ready |

## Configuration
- **.env**: Requires `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `PORT`.

---

# Backend Implementation Todo List

## 1. Core Server & Configuration
- [ ] **Fix**: Add `cookie-parser` to `server.js` (Required for `auth.js` to read cookies).
- [ ] **Fix**: Register `adminRoutes` in `server.js` under `/api/admin`.
- [ ] **Fix**: Register `submissionRoutes` in `server.js` under `/api`.

## 2. Admin Authentication (Login)
- [ ] **Make**: Create `authController.js` to handle admin login.
    - Validate credentials (hash check).
    - Generate JWT.
    - Send HttpOnly cookie.
- [ ] **Make**: Create `authRoutes.js` for `/api/auth/login` and `/api/auth/logout`.
- [ ] **Make**: Script or detailed instruction to seed the first `super_admin` in the database (since we can't register admins via public API).

## 3. Review System
- [ ] **Make**: Implement `reviewController.js`.
    - `createReview`: Add review to a venue.
    - `getReviewsByVenue`: List reviews for a specific court.
    - `deleteReview`: (Admin only) Moderation.
- [ ] **Make**: Implement `reviewRoutes.js` and register in `server.js`.

## 4. Submission Management
- [ ] **Make**: Add `getPendingSubmissions` to `adminController.js` (Admins need to see what to approve).
- [ ] **Make**: Add route for `getPendingSubmissions` in `adminRoutes.js`.
- [ ] **Make**: Add `rejectSubmission` to `adminController.js` (To clean up spam/invalid entries).

## 5. File Uploads (Venue Pictures)
- [ ] **Feature**: Currently, we accept string paths for `venue_picture`. We need actual file handling using `multer`.
    - Configure `multer` storage.
    - Update `createCourt` and `updateCourt` to handle file uploads.
