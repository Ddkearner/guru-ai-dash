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

  1.  **Analyze the Trend:**
      - Examine the trend for the '{{activeMetric}}' over the months provided.
      - Identify the month with the highest and lowest performance for this metric.
      - Calculate the percentage growth or decline from the first month to the last month in the data.
      - Write a short, insightful **Analysis** of these trends. What does the data suggest? Is there a seasonal pattern? Is the growth accelerating or slowing down?

  2.  **Generate Actionable Strategies:**
      - Based on your analysis and the key metric of focus ('{{activeMetric}}'), provide a list of 3-4 concrete **Suggestions**.
      - These should be creative, practical, and easy-to-implement strategies, suggestions, or "tricks" for a school setting.

  **Example Suggestions based on Metric:**

  -   **If 'strength' (Student Strength) is the focus and is stalling:**
      -   "Launch a 'Refer-a-Friend' campaign where existing parents get a small fee discount for successful new admissions. This leverages your happiest customers."
      -   "Host a 'Experience Our School' open day for prospective parents, showcasing unique programs like your robotics club or arts department."

  -   **If 'fees' (Fee Collection) is the focus and is lagging:**
      -   "Introduce a 5% 'Early Bird' discount for parents who pay the entire year's fees upfront before the session begins."
      -   "Implement a digital payment gateway with automated SMS reminders for fee deadlines to reduce manual follow-ups."

  -   **If 'enquiries' is the focus and is low:**
      -   "Run targeted Facebook/Instagram ad campaigns in a 10km radius of the school, highlighting recent student achievements or new facilities."
      -   "Partner with local pre-schools and activity centers for a 'Next Step' seminar, positioning your school as the ideal choice for primary education."

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
