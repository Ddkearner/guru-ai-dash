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
import { Sparkles, Loader2 } from 'lucide-react';
import { generateDailySchoolSummary } from '@/ai/flows/generate-daily-school-summary';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-headline">Today's Quick Summary</CardTitle>
            <CardDescription>
              An AI-powered look at today's school activity.
            </CardDescription>
          </div>
          <Button
            onClick={handleGenerateSummary}
            disabled={isLoading}
            size="sm"
            className="w-full sm:w-auto bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Generate
          </Button>
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
