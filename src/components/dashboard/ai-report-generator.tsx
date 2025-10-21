'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Loader2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSchoolReport } from '@/ai/flows/generate-school-report';
import type { GenerateSchoolReportOutput } from '@/ai/schemas/generate-school-report-schema';
import * as Data from '@/lib/school-data';

export function AiReportGenerator({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<GenerateSchoolReportOutput | null>(null);
  const [reportTitle, setReportTitle] = useState('');
  const { toast } = useToast();

  const handleGenerateReport = async (scope: string) => {
    setIsLoading(true);
    setReport(null);
    setReportTitle(`AI Report for ${scope}`);
    onOpenChange(true);

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
  
  // This component is now a Dialog controlled by parent state
  // The DropdownMenu trigger is now part of the header
  // A new `handleGenerateReport` function is passed for explicit triggers
  // We can add a simple trigger here for now for any other places it might be used
  // but the main trigger is in the header.

  // We are using `useEffect` to trigger the report generation when the dialog opens
  // This is a bit of a workaround because we can't easily pass the scope
  // A better solution might involve a global state manager (like Zustand or Redux)
  // or a more complex prop-drilling system.
  React.useEffect(() => {
    if (open && !isLoading && !report) {
      // Default to school report if opened without a specific scope
      handleGenerateReport('School');
    }
     if (!open) {
      // Reset report when dialog is closed
      setReport(null);
    }
  }, [open, isLoading, report]);


  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText />
              {reportTitle}
            </DialogTitle>
            <DialogDescription>
              A comprehensive AI-generated analysis of your school's data.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-6">
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
        </DialogContent>
      </Dialog>
  );
}
