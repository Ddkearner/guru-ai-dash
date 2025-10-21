'use server';

/**
 * @fileOverview Generates a daily summary of school activities using AI.
 *
 * - generateDailySchoolSummary - A function that generates the daily summary.
 * - GenerateDailySchoolSummaryInput - The input type for the generateDailySchoolSummary function.
 * - GenerateDailySchoolSummaryOutput - The return type for the generateDailySchoolSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailySchoolSummaryInputSchema = z.object({
  attendanceRate: z.number().describe('The percentage of students present today.'),
  feesCollected: z.number().describe('The total amount of fees collected today.'),
  admissionEnquiries: z.number().describe('The number of admission enquiries received today.'),
  classPerformance: z.record(z.string(), z.string()).describe('A record of class performances in tests.'),
  lowAttendanceClasses: z.array(z.string()).describe('An array of class names with low attendance.'),
});
export type GenerateDailySchoolSummaryInput = z.infer<typeof GenerateDailySchoolSummaryInputSchema>;

const GenerateDailySchoolSummaryOutputSchema = z.object({
  summary: z.string().describe('A natural language summary of the day\'s school activities.'),
});
export type GenerateDailySchoolSummaryOutput = z.infer<typeof GenerateDailySchoolSummaryOutputSchema>;

export async function generateDailySchoolSummary(input: GenerateDailySchoolSummaryInput): Promise<GenerateDailySchoolSummaryOutput> {
  return generateDailySchoolSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailySchoolSummaryPrompt',
  input: {schema: GenerateDailySchoolSummaryInputSchema},
  output: {schema: GenerateDailySchoolSummaryOutputSchema},
  prompt: `You are the principal's AI assistant, providing a daily summary of key school activities.

  Today's data:
  - Attendance rate: {{attendanceRate}}%
  - Fees collected: ₹{{feesCollected}}
  - Admission enquiries: {{admissionEnquiries}}
  - Class performances: {{#each classPerformance}}{{@key}}: {{this}} {{/each}}
  - Classes with low attendance: {{#each lowAttendanceClasses}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

  Write a concise and engaging summary of these activities, suitable for a school principal.
  Use emojis to make it more lively. Vary the phrasing to make each summary feel fresh.
`,
});

const generateDailySchoolSummaryFlow = ai.defineFlow(
  {
    name: 'generateDailySchoolSummaryFlow',
    inputSchema: GenerateDailySchoolSummaryInputSchema,
    outputSchema: GenerateDailySchoolSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
