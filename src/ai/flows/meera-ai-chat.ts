'use server';

/**
 * @fileoverview Defines a Genkit flow for the Meera AI assistant's chat functionality.
 */

import { ai } from '@/ai/genkit';
import {
  MeeraAiChatInputSchema,
  MeeraAiChatOutputSchema,
  type MeeraAiChatInput,
  type MeeraAiChatOutput,
} from '@/ai/schemas/meera-ai-chat-schema';
import * as schoolData from '@/lib/school-data';

export async function meeraAiChat(
  input: MeeraAiChatInput
): Promise<MeeraAiChatOutput> {
  return meeraAiChatFlow(input);
}

const meeraAiChatPrompt = ai.definePrompt({
  name: 'meeraAiChatPrompt',
  input: { schema: MeeraAiChatInputSchema },
  output: { schema: MeeraAiChatOutputSchema },
  prompt: `You are Meera, the AI assistant for the Veritas AI school dashboard. Your purpose is to provide quick, accurate, and helpful information based on the school's data.

  Your response should be conversational, friendly, and concise.

  Here is the available data. Use it to answer the user's query.
  - Growth Data: {{{json growthData}}}
  - Admission Funnel: {{{json admissionFunnelData}}}
  - Exam Heatmap: {{{json examHeatmapData}}}
  - Teacher Performance: {{{json teacherData}}}
  - Student Geotag Data: {{{json geotagData}}}
  - To-Do Tasks: {{{json todoTasks}}}

  User's query: "{{query}}"

  Based on the user's query, decide on the best way to respond.
  - If the user is asking for their to-do list, or "what to do today", respond with the 'todo-list' component and include the list of tasks.
  - For all other queries, respond with a 'text' component containing a helpful, conversational answer.
  `,
});

const meeraAiChatFlow = ai.defineFlow(
  {
    name: 'meeraAiChatFlow',
    inputSchema: MeeraAiChatInputSchema,
    outputSchema: MeeraAiChatOutputSchema,
  },
  async (input) => {
    const { output } = await meeraAiChatPrompt({
        ...input,
        growthData: schoolData.growthData,
        admissionFunnelData: schoolData.admissionFunnelData,
        examHeatmapData: schoolData.examHeatmapData,
        teacherData: schoolData.teachers,
        geotagData: schoolData.geotagData,
        todoTasks: schoolData.todoTasks,
    });
    return output!;
  }
);
