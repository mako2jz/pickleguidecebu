# Pickle Guide Cebu - Backend Documentation

## Overview
Backend API for Pickle Guide Cebu built with Node.js, Express, and MySQL. Handles venue data, user reviews, admin management, and public court submissions.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (using `mysql2` driver)
- **Authentication:** JWT in HttpOnly Cookies
- **Security:** `bcryptjs`, `express-rate-limit`
- **Environment:** `dotenv`

## Project Structure
```
server/
├── config/
│   └── db.js              # MySQL connection pool
├── controllers/
│   ├── adminController.js # Admin CRUD + submission management
│   ├── authController.js  # Login/logout/session
│   ├── courtController.js # Public court queries
│   ├── reviewController.js# Review CRUD
│   └── submissionController.js # Public submissions
├── database/
│   └── schema.sql         # Database schema
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── rateLimit.js       # Rate limiting configs
│   └── role.js            # Role-based access control
├── routes/
│   ├── adminRoutes.js     # /api/admin/*
│   ├── authRoutes.js      # /api/auth/*
│   ├── courtRoutes.js     # /api/courts/*
│   ├── reviewRoutes.js    # /api/reviews/*
│   └── submissionRoutes.js# /api/submissions
└── server.js              # Entry point
```

---

## API Endpoints

### Public Routes

| Method | Endpoint | Description | Rate Limit |
|:-------|:---------|:------------|:-----------|
| `GET` | `/api/health` | Health check | General |
| `GET` | `/api/courts` | Get all courts | General |
| `GET` | `/api/courts/:id` | Get single court | General |
| `POST` | `/api/submissions` | Submit new court | 3/hour |
| `POST` | `/api/reviews` | Create review | 10/hour |
| `GET` | `/api/venues/:venueId/reviews` | Get venue reviews | General |
| `GET` | `/api/reviews/:id` | Get single review | General |

### Auth Routes

| Method | Endpoint | Description | Rate Limit |
|:-------|:---------|:------------|:-----------|
| `POST` | `/api/auth/login` | Admin login | 5 attempts/15min |
| `POST` | `/api/auth/logout` | Admin logout | General |
| `GET` | `/api/auth/me` | Check session | General |

### Admin Routes (Protected)

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/admin/courts` | List all courts |
| `POST` | `/api/admin/courts` | Create court |
| `GET` | `/api/admin/courts/:id` | Get court |
| `PUT` | `/api/admin/courts/:id` | Update court |
| `DELETE` | `/api/admin/courts/:id` | Delete court |
| `GET` | `/api/admin/submissions` | Get pending submissions |
| `POST` | `/api/admin/submissions/:id/approve` | Approve submission |
| `DELETE` | `/api/admin/submissions/:id/decline` | Decline submission |
| `DELETE` | `/api/reviews/:id` | Delete review (moderation) |

---

## Configuration

### Required `.env` Variables
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pickleguidecebu

# Server
PORT=5000

# Security
JWT_SECRET=your_super_secret_key_here

# CORS (Frontend URL)
CORS_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=development
```

### Database Setup
1. Start MySQL (via XAMPP or standalone)
2. Run the schema:
   ```sql
   source server/database/schema.sql
   ```
3. Seed your first super_admin:
   ```sql
   INSERT INTO admins (username, email, password_hash, role) 
   VALUES ('admin', 'admin@pickleguide.com', '$2a$10$YOUR_BCRYPT_HASH', 'super_admin');
   ```
   
   Generate hash with: `npx bcryptjs-cli hash "your_password" 10`

---

## Frontend Connection Guide

### 1. Install Axios (or use fetch)
```bash
cd client
npm install axios
```

### 2. Create API Service (`client/src/services/api.js`)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // REQUIRED for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
```

### 3. Example Usage

**Fetch all courts:**
```javascript
import api from './services/api';

const getCourts = async () => {
  const response = await api.get('/courts');
  return response.data.data; // Array of courts
};
```

**Admin login:**
```javascript
const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data; // { success, message, user }
};
```

**Check if logged in:**
```javascript
const checkAuth = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user; // { id, role }
  } catch {
    return null; // Not logged in
  }
};
```

**Submit a review:**
```javascript
const submitReview = async (venueId, rating, name, description) => {
  const response = await api.post('/reviews', {
    venue_id: venueId,
    rating,
    reviewer_name: name,
    review_description: description
  });
  return response.data;
};
```

**Admin: Approve submission:**
```javascript
const approveSubmission = async (submissionId) => {
  const response = await api.post(`/admin/submissions/${submissionId}/approve`);
  return response.data;
};
```

### 4. Auth Context Example (`client/src/context/AuthContext.jsx`)
```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 5. Protected Route Example
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};
```

---

## Security Features

| Feature | Implementation |
|:--------|:---------------|
| Password Hashing | bcryptjs (10 rounds) |
| JWT Storage | HttpOnly cookies |
| CORS | Credentials + specific origin |
| Rate Limiting | Per-route limits |
| SQL Injection | Parameterized queries |
| Role-Based Access | `adminOnly`, `superAdminOnly` middleware |

---

## Running the Server

```bash
cd server
npm install
npm run dev    # Development (nodemon)
npm start      # Production
```
