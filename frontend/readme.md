QuickSched
Overview

QuickSched is a simple full-stack appointment scheduling system built with Node.js (Express) for the backend and React for the frontend. It allows users to create, view, and cancel appointments while enforcing rules like time slot capacity and duplicate booking prevention.

The system is designed around two personas:

Patient (User): books and cancels appointments
Staff (System/Admin logic): manages slot availability and enforces rules
Features
Book appointments by time slot
Prevent duplicate bookings
Enforce slot capacity limits
Cancel existing appointments
View available slots
Simple REST API backend
React frontend interface
Tech Stack
Frontend: React
Backend: Node.js + Express
Testing: Jest
API: REST (JSON-based)
Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd quicksched
2. Install backend dependencies
cd backend
npm install
3. Install frontend dependencies
cd ../frontend
npm install
Running the Application
Start backend server
cd backend
node server.js

Backend runs on:

http://localhost:5000
Start frontend
cd frontend
npm start

Frontend runs on:

http://localhost:3000
Running Tests

From backend folder:

npm test
API Endpoints
Book appointment
POST /book
Cancel appointment
POST /cancel
Create slot
POST /slot
Get all slots
GET /slots
Project Notes
The system uses in-memory storage (no database required)
Capacity limit is enforced per time slot
Duplicate bookings are not allowed
Designed for QA testing, including Jest tests and SonarCloud static analysis
Author

SER 330 Final Project – QuickSched System
