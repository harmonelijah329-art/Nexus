# Nexus Platform - Local Development Guide

## 🚀 Quick Start (5 minutes)

### 1. Automated Setup

```bash
# Make setup script executable
chmod +x scripts/setup.sh

# Run setup (installs dependencies, starts services, initializes database)
./scripts/setup.sh
```

Or manually:

### 2. Manual Setup

```bash
# Step 1: Start Docker services
npm run docker:up

# Step 2: Install dependencies
npm install

# Step 3: Initialize database
npm run db:migrate

# Step 4: Seed test data
npm run db:seed
```

## ✅ Verify Installation

### Health Check Script

```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh
```

Expected output:
```
PostgreSQL: ✅ Running
Redis:      ✅ Running
Elasticsearch: ✅ Running
Health: ✅ Responding
Connection: ✅ Connected
Users table: ✅ 1 user(s)
```

## 🧪 Running Tests

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- gateway.test.ts

# Run infrastructure tests
npm test -- infrastructure.test.ts
```

### API Endpoint Tests

```bash
chmod +x scripts/test-api.sh
./scripts/test-api.sh
```

This tests:
- ✅ Health endpoint
- ✅ Auth endpoints (validation)
- ✅ Protected routes (auth required)
- ✅ Rate limiting
- ✅ 404 handling

## 🎮 Running the Platform

### Start Development Server

```bash
npm run dev
```

You should see:
```
🚀 Starting Nexus Platform...
✅ Database connected successfully
✅ Redis connected
✨ Nexus Platform ready on http://localhost:3000
🏥 Health check: http://localhost:3000/health
📚 API docs: http://localhost:3000/api/v1/docs
```

## 📋 Test Credentials

### Default Test User

- **Email:** test@nexus.dev
- **Password:** Test@1234

## 🔍 Manual API Testing

### Health Check

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-07-05T18:00:00.000Z",
  "uptime": 12.345,
  "database": "connected",
  "cache": "connected"
}
```

### Test Auth Validation

```bash
# Missing fields
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 📊 Database Inspection

### Connect to PostgreSQL

```bash
PGPASSWORD=nexus_dev_password psql -h localhost -U nexus -d nexus
```

### Common Queries

```sql
-- View users
SELECT id, email, name, created_at FROM users;

-- View sessions
SELECT id, user_id, created_at FROM sessions;

-- View audit logs
SELECT id, user_id, action, created_at FROM audit_logs;

-- Count total users
SELECT COUNT(*) FROM users;
```

## 📈 Redis Inspection

```bash
# Connect to Redis
redis-cli -u redis://localhost:6379

# Common commands
PING                    # Test connection
KEYS *                  # View all keys
KEYS rate_limit:*       # View rate limit keys
GET <key>               # Get key value
DEL <key>               # Delete key
FLUSHDB                 # Clear all keys
```

## 🛑 Stopping Services

```bash
# Stop containers but keep volumes
npm run docker:down

# Stop and remove volumes
docker-compose down -v

# Full cleanup
chmod +x scripts/cleanup.sh
./scripts/cleanup.sh
```

## 📝 Logs & Debugging

### View Application Logs

```bash
npm run dev
```

### View Docker Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres
docker-compose logs -f redis
```

## ❌ Troubleshooting

### Port Already in Use

```bash
lsof -i :3000    # Find process
kill -9 <PID>    # Kill process
```

### Database Connection Failed

```bash
# Check database is running
docker-compose ps postgres

# Test connection
PGPASSWORD=nexus_dev_password psql -h localhost -U nexus -d nexus -c "SELECT 1;"
```

### Redis Connection Failed

```bash
# Check Redis is running
docker-compose ps redis

# Test connection
redis-cli -u redis://localhost:6379 PING
```

### Migrations Failed

```bash
# Check database exists
PGPASSWORD=nexus_dev_password psql -h localhost -U nexus -l

# Run migrations manually
node --loader ts-node/esm scripts/migrate.js
```

## 🎯 Next Steps

Once local testing is working:

1. ✅ **All tests passing** - Ready to build Auth Service
2. **Implement Authentication** - Complete signup/login
3. **Add more services** - Messaging, Presence, etc.
4. **Setup CI/CD** - GitHub Actions
5. **Deploy** - Docker, Kubernetes, Cloud

---

**Need help?** Check the logs or run:
```bash
./scripts/health-check.sh
```
