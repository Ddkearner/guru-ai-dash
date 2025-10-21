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
  TrendingDown,
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
    if (from === 0) return '0';
    return ((to / from) * 100).toFixed(1);
  };

  const totalConversion =
    data.length > 0
      ? getConversionRate(data[0].value, data[data.length - 1].value)
      : '0';

  const stageIcons = {
    Enquiries: <Users className="w-5 h-5 text-blue-500" />,
    'Campus Visits': <Eye className="w-5 h-5 text-purple-500" />,
    'Forms Filled': <FileText className="w-5 h-5 text-orange-500" />,
    'Offers Extended': <Award className="w-5 h-5 text-yellow-500" />,
    Enrolled: <CheckCircle className="w-5 h-5 text-green-500" />,
  };

  return (
    <div className="w-full">
      <div className="relative p-4 space-y-2">
        {data.map((item, index) => {
          const nextValue = data[index + 1]?.value ?? 0;
          const conversion = getConversionRate(item.value, nextValue);
          const isLastStage = index === data.length - 1;

          return (
            <div key={item.stage} className="relative">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                <div className="p-3 rounded-full bg-background">
                  {stageIcons[item.stage as keyof typeof stageIcons] || (
                    <Users className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.stage}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                {!isLastStage && (
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-full flex items-center gap-2 p-2 rounded-full bg-background border shadow-sm">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-semibold text-destructive">
                      {100 - parseFloat(conversion)}%
                    </span>
                  </div>
                )}
              </div>
              {!isLastStage && (
                <div className="pl-8 mt-2">
                  <p className="text-sm font-medium text-success">
                    {conversion}% conversion to next stage
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-4 mt-4 text-center border-t">
        <p className="text-sm font-medium text-muted-foreground">
          Overall Conversion Rate (Enquiries to Enrolled)
        </p>
        <p className="text-3xl font-bold text-success">{totalConversion}%</p>
      </div>
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
    <Card className="relative">
      <CardHeader>
        <CardTitle className="font-headline">Admission Funnel</CardTitle>
        <CardDescription>
          From enquiry to enrollment: tracking conversion at each step.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FunnelChart data={admissionFunnelData.thisMonth} />

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
