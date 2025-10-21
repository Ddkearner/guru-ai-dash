'use server';

/**
 * @fileOverview Defines a Genkit flow for analyzing a geographic location for school marketing purposes.
 *
 * This file includes:
 * - analyzeGeotagForMarketing: An async function to get marketing analysis for a location.
 */

import { ai } from '@/ai/genkit';
import {
  AnalyzeGeotagForMarketingInputSchema,
  AnalyzeGeotagForMarketingOutputSchema,
  type AnalyzeGeotagForMarketingInput,
  type AnalyzeGeotagForMarketingOutput,
} from '@/ai/schemas/analyze-geotag-for-marketing-schema';

export async function analyzeGeotagForMarketing(
  input: AnalyzeGeotagForMarketingInput
): Promise<AnalyzeGeotagForMarketingOutput> {
  return analyzeGeotagForMarketingFlow(input);
}

const analyzeGeotagPrompt = ai.definePrompt({
  name: 'analyzeGeotagPrompt',
  input: { schema: AnalyzeGeotagForMarketingInputSchema },
  output: { schema: AnalyzeGeotagForMarketingOutputSchema },
  prompt: `You are an expert marketing strategist for a K-12 school. Your task is to analyze a specific locality, '{{{locationName}}}', to identify opportunities and challenges for increasing student admissions.

  **Context:** The school wants to strengthen its presence in this area.

  **Your Task:**
  1.  **Generate Summary Points:** First, create a concise, bulleted summary of 2-3 key strategic insights. For example:
      - "Opportunity: High concentration of families with young children in new residential complexes."
      - "Challenge: Strong competition from two established schools in the vicinity."
      - "Strategy: Focus on highlighting our unique STEM program to differentiate."

  2.  **Provide Detailed Analysis:**
      - Based on the locality name, infer the likely demographic and psychographic profile of parents. What are their priorities (e.g., academic rigor, extracurriculars, affordability)?
      - What are the potential challenges or disadvantages of marketing here? (e.g., "Competition is high," or "Parents might be price-sensitive.").

  3.  **Suggest Partnership Opportunities:**
      - Suggest 2-3 specific types of local businesses or community hubs in or near '{{{locationName}}}' for partnership.

  4.  **Propose Tailored Marketing Campaigns:**
      - Propose 3 distinct, actionable marketing campaign ideas for '{{{locationName}}}'.
      - For each campaign, provide a brief description and the key message.

  Your response must be practical, insightful, and structured.
  `,
});

const analyzeGeotagForMarketingFlow = ai.defineFlow(
  {
    name: 'analyzeGeotagForMarketingFlow',
    inputSchema: AnalyzeGeotagForMarketingInputSchema,
    outputSchema: AnalyzeGeotagForMarketingOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeGeotagPrompt(input);
    return output!;
  }
);
