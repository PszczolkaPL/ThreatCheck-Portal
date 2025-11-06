@echo off
echo Setting up ThreatCheck-Portal...

echo Installing backend dependencies...
cd backend
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies. Please check Python installation.
    pause
    exit /b 1
)
cd ..

echo Installing frontend dependencies...
npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies. Please check Node.js installation.
    pause
    exit /b 1
)

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && python main.py"

echo Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo Setup complete! Servers are starting in separate windows.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
