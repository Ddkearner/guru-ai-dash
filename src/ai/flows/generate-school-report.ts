'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a comprehensive school report.
 *
 * It includes:
 * - generateSchoolReport - An asynchronous function to analyze all school data and generate a holistic report.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateSchoolReportInputSchema,
  GenerateSchoolReportOutputSchema,
  type GenerateSchoolReportInput,
  type GenerateSchoolReportOutput,
} from '@/ai/schemas/generate-school-report-schema';

export async function generateSchoolReport(
  input: GenerateSchoolReportInput
): Promise<GenerateSchoolReportOutput> {
  return generateSchoolReportFlow(input);
}

const generateSchoolReportPrompt = ai.definePrompt({
  name: 'generateSchoolReportPrompt',
  input: { schema: GenerateSchoolReportInputSchema },
  output: { schema: GenerateSchoolReportOutputSchema },
  prompt: `You are a world-class educational consultant AI. Your task is to generate a comprehensive, insightful, and actionable report for a school principal. The report must be balanced, highlighting both strengths and weaknesses.

  **Report Scope:** {{scope}} (If not 'school', filter your analysis to the relevant class).

  **Provided Data:**
  - Growth Metrics (Admissions, Fees, Strength, Enquiries): {{{json growthData}}}
  - Admission Funnel (This Month vs. Last Month): {{{json admissionFunnelData}}}
  - Exam Performance Heatmap: {{{json examHeatmapData}}}
  - Teacher Performance Metrics: {{{json teacherData}}}
  - Student Geotag Data (Location distribution): {{{json geotagData}}}

  **Your Task:**

  1.  **Generate a Balanced Executive Summary (summary):**
      - Write a concise, high-level summary of the school's (or class's) overall health.
      - The summary MUST cover both key achievements and critical challenges.
      - Start with a clear, impactful statement. For example, "Overall, the school shows strong financial growth and teacher morale, but significant bottlenecks in the admission funnel and concerning trends in Class 9 academic performance require immediate attention."

  2.  **Identify Critical Problems & Key Strengths (problems and strengths):**
      - Analyze all the data to identify the 2-3 most critical problems and 2-3 key strengths.
      - These should be presented as bullet points.
      - Connect the dots between different data points.
      -   **Example Problem:** "The 12% drop in conversion from 'Campus Visits' to 'Forms Filled' correlates with a high number of parent complaints about Mr. Singh, suggesting his poor communication during tours may be a factor."
      -   **Example Strength:** "Fee collection is consistently strong, growing by 15% over the last quarter, indicating high parent satisfaction and efficient administrative processes."

  3.  **Propose Actionable Solutions (solutions):**
      - For each identified problem, provide a clear, creative, and "ground-ready" solution.
      - Each solution should have a \`title\` and a detailed \`description\`.
      - The solutions should be highly practical and directly address the problems.
      -   **Example Solution for Admissions Bottleneck:**
          -   \`title\`: "Implement a 'Star Teacher' Campus Tour Program."
          -   \`description\`: "Replace underperforming teachers on campus tours with high-morale, high-performing teachers like Mr. Sharma. Create a script for them that highlights the school's strengths and train them in communication. Track conversion rates for tours led by star teachers to measure impact."

  Your final report must be structured, insightful, and empower the principal with a clear path forward.
  `,
});

const generateSchoolReportFlow = ai.defineFlow(
  {
    name: 'generateSchoolReportFlow',
    inputSchema: GenerateSchoolReportInputSchema,
    outputSchema: GenerateSchoolReportOutputSchema,
  },
  async (input) => {
    // If the scope is a specific class, we could filter the data here before sending to the prompt.
    // For now, we'll let the LLM handle the context filtering based on the 'scope' input.
    const { output } = await generateSchoolReportPrompt(input);
    return output!;
  }
);
