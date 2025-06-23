/**
 * Handles the create_session_summary tool request
 * Creates a comprehensive summary of the current chat session
 * @param args The arguments for the tool request
 * @param knowledgeGraphManager The KnowledgeGraphManager instance
 * @returns A response object with the result content
 */

export async function handleCreateSessionSummary(
  args: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  knowledgeGraphManager: any
): Promise<{ content: Array<{ type: string; text: string }> }> {
  try {
    const sessionOverview = String(args.sessionOverview || 'No overview provided');
    const workCompleted = (args.workCompleted as string[]) || [];
    const keyDecisions = (args.keyDecisions as string[]) || [];
    const entitiesWorked = (args.entitiesWorked as string[]) || [];
    const nextSteps = (args.nextSteps as string[]) || [];
    const openQuestions = (args.openQuestions as string[]) || [];
    
    // Create timestamp for session name
    const now = new Date();
    const sessionName = `Chat Session ${now.toISOString().replace('T', ' ').split('.')[0]}`;
    
    // Create observations array
    const observations = [
      `SESSION_OVERVIEW: ${sessionOverview}`,
      '',
      'WORK_COMPLETED:',
      ...workCompleted.map((item) => `- ${item}`),
      '',
      'KEY_DECISIONS:',
      ...keyDecisions.map((item) => `- ${item}`),
      '',
      'ENTITIES_WORKED:',
      ...entitiesWorked.map((item) => `- ${item}`),
      '',
      'NEXT_STEPS:',
      ...nextSteps.map((item) => `- ${item}`),
      '',
      'OPEN_QUESTIONS:',
      ...openQuestions.map((item) => `- ${item}`),
      '',
      `SESSION_END: ${now.toISOString()}`,
    ];
    
    // Create the session summary entity
    await knowledgeGraphManager.createEntities([
      {
        name: sessionName,
        entityType: 'chat_session_summary',
        observations: observations,
      },
    ]);
    
    // Create relations to worked entities
    if (entitiesWorked.length > 0) {
      const relations = entitiesWorked.map((entityName) => ({
        from: sessionName,
        to: entityName,
        relationType: 'worked_on',
        strength: 1,
        confidence: 1,
        metadata: {
          sessionDate: now.toISOString(),
          context: 'session_work',
        },
      }));
      
      await knowledgeGraphManager.createRelations(relations);
    }
    
    // Check if this continues a previous session
    if (args.continuesFrom) {
      await knowledgeGraphManager.createRelations([
        {
          from: sessionName,
          to: String(args.continuesFrom),
          relationType: 'continued_from',
          strength: 1,
          confidence: 1,
          metadata: {
            continuationDate: now.toISOString(),
          },
        },
      ]);
    }
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              success: true,
              sessionName: sessionName,
              summary: {
                overview: sessionOverview,
                workCompleted: workCompleted.length,
                keyDecisions: keyDecisions.length,
                entitiesWorked: entitiesWorked.length,
                nextSteps: nextSteps.length,
                openQuestions: openQuestions.length,
              },
              message: '✅ Session summary saved! When you return, just say "new chat" and I\'ll pick up right where we left off.',
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
          text: `Error creating session summary: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
} 