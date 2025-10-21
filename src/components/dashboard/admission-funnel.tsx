'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  CheckCircle,
  Lightbulb,
  Loader2,
  ListChecks,
  Eye,
  Award,
} from 'lucide-react';
import { admissionFunnelData } from '@/lib/school-data';
import { useToast } from '@/hooks/use-toast';
import { analyzeAdmissionFunnel } from '@/ai/flows/analyze-admission-funnel';
import type { AnalyzeAdmissionFunelOutput } from '@/ai/schemas/analyze-admission-funnel-schema';

type FunnelStage = {
  stage: string;
  value: number;
};

function FunnelChart({ data }: { data: FunnelStage[] }) {
  const getConversionRate = (from: number, to: number) => {
    if (from === 0) return 0;
    return (to / from) * 100;
  };

  const maxVal = Math.max(...data.map((d) => d.value), 0);

  const stageIcons = {
    Enquiries: <Users className="w-5 h-5" />,
    'Campus Visits': <Eye className="w-5 h-5" />,
    'Forms Filled': <FileText className="w-5 h-5" />,
    'Offers Extended': <Award className="w-5 h-5" />,
    Enrolled: <CheckCircle className="w-5 h-5" />,
  };

  const stageColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-yellow-400',
    'bg-teal-500',
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {data.map((item, index) => {
        const widthPercentage = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
        const conversion =
          index < data.length - 1
            ? getConversionRate(item.value, data[index + 1].value)
            : 0;

        return (
          <div key={item.stage} className="w-full flex flex-col items-center">
            <div
              className={`${stageColors[index]} rounded-lg shadow-md h-16 flex items-center justify-between px-4 transition-all duration-300`}
              style={{ width: `${Math.max(widthPercentage, 20)}%` }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  {React.cloneElement(stageIcons[item.stage as keyof typeof stageIcons], { className: 'w-4 h-4 sm:w-5 sm:h-5 text-white' })}
                </div>
                <span className="font-semibold text-white text-sm sm:text-base">{item.stage}</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">{item.value}</span>
            </div>

            {index < data.length - 1 && (
              <div className="flex items-center gap-2 my-2">
                <div className="h-6 w-px bg-border" />
                <div className="text-xs font-semibold text-success bg-background px-2 py-0.5 rounded-full border shadow-sm">
                  {conversion.toFixed(1)}% Conv.
                </div>
                <div className="h-6 w-px bg-border" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AdmissionFunnel() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeAdmissionFunelOutput | null>(
    null
  );

  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeAdmissionFunnel(admissionFunnelData);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error generating analysis',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline">Admission Funnel</CardTitle>
        <CardDescription>
          From enquiry to enrollment: tracking conversion at each step.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-6 overflow-x-auto">
          <div className="min-w-[400px]">
            <FunnelChart data={admissionFunnelData.thisMonth} />
          </div>
        </div>

        <div className="p-4 mt-4 border-t">
          <h4 className="mb-3 text-lg font-semibold font-headline">
            AI Strategy Assistant
          </h4>
          <Button
            onClick={handleGenerateAnalysis}
            disabled={isLoading}
            className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lightbulb className="w-4 h-4 mr-2" />
            )}
            Analyze Funnel & Suggest Strategies
          </Button>

          {analysis && !isLoading && (
            <div className="mt-4 space-y-4">
              <div>
                <h5 className="font-semibold">Analysis</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  {analysis.analysis}
                </p>
              </div>
              <div>
                <h5 className="font-semibold">Suggested Strategies</h5>
                <ul className="mt-2 space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ListChecks className="w-4 h-4 mt-1 text-success shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {suggestion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
