# Neural Nexus MCP: A Knowledge Graph Memory System for LLMs

![Neural Nexus MCP Logo](assets/neural-nexus-logo-gray.svg)

# Neural Nexus MCP

**Neural Nexus MCP: Knowledge graph memory system for LLMs with semantic retrieval and temporal awareness**

Neural Nexus MCP is a sophisticated knowledge graph memory system designed for Large Language Models (LLMs), providing persistent memory capabilities through the Model Context Protocol (MCP). It enables LLMs to store, retrieve, and reason over complex interconnected information with semantic understanding and temporal tracking.

## 🌟 Key Features

### **Knowledge Graph Memory**
- **Persistent Storage**: Your knowledge persists across conversations and sessions
- **Entity-Relation Model**: Store information as interconnected entities with rich relationships
- **Temporal Tracking**: Complete version history with point-in-time queries
- **Rich Metadata**: Custom metadata support for entities and relations

### **Semantic Understanding**
- **Local Vector Embeddings**: Uses Transformers.js (Xenova/all-MiniLM-L6-v2) for completely local, privacy-focused embeddings
- **Semantic Search**: Find information by meaning, not just keywords
- **Hybrid Search**: Combines semantic and keyword search for optimal results
- **Cross-Modal Retrieval**: Query with text to find semantically related concepts
- **No External API Dependencies**: All embedding generation happens locally

### **Enterprise-Grade Storage**
- **Neo4j Backend**: Unified graph and vector storage with enterprise scalability
- **ACID Transactions**: Reliable data consistency and integrity
- **Vector Indexing**: High-performance similarity search with cosine similarity
- **Schema Management**: Automatic database initialization and constraint management

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** (Required for running Neural Nexus MCP)
- **Neo4j 5.13+** (Database backend)

### Option 1: Neo4j Desktop (Recommended for beginners)

1. Download and install [Neo4j Desktop](https://neo4j.com/download/)
2. Create a new project and database
3. Start your database
4. Set password to `neural_nexus_password` (or your preferred password)
5. Note the connection details (usually `bolt://localhost:7687`)

**Default connection settings:**
- **URI**: `bolt://localhost:7687`
- **Username**: `neo4j`
- **Default credentials**: username: `neo4j`, password: `neural_nexus_password` (or whatever you configured)

### Option 2: Docker (For development)

```bash
docker run \
    --name neural-nexus-neo4j \
    -p7474:7474 -p7687:7687 \
    -d \
    -v $HOME/neo4j/data:/data \
    -v $HOME/neo4j/logs:/logs \
    -v $HOME/neo4j/import:/var/lib/neo4j/import \
    -v $HOME/neo4j/plugins:/plugins \
    --env NEO4J_AUTH=neo4j/neural_nexus_password \
    neo4j:latest
```

**Default connection settings:**
- **URI**: `bolt://localhost:7687`
- **Username**: `neo4j`
- **Default credentials**: username: `neo4j`, password: `neural_nexus_password`

### Installation

#### For Claude Desktop, Cursor, and other MCP clients:

```bash
npm install -g @adarsh6938/neural-nexus-mcp
```

### Configuration

#### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "neural-nexus-mcp": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password"
      }
    }
  }
}
```

#### Cursor

Add to your MCP settings:

```json
{
  "neural-nexus-mcp": {
    "command": "neural-nexus-mcp",
    "env": {
      "NEO4J_URI": "bolt://localhost:7687",
      "NEO4J_USERNAME": "neo4j",
      "NEO4J_PASSWORD": "neural_nexus_password"
    }
  }
}
```

### Database Initialization

Neural Nexus MCP includes command-line utilities for managing Neo4j operations:

```bash
# Initialize database schema (run once)
neural-nexus-mcp --init

# Test database connection
neural-nexus-mcp --test
```

For normal operation, Neo4j schema initialization happens automatically when Neural Nexus MCP connects to the database. You don't need to run any manual commands for regular usage.

## 🏗️ Core Concepts

### Entities
Entities represent discrete pieces of knowledge with:
- **Name**: Unique identifier
- **Type**: Categorization (person, concept, event, etc.)
- **Observations**: Array of descriptive statements
- **Metadata**: Custom properties and tags

### Relations
Relations connect entities with:
- **Type**: Semantic relationship description (active voice)
- **Strength**: Numerical weight (0.0 to 1.0)
- **Confidence**: Certainty level (0.0 to 1.0)
- **Metadata**: Source tracking, timestamps, context

### Temporal Awareness
- **Version History**: Complete audit trail of all changes
- **Point-in-Time Queries**: Retrieve graph state at any moment
- **Confidence Decay**: Relations lose confidence over time if not reinforced
- **Change Tracking**: Who, what, when for every modification

## 🔧 Advanced Configuration

### Environment Variables

Configure Neural Nexus MCP with these environment variables:

```bash
# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neural_nexus_password
NEO4J_DATABASE=neo4j

# Local Embedding Configuration
EMBEDDING_PROVIDER=transformers
TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2
TRANSFORMERS_DIMENSIONS=384
TRANSFORMERS_MAX_TOKENS=512

# Optional: Embedding Configuration
EMBEDDING_RATE_LIMIT_TOKENS=20
EMBEDDING_RATE_LIMIT_INTERVAL=60000
```

### Command Line Options

```bash
neural-nexus-mcp [options]

Options:
  --init                   Initialize Neo4j database schema
  --test                   Test database connection
  --uri <uri>              Neo4j URI (default: bolt://localhost:7687)
  --username <username>    Neo4j username (default: neo4j)
  --password <password>    Neo4j password (default: neural_nexus_password)
  --database <database>    Neo4j database name (default: neo4j)
  --help                   Show help information
```

## 🧠 Core Features Deep Dive

### Semantic Search

Neural Nexus MCP provides multiple search capabilities:

- **Vector Search**: Uses embeddings to find semantically similar content
- **Keyword Search**: Traditional text-based search across entity names and observations
- **Hybrid Search**: Combines both approaches with configurable weighting
- **Filtered Search**: Restrict results by entity types or other criteria

**Search Options:**
- `limit`: Maximum number of results (default: 10)
- `min_similarity`: Similarity threshold for vector search (0.0-1.0)
- `entity_types`: Filter by specific entity types
- `hybrid_search`: Enable/disable hybrid search mode
- `semantic_weight`: Weight of semantic vs. keyword results

### Performance Optimization

Neural Nexus MCP is designed for production use with:

- **LRU Caching**: Intelligent caching of frequently accessed embeddings
- **Rate Limiting**: Configurable API rate limits to prevent abuse
- **Batch Processing**: Efficient bulk operations for large datasets
- **Connection Pooling**: Optimized database connection management
- **Query Optimization**: Efficient Cypher queries with proper indexing
- **Memory Management**: Automatic cleanup of old jobs and cached data

### Temporal Awareness

Track complete history of entities and relations with point-in-time graph retrieval:

- **Full Version History**: Every change to an entity or relation is preserved with timestamps
- **Point-in-Time Queries**: Retrieve the exact state of the knowledge graph at any moment in the past
- **Change Tracking**: Automatically records createdAt, updatedAt, validFrom, and validTo timestamps
- **Temporal Consistency**: Maintain a historically accurate view of how knowledge evolved
- **Non-Destructive Updates**: Updates create new versions rather than overwriting existing data
- **Time-Based Filtering**: Filter graph elements based on temporal criteria
- **History Exploration**: Investigate how specific information changed over time

### Confidence Decay

Relations automatically decay in confidence over time based on configurable half-life:

- **Time-Based Decay**: Confidence in relations naturally decreases over time if not reinforced
- **Configurable Half-Life**: Define how quickly information becomes less certain (default: 30 days)
- **Minimum Confidence Floors**: Set thresholds to prevent over-decay of important information
- **Decay Metadata**: Each relation includes detailed decay calculation information
- **Non-Destructive**: Original confidence values are preserved alongside decayed values
- **Reinforcement Learning**: Relations regain confidence when reinforced by new observations
- **Reference Time Flexibility**: Calculate decay based on arbitrary reference times for historical analysis

### Advanced Metadata

Rich metadata support for both entities and relations with custom fields:

- **Source Tracking**: Record where information originated (user input, analysis, external sources)
- **Tagging System**: Flexible tagging for categorization and filtering
- **Custom Properties**: Store domain-specific metadata relevant to your use case
- **Relationship Context**: Capture the circumstances under which relationships were established
- **Quality Indicators**: Track reliability, verification status, and data quality metrics
- **Integration Metadata**: Store references to external systems and identifiers

## 🛠️ Development

### Local Development Setup

For local development and contributing:

```bash
git clone https://github.com/adarsh6938/neural-nexus-mcp.git
cd neural-nexus-mcp
npm install
npm run build

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start Neo4j (using docker-compose)
docker-compose up -d neo4j

# Initialize database
npm run neo4j:init

# Run tests
npm test
```

### Project Structure

```
neural-nexus-mcp/
├── src/
│   ├── server/          # MCP server implementation
│   ├── storage/         # Storage providers (Neo4j, File)
│   ├── embeddings/      # Embedding services and job management
│   ├── cli/             # Command-line utilities
│   └── types/           # TypeScript type definitions
├── assets/              # Logo and branding assets
└── models/              # Local embedding models
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

## 📚 API Reference

Neural Nexus MCP provides 17+ tools accessible through the Model Context Protocol:

### Entity Management
- `create_entities` - Create multiple entities with observations
- `add_observations` - Add new observations to existing entities
- `delete_entities` - Remove entities and their relations
- `delete_observations` - Remove specific observations

### Relation Management
- `create_relations` - Create relationships between entities
- `get_relation` - Retrieve specific relation details
- `update_relation` - Modify existing relations
- `delete_relations` - Remove relationships

### Graph Operations
- `read_graph` - Get the entire knowledge graph
- `search_nodes` - Search entities by keywords
- `open_nodes` - Retrieve specific entities by name

### Semantic Search
- `semantic_search` - Vector-based semantic search
- `get_entity_embedding` - Get entity vector embeddings

### Temporal Features
- `get_entity_history` - Entity version history
- `get_relation_history` - Relation version history
- `get_graph_at_time` - Point-in-time graph state
- `get_decayed_graph` - Graph with confidence decay applied

### Diagnostics
- `debug_embedding_config` - Check embedding configuration
- `diagnose_vector_search` - Vector search diagnostics

## 🔍 Troubleshooting

### Common Issues

**Connection Problems:**
```bash
# Test your Neo4j connection
neural-nexus-mcp --test

# Check if Neo4j is running
docker ps  # For Docker installations
# or check Neo4j Desktop
```

**Schema Issues:**
```bash
# Reinitialize database schema
neural-nexus-mcp --init
```

**Vector Search Not Working:**
- Check if embeddings are being generated
- Use `debug_embedding_config` tool to check configuration
- Verify Neo4j vector index exists with `diagnose_vector_search`

### Performance Tuning

For large datasets:
- Increase Neo4j memory allocation
- Adjust embedding cache size
- Configure appropriate rate limits
- Use batch operations for bulk data

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io/)
- Powered by [Neo4j](https://neo4j.com/) graph database
- Uses [Transformers.js](https://huggingface.co/docs/transformers.js) for local embeddings
- Inspired by the need for persistent, semantic memory in AI systems
