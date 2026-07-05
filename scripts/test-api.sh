#!/bin/bash

echo "📡 Testing Nexus API Endpoints"
echo "================================"
echo ""

BASE_URL="http://localhost:3000"

echo "1️⃣ Testing Health Endpoint"
echo "---------------------------"
curl -X GET "${BASE_URL}/health" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n\n"

echo ""
echo "2️⃣ Testing Auth Signup (Missing Fields)"
echo "----------------------------------------"
curl -X POST "${BASE_URL}/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}' \
  -w "\n\nStatus: %{http_code}\n\n"

echo ""
echo "3️⃣ Testing Auth Login (Missing Fields)"
echo "--------------------------------------"
curl -X POST "${BASE_URL}/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}' \
  -w "\n\nStatus: %{http_code}\n\n"

echo ""
echo "4️⃣ Testing Protected Route (No Auth)"
echo "-----------------------------------"
curl -X GET "${BASE_URL}/api/v1/messaging" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n\n"

echo ""
echo "5️⃣ Testing Rate Limiting"
echo "-----------------------"
echo "Making 5 rapid requests..."
for i in {1..5}; do
  echo -n "Request $i: "
  curl -s -X GET "${BASE_URL}/health" -w "Status %{http_code}\n"
done

echo ""
echo "6️⃣ Testing 404 Handler"
echo "--------------------"
curl -X GET "${BASE_URL}/api/v1/nonexistent" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n\n"

echo ""
echo "✅ API endpoint tests complete!"
