#!/bin/bash

set -e

echo "🚀 Starting Nexus Platform Local Setup..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Please install Docker.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker installed${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose not found. Please install Docker Compose.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker Compose installed${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js installed$(NC)"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm installed${NC}"

echo ""
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check services
echo ""
echo "🔍 Checking service health..."

echo -n "PostgreSQL... "
if docker-compose exec -T postgres pg_isready -U nexus > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    exit 1
fi

echo -n "Redis... "
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    exit 1
fi

echo -n "Elasticsearch... "
if curl -s http://localhost:9200/_cluster/health > /dev/null; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    exit 1
fi

echo ""
echo "📦 Installing npm dependencies..."
npm install

echo ""
echo "🗄️  Running database migrations..."
npm run db:migrate

echo ""
echo "🌱 Seeding database with test data..."
npm run db:seed

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "🎯 Next steps:"
echo "   1. Start the development server:"
echo "      npm run dev"
echo ""
echo "   2. In another terminal, run tests:"
echo "      npm test"
echo ""
echo "   3. Test the API:"
echo "      curl http://localhost:3000/health"
echo ""
echo "   4. View logs:"
echo "      docker-compose logs -f"
echo ""
echo "📚 For more details, see TEST.md"
