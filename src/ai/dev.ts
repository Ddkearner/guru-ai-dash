import { config } from 'dotenv';
config();

import '@/ai/flows/generate-daily-school-summary.ts';
import '@/ai/flows/assess-teacher-morale.ts';
import '@/ai/flows/generate-growth-strategies.ts';
import '@/ai/flows/analyze-admission-funnel.ts';
import '@/ai/schemas/analyze-admission-funnel-schema';
import '@/ai/schemas/assess-teacher-morale-schema';
import '@/ai/schemas/generate-daily-school-summary-schema';
import '@/ai/schemas/generate-growth-strategies-schema';
