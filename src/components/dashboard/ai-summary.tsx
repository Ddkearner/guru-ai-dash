'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Download } from 'lucide-react';
import { generateDailySchoolSummary } from '@/ai/flows/generate-daily-school-summary';
import { useToast } from '@/hooks/use-toast';
import { downloadReport } from '@/lib/utils';

export function AiSummary() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const input = {
        attendanceRate: 92,
        feesCollected: 34000,
        admissionEnquiries: 14,
        classPerformance: {
          'Class 8': 'Excellent in Math test',
          'Class 5': 'Average in Science',
        },
        lowAttendanceClasses: ['Class 9', 'Class 6'],
      };
      const result = await generateDailySchoolSummary(input);
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error generating summary',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!summary) return;
    const reportContent = `
Today's Quick Summary
=====================
${summary}
    `;
    downloadReport('daily-school-summary.txt', reportContent);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-headline">
              Today's Quick Summary
            </CardTitle>
            <CardDescription>
              An AI-powered look at today's school activity.
            </CardDescription>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <Button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              size="sm"
              className="flex-1 sm:flex-initial bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Generate
            </Button>
            {summary && (
              <Button onClick={handleDownload} size="sm" variant="outline">
                <Download className="w-4 h-4" />
                <span className="sr-only">Download Summary</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center min-h-[148px]">
        {isLoading && <Loader2 className="w-8 h-8 animate-spin text-primary" />}
        {!isLoading && !summary && (
          <div className="text-center">
            <p className="font-medium text-muted-foreground">
              Ready for your daily brief?
            </p>
            <p className="text-sm text-muted-foreground">
              Click "Generate" to see the AI summary.
            </p>
          </div>
        )}
        {summary && (
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
