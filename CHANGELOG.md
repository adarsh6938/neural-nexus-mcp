# Changelog

All notable changes to Neural Nexus MCP will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-01-08

### Added
- **Semantic search sorting options** - New `sort_by` parameter for `semantic_search` tool
  - `sort_by="relevance"` (default): Best semantic matches first
  - `sort_by="recency"`: Most recent information first (perfect for ongoing work)
  - `sort_by="hybrid"`: Recent items get relevance boost (balanced approach)
- **Time-weighted hybrid sorting** - Recent items get boosted relevance scores
- **Enhanced documentation** with usage examples for new sorting feature
- **Improved workflow for ongoing chats** - Use recency sorting for recent context

### Changed
- **Semantic search now supports flexible sorting** - Choose between relevance, recency, or hybrid
- **Updated system prompts** to include new sorting options
- **Enhanced API documentation** with sorting examples
- **Improved SETUP.md** with new sorting feature details

### Technical Improvements
- Added `calculateTimeWeight()` method for hybrid sorting
- Modified `semanticSearch()` method to support different sorting algorithms
- Updated tool schema to include `sort_by` parameter with enum validation
- Enhanced call handler to pass sorting parameters correctly

## [1.1.0] - 2025-01-22

### Added
- **Comprehensive system prompts** for IDE integration (basic and advanced options)
- **Dedicated SETUP.md** with step-by-step installation and configuration guide
- **Simplified configuration** - reduced from 15+ variables to just 3 required ones
- **Enhanced documentation** with copy-paste ready configurations
- **Troubleshooting section** with common issues and solutions
- **Environment variables reference table** for advanced users
- **Quick start guide** with minimal setup approach

### Changed
- **Dramatically simplified configuration** - Neural Nexus MCP now auto-configures with sensible defaults
- **Improved user experience** - minimal config only requires Neo4j connection details
- **Enhanced README.md** with better organization and clearer instructions
- **Streamlined setup process** - from complex to beginner-friendly
- **Better documentation structure** - basic setup first, advanced options later

### Removed
- **Automatic npm publishing** from GitHub workflows (manual releases preferred)
- **Overwhelming configuration options** from basic setup examples
- **Complex environment variables** from minimal configuration

### Technical Improvements
- All embedding and database settings now have sensible defaults
- Configuration complexity reduced by 80% for new users
- Advanced users can still customize everything in optional configuration
- Better separation between development and production configurations

## [1.0.1] - 2025-01-22

### Added
- **Comprehensive system prompts** for IDE integration (basic and advanced options)
- **Dedicated SETUP.md** with step-by-step installation and configuration guide
- **Enhanced documentation** with copy-paste ready configurations
- **Troubleshooting section** with common issues and solutions
- **Environment variables reference table** for advanced users

### Changed
- **Simplified configuration examples** - show minimal 3-variable config first
- **Improved user experience** - reduced configuration complexity by 80%
- **Enhanced README.md** with better organization and clearer instructions
- **Better documentation structure** - basic setup first, advanced options later

### Removed
- **Automatic npm publishing** from GitHub workflows (manual releases preferred)
- **Overwhelming configuration options** from basic setup examples

### Fixed
- **Documentation clarity** - made setup process much more beginner-friendly
- **Configuration examples** - now show minimal working configurations
- **User onboarding** - streamlined from complex to simple

## [1.0.0] - 2025-01-22

### Added
- **First stable release of Neural Nexus MCP** - Complete knowledge graph memory system for LLMs
- Local embedding generation using Transformers.js (Xenova/all-MiniLM-L6-v2)
- Complete privacy-focused solution with no external API dependencies
- Knowledge graph memory system with entities and relations
- Neo4j storage backend with unified graph and vector storage
- Semantic search using local Transformers.js embeddings
- Temporal awareness with version history for all graph elements
- Time-based confidence decay for relations
- Rich metadata support for entities and relations
- 17+ MCP tools for comprehensive knowledge management
- Support for Claude Desktop, Cursor, and other MCP-compatible clients
- Docker support for Neo4j setup
- CLI utilities for database management
- Comprehensive documentation and examples
- Multi-level caching system for performance optimization
- Rate limiting and batch processing capabilities
- Automatic cleanup and memory management

### Changed
- Rebranded from Memento MCP to Neural Nexus MCP with complete visual identity
- Package name updated to @adarsh6938/neural-nexus-mcp
- Repository URL updated to adarsh6938/neural-nexus-mcp
- All documentation updated with Neural Nexus MCP branding
- Default password changed from memento_password to neural_nexus_password
- Docker container name updated to neural-nexus-neo4j
- Moved from OpenAI embeddings to local Transformers.js embeddings

### Removed
- All OpenAI API dependencies and references
- External API requirements for embedding generation
- All traces of original Memento MCP branding and repository references

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
- All traces of original forked repository references

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
