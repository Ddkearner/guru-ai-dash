'use client';

import {
  Area,
  AreaChart,
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
import {
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import { growthData } from '@/lib/school-data';
import { ArrowUp, Users, DollarSign, BarChart } from 'lucide-react';

const chartConfig = {
  admissions: {
    label: 'Admissions',
    color: 'hsl(var(--chart-1))',
  },
  fees: {
    label: 'Fees (Lakhs)',
    color: 'hsl(var(--chart-2))',
  },
};

export function GrowthRadar() {
  const latestData = growthData[growthData.length - 1];
  const lastYearData = { strength: 800, enquiries: 55 }; // Mock last year data

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Growth Radar</CardTitle>
        <CardDescription>
          Tracking key metrics for school growth over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="w-4 h-4" /> Student Strength
            </div>
            <div className="mt-2 text-2xl font-bold">{latestData.strength}</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUp className="w-3 h-3 mr-1" />
              {(((latestData.strength - lastYearData.strength) / lastYearData.strength) * 100).toFixed(1)}% vs LY
            </div>
          </div>
          <div className="p-4 border rounded-lg">
             <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <DollarSign className="w-4 h-4" /> Fee Collection
            </div>
            <div className="mt-2 text-2xl font-bold">₹{latestData.fees}L</div>
             <div className="flex items-center text-xs text-success">
              <ArrowUp className="w-3 h-3 mr-1" />
              15.2% vs LY
            </div>
          </div>
          <div className="p-4 border rounded-lg">
             <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BarChart className="w-4 h-4" /> Enquiries
            </div>
            <div className="mt-2 text-2xl font-bold">{latestData.enquiries}</div>
             <div className="flex items-center text-xs text-success">
              <ArrowUp className="w-3 h-3 mr-1" />
              {(((latestData.enquiries - lastYearData.enquiries) / lastYearData.enquiries) * 100).toFixed(1)}% vs LY
            </div>
          </div>
        </div>
        <div className="h-[200px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ right: 12, left: -20 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillAdmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-admissions)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-admissions)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillFees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-fees)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-fees)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="admissions" stroke="var(--color-admissions)" fill="url(#fillAdmissions)" strokeWidth={2} />
                <Area type="monotone" dataKey="fees" stroke="var(--color-fees)" fill="url(#fillFees)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
