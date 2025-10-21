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
});

const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    href: z.string(),
});

export const MeeraAiChatInputSchema = z.object({
  query: z.string().describe('The user\'s message or question to the AI assistant.'),
  growthData: z.array(GrowthMetricSchema).optional(),
  admissionFunnelData: z.object({ thisMonth: z.array(FunnelStageSchema), lastMonth: z.array(FunnelStageSchema) }).optional(),
  examHeatmapData: z.array(ExamHeatmapClassSchema).optional(),
  teacherData: z.array(TeacherSchema).optional(),
  geotagData: z.any().optional(),
  todoTasks: z.array(TaskSchema).optional(),
});

export type MeeraAiChatInput = z.infer<typeof MeeraAiChatInputSchema>;

export const MeeraAiChatOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response to the user\'s query.'),
});
export type MeeraAiChatOutput = z.infer<typeof MeeraAiChatOutputSchema>;
