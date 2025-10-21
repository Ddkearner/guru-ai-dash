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
    'bg-[#4A90E2]', // Blue
    'bg-[#7E6EF2]', // Purple
    'bg-[#F5A623]', // Orange
    'bg-[#F8E71C]', // Yellow
    'bg-[#50E3C2]', // Green
  ];
  
  const stageTextColors = [
    'text-white',
    'text-white',
    'text-white',
    'text-gray-800',
    'text-gray-800',
  ];


  return (
    <div className="w-full flex flex-col items-center gap-2">
      {data.map((item, index) => {
        const widthPercentage = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
        const nextValue =
          index < data.length - 1 ? data[index + 1].value : 0;

        const conversion =
          index < data.length - 1 ? getConversionRate(item.value, nextValue) : 0;
        
        const nextWidthPercentage =
          index < data.length - 1
            ? maxVal > 0
              ? (nextValue / maxVal) * 100
              : 0
            : widthPercentage * 0.8;


        return (
          <div
            key={item.stage}
            className="relative flex flex-col items-center w-full"
          >
            {/* Funnel Segment */}
             <div className='relative' style={{width: `${widthPercentage}%`, minWidth: '120px' }}>
                <div className='absolute inset-x-0 -top-2 h-4 bg-black/10 rounded-t-full' />
                <div className={`${stageColors[index]} h-16 w-full flex items-center justify-center px-4`}>
                    <div className="flex items-center gap-4 text-foreground w-full">
                        <div className={`p-2 rounded-full bg-white/20 ${stageTextColors[index]}`}>
                        {stageIcons[item.stage as keyof typeof stageIcons]}
                        </div>
                        <div className="flex-1 text-left">
                        <p className={`text-sm font-medium ${stageTextColors[index]}`}>{item.stage}</p>
                        <p className={`text-xl font-bold ${stageTextColors[index]}`}>{item.value}</p>
                        </div>
                    </div>
                </div>
                 <div className='absolute inset-x-0 -bottom-2 h-4 bg-black/20 rounded-b-full' />
            </div>

            {/* Connector / Conversion Rate */}
            {index < data.length - 1 && (
              <div className="flex flex-col items-center w-full">
                 <div className="h-8 w-px bg-border my-2" />
                 <div
                  className="relative h-10 flex items-center justify-center -my-4 z-10"
                >
                  <div className="text-xs font-semibold text-success bg-background px-2 py-1 rounded-full border shadow-sm">
                    {conversion.toFixed(1)}% Conv.
                  </div>
                </div>
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
            className="w-full"
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
