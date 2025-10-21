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
  prompt: `You are a world-class educational consultant AI. Your task is to generate a comprehensive, insightful, and actionable report for a school principal. The report should be based on a holistic analysis of all the data provided.

  **Report Scope:** {{scope}} (If not 'school', filter your analysis to the relevant class).

  **Provided Data:**
  - Growth Metrics (Admissions, Fees, Strength, Enquiries): {{{json growthData}}}
  - Admission Funnel (This Month vs. Last Month): {{{json admissionFunnelData}}}
  - Exam Performance Heatmap: {{{json examHeatmapData}}}
  - Teacher Performance Metrics: {{{json teacherData}}}
  - Student Geotag Data (Location distribution): {{{json geotagData}}}

  **Your Task:**

  1.  **Generate an Executive Summary:**
      - Write a concise, high-level summary of the school's (or class's) overall health.
      - Touch upon the key areas: growth, admissions, academic performance, and staff morale.
      - Start with a clear, impactful statement. For example, "Overall, the school is on a positive growth trajectory, but significant bottlenecks in the admission funnel and concerning trends in Class 9 academic performance require immediate attention."

  2.  **Identify Critical Problems:**
      - Analyze all the data to identify the 3-4 most critical, interconnected problems.
      - Don't just state facts; connect the dots.
      -   **Example Problem:** "The 12% drop in conversion from 'Campus Visits' to 'Forms Filled' correlates with a high number of parent complaints about Mr. Singh, suggesting his poor communication during tours may be deterring prospective parents."
      -   **Example Problem:** "Despite high enquiry numbers from the 'Rampur' area (80 students), admissions from this locality are disproportionately low. This, combined with low exam performance in Class 9, suggests our academic reputation in that specific area might be weak."

  3.  **Propose Actionable Solutions:**
      - For each identified problem, provide a clear, creative, and "ground-ready" solution.
      - Each solution should have a \`title\` and a detailed \`description\`.
      - The solutions should be highly practical and directly address the problems.
      -   **Example Solution for Admissions Bottleneck:**
          -   \`title\`: "Implement a 'Star Teacher' Campus Tour Program."
          -   \`description\`: "Replace underperforming teachers on campus tours with high-morale, high-performing teachers like Mr. Sharma. Create a script for them that highlights the school's strengths and train them in communication. Track conversion rates for tours led by star teachers to measure impact."
      -   **Example Solution for Geographic Weakness:**
          -   \`title\`: "Launch 'Hyperlocal Marketing & Academic Showcase' in Rampur."
          -   \`description\`: "Run targeted digital ads in Rampur showcasing testimonials from successful students from that area. Simultaneously, organize a free 'Math Olympiad Workshop' led by Mr. Sharma at a community center in Rampur to demonstrate academic excellence and build trust with local parents."

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
