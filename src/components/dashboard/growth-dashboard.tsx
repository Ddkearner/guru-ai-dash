'use client';

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
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
  ChartLegendContent,
} from '@/components/ui/chart';
import { growthData } from '@/lib/school-data';
import {
  Users,
  DollarSign,
  BarChart as BarChartIcon,
  Lightbulb,
  Loader2,
  ListChecks,
  UserPlus,
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
import { generateGrowthStrategies } from '@/ai/flows/generate-growth-strategies';
import type { GenerateGrowthStrategiesOutput } from '@/ai/schemas/generate-growth-strategies-schema';

type DataKey = 'strength' | 'fees' | 'enquiries' | 'admissions';

export function GrowthDashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] =
    useState<GenerateGrowthStrategiesOutput | null>(null);
  const [focusedMetric, setFocusedMetric] = useState<DataKey>('admissions');

  const handleGenerateStrategies = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await generateGrowthStrategies({
        growthData,
        activeMetric: focusedMetric,
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
    admissions: { label: 'Admissions', color: 'hsl(var(--chart-1))' },
    strength: { label: 'Total Students', color: 'hsl(var(--chart-2))' },
    enquiries: { label: 'Enquiries', color: 'hsl(var(--chart-3))' },
    fees: { label: 'Fees (Lakhs)', color: 'hsl(var(--chart-4))' },
  };

  const latestData = growthData[growthData.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Growth Dashboard</CardTitle>
        <CardDescription>
          Tracking key growth metrics over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <MetricCard
            title="Admissions"
            value={latestData.admissions}
            icon={UserPlus}
            metric="admissions"
            focusedMetric={focusedMetric}
            setFocusedMetric={setFocusedMetric}
          />
          <MetricCard
            title="Total Students"
            value={latestData.strength}
            icon={Users}
            metric="strength"
            focusedMetric={focusedMetric}
            setFocusedMetric={setFocusedMetric}
          />
          <MetricCard
            title="Enquiries"
            value={latestData.enquiries}
            icon={BarChartIcon}
            metric="enquiries"
            focusedMetric={focusedMetric}
            setFocusedMetric={setFocusedMetric}
          />
          <MetricCard
            title="Fee Collection"
            value={`₹${latestData.fees}L`}
            icon={DollarSign}
            metric="fees"
            focusedMetric={focusedMetric}
            setFocusedMetric={setFocusedMetric}
          />
        </div>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthData}
                margin={{ top: 20, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Legend content={<ChartLegendContent />} />
                {Object.keys(chartConfig).map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={chartConfig[key as DataKey].color}
                    strokeWidth={2}
                    dot={false}
                    opacity={focusedMetric === key ? 1 : 0.3}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="p-4 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h4 className="text-lg font-semibold font-headline">
              AI Strategy Assistant
            </h4>
            <Select
              value={focusedMetric}
              onValueChange={(value) => setFocusedMetric(value as DataKey)}
            >
              <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="Select Metric for Analysis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admissions">New Admissions</SelectItem>
                <SelectItem value="strength">Student Strength</SelectItem>
                <SelectItem value="enquiries">Enquiries</SelectItem>
                <SelectItem value="fees">Fee Collection</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            Generate Strategies for {chartConfig[focusedMetric].label}
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

function MetricCard({
  title,
  value,
  icon: Icon,
  metric,
  focusedMetric,
  setFocusedMetric,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  metric: DataKey;
  focusedMetric: DataKey;
  setFocusedMetric: (metric: DataKey) => void;
}) {
  return (
    <div
      onClick={() => setFocusedMetric(metric)}
      className={`p-3 sm:p-4 border-2 rounded-lg transition-all cursor-pointer ${
        focusedMetric === metric ? 'border-primary shadow-md' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
        <Icon className="w-4 h-4" /> {title}
      </div>
      <div className="mt-2 text-xl sm:text-2xl font-bold">{value}</div>
    </div>
  );
}
