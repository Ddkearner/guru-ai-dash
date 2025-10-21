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
  prompt: `You are an expert marketing strategist for a K-12 school. Your task is to analyze a specific locality, '{{{locationName}}}', to identify opportunities for increasing student admissions.

  **Context:** The school already has some students from this area and wants to strengthen its presence.

  **Your Task:**
  1.  **Demographic & Psychographic Analysis:**
      - Based on the name of the locality, infer the likely demographic profile (e.g., middle-income families, affluent professionals, etc.).
      - Describe the potential psychographics of parents in this area. What are their likely priorities for their children's education (e.g., academic rigor, extracurriculars, holistic development, affordability)?

  2.  **Partnership Opportunities:**
      - Suggest 2-3 specific types of local businesses or community hubs in or near '{{{locationName}}}' that the school could partner with for marketing purposes. (e.g., "Partner with 'Modern Apartments' for a family-friendly weekend event," "Set up a kiosk at 'Reliance Fresh' on weekends," "Collaborate with 'Bright Minds Tutoring Center' for a student workshop.").

  3.  **Tailored Marketing Campaigns:**
      - Propose 3 distinct, actionable, and creative marketing campaign ideas specifically for '{{{locationName}}}'.
      - For each campaign, provide a brief description of the activity and the key message.

  **Example Output Structure:**

  -   **Analysis:** "Kanpur is a large tier-2 city. Parents in this area are likely a mix of business owners and salaried professionals who are aspirational and value quality education that offers a competitive edge..."
  -   **Partnership Opportunities:**
      - "Residential Complexes: Organize a 'Summer Fun Fair' at major apartment complexes like 'Prestige Towers'."
      - "Local Businesses: Partner with popular cafes or stores for cross-promotions."
  -   **Marketing Suggestions:**
      - "Hyperlocal Digital Ads: Run targeted Facebook and Instagram ads within a 5km radius of {{{locationName}}}, showcasing school toppers from the area."
      - "Community Seminar: Host a free seminar on 'Preparing Your Child for Competitive Exams' at a local community hall."
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
