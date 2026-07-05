#!/bin/bash

echo "🧹 Cleaning up Nexus Platform..."
echo ""

echo "Stopping Docker containers..."
docker-compose down

echo "Removing volumes..."
docker-compose down -v

echo "Cleaning npm cache..."
rm -rf node_modules

echo ""
echo "✅ Cleanup complete!"
