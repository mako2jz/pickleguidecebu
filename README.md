# Pickle Guide Cebu


<div align="center">
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
</div>


A community-driven guide to pickleball court rentals in Cebu. This platform helps players find courts, compare prices, and share their experiences.

## Tech Stack

This project uses the MERN stack with MySQL replacing MongoDB:

### Client
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: GSAP
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios

### Server
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt.js, cors, express-rate-limit

## Project Structure

```
pickleguidecebu/
├── client/                 # Frontend Application
│   ├── public/             # Static files
│   └── src/
│       ├── api/            # API configuration (Axios)
│       ├── components/     # Reusable UI components
│       ├── context/        # React Context (Auth)
│       ├── lib/            # Utility functions
│       ├── pages/          # Application Routes/Pages
│       └── App.jsx         # Main Component
│
├── server/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route logic handlers
│   ├── database/           # SQL schemas
│   ├── middleware/         # Auth, Rates, Roles
│   ├── routes/             # API Endpoints
│   └── server.js           # Server Entry point
│
└── package.json            # Root Scripts
```

## Prerequisites

- Node.js (v16+)
- MySQL (v5.7 or v8.0)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mako2jz/pickleguidecebu.git
cd pickleguidecebu
```

### 2. Install dependencies

```bash
# Install root, server, and client dependencies
npm install
npm run install-all
```

### 3. Set up MySQL Database

```bash
# Log into MySQL
mysql -u root -p

# Create database and tables using the schema
source server/database/schema.sql
```

### 4. Configure environment variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pickleguidecebu
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently with a single command:

```bash
npm run dev
```

Or run them in separate terminals:

```bash
# Terminal 1 - Backend (Port 5000)
npm run server

# Terminal 2 - Frontend (Port 3000)
npm run client
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Key Features

- **Court Browsing**: View all available courts with photos and details.
- **Venue Submission**: Users can suggest new courts for the platform.
- **Reviews**: Leave ratings and reviews for courts.
- **Admin Dashboard**: Protected route for admins to manage submissions and reviews.
- **Authentication**: Secure login/signup system with JWT and HttpOnly cookies.
- **Security**: Rate limiting on API routes to prevent abuse.

## API Endpoints

### Public Routes
- `GET  /api/courts` - List all courts
- `GET  /api/courts/:id` - Get court details
- `POST /api/submissions` - Submit a new venue
- `POST /api/reviews` - Add a review
- `GET  /api/reviews/court/:courtId` - Get reviews for a court

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET  /api/auth/me` - Get current user profile

### Admin (Protected)
- `GET  /api/admin/dashboard` - Dashboard stats
- `GET  /api/admin/submissions` - View pending submissions
- `PUT  /api/admin/submissions/:id/approve` - Approve a court
- `DELETE /api/admin/submissions/:id` - Reject submission

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
