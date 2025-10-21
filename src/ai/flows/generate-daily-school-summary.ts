'use server';

/**
 * @fileOverview Generates a daily summary of school activities using AI.
 *
 * - generateDailySchoolSummary - A function that generates the daily summary.
 */

import {ai} from '@/ai/genkit';
import {
    GenerateDailySchoolSummaryInputSchema,
    GenerateDailySchoolSummaryOutputSchema,
    type GenerateDailySchoolSummaryInput,
    type GenerateDailySchoolSummaryOutput,
} from '@/ai/schemas/generate-daily-school-summary-schema';


export async function generateDailySchoolSummary(input: GenerateDailySchoolSummaryInput): Promise<GenerateDailySchoolSummaryOutput> {
  return generateDailySchoolSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailySchoolSummaryPrompt',
  input: {schema: GenerateDailySchoolSummaryInputSchema},
  output: {schema: GenerateDailySchoolSummaryOutputSchema},
  prompt: `You are the principal's AI assistant, providing a daily summary of key school activities. Your summary must be balanced, highlighting both the positive achievements and the challenges of the day.

  Today's data:
  - Attendance rate: {{attendanceRate}}%
  - Fees collected: ₹{{feesCollected}}
  - Admission enquiries: {{admissionEnquiries}}
  - Class performances: {{#each classPerformance}}{{@key}}: {{this}} {{/each}}
  - Classes with low attendance: {{#each lowAttendanceClasses}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

  Write a concise and engaging summary of these activities, suitable for a school principal.
  - Start with the positive news (e.g., fee collection, enquiries).
  - Then, mention the challenges or areas that need attention (e.g., low attendance).
  - Use emojis to make it more lively.
  - Vary the phrasing to make each summary feel fresh.
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
