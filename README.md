# Todo Application

This is a full-stack Todo application with the frontend developed using React and the backend using Spring Boot. It allows users to create, update, and manage tasks efficiently. This document provides clear instructions to set up and run the application.

## Project Structure

The project is organized into three main directories:
1. `frontend` - Contains the React application.
2. `backend` - Contains the Spring Boot application.
3. `database` - Contains the `todoQuery.sql` file for setting up the database.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm (for frontend)
- Java Development Kit (JDK)
- Maven
- MySQL (or compatible database)
- Visual Studio Code (recommended)
- Eclipse IDE or IntelliJ (for backend)

## Setting Up the Database
```
1. Install MySQL (if not already installed)

2. Create database:
   CREATE DATABASE todo;

3. Execute the SQL script:
   - Open `todoQuery.sql`
   - Run it in MySQL to create tables and insert data
```
## Setting Up the Backend
```
1. Open Eclipse / IntelliJ IDE

2. Import the backend project:
   - Go to File -> Import -> Existing Maven Projects
   - Select the `backend/todo` folder

3. Configure database connection:
   - Open:
     src/main/resources/application.properties

   - Update:
     spring.datasource.url=jdbc:mysql://localhost:3306/todo
     spring.datasource.username=your_username
     spring.datasource.password=your_password

4. Run the backend:
   - Navigate to src/main/java > com.gl.todo
   - Right-click TodoApplication.java
   - Select Run As -> Java Application

Backend will run on:
http://localhost:8080
```
## Setting Up the Frontend
```
1. Navigate to frontend folder:
   cd frontend

2. Open in VS Code:
   code .

3. Install dependencies:
   npm install

4. Run the application:
   npm start

Frontend will run on:
http://localhost:3000
```
## Running the Application
```
1. Start the backend server
2. Start the frontend application
3. Open browser and go to:
   http://localhost:3000
```
## Features
```
- Create, update, and delete tasks
- REST API integration using Spring Boot
- Responsive UI using React
- MySQL database integration
```
## Additional Notes
```
- Always run backend before frontend
- Ensure database credentials are correct
- Default ports:
  Backend → 8080
  Frontend → 3000
```