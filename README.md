# Pickle Guide Cebu 🏓

A central guide to pickleball court rentals in Cebu.

## Tech Stack

This is a MERN stack application with MySQL instead of MongoDB:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **State Management**: React Hooks

## Project Structure

```
pickleguidecebu/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/        # Images, styles, etc.
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   │   ├── App.css        # App styles
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Client dependencies
│
├── server/                # Express backend
│   ├── config/           # Configuration files
│   │   └── db.js         # MySQL connection
│   ├── controllers/      # Request handlers
│   │   └── courtController.js
│   ├── models/          # Database schemas
│   │   └── schema.sql   # SQL schema
│   ├── routes/          # API routes
│   │   └── courtRoutes.js
│   ├── server.js        # Server entry point
│   ├── .env.example     # Environment variables template
│   └── package.json     # Server dependencies
│
└── package.json         # Root package.json for scripts
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mako2jz/pickleguidecebu.git
cd pickleguidecebu
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install server and client dependencies
npm run install-all
```

### 3. Set up MySQL Database

```bash
# Log into MySQL
mysql -u root -p

# Create database and tables
source server/models/schema.sql
```

### 4. Configure environment variables

```bash
# Copy the example environment file
cp server/.env.example server/.env

# Edit the .env file with your MySQL credentials
# Example:
# PORT=5000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=pickleguidecebu
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Run backend server (port 5000)
npm run server

# Terminal 2 - Run frontend dev server (port 3000)
npm run client
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## API Endpoints

### Courts

- `GET /api/courts` - Get all courts
- `GET /api/courts/:id` - Get a specific court
- `POST /api/courts` - Create a new court

### Example API Request

```bash
# Get all courts
curl http://localhost:5000/api/courts

# Create a new court
curl -X POST http://localhost:5000/api/courts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Court",
    "location": "Cebu City",
    "description": "A great place to play",
    "price": 450.00
  }'
```

## Building for Production

```bash
# Build the frontend
npm run build

# The built files will be in client/dist/
```

## Features

- 🏓 Browse pickleball courts in Cebu
- 📍 View court locations and details
- 💰 Compare prices
- ⭐ Court ratings and reviews (coming soon)
- 📅 Real-time availability (coming soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
