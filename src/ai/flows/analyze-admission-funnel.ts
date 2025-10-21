'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing admission funnel data and suggesting marketing strategies.
 *
 * It includes:
 * - analyzeAdmissionFunnel - An asynchronous function to analyze the funnel and suggest actions.
 */

import { ai } from '@/ai/genkit';
import {
  AnalyzeAdmissionFunnelInputSchema,
  AnalyzeAdmissionFunnelOutputSchema,
  type AnalyzeAdmissionFunnelInput,
  type AnalyzeAdmissionFunelOutput
} from '@/ai/schemas/analyze-admission-funnel-schema';


export async function analyzeAdmissionFunnel(input: AnalyzeAdmissionFunnelInput): Promise<AnalyzeAdmissionFunelOutput> {
  return analyzeAdmissionFunnelFlow(input);
}

const analyzeAdmissionFunnelPrompt = ai.definePrompt({
  name: 'analyzeAdmissionFunnelPrompt',
  input: { schema: AnalyzeAdmissionFunnelInputSchema },
  output: { schema: AnalyzeAdmissionFunnelOutputSchema },
  prompt: `You are an expert school marketing and admissions strategist. Analyze the provided admission funnel data for a school and provide a detailed analysis and actionable suggestions.

  **Data:**
  - This Month: {{{json thisMonth}}}
  - Last Month: {{{json lastMonth}}}

  **Analysis Task:**
  1.  **Calculate Conversion Rates:** For each period (This Month, Last Month), calculate the conversion rate between each stage (e.g., Enquiries to Campus Visits, Campus Visits to Forms Filled, etc.) and the overall conversion rate (Enquiries to Enrolled).
  2.  **Compare Periods:** Compare the performance of "This Month" against "Last Month". Highlight significant improvements or drops in numbers and conversion rates at each stage.
  3.  **Identify Bottlenecks:** Pinpoint the stage with the biggest drop-off (the primary bottleneck) for the current month.
  4.  **Summarize Findings:** Write a concise but detailed analysis covering the points above. Start with a summary of the overall performance, then dive into stage-by-stage details.

  **Suggestions Task:**
  Based on your analysis, provide a list of 3-4 concrete, actionable, and creative marketing strategies to improve the funnel performance. Tailor your suggestions to address the specific bottlenecks you identified.

  For example, if the bottleneck is between "Enquiries" and "Campus Visits", suggest:
  - "Create a compelling virtual tour video and send it to all new enquiries."
  - "Implement an automated SMS/WhatsApp follow-up for new enquiries with a direct link to book a campus tour."

  If the bottleneck is between "Forms Filled" and "Enrolled", suggest:
  - "Host a virtual 'Meet the Principal' session for parents who have submitted forms."
  - "Create a personalized follow-up call script for your admissions team to address parent concerns."

  Your response should be structured, insightful, and directly helpful for a school principal looking to boost admissions.
`,
});


const analyzeAdmissionFunnelFlow = ai.defineFlow(
  {
    name: 'analyzeAdmissionFunnelFlow',
    inputSchema: AnalyzeAdmissionFunnelInputSchema,
    outputSchema: AnalyzeAdmissionFunnelOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeAdmissionFunnelPrompt(input);
    return output!;
  }
);
