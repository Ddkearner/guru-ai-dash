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
    'text-blue-500',
    'text-purple-500',
    'text-orange-500',
    'text-yellow-600',
    'text-green-500',
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {data.map((item, index) => {
        const widthPercentage = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
        const nextWidthPercentage =
          index < data.length - 1
            ? maxVal > 0
              ? (data[index + 1].value / maxVal) * 100
              : 0
            : 0;

        const conversion =
          index < data.length - 1
            ? getConversionRate(item.value, data[index + 1].value)
            : 0;

        return (
          <div
            key={item.stage}
            className="relative flex flex-col items-center"
            style={{ width: `${widthPercentage}%`, minWidth: '120px' }}
          >
            {/* Funnel Segment */}
            <div
              className="w-full h-16 bg-secondary/70 flex items-center justify-center px-4"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
              }}
            >
              <div className="flex items-center gap-4 text-foreground w-full">
                <div
                  className={`p-2 rounded-full bg-background/70 ${stageColors[index]}`}
                >
                  {stageIcons[item.stage as keyof typeof stageIcons] || (
                    <Users className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{item.stage}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              </div>
            </div>

            {/* Connector / Conversion Rate */}
            {index < data.length - 1 && (
              <>
                <div className="h-12 w-px bg-border -my-1" />
                <div
                  className="w-full h-10 flex items-center justify-center -my-3"
                  style={{
                    width: `${nextWidthPercentage}%`,
                    minWidth: '110px',
                  }}
                >
                  <div className="text-xs font-semibold text-success bg-background px-2 py-1 rounded-full border shadow-sm">
                    {conversion.toFixed(1)}% Conv.
                  </div>
                </div>
              </>
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
        <div className="py-6">
          <FunnelChart data={admissionFunnelData.thisMonth} />
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
