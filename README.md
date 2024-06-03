# Front-End

# Socially Signup Page

This project is a React-based signup page for a social media application named Socially. The form includes fields for name, username, email, password, confirm password, profile image, and terms and conditions. It also includes validation, image uploading, and notification features.

## Features

- User signup form with input validation
- Profile image upload with Cloudinary integration
- Success and failure notifications
- Responsive design using Tailwind CSS

## Technologies Used

- React
- Tailwind CSS
- Cloudinary
- React Icons
- Yup (for validation)
- Toast notifications

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/client.git
    ```

2. Navigate to the project directory:

    ```bash
    cd socially-signup
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    VITE_CLOUDINARY_PRESET=your_cloudinary_preset
    VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    VITE_BASE_URL=your_api_base_url
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and navigate to:

    ```
    http://localhost:3000
    ```

## Usage

1. Fill in the signup form with the required details.
2. Click the "Choose image" button to upload a profile image.
3. Check the terms and conditions checkbox.
4. Click the "Create Account" button to submit the form.
5. A notification will appear indicating success or failure.
6. Upon successful signup, a welcome email notification will be simulated (logged to the console).

## Code Overview

### `SignUp.jsx`

The main component for the signup page. It includes form state management, validation, image uploading, and form submission logic.

### `validations/userValidation.js`

Contains the Yup validation schema for the signup form.

### `utils/toast.js`

Utility functions for displaying success and failure toast notifications.

### `public/index.html`

The HTML template for the React application.

### `src/main.jsx`

Entry point for the React application.

### `tailwind.config.js`

Configuration file for Tailwind CSS.


# Back-End

# Server

This project is the backend for the Socially application. It provides APIs for user authentication, including signup, login, and password reset functionalities.

## Features

- User signup with profile image upload with JWT token generation
- Create Post
- Get Feed
## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- jsonwebtoken for JWT
- Vine.js
- bcrypt

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/brainop.git
    ```

2. Navigate to the project directory:

    ```bash
    cd server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=port_number
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. The server will be running on:

    ```
    http://localhost:8080
    ```

## API Endpoints

### Signup

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "cPassword": "password123",
    "profileImage": "image_url"
  }

### Get Posts

- **URL:** `/api/posts/`
- **Method:** `GET`

### Create Posts

- **URL:** `/api/posts/`
- **Method:** `POST`
- - **Body:**
  ```json
  {
    "body": "",
    "image": "",
    "postedBy: "",
  }

