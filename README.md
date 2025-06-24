# Neural Nexus MCP: A Knowledge Graph Memory System for LLMs

![Neural Nexus MCP Logo](assets/neural-nexus-logo-gray.svg)

# Neural Nexus MCP

**Neural Nexus MCP: Knowledge graph memory system for LLMs with semantic retrieval and temporal awareness**

Neural Nexus MCP is a sophisticated knowledge graph memory system designed for Large Language Models (LLMs), providing persistent memory capabilities through the Model Context Protocol (MCP). It enables LLMs to store, retrieve, and reason over complex interconnected information with semantic understanding and temporal tracking.

## 🌟 Key Features

### **Session Management** ✅
- **Seamless Continuity**: Never lose context between chat sessions
- **Automatic Summaries**: Create comprehensive session summaries with enhanced v2 format
- **Perfect Restoration**: Retrieve and parse previous sessions with full context
- **Work Tracking**: Track completed tasks, decisions, and next steps across sessions
- **Rich Formatting**: Beautiful emoji-enhanced summaries for easy reading

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

## 🎯 System Prompts for IDEs

To get the most out of Neural Nexus MCP, add these system prompts to your IDE configuration:

### 📋 **Recommended System Prompt (Optimized & Concise)**

```
You have access to the Neural Nexus MCP knowledge graph memory system. Follow this workflow for EVERY chat:

1. START: Search memory for context (use semantic_search, search_nodes, open_nodes)
2. CHECK SESSION: If user mentions "new chat" or continuing, use get_last_session tool
3. VERIFY: Check user history and preferences (get_entity_history, get_relation_history)
4. TRACK: During chat, note new information, decisions, and changes
5. UPDATE: Before ending, create/update entities for new information
6. RELATE: Establish connections between entities (use active voice, add metadata)
7. VALIDATE: Verify temporal accuracy (no data before January 18, 2024)
8. CLEAN: Remove obsolete/incorrect information if needed
9. CHECK: Ensure all chat context is captured in memory
10. DOCUMENT: Add clear observations with confidence levels (0.0-1.0)
11. SESSION END: When user says goodbye/done, use create_session_summary tool
12. REMEMBER: Never end chat without updating memory - persistence is critical!

TOOL GUIDE:
- semantic_search: Find conceptually related info (params: query, min_similarity 0.6-1.0)
- search_nodes: Find exact entity names
- open_nodes: Get full details of specific entities
- read_graph: View entire memory graph
- create_entities: Add new knowledge (name, entityType, observations)
- add_observations: Update existing entities with new info
- delete_entities/delete_observations: Remove obsolete data
- create_relations/update_relation/delete_relations: Manage entity connections (from, to, relationType)
- get_relation: Check specific connection details
- get_entity_history/get_relation_history: Track changes over time
- get_graph_at_time: View memory at specific timestamp
- get_decayed_graph: Check confidence decay over time
- get_entity_embedding/force_generate_embedding: Vector operations
- debug_embedding_config/diagnose_vector_search: Troubleshoot semantic search
- create_session_summary: Save chat summary when ending (sessionOverview, workCompleted, etc.)
- get_last_session: Retrieve previous session summary when starting new chat
```

### 🔧 **Alternative: Simplified Basic Prompt**

If you prefer a shorter version, use this basic prompt:

```
You have access to the Neural Nexus MCP knowledge graph memory system, which provides you with persistent memory capabilities.

When asked about past conversations or user information, always check the Neural Nexus MCP knowledge graph first using semantic_search.

When a user says "new chat" or mentions continuing from before, use get_last_session to retrieve context from the previous session.

When ending a chat or when the user says goodbye, use create_session_summary to save the session context for future continuity.

Key capabilities:
- Store entities (people, concepts, events) with observations
- Create relations between entities with confidence and strength values
- Search semantically using local embeddings (no external APIs)
- Track temporal changes and version history
- Maintain persistent memory across conversations
- Create session summaries for seamless continuity between chats
- Restore context from previous sessions automatically

Always use the memory system to:
1. Remember important user preferences and information
2. Track project details and decisions
3. Store insights and learnings from conversations
4. Build knowledge graphs of related concepts
5. Maintain context across multiple sessions
6. Create session summaries when ending conversations
7. Check for previous sessions when starting new chats
```

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

Add to your MCP settings in Cursor preferences:

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

> **That's it!** Neural Nexus MCP will automatically use local Transformers.js embeddings and configure everything else with sensible defaults.

### 📝 **Advanced Configuration (Optional)**

If you need to customize settings, here's the complete configuration with all options:

```json
{
  "mcpServers": {
    "neural-nexus-mcp": {
      "command": "npx",
      "args": ["@adarsh6938/neural-nexus-mcp"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "neo4j",
        "EMBEDDING_PROVIDER": "transformers",
        "TRANSFORMERS_MODEL": "Xenova/all-MiniLM-L6-v2",
        "TRANSFORMERS_DIMENSIONS": "384",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

### 🚀 **Quick Start Guide**

1. **Install Neural Nexus MCP**:
   ```bash
   npm install -g @adarsh6938/neural-nexus-mcp
   ```

2. **Start Neo4j** (using Docker):
   ```bash
   docker run -d \
     --name neural-nexus-neo4j \
     -p 7474:7474 -p 7687:7687 \
     -e NEO4J_AUTH=neo4j/neural_nexus_password \
     neo4j:latest
   ```

3. **Add to your IDE** with this minimal config:
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

4. **Add the system prompt** to your IDE settings

5. **Test it**:
   ```
   "Can you check if Neural Nexus MCP is working?"
   ```

6. **Start using memory**:
   ```
   "Remember that I prefer TypeScript for new projects."
   ```

**That's it!** Everything else is configured automatically with sensible defaults.

### 📊 **Multiple Projects Setup**

**Important**: Use different databases for different projects to keep knowledge graphs separate!

#### Option 1: Different Database Names (Recommended)
```json
{
  "mcpServers": {
    "neural-nexus-project-a": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "project_a"
      }
    },
    "neural-nexus-project-b": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "project_b"
      }
    }
  }
}
```

#### Option 2: Different Neo4j Instances
```bash
# Project A Neo4j (port 7687)
docker run -d --name project-a-neo4j \
  -p 7687:7687 -p 7474:7474 \
  -e NEO4J_AUTH=neo4j/password_a neo4j:latest

# Project B Neo4j (port 7688) 
docker run -d --name project-b-neo4j \
  -p 7688:7687 -p 7475:7474 \
  -e NEO4J_AUTH=neo4j/password_b neo4j:latest
```

Then configure different URIs:
```json
{
  "neural-nexus-project-a": {
    "env": { "NEO4J_URI": "bolt://localhost:7687" }
  },
  "neural-nexus-project-b": {
    "env": { "NEO4J_URI": "bolt://localhost:7688" }
  }
}
```

#### Creating New Databases in Neo4j

Neo4j automatically creates databases when first accessed. You can also create them manually:

1. **Neo4j Desktop**: Go to "Manage" → "Databases" → "Create Database"
2. **Neo4j Browser**: Run `CREATE DATABASE project_name`
3. **Automatic**: Neural Nexus MCP will create the database if it doesn't exist

**Benefits of separate databases:**
- ✅ Complete isolation between projects
- ✅ Independent backup/restore
- ✅ Different access controls
- ✅ Project-specific optimizations
- ✅ Clean knowledge graph boundaries

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

### Session Management

Neural Nexus MCP provides **fully functional** built-in session management for seamless continuity between conversations. Both tools have been thoroughly tested and are production-ready:

#### ✅ Status: **WORKING PERFECTLY**
- ✅ `create_session_summary` - Fully functional, creates comprehensive session summaries
- ✅ `get_last_session` - Fully functional, retrieves and parses session data correctly
- ✅ Enhanced v2 format with 10 structured sections
- ✅ Automatic entity filtering and proper sorting by creation time

#### Creating Session Summaries

When ending a conversation, use `create_session_summary` to capture the session context:

```javascript
// Example session summary creation
{
  "sessionOverview": "Fixed Neural Nexus MCP getLastSession tool parsing logic and tested session management functionality",
  "workCompleted": [
    "Successfully fixed getLastSession.ts search and parsing logic",
    "Verified both create_session_summary and get_last_session tools work correctly", 
    "Built project without errors",
    "Confirmed all session data sections are properly populated"
  ],
  "keyDecisions": [
    "Use readGraph() method with manual filtering for reliability",
    "Maintain numbered section format for consistency",
    "Extract all content types including bullet points and decisions"
  ],
  "entitiesWorked": [
    "getLastSession.ts",
    "Session Management Tools",
    "Neural Nexus MCP Project"
  ],
  "nextSteps": [
    "Document the successful fixes",
    "Consider adding error handling improvements",
    "Test session continuity across different scenarios"
  ],
  "openQuestions": [
    "Should we add session expiration features?",
    "How to handle very large session histories?"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "sessionName": "Chat Session 2025-06-24 05:43:23",
  "summary": {
    "overview": "Fixed Neural Nexus MCP getLastSession tool parsing logic and tested session management functionality",
    "workCompleted": 5,
    "keyDecisions": 4,
    "entitiesWorked": 4,
    "nextSteps": 4,
    "openQuestions": 3,
    "format": "v2",
    "sections": 10
  },
  "message": "✅ Session summary saved with enhanced v2 format! When you return, just say \"new chat\" and I'll pick up right where we left off."
}
```

#### Retrieving Previous Sessions

When starting a new conversation, use `get_last_session` to restore context:

**Response includes beautifully formatted summary:**
```
🔄 Continuing from previous session...

📅 Last Session: Chat Session 2025-06-24 05:43:23
🎯 Main Achievement: Fixed Neural Nexus MCP getLastSession tool parsing logic and tested session management functionality

🔍 Session Details:

💻 Technical Changes:

📝 Knowledge & Decisions:
- Use readGraph() method with manual filtering for reliability
- Maintain numbered section format for consistency
- Extract all content types including bullet points and decisions
- Ensure proper entity type filtering

📊 Progress:
✓ Successfully fixed getLastSession.ts search and parsing logic
✓ Verified both create_session_summary and get_last_session tools work correctly
✓ Built project without errors
✓ Confirmed all session data sections are properly populated
✓ Fixed search method to use readGraph() with filtering

🔜 Next Steps:
→ Document the successful fixes
→ Consider adding error handling improvements
→ Test session continuity across different scenarios
→ Update any related documentation

❓ Open Questions:
? Should we add session expiration features?
? How to handle very large session histories?
? Would session search capabilities be useful?
```

#### ✨ Recent Improvements (v1.0.2+)

**Fixed Issues:**
- ✅ **Search Method**: Fixed to use `readGraph()` with proper entity filtering
- ✅ **Section Parsing**: Enhanced to handle numbered sections (1. CORE METADATA:, 2. TECHNICAL CONTENT:, etc.)
- ✅ **Content Extraction**: Now properly extracts bullet points with `  * ` format
- ✅ **Entity Filtering**: Correctly filters for `chat_session_summary` entities only
- ✅ **Proper Sorting**: Returns most recent session by creation timestamp

**Enhanced v2 Format** includes 10 structured sections:
1. **Core Metadata** - Session details and environment
2. **Technical Content** - Files modified, commands run, build results
3. **Knowledge Tracking** - Discussions, problems solved, solutions
4. **Decision Log** - Key decisions and rationale
5. **Context Preservation** - Git status, branch, package version
6. **Relationship Tracking** - Previous sessions, entities modified, tools used
7. **Progress Tracking** - Completed work and next actions
8. **Quality Metrics** - Code review notes, test coverage
9. **Learning & Documentation** - New concepts, documentation updates
10. **Future Planning** - Next steps, open questions, improvements

#### Benefits

- **Zero Context Loss**: Never lose track of ongoing work
- **Automatic Summaries**: Session details captured automatically with comprehensive v2 format
- **Perfect Retrieval**: Correctly parses and displays all session data
- **Easy Resumption**: Pick up exactly where you left off with full context
- **Work Tracking**: Clear record of accomplishments and decisions
- **Cross-Chat Continuity**: Maintain context across multiple sessions
- **Rich Formatting**: Beautiful emoji-enhanced summaries for easy reading

#### Best Practices

1. **End Sessions Properly**: Always create a summary when finishing work
2. **Track Entities**: Include all entities created or modified
3. **Document Decisions**: Record key choices made during the session
4. **Plan Next Steps**: Clear action items for the next session
5. **Note Questions**: Capture unresolved issues for future discussion
6. **Use Rich Descriptions**: Provide detailed session overviews for better context
7. **Test Continuity**: Verify session restoration works as expected

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

Neural Nexus MCP provides 19+ tools accessible through the Model Context Protocol:

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

### Session Management ✅ **FULLY FUNCTIONAL**
- `create_session_summary` - Create comprehensive chat session summaries (**WORKING**)
- `get_last_session` - Retrieve the most recent session for continuity (**WORKING**)

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
