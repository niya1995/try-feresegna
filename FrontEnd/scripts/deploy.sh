#!/bin/bash

# Feresegna Bus Deployment Script

set -e

echo "🚀 Starting Feresegna Bus deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it and try again."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p ssl
mkdir -p logs/nginx
mkdir -p logs/backend

# Build and start services
echo "🔨 Building and starting services..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
if docker-compose ps | grep -q "unhealthy\|Exit"; then
    echo "❌ Some services are not healthy. Checking logs..."
    docker-compose logs
    exit 1
fi

echo "✅ All services are running successfully!"

# Display service URLs
echo ""
echo "🌐 Service URLs:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost/api"
echo "   Direct Backend: http://localhost:8000"
echo "   Database: localhost:5432"
echo ""

# Display useful commands
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f [service_name]"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   View status: docker-compose ps"
echo ""

echo "🎉 Deployment completed successfully!"
