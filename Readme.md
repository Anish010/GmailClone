# Gmail Clone

A clone of Gmail built with a Node.js and Express.js backend and a React frontend.

## Project Description

This project is a clone of Gmail, designed to mimic the core functionalities of the popular email service. It includes features such as sending and receiving emails, managing email lists, and user authentication. The backend is built using Node.js and Express.js, while the frontend is developed with React.

The project includes two methods for sending emails:

1. **Nodemailer:** Sending emails from the backend using the Nodemailer package.
2. **EmailJS:** Sending emails directly from the frontend using the `window.Email` API.

Currently, the frontend method is activated for sending emails.

## Technologies Used

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### Email Services
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-FFBB00?style=for-the-badge&logoColor=white)

### Development Tools
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies:**

    Navigate to the `backend` and `frontend` folders and run `npm install` in each:

    ```sh
    cd backend
    npm install

    cd ../frontend
    npm install
    ```

3. **Update start script in `package.json`:**

    In `backend` folder, open `package.json` and update the `start` script:

    ```json
    "start": "nodemon index.js"
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root of both `backend` and `frontend` folders and add your own values. Do not include the provided values directly. Example:

    #### Backend `.env`:

    ```env
    EMAIL_USER=           # Your email address for sending emails
    EMAIL_PASS=           # Your email password or app-specific password
    DB_USER=              # Your database username
    DB_PASS=              # Your database password
    EMAIL_SERVICE=        # The email service provider (e.g., 'gmail')
    HOST=                 # The SMTP server host (e.g., 'smtp.gmail.com')
    SMTP_PORT=            # The SMTP server port (e.g., 587)
    SERVER_PORT=          # The port your backend server will run on (e.g., 8000)
    ```

    #### Frontend `.env`:

    ```env
    VITE_FIREBASE_APIKEY=               # Your Firebase API key
    VITE_FIREBASE_AUTH_DOMAIN=          # Your Firebase Auth domain
    VITE_FIREBASE_PROJECT_ID=           # Your Firebase project ID
    VITE_FIREBASE_STORAGE_BUCKET=       # Your Firebase storage bucket
    VITE_FIREBASE_MESSAGE_SENDER_ID=    # Your Firebase messaging sender ID
    VITE_FIREBASE_APP_ID=               # Your Firebase app ID
    VITE_FIREBASE_MEASUREMENT_ID=       # Your Firebase measurement ID

    VITE_APP_USERNAME=                  # Your application email address for authentication
    VITE_APP_PASSWORD=                  # Your application email password
    VITE_SMTP_PORT=                     # The SMTP port for sending emails (e.g., 2525)
    VITE_SOURCE_EMAIL=                  # The email address from which emails will be sent
    VITE_SMTP_HOST=                     # The SMTP host for sending emails (e.g., 'smtp.elasticemail.com')
    ```

    > **Note:** Add your own SMTP server credentials to ensure emails are sent to the original email addresses. Otherwise, emails will only be saved to the database.

5. **Run the project:**

    - In the `backend` folder, run:

    ```sh
    npm start
    ```

    - In the `frontend` folder, run:

    ```sh
    npm run dev
    ```

The project should now be running on your local machine.
