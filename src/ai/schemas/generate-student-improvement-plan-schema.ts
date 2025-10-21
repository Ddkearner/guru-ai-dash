import { z } from 'genkit';

const GradeSchema = z.object({
  subject: z.string(),
  score: z.number(),
});

export const GenerateStudentImprovementPlanInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  studentClass: z.string().describe("The student's class."),
  attendance: z.number().describe("The student's attendance percentage."),
  performanceChange: z
    .number()
    .describe('The percentage change in performance from the last quarter.'),
  grades: z.array(GradeSchema).describe("The student's recent subject grades."),
});

export type GenerateStudentImprovementPlanInput = z.infer<
  typeof GenerateStudentImprovementPlanInputSchema
>;

export const GenerateStudentImprovementPlanOutputSchema = z.object({
  keyFocusArea: z
    .string()
    .describe(
      'A concise sentence identifying the single most critical area for the student to improve.'
    ),
  actionableSteps: z
    .array(z.string())
    .describe(
      'A list of 2-3 concrete, practical, and personalized steps for teachers/principals to implement.'
    ),
});

export type GenerateStudentImprovementPlanOutput = z.infer<
  typeof GenerateStudentImprovementPlanOutputSchema
>;
