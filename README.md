# **Campus Mate**

A comprehensive campus management web application designed for students to streamline access to essential academic information. Campus Mate includes features like timetables, attendance tracking, notes sharing, event notifications, and result visualization.

---

## **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**
1. **Timetables**:
   - Daily class schedules based on sections (e.g., CS-B).
   - Exam schedules for unit tests, mid-semesters, and finals.
2. **Attendance**:
   - Calendar-based attendance logs with daily statuses.
3. **Notes Sharing**:
   - Download and preview notes filtered by subjects for the current semester.
   - See who uploaded the notes (university or college).
4. **Event Notifications**:
   - Updates about cultural and academic events with details and dates.
5. **Results Visualization**:
   - View marks with graphs for unit tests and mid-semester tests.

---

## **Tech Stack**
- **Frontend**: Vite, React, HTML, CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Other Tools**:
  - Google Sheets for attendance and marks synchronization.

---

## **Setup Instructions**

### **Frontend**
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
2. Install dependencies:
    ```bash
    npm install
3. Start the developent server:
    ```bash
    npm run dev
4. Access the frontend at the URL displayed in the terminal, typically:
    ```arduino
    http://localhost:5173
### **Backend**
1. Navigate to the `backend` folder:
    ```bash
    cd backend
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables:
    - Create a `.env` file in the backend folder and add the following:
        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=password
        DB_NAME=campus_mate
        DB_PORT=3306
        PORT=5000
4. Start the backend server:
    ```bash
    npm start
5. The backend will run at:
    ```arduino
    http:localhost:5000
---
## Database
1. Create a MySQL database named `campus_mate`:
    ```sql
    CREATE DATABASE campus_mate;
2. Import the database schema:
    ```bash
    mysql -u [username] -p campus_mate < database_dump.sql
---
## **Folder Structure**
    │   Campus Mate/
    ├── frontend/                 # Vite-based frontend
    │   ├── public/               # Static assets
    │   ├── src/                  # Source files
    │   │   ├── components/       # Reusable components
    │   │   ├── pages/            # Page components (e.g., Dashboard, Profile)
    │   │   ├── App.jsx           # Main app component
    │   │   └── main.jsx          # Entry point for Vite
    │   └── package.json          # Frontend dependencies
    ├── backend/                  # Node.js backend
    │   ├── controllers/          # Contains business logic
    │   ├── models/               # Database schema models
    │   ├── routes/               # API route handlers
    │   ├── app.js                # Backend app configuration
    │   ├── server.js             # Backend server entry point
    │   └── package.json          # Backend dependencies
    ├── database/                 # Database-related files
    │   └── database_dump.sql     # SQL dump file for initial database setup
    ├── README.md                 # Project documentation
    └── .gitignore                # Files and directories to ignore in Git
---
## License
This project is licensed under `MIT License`
