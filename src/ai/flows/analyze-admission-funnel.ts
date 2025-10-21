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
  1.  **Calculate Conversion Rates:** For each period (This Month, Last Month), calculate the conversion rate between each stage and the overall conversion rate.
  2.  **Compare Periods:** Compare the performance of "This Month" against "Last Month". Highlight both significant improvements (successes) and drops (bottlenecks) in numbers and conversion rates at each stage.
  3.  **Identify Key Bottleneck and Success:** Pinpoint the stage with the biggest drop-off (the primary bottleneck) and the stage with the highest conversion (a key success) for the current month.
  4.  **Summarize Findings:** Write a concise but detailed analysis covering the points above. Start with a summary of the overall performance, then dive into stage-by-stage details, clearly mentioning both positives and negatives.

  **Suggestions Task:**
  Based on your analysis, provide a list of 3-4 concrete, actionable, and creative marketing strategies. Tailor your suggestions to address the specific bottlenecks you identified, while also suggesting how to capitalize on the successful stages.

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
