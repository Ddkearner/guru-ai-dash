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
  prompt: `You are an expert marketing strategist for a K-12 school. Your task is to analyze a specific locality, '{{{locationName}}}', to identify both opportunities for and potential challenges to increasing student admissions.

  **Context:** The school already has some students from this area and wants to strengthen its presence.

  **Your Task:**
  1.  **Balanced Analysis:**
      - Based on the name of the locality, infer the likely demographic and psychographic profile of parents. What are their likely priorities for their children's education (e.g., academic rigor, extracurriculars, affordability)?
      - What are the potential challenges or disadvantages of marketing in this area? (e.g., "Competition from established schools in the area may be high," or "Parents in this locality might be very price-sensitive.").

  2.  **Partnership Opportunities:**
      - Suggest 2-3 specific types of local businesses or community hubs in or near '{{{locationName}}}' that the school could partner with for marketing purposes.

  3.  **Tailored Marketing Campaigns:**
      - Propose 3 distinct, actionable marketing campaign ideas for '{{{locationName}}}'.
      - For each campaign, provide a brief description and the key message. The campaigns should aim to leverage opportunities and mitigate challenges.

  **Example Output Structure:**

  -   **Analysis:** "Kanpur is a large tier-2 city where parents value quality education. However, there are two other major schools in the vicinity, making it a competitive market. Our marketing needs to highlight our unique STEM program to stand out."
  -   **Partnership Opportunities:**
      - "Residential Complexes: Organize a 'Summer Fun Fair' at major apartment complexes like 'Prestige Towers'."
      - "Local Businesses: Partner with popular cafes or stores for cross-promotions."
  -   **Marketing Suggestions:**
      - "Hyperlocal Digital Ads: Run targeted Facebook ads within a 5km radius of {{{locationName}}}, showcasing school toppers from the area."
      - "Community Seminar: Host a free seminar on 'Preparing Your Child for Competitive Exams' at a local community hall to build trust."
      - "Referral Drive: Launch a special referral bonus for existing parents from {{{locationName}}}."

  Your response must be practical, insightful, and directly useful for the school's marketing team.
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
