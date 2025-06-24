/**
 * Handles the create_session_summary tool request
 * Creates a comprehensive summary of the current chat session using the v2 format
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
    // Extract all arguments with defaults
    const sessionOverview = String(args.sessionOverview || 'No overview provided');
    const workCompleted = (args.workCompleted as string[]) || [];
    const keyDecisions = (args.keyDecisions as string[]) || [];
    const entitiesWorked = (args.entitiesWorked as string[]) || [];
    const nextSteps = (args.nextSteps as string[]) || [];
    const openQuestions = (args.openQuestions as string[]) || [];
    
    // Get environment information
    const os = process.platform;
    const nodeVersion = process.version;
    const now = new Date();
    const sessionName = `Chat Session ${now.toISOString().split('.')[0].replace('T', ' ')}`;
    
    // Create observations array with enhanced format
    const observations = [
      `SESSION_OVERVIEW: ${sessionOverview}`,
      
      '1. CORE METADATA:',
      '- Session ID:',
      `  * ${sessionName}`,
      '- Start Time:',
      `  * ${args.startTime || now.toISOString()}`,
      '- End Time:',
      `  * ${now.toISOString()}`,
      '- Duration:',
      `  * ${args.duration || 'N/A'}`,
      '- Session Type:',
      `  * ${args.sessionType || 'Development'}`,
      '- Environment:',
      `  * ${os}, Node.js ${nodeVersion}`,
      
      '2. TECHNICAL CONTENT:',
      '- Modified Files:',
      ...(args.modifiedFiles ? (args.modifiedFiles as string[]).map((file) => `  * ${file}`) : []),
      '- Commands Run:',
      ...(args.commandsRun ? (args.commandsRun as string[]).map((cmd) => `  * ${cmd}`) : []),
      '- Build Results:',
      ...(args.buildResults 
        ? (args.buildResults as string[]).map((result) => `  * ${result}`)
        : []),
      '- Error Logs:',
      ...(args.errorLogs ? (args.errorLogs as string[]).map((log) => `  * ${log}`) : []),
      
      '3. KNOWLEDGE TRACKING:',
      '- Technical Discussions:',
      ...workCompleted
        .filter((item) => item.includes('discussed') || item.includes('learned'))
        .map((item) => `  * ${item}`),
      '- Problems Solved:',
      ...workCompleted
        .filter((item) => item.includes('fixed') || item.includes('solved'))
        .map((item) => `  * ${item}`),
      '- Solutions Implemented:',
      ...workCompleted
        .filter((item) => item.includes('implemented') || item.includes('created'))
        .map((item) => `  * ${item}`),
      
      '4. DECISION LOG:',
      ...keyDecisions.map((decision) => `- ${decision}`),
      
      '5. CONTEXT PRESERVATION:',
      '- Branch:',
      ...(args.gitBranch ? [`  * ${args.gitBranch}`] : []),
      '- Git Status:',
      ...(args.gitStatus ? (args.gitStatus as string[]).map((status) => `  * ${status}`) : []),
      '- Package Version:',
      ...(args.packageVersion ? [`  * ${args.packageVersion}`] : []),
      
      '6. RELATIONSHIP TRACKING:',
      '- Previous Session:',
      ...(args.continuesFrom ? [`  * ${args.continuesFrom}`] : []),
      '- Entities Modified:',
      ...entitiesWorked.map((entity) => `  * ${entity}`),
      '- Tools Used:',
      ...(args.toolsUsed ? (args.toolsUsed as string[]).map((tool) => `  * ${tool}`) : []),
      
      '7. PROGRESS TRACKING:',
      '- Completed:',
      ...workCompleted.map((item) => `  * ${item}`),
      '- Next Actions:',
      ...nextSteps.map((step) => `  * ${step}`),
      
      '8. QUALITY METRICS:',
      '- Code Review Notes:',
      ...(args.codeReview ? (args.codeReview as string[]).map((note) => `  * ${note}`) : []),
      '- Test Coverage:',
      ...(args.testCoverage ? (args.testCoverage as string[]).map((coverage) => `  * ${coverage}`) : []),
      
      '9. LEARNING & DOCUMENTATION:',
      '- New Concepts:',
      ...(args.newConcepts ? (args.newConcepts as string[]).map((concept) => `  * ${concept}`) : []),
      '- Documentation Updates:',
      ...(args.docsUpdates ? (args.docsUpdates as string[]).map((update) => `  * ${update}`) : []),
      
      '10. FUTURE PLANNING:',
      '- Immediate Next Steps:',
      ...nextSteps.map((step) => `  * ${step}`),
      '- Open Questions:',
      ...openQuestions.map((question) => `  * ${question}`),
      '- Future Improvements:',
      ...(args.futureImprovements 
        ? (args.futureImprovements as string[]).map((improvement) => `  * ${improvement}`)
        : []),
      
      `SESSION_END: ${now.toISOString()}`
    ].filter((line) => line !== undefined && line !== null);
    
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
          sessionType: args.sessionType || 'Development',
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
            sessionType: args.sessionType || 'Development',
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
                format: 'v2',
                sections: 10,
              },
              message: '✅ Session summary saved with enhanced v2 format! When you return, just say "new chat" and I\'ll pick up right where we left off.',
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