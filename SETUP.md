# Neural Nexus MCP Setup Guide

Complete setup instructions for integrating Neural Nexus MCP with your IDE.

## 🎯 System Prompts

### 📋 Basic System Prompt (Recommended)

Copy and paste this into your IDE's system prompt settings:

```
You have access to the Neural Nexus MCP knowledge graph memory system, which provides you with persistent memory capabilities.

Your memory tools are provided by Neural Nexus MCP, a sophisticated knowledge graph implementation.

When asked about past conversations or user information, always check the Neural Nexus MCP knowledge graph first.

You should use semantic_search to find relevant information in your memory when answering questions.

Key capabilities:
- Store entities (people, concepts, events) with observations
- Create relations between entities with confidence and strength values  
- Search semantically using local embeddings (no external APIs)
- Track temporal changes and version history
- Maintain persistent memory across conversations

Always use the memory system to:
1. Remember important user preferences and information
2. Track project details and decisions
3. Store insights and learnings from conversations
4. Build knowledge graphs of related concepts
5. Maintain context across multiple sessions
```

### 🔧 Advanced System Prompt (Power Users)

For more detailed guidance:

```
You are equipped with Neural Nexus MCP, a powerful knowledge graph memory system. This gives you persistent memory capabilities that work locally with no external API dependencies.

MEMORY USAGE GUIDELINES:
- Use create_entities for storing new information (people, concepts, projects, decisions)
- Use create_relations to connect related information with semantic relationships
- Use semantic_search to find relevant past information before answering questions
- Use add_observations to update existing entities with new information
- Use read_graph to understand the full context of stored knowledge

BEST PRACTICES:
1. Always search your memory first when users ask about past topics
2. Store important user preferences, project details, and decisions
3. Create meaningful relations between concepts (use active voice: "User prefers X", "Project includes Y")
4. Use appropriate confidence and strength values for relations (0.0-1.0)
5. Add metadata to track sources and context

MEMORY STRUCTURE:
- Entities: Discrete pieces of knowledge with observations
- Relations: Connections between entities with semantic meaning
- Temporal tracking: All changes are versioned and timestamped
- Local embeddings: Semantic search powered by Transformers.js

Remember: This memory persists across all conversations and sessions.
```

## 🛠️ IDE Configuration

### Claude Desktop

1. **Install Neural Nexus MCP**:
   ```bash
   npm install -g @adarsh6938/neural-nexus-mcp
   ```

2. **Find your config file**:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

3. **Add this configuration**:
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

4. **Restart Claude Desktop**

### Cursor

1. **Install Neural Nexus MCP**:
   ```bash
   npm install -g @adarsh6938/neural-nexus-mcp
   ```

2. **Open Cursor Settings**:
   - Go to Cursor → Preferences → Features → Rules for AI
   - Or use Cmd/Ctrl + , and search for "MCP"

3. **Add this configuration**:
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

4. **Add the system prompt** in the Rules for AI section

> **That's it!** Neural Nexus MCP automatically uses local Transformers.js embeddings and configures everything else with sensible defaults.

## 🗄️ Database Setup

### Option 1: Docker (Recommended)

```bash
# Start Neo4j with Docker
docker run -d \
  --name neural-nexus-neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/neural_nexus_password \
  -e NEO4J_PLUGINS='["apoc"]' \
  neo4j:latest

# Verify it's running
docker ps | grep neo4j
```

### Option 2: Local Installation

1. **Download Neo4j Desktop** from https://neo4j.com/download/
2. **Create a new database** with:
   - Username: `neo4j`
   - Password: `neural_nexus_password`
   - Port: `7687`
3. **Start the database**

### Option 3: Docker Compose

Use the included `docker-compose.yml`:

```bash
docker-compose up -d neo4j
```

## 📊 Multiple Projects Setup

**Important**: Use different databases for different projects to keep knowledge graphs separate!

### Option 1: Different Database Names (Recommended)

Configure multiple Neural Nexus MCP instances with different database names:

```json
{
  "mcpServers": {
    "neural-nexus-work": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "work_project"
      }
    },
    "neural-nexus-personal": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "personal_knowledge"
      }
    },
    "neural-nexus-research": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "research_notes"
      }
    }
  }
}
```

### Option 2: Different Neo4j Instances

Run separate Neo4j containers for complete isolation:

```bash
# Work project Neo4j (port 7687)
docker run -d --name work-neo4j \
  -p 7687:7687 -p 7474:7474 \
  -e NEO4J_AUTH=neo4j/work_password \
  neo4j:latest

# Personal project Neo4j (port 7688)
docker run -d --name personal-neo4j \
  -p 7688:7687 -p 7475:7474 \
  -e NEO4J_AUTH=neo4j/personal_password \
  neo4j:latest
```

Then configure different URIs:
```json
{
  "neural-nexus-work": {
    "env": { 
      "NEO4J_URI": "bolt://localhost:7687",
      "NEO4J_PASSWORD": "work_password"
    }
  },
  "neural-nexus-personal": {
    "env": { 
      "NEO4J_URI": "bolt://localhost:7688",
      "NEO4J_PASSWORD": "personal_password"
    }
  }
}
```

### Creating New Databases

Neo4j automatically creates databases when first accessed. You can also create them manually:

1. **Neo4j Desktop**: Go to "Manage" → "Databases" → "Create Database"
2. **Neo4j Browser**: Run `CREATE DATABASE project_name`
3. **Automatic**: Neural Nexus MCP will create the database if it doesn't exist

### Benefits of Project Separation

- ✅ **Complete isolation** between different projects
- ✅ **Independent backup/restore** for each project
- ✅ **Different access controls** per project
- ✅ **Project-specific optimizations** and configurations
- ✅ **Clean knowledge boundaries** prevent cross-contamination
- ✅ **Easier maintenance** and troubleshooting
- ✅ **Better performance** with smaller, focused datasets

## ✅ Testing Your Setup

1. **Test database connection**:
   ```bash
   npx @adarsh6938/neural-nexus-mcp --test
   ```

2. **Test in your IDE**:
   Ask your AI assistant:
   ```
   "Can you check if Neural Nexus MCP is working and show me what tools are available?"
   ```

3. **Test memory functionality**:
   ```
   "Remember that I prefer TypeScript for new projects and I'm working on a knowledge graph system."
   ```

   Then in a new conversation:
   ```
   "What do you remember about my project preferences?"
   ```

## 🔧 Advanced Configuration

### Complete Configuration Example

Only customize these if you need to change defaults:

```json
{
  "mcpServers": {
    "neural-nexus-mcp": {
      "command": "neural-nexus-mcp",
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "neural_nexus_password",
        "NEO4J_DATABASE": "neo4j",
        "TRANSFORMERS_MODEL": "Xenova/all-MiniLM-L6-v2",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

### Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `NEO4J_URI` | Neo4j connection URI | `bolt://localhost:7687` |
| `NEO4J_USERNAME` | Neo4j username | `neo4j` |
| `NEO4J_PASSWORD` | Neo4j password | `neural_nexus_password` |
| `NEO4J_DATABASE` | Neo4j database name | `neo4j` |
| `TRANSFORMERS_MODEL` | Transformers.js model | `Xenova/all-MiniLM-L6-v2` |
| `LOG_LEVEL` | Logging level | `info` |

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot connect to Neo4j"**
   - Check if Neo4j is running: `docker ps` or check Neo4j Desktop
   - Verify connection details in configuration
   - Test connection: `npx @adarsh6938/neural-nexus-mcp --test`

2. **"MCP server not found"**
   - Verify installation: `npm list -g @adarsh6938/neural-nexus-mcp`
   - Check configuration syntax in your IDE
   - Restart your IDE after configuration changes

3. **"Embedding generation failed"**
   - This is normal on first run (models download automatically)
   - Check logs for download progress
   - Ensure sufficient disk space for model files

4. **"Permission denied"**
   - Install globally: `npm install -g @adarsh6938/neural-nexus-mcp`
   - Or use `npx` in configuration (recommended)

### Debug Mode

Enable debug logging:

```json
{
  "env": {
    "LOG_LEVEL": "debug",
    "DEBUG": "true"
  }
}
```

### Getting Help

- 📖 **Documentation**: https://github.com/adarsh6938/neural-nexus-mcp
- 🐛 **Issues**: https://github.com/adarsh6938/neural-nexus-mcp/issues
- 💬 **Discussions**: https://github.com/adarsh6938/neural-nexus-mcp/discussions

## 🎉 You're Ready!

Once setup is complete, your AI assistant will have persistent memory capabilities. It can:

- Remember your preferences across conversations
- Store and recall project information
- Build knowledge graphs of related concepts
- Search semantically through past conversations
- Track changes and relationships over time

**Start using it by asking your AI to remember important information!** 