#!/bin/bash

echo "📊 Nexus Platform Health Check"
echo "================================"
echo ""

echo "🐳 Docker Services:"
echo "-----------------"
echo -n "PostgreSQL: "
if docker-compose exec -T postgres pg_isready -U nexus > /dev/null 2>&1; then
    echo "✅ Running"
else
    echo "❌ Not running"
fi

echo -n "Redis:      "
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Running"
else
    echo "❌ Not running"
fi

echo -n "Elasticsearch:"
if curl -s http://localhost:9200/_cluster/health > /dev/null 2>&1; then
    echo "✅ Running"
else
    echo "❌ Not running"
fi

echo ""
echo "🌐 API Endpoints:"
echo "----------------"

echo -n "Health: "
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Responding"
else
    echo "❌ Not responding"
fi

echo -n "Auth (Signup): "
if curl -s -X POST http://localhost:3000/api/v1/auth/signup > /dev/null 2>&1; then
    echo "✅ Responding"
else
    echo "❌ Not responding"
fi

echo ""
echo "📈 Database:"
echo "-----------"
echo -n "Connection: "
if PGPASSWORD=nexus_dev_password psql -h localhost -U nexus -d nexus -c "SELECT 1" > /dev/null 2>&1; then
    echo "✅ Connected"
else
    echo "❌ Not connected"
fi

echo -n "Users table: "
if PGPASSWORD=nexus_dev_password psql -h localhost -U nexus -d nexus -c "SELECT COUNT(*) FROM users" > /dev/null 2>&1; then
    COUNT=$(PGPASSWORD=nexus_dev_password psql -h localhost -U nexus -d nexus -t -c "SELECT COUNT(*) FROM users")
    echo "✅ $COUNT user(s)"
else
    echo "❌ Not accessible"
fi

echo ""
echo "✅ Health check complete!"
