Write-Host "Starting Luxury Accessories E-commerce Application..." -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "AccessoriesEcommerce.API")) {
    Write-Host "Error: AccessoriesEcommerce.API directory not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this from the project root directory." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 1
}

if (-not (Test-Path "frontend")) {
    Write-Host "Error: frontend directory not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this from the project root directory." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "Starting Backend (.NET 8 Web API)..." -ForegroundColor Cyan
Start-Process "cmd" -ArgumentList "/k", "cd /d `"$PWD\AccessoriesEcommerce.API`" && dotnet run" -WindowStyle Normal

Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Starting Frontend (React + Vite)..." -ForegroundColor Cyan
Start-Process "cmd" -ArgumentList "/k", "cd /d `"$PWD\frontend`" && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Applications are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor White
Write-Host "Backend Swagger: http://localhost:5000/swagger" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Both applications are now starting in separate windows." -ForegroundColor Green
Write-Host ""
Write-Host "Press Enter to close this window..." -ForegroundColor Yellow
Read-Host
