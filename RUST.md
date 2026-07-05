# Nexus Platform - Rust Core

## 🦀 High-Performance Backend

Building the Nexus Platform core infrastructure in Rust for blazing-fast performance and memory safety.

## 📦 Cargo.toml Overview

Key dependencies:
- **Axum 0.7** - Modern async web framework
- **Tokio** - Async runtime
- **SQLx 0.7** - PostgreSQL with compile-time checked queries
- **Redis 0.25** - Async cache layer
- **Argon2** - Secure password hashing
- **Serde/JSON** - Serialization
- **UUID** - ID generation
- **Tracing** - Structured logging

## 🏗️ Architecture

```
src/
├── main.rs       - Application bootstrap
├── config.rs     - Configuration management
├── db.rs         - PostgreSQL layer
├── cache.rs      - Redis cache layer
├── security.rs   - JWT & password security
├── identity.rs   - ID & validation
├── error.rs      - Error handling
└── server.rs     - Axum web server
```

## 🚀 Getting Started

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Navigate to repository
cd Nexus

# Start services
npm run docker:up

# Build project
cargo build

# Run tests
cargo test

# Run application
cargo run
```

## 📊 Features Implemented

✅ Database connection pooling
✅ Redis async client
✅ JWT token generation/verification
✅ Argon2 password hashing
✅ Email validation
✅ Password strength validation
✅ Health check endpoints
✅ Error handling
✅ Logging with tracing
✅ API routes (signup, login, health)

## 🧪 Testing

```bash
# Run all tests
cargo test

# Run tests that require services
cargo test -- --ignored

# Run specific test
cargo test test_password_hashing

# With output
cargo test -- --nocapture
```

## 🔗 API Endpoints

### Health Check
```bash
GET /health
```

### Authentication
```bash
POST /api/v1/auth/signup
POST /api/v1/auth/login
```

## 📚 See Also

- [SETUP.md](SETUP.md) - Development setup
- [TEST.md](TEST.md) - Testing guide
- [README.md](README.md) - Main overview
- [SUPPORT.md](SUPPORT.md) - Support & funding

## ⚡ Performance Benefits

- **Zero-cost abstractions** - Compile-time optimizations
- **Memory safe** - No garbage collection
- **Fast async I/O** - Tokio runtime
- **Type-safe SQL** - SQLx compile-time checks
- **Small binaries** - Efficient compiled code

## 🔐 Security Features

✅ Argon2 password hashing
✅ JWT token management
✅ Input validation
✅ Error handling
✅ Connection pooling
✅ Async safety

## 📖 Useful Resources

- [Axum Documentation](https://docs.rs/axum/)
- [Tokio Book](https://tokio.rs/)
- [SQLx Guide](https://github.com/launchbadge/sqlx)
- [Rust Book](https://doc.rust-lang.org/book/)

## 🎯 Roadmap

- [ ] Complete user authentication
- [ ] Messaging service
- [ ] Presence tracking
- [ ] Real-time notifications
- [ ] Media service
- [ ] Search service
- [ ] Audit logging
- [ ] Analytics
- [ ] Backup service

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

**Nexus Platform - Built with Rust for Performance & Safety** 🦀⚡
