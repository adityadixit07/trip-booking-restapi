# Booking Platform

A modern booking platform for managing trips, seat reservations, and user authentication. Built with Node.js, Express, MongoDB, and JWT authentication.

## Features
- User registration and login (JWT-based authentication)
- Admin and user roles
- Trip management (CRUD for admins)
- Seat selection and booking
- Booking cancellation
- PDF ticket generation
- Secure password hashing
- Centralized error handling
- Modular code structure

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- PDFKit
- express-validator

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd booking_platform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   PORT=5000
   ```
4. (Optional) Seed an admin user:
   ```bash
   node seeder/seed.js
   ```

### Running the App
```bash
npm run dev
```
The server will start on `http://localhost:5000` by default.

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/profile` — Get current user profile (auth required)
- `POST /api/auth/logout` — Logout

### Trips
- `GET /api/trips` — List available trips
- `GET /api/trips/:id` — Get trip details

### Admin (requires admin role)
- `POST /api/admin/trips` — Add a new trip
- `GET /api/admin/trips` — List all trips
- `PUT /api/admin/trips/:id` — Update a trip
- `DELETE /api/admin/trips/:id` — Delete a trip

### Bookings
- `POST /api/bookings` — Create a booking (select seats)
- `GET /api/bookings/my-bookings` — List user's bookings
- `GET /api/bookings/:id` — Get booking details
- `GET /api/bookings/:id/ticket` — Download ticket PDF
- `POST /api/bookings/:id/cancel` — Cancel a booking

## Project Structure
```
booking_platform/
├── app.js
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── seeder/
├── utils/
├── package.json
└── README.md
```

## Contribution
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License
This project is licensed under the ISC License.

## Acknowledgements
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PDFKit](https://pdfkit.org/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
