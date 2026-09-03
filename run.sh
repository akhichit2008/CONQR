#!/usr/bin/env bash
set -e

if ! command -v python3 &> /dev/null; then
  echo "Python 3 was not found on PATH. Install Python 3.11+ and try again."
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "Node.js was not found on PATH. Install Node.js and try again."
  exit 1
fi

if [ ! -d backend/.venv ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv backend/.venv
fi

echo "Installing backend dependencies..."
source backend/.venv/bin/activate
pip install -r backend/requirements.txt

if [ ! -f backend/.env ]; then
  echo "Creating backend/.env from backend/.env.example..."
  cp backend/.env.example backend/.env
  echo "Fill in GOOGLE_API_KEY in backend/.env before using AI features."
fi

if [ ! -d frontend/node_modules ]; then
  echo "Installing frontend dependencies..."
  (cd frontend && npm install)
fi

cleanup() {
  echo "Stopping backend..."
  kill "$BACKEND_PID" 2>/dev/null
}
trap cleanup EXIT

(cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000) &
BACKEND_PID=$!

cd frontend && npm run dev
