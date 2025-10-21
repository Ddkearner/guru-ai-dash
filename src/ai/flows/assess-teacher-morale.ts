'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing teacher morale using various metrics and suggesting next actions.
 *
 * It includes:
 * - assessTeacherMorale - An asynchronous function to assess teacher morale and suggest actions.
 * - AssessTeacherMoraleInput - The input type for the assessTeacherMorale function.
 * - AssessTeacherMoraleOutput - The output type for the assessTeacherMorale function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessTeacherMoraleInputSchema = z.object({
  teacherName: z.string().describe('The name of the teacher to assess.'),
  attendanceRate: z
    .number()
    .min(0)
    .max(1)
    .describe('The teacher attendance rate (0 to 1).'),
  onTimeClassesRate: z
    .number()
    .min(0)
    .max(1)
    .describe('The rate of classes the teacher started on time (0 to 1).'),
  examPerformance: z
    .number()
    .min(0)
    .max(1)
    .describe('The teacher average exam performance (0 to 1).'),
  complaintsReceived: z
    .number()
    .min(0)
    .describe('Number of complaints received about the teacher.'),
});
export type AssessTeacherMoraleInput = z.infer<typeof AssessTeacherMoraleInputSchema>;

const AssessTeacherMoraleOutputSchema = z.object({
  moraleLevel: z
    .string()
    .describe(
      'The morale level of the teacher (High, Medium, Low) determined by the AI.'
    ),
  suggestedAction: z.string().describe('The AI suggested next action for the teacher.'),
});
export type AssessTeacherMoraleOutput = z.infer<typeof AssessTeacherMoraleOutputSchema>;

export async function assessTeacherMorale(
  input: AssessTeacherMoraleInput
): Promise<AssessTeacherMoraleOutput> {
  return assessTeacherMoraleFlow(input);
}

const assessTeacherMoralePrompt = ai.definePrompt({
  name: 'assessTeacherMoralePrompt',
  input: {schema: AssessTeacherMoraleInputSchema},
  output: {schema: AssessTeacherMoraleOutputSchema},
  prompt: `You are an AI assistant helping school principals assess teacher morale and suggest actions.

  Based on the following information about the teacher, determine their morale level (High, Medium, or Low) and suggest the most appropriate next action.

  Teacher Name: {{{teacherName}}}
  Attendance Rate: {{attendanceRate}}
  On-Time Classes Rate: {{onTimeClassesRate}}
  Exam Performance: {{examPerformance}}
  Complaints Received: {{complaintsReceived}}

  Consider the following when determining morale level:
  - High: Excellent attendance, consistently on-time, good exam performance, few complaints.
  - Medium: Acceptable attendance, mostly on-time, average exam performance, some complaints.
  - Low: Poor attendance, frequently late, below average exam performance, many complaints.

  Provide a concise suggested action based on the determined morale level. For example:
  - High: "Recognize and reward the teacher's contributions."
  - Medium: "Offer additional support and mentoring."
  - Low: "Investigate the issues and provide resources for improvement."
`,
});

const assessTeacherMoraleFlow = ai.defineFlow(
  {
    name: 'assessTeacherMoraleFlow',
    inputSchema: AssessTeacherMoraleInputSchema,
    outputSchema: AssessTeacherMoraleOutputSchema,
  },
  async input => {
    const {output} = await assessTeacherMoralePrompt(input);
    return output!;
  }
);
