import {z} from 'genkit';

export const GenerateDailySchoolSummaryInputSchema = z.object({
  attendanceRate: z.number().describe('The percentage of students present today.'),
  feesCollected: z.number().describe('The total amount of fees collected today.'),
  admissionEnquiries: z.number().describe('The number of admission enquiries received today.'),
  classPerformance: z.record(z.string(), z.string()).describe('A record of class performances in tests.'),
  lowAttendanceClasses: z.array(z.string()).describe('An array of class names with low attendance.'),
});
export type GenerateDailySchoolSummaryInput = z.infer<typeof GenerateDailySchoolSummaryInputSchema>;

export const GenerateDailySchoolSummaryOutputSchema = z.object({
  summary: z.string().describe('A natural language summary of the day\'s school activities.'),
});
export type GenerateDailySchoolSummaryOutput = z.infer<typeof GenerateDailySchoolSummaryOutputSchema>;
