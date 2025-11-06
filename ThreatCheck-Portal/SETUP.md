# ThreatCheck-Portal Setup Guide

This guide provides instructions to set up and run the ThreatCheck-Portal application, which consists of a React frontend and a FastAPI backend.

## Prerequisites

- **Python 3.11** (or latest stable version): Required for the backend. Download from [python.org](https://www.python.org/downloads/).
- **Node.js 18+**: Required for the frontend. Download from [nodejs.org](https://nodejs.org/).
- **Git**: To clone the repository if not already done.

## Project Structure

- `backend/`: FastAPI server for API endpoints (e.g., IP checking via AbuseIPDB).
- `src/`: React frontend components and pages.
- `package.json`: Frontend dependencies.
- `backend/requirements.txt`: Backend dependencies.

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd ThreatCheck-Portal/backend
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
   (If `pip` is not recognized, use `python -m pip install -r requirements.txt`)

3. Run the backend server:
   ```
   python main.py
   ```
   The server will start on `http://localhost:8000`.

## Frontend Setup

1. Navigate to the root directory (if not already there):
   ```
   cd ThreatCheck-Portal
   ```

2. Install Node.js dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Running the Application

- Start the backend first (step 3 above).
- Then start the frontend (step 3 above).
- Open `http://localhost:5173` in your browser to access the app.
- The frontend communicates with the backend via CORS-enabled API calls.

## API Key

The backend uses a hardcoded API key for AbuseIPDB. In production, consider using environment variables for security.

## Troubleshooting

- If `pip` or `python` commands fail, ensure Python is installed and added to PATH.
- If `npm` commands fail, ensure Node.js is installed.
- Check console logs for errors in both backend and frontend terminals.
- Ensure ports 8000 and 5173 are not in use by other applications.

## Additional Notes

- The app allows inputting IP addresses, checking them via the API, and exporting results.
- Data flows from the "Sprawdzanie" page to "Eksport" via React Router state.
