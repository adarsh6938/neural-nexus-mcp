# Changelog

All notable changes to Neural Nexus MCP will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Rebranded from Memento MCP to Neural Nexus MCP
- Updated all references to use Neural Nexus branding
- Changed default password from memento_password to neural_nexus_password
- Updated Docker container name to neural-nexus-neo4j
- Updated GitHub workflow to neural-nexus-mcp.yml
- Local embedding generation using Transformers.js (Xenova/all-MiniLM-L6-v2)
- Complete privacy-focused solution with no external API dependencies

### Changed
- Package name updated to @adarsh6938/neural-nexus-mcp
- Repository URL updated to adarsh6938/neural-nexus-mcp
- All documentation updated with Neural Nexus MCP branding
- Moved from OpenAI embeddings to local Transformers.js embeddings
- Removed all OpenAI API dependencies and references

### Removed
- OpenAI API integration and dependencies
- External API requirements for embedding generation
- All OpenAI-related configuration options and environment variables

## [0.3.9] - 2024-01-21

### Added
- Complete rebranding from memento-mcp to neural-nexus-mcp
- Updated npm package distribution approach
- Enhanced documentation and configuration examples

### Changed
- Package name and repository references
- Default configuration values
- Logo and branding assets

### Fixed
- Configuration management for npm package distribution
- Documentation consistency across all files

## [0.3.8] - 2025-04-01

### Added

- Initial public release
- Knowledge graph memory system with entities and relations
- Neo4j storage backend with unified graph and vector storage
- Semantic search using local Transformers.js embeddings
- Temporal awareness with version history for all graph elements
- Time-based confidence decay for relations
- Rich metadata support for entities and relations
- MCP tools for entity and relation management
- Support for Claude Desktop, Cursor, and other MCP-compatible clients
- Docker support for Neo4j setup
- CLI utilities for database management
- Comprehensive documentation and examples

### Changed

- Migrated storage from SQLite + Chroma to unified Neo4j backend
- Enhanced vector search capabilities with Neo4j's native vector indexing
- Improved performance for large knowledge graphs

## [0.3.0] - [Unreleased]

### Added

- Initial beta version with Neo4j support
- Vector search integration
- Basic MCP server functionality

## [0.2.0] - [Unreleased]

### Added

- SQLite and Chroma storage backends
- Core knowledge graph data structures
- Basic entity and relation management

## [0.1.0] - [Unreleased]

### Added

- Project initialization
- Basic MCP server framework
- Core interfaces and types
