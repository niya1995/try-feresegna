#!/bin/bash

# Development environment setup script

set -e

echo "🛠️  Setting up development environment..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Start development services
echo "🚀 Starting development services..."

# Start database
docker-compose up -d postgres

# Wait for database
echo "⏳ Waiting for database..."
sleep 10

# Start backend in development mode
echo "🔧 Starting backend..."
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Start frontend in development mode
echo "🎨 Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "🧹 Cleaning up..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    docker-compose down
}

# Set trap to cleanup on script exit
trap cleanup EXIT

echo "✅ Development environment is ready!"
echo ""
echo "🌐 Service URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for user to stop
wait
