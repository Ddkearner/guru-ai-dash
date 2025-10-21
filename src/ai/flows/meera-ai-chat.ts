'use server';

/**
 * @fileoverview Defines a Genkit flow for the Guru AI assistant's chat functionality.
 */

import { ai } from '@/ai/genkit';
import {
  MeeraAiChatInputSchema,
  MeeraAiChatOutputSchema,
  type MeeraAiChatInput,
  type MeeraAiChatOutput,
  TaskSchema,
} from '@/ai/schemas/meera-ai-chat-schema';
import * as schoolData from '@/lib/school-data';
import { MessageSquareWarning } from 'lucide-react';
import { z } from 'zod';

export async function meeraAiChat(
  input: MeeraAiChatInput
): Promise<MeeraAiChatOutput> {
  return meeraAiChatFlow(input);
}

const addTaskTool = ai.defineTool(
  {
    name: 'addTask',
    description: 'Use this tool to add a new task to the to-do list. The user must provide the title of the task.',
    inputSchema: z.object({
      title: z.string().describe('The title of the task to add.'),
    }),
    outputSchema: TaskSchema,
  },
  async (input) => {
    // In a real app, this would add the task to a database.
    // For now, we'll create a new task and return it to be added to the state.
    console.log('Adding task:', input.title);
    const newTask = {
      id: `task${Date.now()}`,
      title: input.title,
      description: 'Newly added by Guru AI.',
      href: '#',
      // We need a default icon.
      icon: MessageSquareWarning,
    };
    return newTask;
  }
);


const meeraAiChatPrompt = ai.definePrompt({
  name: 'meeraAiChatPrompt',
  input: { schema: MeeraAiChatInputSchema },
  output: { schema: MeeraAiChatOutputSchema },
  tools: [addTaskTool],
  prompt: `You are Guru, the AI assistant for the Gurukul AI school dashboard. Your purpose is to provide quick, accurate, and helpful information based on the school's data, and to perform actions on behalf of the user.

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
  - If the user is asking to add a new task, use the 'addTask' tool. When the tool returns the new task object, respond with the 'confirm-add-task' component, passing the task object in the props.
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
