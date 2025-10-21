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

  **Your Task:**
  1.  **Generate Summary Points:** First, create a concise, bulleted summary of the most critical insights. This should be 2-3 key points. For example:
      - "Key success: Conversion from Campus Visits to Forms Filled improved by 5%."
      - "Major bottleneck: Significant 15% drop-off from Forms Filled to Offers Extended."

  2.  **Write Detailed Analysis:** After the summary, write a comprehensive analysis.
      - Calculate conversion rates for each stage and compare "This Month" vs. "Last Month".
      - Highlight significant improvements (successes) and drops (bottlenecks).
      - Pinpoint the single biggest bottleneck and the most successful stage for the current month.
      - Start with an overall performance summary, then dive into stage-by-stage details.

  3.  **Provide Actionable Suggestions:** Based on your analysis, provide 3-4 concrete, actionable marketing strategies.
      - Tailor suggestions to address the specific bottlenecks you identified.
      - Suggest how to capitalize on successful stages.
      - For example, if the bottleneck is "Enquiries" to "Campus Visits," suggest a compelling virtual tour or automated SMS follow-ups.

  Your response must be structured, insightful, and directly helpful for a school principal.
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
