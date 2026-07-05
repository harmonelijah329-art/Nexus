# Contributing to Nexus

Thank you for your interest in contributing to Nexus! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/Nexus.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -m "feat: describe your changes"`
6. Push: `git push origin feature/your-feature`
7. Create a Pull Request

## Development Setup

```bash
npm install
npm run docker:up
npm run dev
```

## Coding Standards

- Use TypeScript for all code
- Follow the existing code style
- Write tests for new features
- Document complex logic
- Use meaningful commit messages

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Request Process

1. Update documentation
2. Add tests
3. Ensure tests pass
4. Request review
5. Address feedback

## Architecture Decisions

For significant changes, please open an issue first to discuss the approach.

## Questions?

Open an issue or reach out to the maintainers.

---

Thank you for contributing to Nexus!
