'use server';

/**
 * @fileOverview This file defines a Genkit flow for creating a personalized student improvement plan.
 *
 * It includes:
 * - generateStudentImprovementPlan: An async function to analyze student data and suggest actions.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateStudentImprovementPlanInputSchema,
  GenerateStudentImprovementPlanOutputSchema,
  type GenerateStudentImprovementPlanInput,
  type GenerateStudentImprovementPlanOutput,
} from '@/ai/schemas/generate-student-improvement-plan-schema';

export async function generateStudentImprovementPlan(
  input: GenerateStudentImprovementPlanInput
): Promise<GenerateStudentImprovementPlanOutput> {
  return generateStudentImprovementPlanFlow(input);
}

const improvementPlanPrompt = ai.definePrompt({
  name: 'improvementPlanPrompt',
  input: { schema: GenerateStudentImprovementPlanInputSchema },
  output: { schema: GenerateStudentImprovementPlanOutputSchema },
  prompt: `You are an expert school counselor and academic strategist. Your task is to create a personalized and actionable improvement plan for a student who is struggling. The plan should be empathetic, encouraging, and grounded in practical steps.

  **Student Data:**
  - Name: {{{studentName}}}
  - Class: {{studentClass}}
  - Attendance: {{attendance}}%
  - Performance Change (last quarter): {{performanceChange}}%
  - Subject Grades: {{{json grades}}}

  **Your Task:**

  1.  **Identify the Key Focus Area:**
      - Analyze the provided data to determine the single most critical area for immediate improvement. This could be a specific subject where the score is very low, poor attendance, or a steep drop in overall performance.
      - Write a concise sentence identifying this key focus area. For example, "The primary focus should be on improving conceptual understanding in Mathematics, where the score is lowest."

  2.  **Generate Actionable Steps:**
      - Based on the key focus area and overall data, provide a list of 2-3 concrete, "ground-ready" actionable steps.
      - These steps should be things a teacher or principal can realistically implement. They should be specific and supportive.
      - **Do not** suggest generic advice like "study harder."

  **Examples of "Ground-Ready" Steps:**
  - "Schedule a 15-minute one-on-one session with {{{studentName}}} and their Math teacher to review the last exam, identify specific weak topics, and build confidence."
  - "Arrange for {{{studentName}}} to join a peer-study group with high-performing students for one hour, twice a week, focusing on collaborative problem-solving in Science."
  - "Initiate a weekly check-in (5 minutes) with {{{studentName}}} to discuss any challenges they are facing and to acknowledge small improvements, thereby boosting morale."
  - "If attendance is low, call the student's parents to understand the reason for absences and collaboratively develop a plan to ensure regular school presence."

  Now, create the improvement plan for the provided student data.`,
});

const generateStudentImprovementPlanFlow = ai.defineFlow(
  {
    name: 'generateStudentImprovementPlanFlow',
    inputSchema: GenerateStudentImprovementPlanInputSchema,
    outputSchema: GenerateStudentImprovementPlanOutputSchema,
  },
  async (input) => {
    const { output } = await improvementPlanPrompt(input);
    return output!;
  }
);
