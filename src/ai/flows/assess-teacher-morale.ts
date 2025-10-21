'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing teacher morale using various metrics and suggesting next actions.
 *
 * It includes:
 * - assessTeacherMorale - An asynchronous function to assess teacher morale and suggest actions.
 */

import { ai } from '@/ai/genkit';
import {
    AssessTeacherMoraleInputSchema,
    AssessTeacherMoraleOutputSchema,
    type AssessTeacherMoraleInput,
    type AssessTeacherMoraleOutput,
} from '@/ai/schemas/assess-teacher-morale-schema';


export async function assessTeacherMorale(
  input: AssessTeacherMoraleInput
): Promise<AssessTeacherMoraleOutput> {
  return assessTeacherMoraleFlow(input);
}

const assessTeacherMoralePrompt = ai.definePrompt({
  name: 'assessTeacherMoralePrompt',
  input: { schema: AssessTeacherMoraleInputSchema },
  output: { schema: AssessTeacherMoraleOutputSchema },
  prompt: `You are an AI assistant for a school principal, skilled in educational management and staff development. Your task is to assess a teacher's morale based on performance metrics and provide a detailed, actionable recommendation.

  **Teacher Data:**
  - Name: {{{teacherName}}}
  - Attendance Rate: {{attendanceRate}} (e.g., 0.98 is 98%)
  - On-Time Classes Rate: {{onTimeClassesRate}} (e.g., 1.0 is 100%)
  - Average Exam Performance of Students: {{examPerformance}} (e.g., 0.9 is 90%)
  - Complaints Received (this quarter): {{complaintsReceived}}

  **Assessment Criteria:**
  -   **High Morale:** Characterized by excellent attendance (>95%), high punctuality (>95%), strong student exam performance (>85%), and minimal complaints (0-1). These teachers are likely engaged, motivated, and effective.
  -   **Medium Morale:** Shows acceptable attendance (90-95%), decent punctuality (85-95%), average student performance (70-85%), and a low number of complaints (2-4). These teachers may be facing some challenges or could be coasting.
  -   **Low Morale:** Indicated by poor attendance (<90%), frequent lateness (<85%), below-average student performance (<70%), and a notable number of complaints (>4). These teachers are likely disengaged, struggling, or burnt out.

  **Your Task:**
  1.  **Determine Morale Level:** Based on the data and criteria, classify the teacher's morale as "High", "Medium", or "Low".
  2.  **Provide Detailed Analysis:** Write a short paragraph explaining your reasoning. Connect the specific data points to your conclusion. For example, "The low morale assessment is based on a concerning attendance rate of 85% combined with 5 parent complaints, which suggests a potential disengagement despite their students' acceptable exam performance."
  3.  **Suggest Actionable Feedback:** Provide a single, concrete, and "ground-ready" next step. The action should be specific and practical for a principal to implement.

  **Examples of "Ground-Ready" Actions:**
  -   **For High Morale:** "Schedule a 10-minute appreciation meeting with {{{teacherName}}} this week to acknowledge their excellent punctuality and student outcomes. Ask if they would be interested in mentoring a junior teacher."
  -   **For Medium Morale:** "Arrange an informal, supportive check-in with {{{teacherName}}} to discuss their recent challenges, specifically the 2 complaints received. Offer to observe a class to provide constructive feedback."
  -   **For Low Morale:** "Initiate a formal performance improvement plan (PIP) meeting with {{{teacherName}}}. The meeting agenda should focus on the core issues of attendance and punctuality, and establish clear, measurable goals for the next 30 days."

  Now, assess the provided teacher data.`,
});

const assessTeacherMoraleFlow = ai.defineFlow(
  {
    name: 'assessTeacherMoraleFlow',
    inputSchema: AssessTeacherMoraleInputSchema,
    outputSchema: AssessTeacherMoraleOutputSchema,
  },
  async (input) => {
    const { output } = await assessTeacherMoralePrompt(input);
    return output!;
  }
);
