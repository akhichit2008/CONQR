@echo off
if not exist backend\.venv (
  python -m venv backend\.venv
)
call backend\.venv\Scripts\activate.bat && pip install -r backend\requirements.txt

if not exist frontend\node_modules (
  cd frontend && npm install && cd ..
)

start "Conqr backend" cmd /k "cd backend && .venv\Scripts\activate.bat && uvicorn app.main:app --reload --port 8000"
start "Conqr frontend" cmd /k "cd frontend && npm run dev"
