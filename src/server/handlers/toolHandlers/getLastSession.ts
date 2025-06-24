/**
 * Handles the get_last_session tool request
 * Retrieves the most recent chat session summary with enhanced v2 format support
 * @param args The arguments for the tool request
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the result content
 */

export async function handleGetLastSession(
  args: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  knowledgeGraphManager: any
): Promise<{ content: Array<{ type: string; text: string }> }> {
  try {
    // Read the entire graph and filter for chat session summaries
    const graphData = await knowledgeGraphManager.readGraph();
    
    if (!graphData || !graphData.entities) {
      return {
        content: [
          {
            type: 'text',
            text: 'No previous session found.',
          },
        ],
      };
    }

    // Filter for chat_session_summary entities
    const sessionEntities = graphData.entities.filter(
      (entity: any) => entity.entityType === 'chat_session_summary'
    );

    if (sessionEntities.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No previous session found.',
          },
        ],
      };
    }

    // Sort by creation time to get the most recent
    const sortedSessions = sessionEntities.sort((a: any, b: any) => b.createdAt - a.createdAt);
    const latestSession = sortedSessions[0];
    const observations = latestSession.observations || [];

    // Parse session data from observations
    const sessionData = {
      overview: '',
      coreMetadata: {
        sessionId: '',
        startTime: '',
        endTime: '',
        duration: '',
        sessionType: '',
        environment: '',
      },
      technicalContent: {
        modifiedFiles: [] as string[],
        commandsRun: [] as string[],
        buildResults: [] as string[],
        errorLogs: [] as string[],
      },
      knowledgeTracking: {
        discussions: [] as string[],
        problemsSolved: [] as string[],
        solutionsImplemented: [] as string[],
      },
      decisionLog: [] as string[],
      contextPreservation: {
        branch: '',
        gitStatus: [] as string[],
        packageVersion: '',
      },
      relationshipTracking: {
        previousSession: '',
        entitiesModified: [] as string[],
        toolsUsed: [] as string[],
      },
      progressTracking: {
        completed: [] as string[],
        nextActions: [] as string[],
      },
      qualityMetrics: {
        codeReview: [] as string[],
        testCoverage: [] as string[],
      },
      learningAndDocs: {
        newConcepts: [] as string[],
        docsUpdates: [] as string[],
      },
      futurePlanning: {
        nextSteps: [] as string[],
        openQuestions: [] as string[],
        improvements: [] as string[],
      },
    };

    // Parse observations into structured data
    let currentSection = '';
    let currentSubsection = '';

    for (const obs of observations) {
      // Handle overview
      if (obs.startsWith('SESSION_OVERVIEW: ')) {
        sessionData.overview = obs.replace('SESSION_OVERVIEW: ', '').trim();
        continue;
      }

      // Handle section headers
      if (obs === '1. CORE METADATA:') {
        currentSection = 'coreMetadata';
        continue;
      } else if (obs === '2. TECHNICAL CONTENT:') {
        currentSection = 'technicalContent';
        continue;
      } else if (obs === '3. KNOWLEDGE TRACKING:') {
        currentSection = 'knowledgeTracking';
        continue;
      } else if (obs === '4. DECISION LOG:') {
        currentSection = 'decisionLog';
        continue;
      } else if (obs === '5. CONTEXT PRESERVATION:') {
        currentSection = 'contextPreservation';
        continue;
      } else if (obs === '6. RELATIONSHIP TRACKING:') {
        currentSection = 'relationshipTracking';
        continue;
      } else if (obs === '7. PROGRESS TRACKING:') {
        currentSection = 'progressTracking';
        continue;
      } else if (obs === '8. QUALITY METRICS:') {
        currentSection = 'qualityMetrics';
        continue;
      } else if (obs === '9. LEARNING & DOCUMENTATION:') {
        currentSection = 'learningAndDocs';
        continue;
      } else if (obs === '10. FUTURE PLANNING:') {
        currentSection = 'futurePlanning';
        continue;
      }

      // Handle subsection headers
      if (obs.startsWith('- ') && obs.endsWith(':')) {
        const subsectionName = obs.replace(/^-\s+/, '').replace(/:$/, '').trim();
        if (currentSection === 'coreMetadata') {
          if (subsectionName === 'Session ID') {
            currentSubsection = 'sessionId';
          } else if (subsectionName === 'Start Time') {
            currentSubsection = 'startTime';
          } else if (subsectionName === 'End Time') {
            currentSubsection = 'endTime';
          } else if (subsectionName === 'Duration') {
            currentSubsection = 'duration';
          } else if (subsectionName === 'Session Type') {
            currentSubsection = 'sessionType';
          } else if (subsectionName === 'Environment') {
            currentSubsection = 'environment';
          }
        } else if (currentSection === 'technicalContent') {
          if (subsectionName === 'Modified Files') {
            currentSubsection = 'modifiedFiles';
          } else if (subsectionName === 'Commands Run') {
            currentSubsection = 'commandsRun';
          } else if (subsectionName === 'Build Results') {
            currentSubsection = 'buildResults';
          } else if (subsectionName === 'Error Logs') {
            currentSubsection = 'errorLogs';
          }
        } else if (currentSection === 'knowledgeTracking') {
          if (subsectionName === 'Technical Discussions') {
            currentSubsection = 'discussions';
          } else if (subsectionName === 'Problems Solved') {
            currentSubsection = 'problemsSolved';
          } else if (subsectionName === 'Solutions Implemented') {
            currentSubsection = 'solutionsImplemented';
          }
        } else if (currentSection === 'contextPreservation') {
          if (subsectionName === 'Branch') {
            currentSubsection = 'branch';
          } else if (subsectionName === 'Git Status') {
            currentSubsection = 'gitStatus';
          } else if (subsectionName === 'Package Version') {
            currentSubsection = 'packageVersion';
          }
        } else if (currentSection === 'progressTracking') {
          if (subsectionName === 'Completed') {
            currentSubsection = 'completed';
          } else if (subsectionName === 'Next Actions') {
            currentSubsection = 'nextActions';
          }
        } else if (currentSection === 'futurePlanning') {
          if (subsectionName === 'Open Questions') {
            currentSubsection = 'openQuestions';
          } else if (subsectionName === 'Immediate Next Steps') {
            currentSubsection = 'nextSteps';
          } else if (subsectionName === 'Future Improvements') {
            currentSubsection = 'improvements';
          }
        } else if (currentSection === 'relationshipTracking') {
          if (subsectionName === 'Previous Session') {
            currentSubsection = 'previousSession';
          } else if (subsectionName === 'Entities Modified') {
            currentSubsection = 'entitiesModified';
          } else if (subsectionName === 'Tools Used') {
            currentSubsection = 'toolsUsed';
          }
        } else if (currentSection === 'qualityMetrics') {
          if (subsectionName === 'Code Review Notes') {
            currentSubsection = 'codeReview';
          } else if (subsectionName === 'Test Coverage') {
            currentSubsection = 'testCoverage';
          }
        } else if (currentSection === 'learningAndDocs') {
          if (subsectionName === 'New Concepts') {
            currentSubsection = 'newConcepts';
          } else if (subsectionName === 'Documentation Updates') {
            currentSubsection = 'docsUpdates';
          }
        }
        continue;
      }

      // Handle content lines
      if (obs.startsWith('  * ')) {
        const content = obs.replace(/^  \* /, '').trim();

        if (!content) continue;

        switch (currentSection) {
          case 'coreMetadata':
            // Handle metadata items by subsection
            if (currentSubsection === 'sessionId') {
              sessionData.coreMetadata.sessionId = content;
            } else if (currentSubsection === 'startTime') {
              sessionData.coreMetadata.startTime = content;
            } else if (currentSubsection === 'endTime') {
              sessionData.coreMetadata.endTime = content;
            } else if (currentSubsection === 'duration') {
              sessionData.coreMetadata.duration = content;
            } else if (currentSubsection === 'sessionType') {
              sessionData.coreMetadata.sessionType = content;
            } else if (currentSubsection === 'environment') {
              sessionData.coreMetadata.environment = content;
            }
            break;

          case 'technicalContent':
            if (currentSubsection === 'modifiedFiles') {
              sessionData.technicalContent.modifiedFiles.push(content);
            } else if (currentSubsection === 'commandsRun') {
              sessionData.technicalContent.commandsRun.push(content);
            } else if (currentSubsection === 'buildResults') {
              sessionData.technicalContent.buildResults.push(content);
            } else if (currentSubsection === 'errorLogs') {
              sessionData.technicalContent.errorLogs.push(content);
            }
            break;

          case 'knowledgeTracking':
            if (currentSubsection === 'discussions') {
              sessionData.knowledgeTracking.discussions.push(content);
            } else if (currentSubsection === 'problemsSolved') {
              sessionData.knowledgeTracking.problemsSolved.push(content);
            } else if (currentSubsection === 'solutionsImplemented') {
              sessionData.knowledgeTracking.solutionsImplemented.push(content);
            }
            break;

          case 'contextPreservation':
            if (currentSubsection === 'branch') {
              sessionData.contextPreservation.branch = content;
            } else if (currentSubsection === 'gitStatus') {
              sessionData.contextPreservation.gitStatus.push(content);
            } else if (currentSubsection === 'packageVersion') {
              sessionData.contextPreservation.packageVersion = content;
            }
            break;

          case 'qualityMetrics':
            if (currentSubsection === 'codeReview') {
              sessionData.qualityMetrics.codeReview.push(content);
            } else if (currentSubsection === 'testCoverage') {
              sessionData.qualityMetrics.testCoverage.push(content);
            }
            break;

          case 'learningAndDocs':
            if (currentSubsection === 'newConcepts') {
              sessionData.learningAndDocs.newConcepts.push(content);
            } else if (currentSubsection === 'docsUpdates') {
              sessionData.learningAndDocs.docsUpdates.push(content);
            }
            break;

          case 'decisionLog':
            sessionData.decisionLog.push(content);
            break;

          case 'relationshipTracking':
            if (currentSubsection === 'previousSession') {
              sessionData.relationshipTracking.previousSession = content;
            } else if (currentSubsection === 'entitiesModified') {
              sessionData.relationshipTracking.entitiesModified.push(content);
            } else if (currentSubsection === 'toolsUsed') {
              sessionData.relationshipTracking.toolsUsed.push(content);
            }
            break;

          case 'progressTracking':
            if (currentSubsection === 'completed') {
              sessionData.progressTracking.completed.push(content);
            } else if (currentSubsection === 'nextActions') {
              sessionData.progressTracking.nextActions.push(content);
            }
            break;

          case 'futurePlanning':
            if (currentSubsection === 'openQuestions') {
              sessionData.futurePlanning.openQuestions.push(content);
            } else if (currentSubsection === 'nextSteps') {
              sessionData.futurePlanning.nextSteps.push(content);
            } else if (currentSubsection === 'improvements') {
              sessionData.futurePlanning.improvements.push(content);
            }
            break;
        }
      }

      // Handle direct decision log items (without bullet points)
      if (currentSection === 'decisionLog' && obs.startsWith('- ') && !obs.endsWith(':')) {
        const content = obs.replace(/^-\s+/, '').trim();
        if (content) {
          sessionData.decisionLog.push(content);
        }
      }
    }

    // Format a friendly summary
    const formattedSummary = [
      '🔄 Continuing from previous session...\n',
      `📅 Last Session: ${latestSession.name}`,
      `🎯 Main Achievement: ${sessionData.overview}\n`,
      '🔍 Session Details:',
      sessionData.coreMetadata.sessionId
        ? `📋 Session ID: ${sessionData.coreMetadata.sessionId}`
        : '',
      sessionData.coreMetadata.duration ? `⏱️ Duration: ${sessionData.coreMetadata.duration}` : '',
      sessionData.coreMetadata.environment
        ? `🖥️ Environment: ${sessionData.coreMetadata.environment}`
        : '',
      '\n💻 Technical Changes:',
      ...sessionData.technicalContent.modifiedFiles.map((f) => `📄 ${f}`),
      ...sessionData.technicalContent.commandsRun.map((c) => `$ ${c}`),
      ...sessionData.technicalContent.buildResults.map((r) => `🔨 ${r}`),
      ...sessionData.technicalContent.errorLogs.map((e) => `❌ ${e}`),
      '\n🧠 Knowledge & Learning:',
      ...sessionData.knowledgeTracking.discussions.map((d) => `💬 ${d}`),
      ...sessionData.knowledgeTracking.problemsSolved.map((p) => `✅ ${p}`),
      ...sessionData.knowledgeTracking.solutionsImplemented.map((s) => `🔧 ${s}`),
      '\n📝 Knowledge & Decisions:',
      ...sessionData.decisionLog.map((d) => `- ${d}`),
      '\n📊 Progress:',
      ...sessionData.progressTracking.completed.map((p) => `✓ ${p}`),
      '\n🔜 Next Steps:',
      ...sessionData.progressTracking.nextActions.map((n) => `→ ${n}`),
      '\n📈 Quality & Metrics:',
      ...sessionData.qualityMetrics.codeReview.map((r) => `👁️ ${r}`),
      ...sessionData.qualityMetrics.testCoverage.map((t) => `🧪 ${t}`),
      '\n📚 Learning & Docs:',
      ...sessionData.learningAndDocs.newConcepts.map((c) => `💡 ${c}`),
      ...sessionData.learningAndDocs.docsUpdates.map((u) => `📖 ${u}`),
      '\n🗂️ Context:',
      sessionData.contextPreservation.branch
        ? `🌿 Branch: ${sessionData.contextPreservation.branch}`
        : '',
      sessionData.contextPreservation.packageVersion
        ? `📦 Version: ${sessionData.contextPreservation.packageVersion}`
        : '',
      ...sessionData.contextPreservation.gitStatus.map((g) => `📋 ${g}`),
      '\n❓ Open Questions:',
      ...sessionData.futurePlanning.openQuestions.map((q) => `? ${q}`),
      sessionData.futurePlanning.improvements.length > 0 ? '\n🚀 Future Improvements:' : '',
      ...sessionData.futurePlanning.improvements.map((i) => `💫 ${i}`),
    ]
      .filter(Boolean)
      .join('\n');

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              found: true,
              sessionName: latestSession.name,
              sessionDate: latestSession.createdAt,
              summary: sessionData,
              formattedSummary,
              format: 'v2',
              message: 'Would you like to continue from where we left off?',
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error retrieving last session: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
} 