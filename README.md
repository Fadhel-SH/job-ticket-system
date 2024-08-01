# Job Ticket System

## Description

The Job Ticket System is a full-stack web application built with Node.js, Express, EJS, and MongoDB. This system allows customers to post offers for small jobs, users to search for and request to take these offers, and admins to manage offers and requests. The application features user authentication, role-based access control, and CRUD functionalities for offers and requests.

## Features

- User Authentication: Users can register and log in to the system.
- Role-Based Access Control: Different functionalities are available for admin, user, and customer roles.
- Offer Management: Customers can create, edit, view, and delete job offers.
- Request Management: Users can request to take job offers, and customers can manage these requests.
- Admin Management: Admins can post, edit, delete, and view all offers and requests.
- User Profiles: Users can view and edit their profiles.
- Search Functionality: Users can search for job offers.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (for authentication)
- EJS (for templating)
- Method-Override (for supporting PUT and DELETE methods in forms)
- Connect-Mongo (for session storage)
- Bcrypt.js (for password hashing)
- Dotenv (for environment variables)
- Connect-Flash (for flash messages)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/job-ticket-system.git
   ```
2. Navigate to the project directory:
   ```sh
   cd job-ticket-system
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   ```
5. Start the application:
   ```sh
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. As a customer, you can post new job offers.
4. As a user, you can search for job offers and request to take them.
5. As an admin, you can manage all offers and requests.

## Project Structure

```plaintext
.
├── config
│   ├── auth.js
│   ├── database.js
│   └── passport.js
├── models
│   ├── User.js
│   ├── Offer.js
│   └── Request.js
├── public
│   └── css
│       └── styles.css
├── routes
│   └── index.js
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── register.ejs
│   ├── login.ejs
│   ├── offers.ejs
│   ├── offerDetails.ejs
│   ├── requests.ejs
│   ├── profile.ejs
│   └── search.ejs
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

