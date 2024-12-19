# Social Media Clone

A feature-rich social media platform built with the MERN stack, Tailwind CSS, and ShadCN UI. This application provides essential features like posting photos and text, profile search, profile settings, profile view, and authentication.

## Features

- **Post Creation**: Users can create posts with text and photos.
- **Profile Search**: Search for other user profiles.
- **Profile Settings**: Update profile information.
- **Profile View**: View detailed user profiles.
- **Authentication**: Secure user signup, login, and logout with JWT.

## Tech Stack

### Frontend:
- **React.js**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN UI**: Component library for consistent and customizable UI elements.
- **Redux**: State management library for predictable state handling.
- **React Hook Form**: Library for managing form state and validation.

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

### Other Tools:
- **JWT (JSON Web Token)**: Authentication and authorization.
- **Multer & Cloudinary**: For handling file uploads and storage.


## Installation and Setup

### Prerequisites:
- Node.js (v16 or above)
- MongoDB Atlas (or a locally installed MongoDB instance)
- Cloudinary account for file storage

### Steps to Run the Project:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:khanal-samir/Social-Media.git
   cd social-media-clone
   ```

2. **Install dependencies**:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `backend`  directory and add the following:

   **Backend (`backend/.env`)**:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   
   ```

4. **Run the application**:
   ```bash
   # Start the backend server
   cd backend
   npm run dev

   # Start the frontend development server
   cd ../frontend
   npm run dev
   ```

## Project Structure

### Backend:
```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── server.js
```

### Frontend:
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── store/
│   |    
│   └── App.js
└── public/
```

## Future Improvements

- Add a story feature.
- Add a real-time messaging feature.
- Implement notifications for user activities.
- Enhance accessibility and responsiveness.
- Optimize backend performance.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Acknowledgments

- MERN Stack Documentation
- Tailwind CSS and ShadCN UI libraries
- MongoDB and Cloudinary guides
- Redux and React Hook Form Documentation

---

Developed with ❤️ by [Samir Khanal](https://github.com/khanal-samir)

