import { z } from 'genkit';
import { GrowthMetricSchema } from './generate-growth-strategies-schema';
import { FunnelStageSchema } from './analyze-admission-funnel-schema';

const ExamHeatmapSubjectSchema = z.object({
  name: z.string(),
  passRate: z.number(),
  topScorer: z.string(),
  weakStudents: z.number(),
});

const ExamHeatmapClassSchema = z.object({
  class: z.string(),
  passed: z.number(),
  failed: z.number(),
  change: z.number(),
  subjects: z.array(ExamHeatmapSubjectSchema),
  toppers: z.array(z.string()),
  weakest: z.array(z.string()),
  mostFailedSubject: z.string(),
});

const TeacherMetricsSchema = z.object({
  attendanceRate: z.number(),
  onTimeClassesRate: z.number(),
  examPerformance: z.number(),
  complaintsReceived: z.number(),
});

const TeacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  metrics: TeacherMetricsSchema,
});

const GeotagSchema = z.object({
    location: z.string(),
    students: z.number()
})

export const GenerateSchoolReportInputSchema = z.object({
  scope: z
    .string()
    .describe(
      'The scope of the report, e.g., "school", "Class 10", "Class 9".'
    ),
  growthData: z.array(GrowthMetricSchema),
  admissionFunnelData: z.object({
    thisMonth: z.array(FunnelStageSchema),
    lastMonth: z.array(FunnelStageSchema),
  }),
  examHeatmapData: z.array(ExamHeatmapClassSchema),
  teacherData: z.array(TeacherSchema),
  geotagData: z.array(GeotagSchema),
});
export type GenerateSchoolReportInput = z.infer<
  typeof GenerateSchoolReportInputSchema
>;

const SolutionSchema = z.object({
  title: z
    .string()
    .describe('A short, catchy title for the recommended solution.'),
  description: z
    .string()
    .describe(
      'A detailed, actionable description of the solution, explaining what to do and why.'
    ),
});

export const GenerateSchoolReportOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A high-level executive summary of the current state of the school (or class) based on all provided data.'
    ),
  strengths: z.array(z.string()).describe('A bulleted list of the key strengths identified from the data.'),
  problems: z
    .array(z.string())
    .describe(
      'A bulleted list of the most critical problems or challenges identified from the data.'
    ),
  solutions: z
    .array(SolutionSchema)
    .describe(
      'A list of concrete, actionable solutions or strategies to address the identified problems.'
    ),
});
export type GenerateSchoolReportOutput = z.infer<
  typeof GenerateSchoolReportOutputSchema
>;
