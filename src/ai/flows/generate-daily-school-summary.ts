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
  prompt: `You are the principal's AI assistant. Your task is to provide a daily summary of key school activities.

  **Instructions:**
  - Write a concise and engaging summary in a single, natural-language paragraph.
  - Your tone should be balanced, highlighting both positive achievements and the challenges of the day.
  - Weave in emojis to make the summary lively.
  - **Do not use bullet points or unnecessary line breaks.**
  - Vary the phrasing each day to keep the summary fresh and interesting.

  **Today's data:**
  - Attendance rate: {{attendanceRate}}%
  - Fees collected: ₹{{feesCollected}}
  - Admission enquiries: {{admissionEnquiries}}
  - Class performances: {{#each classPerformance}}{{@key}}: {{this}} {{/each}}
  - Classes with low attendance: {{#each lowAttendanceClasses}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

  Now, generate the summary based on these instructions.
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
