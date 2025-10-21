import { z } from 'genkit';

const FunnelStageSchema = z.object({
  stage: z.string().describe('The name of the funnel stage (e.g., "Enquiries", "Forms Filled", "Joined").'),
  value: z.number().describe('The number of students in this stage.'),
});

export const AnalyzeAdmissionFunnelInputSchema = z.object({
  thisMonth: z.array(FunnelStageSchema).describe('The admission funnel data for the current month.'),
  lastMonth: z.array(FunnelStageSchema).describe('The admission funnel data for the previous month.'),
});
export type AnalyzeAdmissionFunnelInput = z.infer<typeof AnalyzeAdmissionFunnelInputSchema>;

export const AnalyzeAdmissionFunnelOutputSchema = z.object({
  analysis: z.string().describe('A detailed analysis of the admission funnel, comparing this month to last month and identifying key bottlenecks and successes.'),
  suggestions: z.array(z.string()).describe('A list of actionable marketing strategies and suggestions to improve conversion rates.'),
});
export type AnalyzeAdmissionFunelOutput = z.infer<typeof AnalyzeAdmissionFunnelOutputSchema>;
