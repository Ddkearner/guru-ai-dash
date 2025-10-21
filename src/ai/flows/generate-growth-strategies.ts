'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating growth strategies based on school metrics.
 *
 * It includes:
 * - generateGrowthStrategies - An asynchronous function to generate strategies.
 */

import { ai } from '@/ai/genkit';
import {
    GenerateGrowthStrategiesInputSchema,
    GenerateGrowthStrategiesOutputSchema,
    type GenerateGrowthStrategiesInput,
    type GenerateGrowthStrategiesOutput,
} from '@/ai/schemas/generate-growth-strategies-schema';


export async function generateGrowthStrategies(input: GenerateGrowthStrategiesInput): Promise<GenerateGrowthStrategiesOutput> {
  return generateGrowthStrategiesFlow(input);
}

const generateGrowthStrategiesPrompt = ai.definePrompt({
  name: 'generateGrowthStrategiesPrompt',
  input: { schema: GenerateGrowthStrategiesInputSchema },
  output: { schema: GenerateGrowthStrategiesOutputSchema },
  prompt: `You are an AI-powered growth strategy consultant for schools. Your task is to analyze historical growth data and provide actionable strategies to a school principal.

  **Data:**
  - Historical Growth Data: {{{json growthData}}}
  - Key Metric of Focus: {{activeMetric}}

  **Your Task:**

  1.  **Generate Summary Points:** First, create a short, bulleted summary of 2-3 key findings for the '{{activeMetric}}' trend. For example:
      - "Peak performance for admissions was in May, but has slowed since."
      - "While overall numbers are up, the enquiry-to-admission rate is a concern."

  2.  **Write Detailed Analysis:**
      - Examine the trend for the '{{activeMetric}}' over the months provided.
      - Identify the month with the highest and lowest performance for this metric.
      - Write a short, insightful **Analysis** of these trends. What does the data suggest? Is the growth accelerating or slowing down? Where are the weaknesses and strengths?

  3.  **Generate Actionable Strategies:**
      - Based on your analysis and the key metric of focus ('{{activeMetric}}'), provide a list of 3-4 concrete **Suggestions**.
      - These should be creative, practical, and easy-to-implement strategies. Some should address the weaknesses you found.
      - **Example for 'fees' focus:** "Introduce a 5% 'Early Bird' discount for parents who pay the entire year's fees upfront."
      - **Example for 'strength' focus:** "Launch a 'Refer-a-Friend' campaign with a fee discount for successful new admissions."

  Now, analyze the provided data and generate your expert response.
`,
});

const generateGrowthStrategiesFlow = ai.defineFlow(
  {
    name: 'generateGrowthStrategiesFlow',
    inputSchema: GenerateGrowthStrategiesInputSchema,
    outputSchema: GenerateGrowthStrategiesOutputSchema,
  },
  async (input) => {
    const { output } = await generateGrowthStrategiesPrompt(input);
    return output!;
  }
);
