@echo off
echo Starting Luxury Accessories E-commerce Application...
echo.

REM Check if we're in the right directory
if not exist "AccessoriesEcommerce.API" (
    echo Error: AccessoriesEcommerce.API directory not found!
    echo Please make sure you're running this from the project root directory.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo Error: frontend directory not found!
    echo Please make sure you're running this from the project root directory.
    pause
    exit /b 1
)

echo Starting Backend (.NET 8 Web API)...
start "Backend" cmd /k "cd /d %~dp0AccessoriesEcommerce.API && dotnet run"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend (React + Vite)...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Applications are starting...
echo.
echo Backend API: http://localhost:5000
echo Backend Swagger: http://localhost:5000/swagger
echo Frontend: http://localhost:5173
echo.
echo Both applications are now starting in separate windows.
echo.
echo Press any key to close this window...
pause > nul
