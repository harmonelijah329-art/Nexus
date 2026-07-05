#!/bin/bash

echo "🧪 Running Nexus Platform Tests..."
echo ""

# Check if services are running
echo "🔍 Checking services..."

echo -n "PostgreSQL... "
if docker-compose exec -T postgres pg_isready -U nexus > /dev/null 2>&1; then
    echo "✅"
else
    echo "❌"
    echo "Please start services with: npm run docker:up"
    exit 1
fi

echo -n "Redis... "
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo "✅"
else
    echo "❌"
    echo "Please start services with: npm run docker:up"
    exit 1
fi

echo ""
echo "🏃 Running unit tests..."
npm test -- --run

echo ""
echo "✅ All tests completed!"
