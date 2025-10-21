import { z } from 'genkit';

export const AssessTeacherMoraleInputSchema = z.object({
  teacherName: z.string().describe('The name of the teacher to assess.'),
  attendanceRate: z
    .number()
    .min(0)
    .max(1)
    .describe('The teacher attendance rate (0 to 1).'),
  onTimeClassesRate: z
    .number()
    .min(0)
    .max(1)
    .describe('The rate of classes the teacher started on time (0 to 1).'),
  examPerformance: z
    .number()
    .min(0)
    .max(1)
    .describe('The teacher average exam performance (0 to 1).'),
  complaintsReceived: z
    .number()
    .min(0)
    .describe('Number of complaints received about the teacher.'),
});
export type AssessTeacherMoraleInput = z.infer<
  typeof AssessTeacherMoraleInputSchema
>;

export const AssessTeacherMoraleOutputSchema = z.object({
  moraleLevel: z
    .string()
    .describe(
      'The morale level of the teacher (High, Medium, Low) determined by the AI.'
    ),
  detailedAnalysis: z
    .string()
    .describe(
      'A detailed analysis of the factors contributing to the morale assessment, referencing the input metrics.'
    ),
  suggestedAction: z
    .string()
    .describe(
      'A specific, actionable, and ground-ready next step for the school administration to take.'
    ),
});
export type AssessTeacherMoraleOutput = z.infer<
  typeof AssessTeacherMoraleOutputSchema
>;
