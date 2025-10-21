'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import { growthData } from '@/lib/school-data';
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart as BarChartIcon,
  Lightbulb,
  Loader2,
  ListChecks,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  generateGrowthStrategies,
} from '@/ai/flows/generate-growth-strategies';
import type { GenerateGrowthStrategiesOutput } from '@/ai/schemas/generate-growth-strategies-schema';

type DataKey = "strength" | "fees" | "enquiries";

export function GrowthRadar() {
  const latestData = growthData[growthData.length - 1];
  const lastYearData = { strength: 800, fees: 7.1, enquiries: 55 }; // Mock last year data
  const [activeMetric, setActiveMetric] = useState<DataKey>('strength');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<GenerateGrowthStrategiesOutput | null>(
    null
  );

  const handleGenerateStrategies = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await generateGrowthStrategies({
        growthData,
        activeMetric,
      });
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error generating strategies',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const chartConfig = {
    strength: { label: 'Students', color: 'hsl(var(--chart-1))' },
    fees: { label: 'Fees (Lakhs)', color: 'hsl(var(--chart-2))' },
    enquiries: { label: 'Enquiries', color: 'hsl(var(--chart-3))' },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-headline">Growth Radar</CardTitle>
            <CardDescription>
              Key growth metrics over the last 6 months.
            </CardDescription>
          </div>
          <Select value={activeMetric} onValueChange={(value) => setActiveMetric(value as DataKey)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strength">Student Strength</SelectItem>
              <SelectItem value="fees">Fee Collection</SelectItem>
              <SelectItem value="enquiries">Enquiries</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className={`p-4 border-2 rounded-lg transition-all ${activeMetric === 'strength' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="w-4 h-4" /> Student Strength
            </div>
            <div className="mt-2 text-2xl font-bold">{latestData.strength}</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              {(((latestData.strength - lastYearData.strength) / lastYearData.strength) * 100).toFixed(1)}% vs LY
            </div>
          </div>
          <div className={`p-4 border-2 rounded-lg transition-all ${activeMetric === 'fees' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <DollarSign className="w-4 h-4" /> Fee Collection
            </div>
            <div className="mt-2 text-2xl font-bold">₹{latestData.fees}L</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              {(((latestData.fees - lastYearData.fees) / lastYearData.fees) * 100).toFixed(1)}% vs LY
            </div>
          </div>
          <div className={`p-4 border-2 rounded-lg transition-all ${activeMetric === 'enquiries' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BarChartIcon className="w-4 h-4" /> Enquiries
            </div>
            <div className="mt-2 text-2xl font-bold">{latestData.enquiries}</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              {(((latestData.enquiries - lastYearData.enquiries) / lastYearData.enquiries) * 100).toFixed(1)}% vs LY
            </div>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                <Bar 
                  dataKey={activeMetric} 
                  fill={chartConfig[activeMetric].color} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="p-4 border-t">
           <h4 className="mb-3 text-lg font-semibold font-headline">
            AI Strategy Assistant
          </h4>
          <Button
            onClick={handleGenerateStrategies}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lightbulb className="w-4 h-4 mr-2" />
            )}
            Generate Growth Strategies for {chartConfig[activeMetric].label}
          </Button>

           {analysis && !isLoading && (
            <div className="mt-4 space-y-4">
              <div>
                <h5 className="font-semibold">Trend Analysis</h5>
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
