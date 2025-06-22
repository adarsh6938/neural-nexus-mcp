# Contributing to Neural Nexus MCP

Thank you for your interest in contributing to Neural Nexus MCP! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please be respectful and inclusive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/neural-nexus-mcp.git`
3. Add the upstream remote: `git remote add upstream https://github.com/adarsh6938/neural-nexus-mcp.git`
4. Create a new branch for your feature: `git checkout -b feature/your-feature-name`

## Development Setup

1. Ensure you have Node.js 20+ installed
2. Install dependencies: `npm install`
3. Set up your environment variables (copy `.env.example` to `.env`)
4. Start Neo4j (via Docker or Neo4j Desktop)
5. Initialize the database schema: `npm run neo4j:init`
6. Build the project: `npm run build`
7. Run tests to ensure everything works: `npm test`

## Making Changes

1. Make your changes in your feature branch
2. Write or update tests as needed
3. Ensure your code follows the project's coding standards
4. Run `npm run lint` to check for linting issues
5. Run `npm run format` to format your code
6. Run `npm test` to ensure all tests pass

## Testing

- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run tests with coverage: `npm run test:coverage`
- Run integration tests: `npm run test:integration`

The project uses Vitest for testing. Make sure to write tests for any new functionality.

## Submitting Changes

1. Commit your changes with a clear commit message
2. Push to your fork: `git push origin feature/your-feature-name`
3. Create a pull request from your fork to the main repository
4. Fill out the pull request template completely
5. Wait for review and address any feedback

### Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Include tests for new functionality
- Update documentation as needed
- Ensure CI passes all checks
- Write clear, descriptive commit messages

## Continuous Integration

PRs cannot be merged until CI passes all checks. You can see the full CI workflow configuration in `.github/workflows/neural-nexus-mcp.yml`.

## Questions?

If you have questions about contributing, please open an issue or start a discussion in the repository.

Thank you for contributing to Neural Nexus MCP!
