@echo off
setlocal

where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found on PATH. Install Python 3.11+ and try again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on PATH. Install Node.js and try again.
  pause
  exit /b 1
)

set VENV_OK=0
if exist backend\.venv\Scripts\python.exe (
  backend\.venv\Scripts\python.exe --version >nul 2>nul
  if not errorlevel 1 set VENV_OK=1
)

if %VENV_OK%==0 (
  if exist backend\.venv (
    echo Existing virtual environment looks broken - it was likely copied or
    echo moved from another folder, which breaks its internal paths. Rebuilding it...
    rmdir /s /q backend\.venv
  )
  echo Creating Python virtual environment...
  python -m venv backend\.venv
)

echo Installing backend dependencies...
call backend\.venv\Scripts\activate.bat
pip install -r backend\requirements.txt
if errorlevel 1 (
  echo Backend dependency install failed.
  pause
  exit /b 1
)

if not exist backend\.env (
  echo Creating backend\.env...
  (
    echo DATABASE_URL=sqlite:///./conqr.db
    echo GOOGLE_API_KEY=AQ.Ab8RN6KlRkqors0j90IzcfiSaf1nBDTK3aipyYUIq6vt_0KT2Q
  ) > backend\.env
)

set FRONTEND_OK=0
if exist frontend\node_modules\.bin\vite.cmd set FRONTEND_OK=1

if %FRONTEND_OK%==0 (
  if exist frontend\node_modules (
    echo Existing node_modules looks incomplete or broken - likely copied or
    echo moved from another folder. Rebuilding it...
    rmdir /s /q frontend\node_modules
  )
  echo Installing frontend dependencies...
  pushd frontend
  call npm install
  if errorlevel 1 (
    echo Frontend dependency install failed.
    popd
    pause
    exit /b 1
  )
  popd
)

start "Conqr backend" cmd /k "cd backend && .venv\Scripts\activate.bat && uvicorn app.main:app --reload --port 8000"
start "Conqr frontend" cmd /k "cd frontend && npm run dev"