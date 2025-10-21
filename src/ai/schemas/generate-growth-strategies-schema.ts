import { z } from 'genkit';

export const GrowthMetricSchema = z.object({
  month: z.string(),
  admissions: z.number(),
  fees: z.number(),
  strength: z.number(),
  enquiries: z.number(),
});

export const GenerateGrowthStrategiesInputSchema = z.object({
  growthData: z.array(GrowthMetricSchema).describe('Historical data of school growth metrics over several months.'),
  activeMetric: z.enum(['strength', 'fees', 'enquiries', 'admissions']).describe('The primary metric the user is currently focused on.'),
});
export type GenerateGrowthStrategiesInput = z.infer<typeof GenerateGrowthStrategiesInputSchema>;

export const GenerateGrowthStrategiesOutputSchema = z.object({
  analysis: z.string().describe('A detailed analysis of the growth trends based on the provided data, focusing on the active metric.'),
  suggestions: z.array(z.string()).describe('A list of actionable strategies, suggestions, and tricks to improve the chosen growth metric.'),
});
export type GenerateGrowthStrategiesOutput = z.infer<typeof GenerateGrowthStrategiesOutputSchema>;
