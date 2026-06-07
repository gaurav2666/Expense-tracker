# Expense Tracker

## Project Title & Brief Description

This project is a full-stack Expense Tracker application built as part of the Mini Expense Tracker assessment. The application allows users to add, edit, delete, and filter expenses while visualizing spending patterns through charts and budget tracking. The project includes a React frontend, Node.js/Express backend, MongoDB database, CSV export functionality, editable budgets, and responsive UI components.

---

## Live Demo Links

Frontend (Netlify):
https://gaurav-expensetracker.netlify.app

Backend API (Render):
https://expense-tracker-api-y8hi.onrender.com

GitHub Repository:
https://github.com/gaurav2666/Expense-tracker

---

## Tech Stack

### Frontend

* React.js – Component-based UI development
* Vite – Fast frontend build tool
* Tailwind CSS – Modern utility-first styling
* Recharts – Pie chart and bar chart visualization
* Lucide React – Icons and UI enhancements
* Axios – API communication

### Backend

* Node.js – JavaScript runtime
* Express.js – REST API framework
* MongoDB Atlas – Cloud database
* Mongoose – MongoDB object modeling
* CORS – Cross-origin request handling
* dotenv – Environment variable management

### Deployment

* Netlify – Frontend hosting
* Render – Backend hosting

---

## How to Run Locally

### Clone Repository

```bash
git clone https://github.com/gaurav2666/Expense-tracker.git
cd Expense-tracker
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:5000
```

---

## API Documentation

### Get All Expenses

Method:

```http
GET /api/expenses
```

Response:

```json
[
  {
    "_id": "123",
    "amount": 500,
    "category": "Food",
    "date": "2026-06-07",
    "note": "Lunch"
  }
]
```

---

### Create Expense

Method:

```http
POST /api/expenses
```

Request Body:

```json
{
  "amount": 500,
  "category": "Food",
  "date": "2026-06-07",
  "note": "Lunch"
}
```

Response:

```json
{
  "_id": "123",
  "amount": 500,
  "category": "Food",
  "date": "2026-06-07",
  "note": "Lunch"
}
```

---

### Update Expense

Method:

```http
PUT /api/expenses/:id
```

Request Body:

```json
{
  "amount": 600,
  "category": "Food",
  "date": "2026-06-07",
  "note": "Dinner"
}
```

Response:

```json
{
  "message": "Expense updated successfully"
}
```

---

### Delete Expense

Method:

```http
DELETE /api/expenses/:id
```

Response:

```json
{
  "message": "Expense deleted successfully"
}
```

---

## Project Structure

```txt
Expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Features

* Add expenses
* Edit expenses
* Delete expenses
* Search expenses
* Category filtering
* Date filtering
* Quick filters (All Time, This Month, Last Month)
* Budget tracking
* Editable category budgets
* Budget persistence using localStorage
* CSV export
* Pie chart visualization
* Monthly spending chart
* Responsive user interface

---

## Next Steps

The following improvements were intentionally left for future development:

* User authentication and authorization
* Multi-user expense management
* Enhanced UI/UX with dark mode and theme customization
* Monthly email reports
* Advanced analytics dashboard
* Recurring expense reminders
* Budget data persistence in the database instead of localStorage
* PDF report generation
* Mobile application version

```
```
