# Neural Nexus MCP Neo4j CLI

Neural Nexus MCP provides a Neo4j storage backend that offers a unified solution for both graph storage and vector search capabilities. This integration leverages Neo4j's native graph database features and built-in vector indexing to provide high-performance semantic search alongside traditional graph operations.

## Overview

The Neo4j backend provides:

- **Unified Storage**: Consolidates both graph and vector storage into a single database
- **Native Graph Operations**: Built specifically for graph traversal and queries
- **Integrated Vector Search**: Vector similarity search for embeddings built directly into Neo4j
- **Scalability**: Better performance with large knowledge graphs
- **Simplified Architecture**: Clean design with a single database for all operations

## Prerequisites

- Neo4j 5.13+ (required for vector search capabilities)
- Node.js 20+ (for Transformers.js embedding generation)

## Quick Setup

### Neo4j Desktop (Recommended)

1. Download and install [Neo4j Desktop](https://neo4j.com/download/)
2. Create a new project and database
3. Start your database
4. Note the connection details

**Default connection settings:**
- **URI**: `bolt://localhost:7687`
- **Username**: `neo4j`
- **Default credentials**: username: `neo4j`, password: `neural_nexus_password`

### Docker Alternative

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

## CLI Commands

Neural Nexus MCP provides command-line utilities for managing Neo4j operations:

### Testing Connection

Test the connection to your Neo4j database:

```bash
# Test with default settings
neural-nexus-mcp --test

# Test with custom settings
neural-nexus-mcp --test --uri bolt://localhost:7687 --username neo4j --password mypass
```

### Initializing Schema

Initialize the database schema (constraints and indexes):

```bash
# Initialize with default settings
neural-nexus-mcp --init

# Initialize with custom vector dimensions
neural-nexus-mcp --init --dimensions 768

# Force recreation of all constraints and indexes
neural-nexus-mcp --init --recreate
```

## Environment Variables

Configure Neural Nexus MCP with these environment variables:

```bash
# Neo4j Connection Settings
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neural_nexus_password
NEO4J_DATABASE=neo4j

# Vector Search Configuration
NEO4J_VECTOR_INDEX=entity_embeddings
NEO4J_VECTOR_DIMENSIONS=384
NEO4J_SIMILARITY_FUNCTION=cosine

# Embedding Service Configuration
EMBEDDING_PROVIDER=transformers
TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2
```

## MCP Configuration

### Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "neural-nexus-mcp": {
      "command": "neural-nexus-mcp",
      "args": ["/path/to/neural-nexus-mcp/dist/index.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "neo4j"
      }
    }
  }
}
```

## Command Line Options

The Neo4j CLI tools support the following options:

```
--uri <uri>              Neo4j server URI (default: bolt://localhost:7687)
--username <username>    Neo4j username (default: neo4j)
--password <password>    Neo4j password (default: neural_nexus_password)
--database <database>    Neo4j database name (default: neo4j)
--vector-index <name>    Vector index name (default: entity_embeddings)
--dimensions <number>    Vector dimensions (default: 384)
--similarity <function>  Similarity function (cosine|euclidean) (default: cosine)
--recreate               Force recreation of constraints and indexes
--test                   Test database connection
--init                   Initialize database schema
--help                   Show help information
```

## Database Schema

Neural Nexus MCP automatically creates the following Neo4j schema:

### Constraints

- **Entity Names**: Unique constraint on entity names
- **Relation IDs**: Unique constraint on relation identifiers

### Indexes

- **Vector Index**: `entity_embeddings` for semantic search
- **Property Indexes**: Optimized indexes for common query patterns

## Vector Search Implementation

Neural Nexus MCP implements vector search using Neo4j's built-in vector index capabilities:

- **Local Embeddings**: Uses Transformers.js (Xenova/all-MiniLM-L6-v2) by default
- **384 Dimensions**: Optimized for performance and accuracy
- **Cosine Similarity**: Default similarity function for semantic search
- **Automatic Indexing**: Vector index is created and maintained automatically

## Troubleshooting

### Common Issues

**Connection Problems:**
```bash
# Test your connection
neural-nexus-mcp --test

# Check if Neo4j is running
docker ps  # For Docker installations
```

**Schema Issues:**
```bash
# Reinitialize schema
neural-nexus-mcp --init --recreate
```

**Vector Search Not Working:**
- Verify Neo4j version is 5.13+
- Check if vector index exists
- Ensure embeddings are being generated

### Performance Tuning

For large datasets:
- Increase Neo4j memory allocation
- Adjust vector index configuration
- Use appropriate similarity functions
- Monitor query performance
