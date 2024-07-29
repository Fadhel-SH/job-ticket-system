
# Job Ticket System

## Project Overview
The project is a job ticket system with three types of accounts: admin, user, and customer. Customers can post job offers, users can search for and request to take on these jobs, and customers can choose the best user for their job.

## Project Structure

### Models

- **User**
  - `username`
  - `password`
  - `role` (admin, user, customer)

- **Offer**
  - `title`
  - `description`
  - `price` (optional)
  - `bestOffer` (boolean)
  - `createdBy` (reference to User)
  - `requestedBy` (reference to User)

- **Request**
  - `offerId` (reference to Offer)
  - `userId` (reference to User)
  - `status` (pending, accepted, rejected)

### Routes

- `/register` (GET, POST)
- `/login` (GET, POST)
- `/logout` (GET)
- `/offers` (GET, POST)
- `/offers/:id` (GET, PUT, DELETE)
- `/offers/:id/requests` (POST)
- `/requests` (GET)
- `/requests/:id` (PUT)

### Views

- **Home** (`index.ejs`)
- **Register** (`register.ejs`)
- **Login** (`login.ejs`)
- **Offers** (`offers.ejs`)
- **Offer Details** (`offerDetails.ejs`)
- **Requests** (`requests.ejs`)

### Middleware

- **Authentication middleware** to protect routes.
- **Authorization middleware** to restrict access based on roles.

## Technologies

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, CSS
- **Database:** MongoDB
- **Authentication:** Passport.js
- **Deployment:** Heroku, Vercel, or Render

## Getting Started

### Prerequisites

- Node.js
- MongoDB