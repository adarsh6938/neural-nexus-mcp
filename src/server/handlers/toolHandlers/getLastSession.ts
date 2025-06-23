/**
 * Handles the get_last_session tool request
 * Retrieves the most recent chat session summary
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
    // Search for chat session summaries
    const searchResults = await knowledgeGraphManager.search('chat_session_summary', {
      entityTypes: ['chat_session_summary'],
      limit: 10,
    });

    if (!searchResults || !searchResults.entities || searchResults.entities.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                found: false,
                message: 'No previous chat sessions found.',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // Sort by creation date to get the most recent
    const sortedSessions = searchResults.entities.sort(
      (a: { createdAt: number }, b: { createdAt: number }) => b.createdAt - a.createdAt
    );

    const lastSession = sortedSessions[0];

    // Parse the observations to extract structured data
    const observations = lastSession.observations || [];
    const overview = observations.find((obs: string) => obs.startsWith('SESSION_OVERVIEW:'))?.replace('SESSION_OVERVIEW: ', '') || '';
    
    // Extract sections
    const sections: Record<string, string[]> = {
      workCompleted: [],
      keyDecisions: [],
      entitiesWorked: [],
      nextSteps: [],
      openQuestions: [],
    };

    let currentSection = '';
    for (const obs of observations) {
      if (obs === 'WORK_COMPLETED:') currentSection = 'workCompleted';
      else if (obs === 'KEY_DECISIONS:') currentSection = 'keyDecisions';
      else if (obs === 'ENTITIES_WORKED:') currentSection = 'entitiesWorked';
      else if (obs === 'NEXT_STEPS:') currentSection = 'nextSteps';
      else if (obs === 'OPEN_QUESTIONS:') currentSection = 'openQuestions';
      else if (obs.startsWith('- ') && currentSection) {
        sections[currentSection].push(obs.substring(2));
      }
    }

    // Format the response
    const formattedSummary = `🔄 Continuing from previous session...

📅 Last Session: ${lastSession.name}
🎯 Main Achievement: ${overview}

✅ Completed:
${sections.workCompleted.map((item: string) => `- ${item}`).join('\n')}

📝 Key Decisions:
${sections.keyDecisions.map((item: string) => `- ${item}`).join('\n')}

🔜 Next Steps:
${sections.nextSteps.map((item: string) => `- ${item}`).join('\n')}

❓ Open Questions:
${sections.openQuestions.map((item: string) => `- ${item}`).join('\n')}`;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              found: true,
              sessionName: lastSession.name,
              sessionDate: new Date(lastSession.createdAt).toISOString(),
              summary: {
                overview,
                workCompleted: sections.workCompleted,
                keyDecisions: sections.keyDecisions,
                entitiesWorked: sections.entitiesWorked,
                nextSteps: sections.nextSteps,
                openQuestions: sections.openQuestions,
              },
              formattedSummary,
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