import { z } from 'genkit';

export const AnalyzeGeotagForMarketingInputSchema = z.object({
  locationName: z.string().describe('The name of the locality to analyze for marketing opportunities.'),
});
export type AnalyzeGeotagForMarketingInput = z.infer<typeof AnalyzeGeotagForMarketingInputSchema>;


export const AnalyzeGeotagForMarketingOutputSchema = z.object({
  analysis: z.string().describe('A brief analysis of the location\'s demographic and psychographic profile relevant to school admissions.'),
  partnershipOpportunities: z.array(z.string()).describe('A list of potential partnership opportunities with local businesses or communities.'),
  marketingSuggestions: z.array(z.string()).describe('A list of tailored marketing campaign ideas for the specified location.'),
});
export type AnalyzeGeotagForMarketingOutput = z.infer<typeof AnalyzeGeotagForMarketingOutputSchema>;
