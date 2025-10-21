'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Loader2,
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSchoolReport } from '@/ai/flows/generate-school-report';
import type { GenerateSchoolReportOutput } from '@/ai/schemas/generate-school-report-schema';
import * as Data from '@/lib/school-data';
import { Button } from '../ui/button';
import { downloadReport } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

export function AiReportGenerator({
  open,
  onOpenChange,
  scope,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scope: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<GenerateSchoolReportOutput | null>(null);
  const [reportTitle, setReportTitle] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const handleGenerateReport = async () => {
      if (!scope) return;
      setIsLoading(true);
      setReport(null);
      setReportTitle(`AI Report for ${scope}`);

      try {
        const result = await generateSchoolReport({
          scope: scope,
          growthData: Data.growthData,
          admissionFunnelData: Data.admissionFunnelData,
          examHeatmapData: Data.examHeatmapData,
          teacherData: Data.teachers,
          geotagData: Data.geotagData.school,
        });
        setReport(result);
      } catch (error) {
        console.error(error);
        onOpenChange(false);
        toast({
          variant: 'destructive',
          title: 'Error generating report',
          description:
            'Could not connect to the AI service. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      handleGenerateReport();
    }

    if (!open) {
      // Reset report when dialog is closed to ensure it regenerates next time
      setReport(null);
    }
  }, [open, scope, onOpenChange, toast]);

  const handleDownload = () => {
    if (!report) return;
    const reportContent = `
AI School Report: ${scope}
================================

EXECUTIVE SUMMARY:
${report.summary}

--------------------------------

KEY STRENGTHS:
${report.strengths.map((s) => `- ${s}`).join('\n')}

--------------------------------

KEY CHALLENGES:
${report.problems.map((p) => `- ${p}`).join('\n')}

--------------------------------

STRATEGIC RECOMMENDATIONS:
${report.solutions
  .map((s) => `\n- ${s.title}:\n  ${s.description}`)
  .join('\n')}
    `;
    downloadReport(`ai-report-${scope.toLowerCase()}.txt`, reportContent);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl flex flex-col h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText />
            {reportTitle}
          </DialogTitle>
          <DialogDescription>
            A comprehensive AI-generated analysis of your school's data.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-6 -mr-6">
          <div className="h-full">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            )}
            {report && (
              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="mb-2 text-lg font-semibold font-headline">
                    Executive Summary
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {report.summary}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold font-headline flex items-center gap-2">
                      <CheckCircle className="text-success" />
                      Key Strengths
                    </h3>
                    <ul className="space-y-2 list-disc list-inside">
                      {report.strengths.map((strength, i) => (
                        <li key={i} className="text-muted-foreground">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold font-headline flex items-center gap-2">
                      <AlertTriangle className="text-destructive" />
                      Key Challenges
                    </h3>
                    <ul className="space-y-2 list-disc list-inside">
                      {report.problems.map((problem, i) => (
                        <li key={i} className="text-muted-foreground">
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold font-headline">
                    Strategic Recommendations
                  </h3>
                  <div className="space-y-3">
                    {report.solutions.map((solution, i) => (
                      <div
                        key={i}
                        className="p-4 border rounded-lg bg-secondary/50"
                      >
                        <p className="font-semibold text-foreground">
                          {solution.title}
                        </p>
                        <p className="mt-1 text-muted-foreground whitespace-pre-wrap">
                          {solution.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        {report && (
          <DialogFooter className='pt-4 border-t'>
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
