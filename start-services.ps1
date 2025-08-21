Write-Host "Starting Luxury Accessories E-commerce Application..." -ForegroundColor Green
Write-Host ""

# Function to start backend
function Start-Backend {
    Write-Host "Starting Backend (.NET 8 Web API)..." -ForegroundColor Cyan
    Set-Location "AccessoriesEcommerce.API"
    
    try {
        Write-Host "Building project..." -ForegroundColor Yellow
        dotnet build
        
        Write-Host "Starting backend..." -ForegroundColor Yellow
        dotnet run
    }
    catch {
        Write-Host "Backend Error: $_" -ForegroundColor Red
    }
}

# Function to start frontend
function Start-Frontend {
    Write-Host "Starting Frontend (React + Vite)..." -ForegroundColor Cyan
    Set-Location "frontend"
    
    try {
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm install
        
        Write-Host "Starting frontend..." -ForegroundColor Yellow
        npm run dev
    }
    catch {
        Write-Host "Frontend Error: $_" -ForegroundColor Red
    }
}

# Start backend in new window
Write-Host "Opening backend in new window..." -ForegroundColor Green
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", "Set-Location '$PWD\AccessoriesEcommerce.API'; dotnet run"

# Wait a moment
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Opening frontend in new window..." -ForegroundColor Green
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", "Set-Location '$PWD\frontend'; npm run dev"

Write-Host ""
Write-Host "Both services are starting in separate windows." -ForegroundColor Green
Write-Host "Backend API: http://localhost:5000" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Press Enter to close this window..." -ForegroundColor Yellow
Read-Host
