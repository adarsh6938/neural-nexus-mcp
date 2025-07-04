/**
 * Handles the ListTools request.
 * Returns a list of all available tools with their schemas.
 */

export const handleListToolsRequest = async () => {
  return {
    tools: [
      {
        name: 'create_entities',
        description: 'Create multiple new entities in your Neural Nexus MCP knowledge graph memory system',
        inputSchema: {
          type: 'object',
          properties: {
            entities: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'The name of the entity',
                  },
                  entityType: {
                    type: 'string',
                    description: 'The type of the entity',
                  },
                  observations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'An array of observation contents associated with the entity',
                  },
                  id: {
                    type: 'string',
                    description: 'Optional entity ID',
                  },
                  version: {
                    type: 'number',
                    description: 'Optional entity version',
                  },
                  createdAt: {
                    type: 'number',
                    description: 'Optional creation timestamp',
                  },
                  updatedAt: {
                    type: 'number',
                    description: 'Optional update timestamp',
                  },
                  validFrom: {
                    type: 'number',
                    description: 'Optional validity start timestamp',
                  },
                  validTo: {
                    type: 'number',
                    description: 'Optional validity end timestamp',
                  },
                  changedBy: {
                    type: 'string',
                    description: 'Optional user/system identifier',
                  },
                },
                required: ['name', 'entityType', 'observations'],
              },
            },
          },
          required: ['entities'],
        },
      },
      {
        name: 'create_relations',
        description:
          'Create multiple new relations between entities in your Neural Nexus MCP knowledge graph memory. Relations should be in active voice',
        inputSchema: {
          type: 'object',
          properties: {
            relations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  from: {
                    type: 'string',
                    description: 'The name of the entity where the relation starts',
                  },
                  to: {
                    type: 'string',
                    description: 'The name of the entity where the relation ends',
                  },
                  relationType: {
                    type: 'string',
                    description: 'The type of the relation',
                  },
                  id: {
                    type: 'string',
                    description: 'Optional relation ID',
                  },
                  version: {
                    type: 'number',
                    description: 'Optional relation version',
                  },
                  createdAt: {
                    type: 'number',
                    description: 'Optional creation timestamp',
                  },
                  updatedAt: {
                    type: 'number',
                    description: 'Optional update timestamp',
                  },
                  validFrom: {
                    type: 'number',
                    description: 'Optional validity start timestamp',
                  },
                  validTo: {
                    type: 'number',
                    description: 'Optional validity end timestamp',
                  },
                  changedBy: {
                    type: 'string',
                    description: 'Optional user/system identifier',
                  },
                  strength: {
                    type: 'number',
                    description: 'Optional strength of relation (0.0 to 1.0)',
                  },
                  confidence: {
                    type: 'number',
                    description: 'Optional confidence level in relation accuracy (0.0 to 1.0)',
                  },
                  metadata: {
                    type: 'object',
                    additionalProperties: true,
                    description: 'Optional metadata about the relation (source, timestamps, tags, etc.)',
                  },
                },
                required: ['from', 'to', 'relationType'],
              },
            },
          },
          required: ['relations'],
        },
      },
      {
        name: 'add_observations',
        description: 'Add new observations to existing entities in your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            observations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  entityName: {
                    type: 'string',
                    description: 'The name of the entity to add the observations to',
                  },
                  contents: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'An array of observation contents to add',
                  },
                  strength: {
                    type: 'number',
                    description: 'Strength value (0.0 to 1.0) for this specific observation',
                  },
                  confidence: {
                    type: 'number',
                    description: 'Confidence level (0.0 to 1.0) for this specific observation',
                  },
                  metadata: {
                    type: 'object',
                    additionalProperties: true,
                    description: 'Metadata for this specific observation',
                  },
                },
                required: ['entityName', 'contents'],
              },
            },
            strength: {
              type: 'number',
              description: 'Default strength value (0.0 to 1.0) for all observations',
            },
            confidence: {
              type: 'number',
              description: 'Default confidence level (0.0 to 1.0) for all observations',
            },
            metadata: {
              type: 'object',
              additionalProperties: true,
              description: 'Default metadata for all observations',
            },
          },
          required: ['observations'],
        },
      },
      {
        name: 'delete_entities',
        description: 'Delete multiple entities and their associated relations from your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            entityNames: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'An array of entity names to delete',
            },
          },
          required: ['entityNames'],
        },
      },
      {
        name: 'delete_observations',
        description: 'Delete specific observations from entities in your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            deletions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  entityName: {
                    type: 'string',
                    description: 'The name of the entity containing the observations',
                  },
                  observations: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'An array of observations to delete',
                  },
                },
                required: ['entityName', 'observations'],
              },
            },
          },
          required: ['deletions'],
        },
      },
      {
        name: 'delete_relations',
        description: 'Delete multiple relations from your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            relations: {
              type: 'array',
              description: 'An array of relations to delete',
              items: {
                type: 'object',
                properties: {
                  from: {
                    type: 'string',
                    description: 'The name of the entity where the relation starts',
                  },
                  to: {
                    type: 'string',
                    description: 'The name of the entity where the relation ends',
                  },
                  relationType: {
                    type: 'string',
                    description: 'The type of the relation',
                  },
                },
                required: ['from', 'to', 'relationType'],
              },
            },
          },
          required: ['relations'],
        },
      },
      {
        name: 'get_relation',
        description: 'Get a specific relation with its enhanced properties from your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            from: {
              type: 'string',
              description: 'The name of the entity where the relation starts',
            },
            to: {
              type: 'string',
              description: 'The name of the entity where the relation ends',
            },
            relationType: {
              type: 'string',
              description: 'The type of the relation',
            },
          },
          required: ['from', 'to', 'relationType'],
        },
      },
      {
        name: 'update_relation',
        description: 'Update an existing relation with enhanced properties in your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            relation: {
              type: 'object',
              properties: {
                from: {
                  type: 'string',
                  description: 'The name of the entity where the relation starts',
                },
                to: {
                  type: 'string',
                  description: 'The name of the entity where the relation ends',
                },
                relationType: {
                  type: 'string',
                  description: 'The type of the relation',
                },
                id: {
                  type: 'string',
                  description: 'Optional relation ID',
                },
                version: {
                  type: 'number',
                  description: 'Optional relation version',
                },
                createdAt: {
                  type: 'number',
                  description: 'Optional creation timestamp',
                },
                updatedAt: {
                  type: 'number',
                  description: 'Optional update timestamp',
                },
                validFrom: {
                  type: 'number',
                  description: 'Optional validity start timestamp',
                },
                validTo: {
                  type: 'number',
                  description: 'Optional validity end timestamp',
                },
                changedBy: {
                  type: 'string',
                  description: 'Optional user/system identifier',
                },
                strength: {
                  type: 'number',
                  description: 'Optional strength of relation (0.0 to 1.0)',
                },
                confidence: {
                  type: 'number',
                  description: 'Optional confidence level in relation accuracy (0.0 to 1.0)',
                },
                metadata: {
                  type: 'object',
                  additionalProperties: true,
                  description: 'Optional metadata about the relation (source, timestamps, tags, etc.)',
                },
              },
              required: ['from', 'to', 'relationType'],
            },
          },
          required: ['relation'],
        },
      },
      {
        name: 'read_graph',
        description: 'Read the entire Neural Nexus MCP knowledge graph memory system',
        inputSchema: {
          type: 'object',
          properties: {
            random_string: {
              type: 'string',
              description: 'Dummy parameter for no-parameter tools',
            },
          },
        },
      },
      {
        name: 'search_nodes',
        description: 'Search for nodes in your Neural Nexus MCP knowledge graph memory based on a query',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query to match against entity names, types, and observation content',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'open_nodes',
        description: 'Open specific nodes in your Neural Nexus MCP knowledge graph memory by their names',
        inputSchema: {
          type: 'object',
          properties: {
            names: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'An array of entity names to retrieve',
            },
          },
          required: ['names'],
        },
      },
      {
        name: 'semantic_search',
        description:
          'Search for entities semantically using vector embeddings and similarity in your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The text query to search for semantically',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results to return (default: 10)',
            },
            min_similarity: {
              type: 'number',
              description: 'Minimum similarity threshold from 0.0 to 1.0 (default: 0.6)',
            },
            entity_types: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Filter results by entity types',
            },
            hybrid_search: {
              type: 'boolean',
              description: 'Whether to combine keyword and semantic search (default: true)',
            },
            semantic_weight: {
              type: 'number',
              description: 'Weight of semantic results in hybrid search from 0.0 to 1.0 (default: 0.6)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_entity_embedding',
        description: 'Get the vector embedding for a specific entity from your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            entity_name: {
              type: 'string',
              description: 'The name of the entity to get the embedding for',
            },
          },
          required: ['entity_name'],
        },
      },
      {
        name: 'get_entity_history',
        description: 'Get the version history of an entity from your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            entityName: {
              type: 'string',
              description: 'The name of the entity to retrieve history for',
            },
          },
          required: ['entityName'],
        },
      },
      {
        name: 'get_relation_history',
        description: 'Get the version history of a relation from your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            from: {
              type: 'string',
              description: 'The name of the entity where the relation starts',
            },
            to: {
              type: 'string',
              description: 'The name of the entity where the relation ends',
            },
            relationType: {
              type: 'string',
              description: 'The type of the relation',
            },
          },
          required: ['from', 'to', 'relationType'],
        },
      },
      {
        name: 'get_graph_at_time',
        description: 'Get your Neural Nexus MCP knowledge graph memory as it existed at a specific point in time',
        inputSchema: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'number',
              description: 'The timestamp (in milliseconds since epoch) to query the graph at',
            },
          },
          required: ['timestamp'],
        },
      },
      {
        name: 'get_decayed_graph',
        description: 'Get your Neural Nexus MCP knowledge graph memory with confidence values decayed based on time',
        inputSchema: {
          type: 'object',
          properties: {
            reference_time: {
              type: 'number',
              description: 'Optional reference timestamp (in milliseconds since epoch) for decay calculation',
            },
            decay_factor: {
              type: 'number',
              description: 'Optional decay factor override (normally calculated from half-life)',
            },
          },
        },
      },
      {
        name: 'force_generate_embedding',
        description: 'Forcibly generate and store an embedding for an entity in your Neural Nexus MCP knowledge graph memory',
        inputSchema: {
          type: 'object',
          properties: {
            entity_name: {
              type: 'string',
              description: 'Name of the entity to generate embedding for',
            },
          },
          required: ['entity_name'],
        },
      },
      {
        name: 'debug_embedding_config',
        description: 'Debug tool to check embedding configuration and status of your Neural Nexus MCP knowledge graph memory system',
        inputSchema: {
          type: 'object',
          properties: {
            random_string: {
              type: 'string',
              description: 'Dummy parameter for no-parameter tools',
            },
          },
        },
      },
      {
        name: 'diagnose_vector_search',
        description: 'Diagnostic tool to directly query Neo4j database for entity embeddings, bypassing application abstractions',
        inputSchema: {
          type: 'object',
          properties: {
            random_string: {
              type: 'string',
              description: 'Dummy parameter for no-parameter tools',
            },
          },
        },
      },
      {
        name: 'create_session_summary',
        description: 'Create a comprehensive summary of the current chat session for seamless continuity',
        inputSchema: {
          type: 'object',
          properties: {
            sessionOverview: {
              type: 'string',
              description: 'Brief one-line summary of the main achievement in this session',
            },
            workCompleted: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of specific tasks or changes made during the session',
            },
            keyDecisions: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Important choices or configurations decided in the session',
            },
            entitiesWorked: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Names of entities created or modified during the session',
            },
            nextSteps: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'What should be done in the next session',
            },
            openQuestions: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Any unresolved issues or pending decisions',
            },
            continuesFrom: {
              type: 'string',
              description: 'Optional: Name of previous session this continues from',
            },
          },
          required: ['sessionOverview'],
        },
      },
      {
        name: 'get_last_session',
        description: 'Retrieve the most recent chat session summary for context restoration',
        inputSchema: {
          type: 'object',
          properties: {
            random_string: {
              type: 'string',
              description: 'Dummy parameter for no-parameter tools',
            },
          },
        },
      },
    ],
  };
};
