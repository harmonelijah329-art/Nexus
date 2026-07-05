# Nexus Platform - Local Testing Guide

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ installed
- PostgreSQL client tools (optional, for manual DB inspection)

## Quick Start

### 1. Start Development Environment

```bash
# Start all services (PostgreSQL, Redis, Elasticsearch)
npm run docker:up

# Wait for services to be healthy (about 30 seconds)
# Check status with:
npm run health:check
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Database

```bash
# Run migrations
npm run db:migrate

# Seed with test data
npm run db:seed
```

### 4. Start the Platform

```bash
# Start development server
npm run dev

# Server will start on http://localhost:3000
```

## Testing the API

### Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-07-05T18:00:00.000Z",
  "uptime": 12.345,
  "database": "connected",
  "cache": "connected"
}
```

### Authentication Routes

**Signup:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass@123",
    "name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@nexus.dev",
    "password": "Test@1234"
  }'
```

### Protected Routes

Add the JWT token to the Authorization header:

```bash
curl http://localhost:3000/api/v1/messaging \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- gateway.test.ts
```

## Database Inspection

### Connect to PostgreSQL

```bash
psql postgres://nexus:nexus_dev_password@localhost:5432/nexus
```

### Common Queries

```sql
-- View all users
SELECT id, email, name, created_at FROM users;

-- View recent sessions
SELECT id, user_id, created_at FROM sessions ORDER BY created_at DESC LIMIT 10;

-- View audit logs
SELECT id, user_id, action, resource_type, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 10;
```

## Redis Inspection

```bash
# Connect to Redis
redis-cli -u redis://localhost:6379

# View rate limit keys
KEYS rate_limit:*

# View cache stats
INFO stats
```

## Common Issues

### Docker containers won't start

```bash
# Check logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

### Database migration fails

```bash
# Check database connection
psql $DATABASE_URL -c "SELECT NOW();"

# Verify database exists
psql postgres -l
```

### Port already in use

```bash
# Find what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

## Cleanup

```bash
# Stop all services
npm run docker:down

# Remove all volumes (careful!)
docker-compose down -v
```

---

**Need help?** Check the logs:
```bash
npm run dev  # Shows application logs
docker-compose logs -f  # Shows all service logs
```
