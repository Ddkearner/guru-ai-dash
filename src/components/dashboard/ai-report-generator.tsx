'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Wand, Loader2, FileText, BarChart, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSchoolReport } from '@/ai/flows/generate-school-report';
import type { GenerateSchoolReportOutput } from '@/ai/schemas/generate-school-report-schema';
import * as Data from '@/lib/school-data';

type ReportScope = 'school' | 'Class 10' | 'Class 9' | 'Class 8';

export function AiReportGenerator() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<GenerateSchoolReportOutput | null>(null);
  const [reportTitle, setReportTitle] = useState('');
  const { toast } = useToast();

  const handleGenerateReport = async (scope: ReportScope) => {
    setIsLoading(true);
    setReport(null);
    setReportTitle(`AI Report for ${scope}`);
    setOpen(true);

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
      setOpen(false);
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Wand className="w-4 h-4 mr-2" />
            AI School Report
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Generate Detailed Report</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleGenerateReport('school')}>
            <BarChart className="w-4 h-4 mr-2" />
            Full School Report
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleGenerateReport('Class 10')}>
            <Users className="w-4 h-4 mr-2" />
            Class 10 Report
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleGenerateReport('Class 9')}>
            <Users className="w-4 h-4 mr-2" />
            Class 9 Report
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleGenerateReport('Class 8')}>
            <Users className="w-4 h-4 mr-2" />
            Class 8 Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
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
                <div>
                  <h3 className="mb-2 text-lg font-semibold font-headline">
                    Key Challenges Identified
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    {report.problems.map((problem, i) => (
                      <li key={i} className="text-muted-foreground">
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold font-headline">
                    Strategic Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {report.solutions.map((solution, i) => (
                      <li
                        key={i}
                        className="p-3 border rounded-md bg-secondary/50"
                      >
                        <p className="font-semibold text-foreground">
                          {solution.title}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          {solution.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
