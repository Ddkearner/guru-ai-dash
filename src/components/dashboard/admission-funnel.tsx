'use client';

import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { admissionFunnelData } from '@/lib/school-data';

const chartConfig = {
  value: {
    label: 'Count',
    color: 'hsl(var(--chart-1))',
  },
};

function FunnelChart({ data }: { data: { name: string; value: number }[] }) {
  const getLeakage = (from: number, to: number) => {
    if (from === 0) return 0;
    return (((from - to) / from) * 100).toFixed(1);
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={80}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="var(--color-value)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <div className="flex items-baseline justify-between p-2 border-b">
          <span className="text-sm">Enquiry → Form</span>
          <span className="font-bold text-destructive">
            {getLeakage(data[0].value, data[1].value)}% Leakage
          </span>
        </div>
        <div className="flex items-baseline justify-between p-2 border-b">
          <span className="text-sm">Form → Joined</span>
          <span className="font-bold text-destructive">
             {getLeakage(data[1].value, data[2].value)}% Leakage
          </span>
        </div>
        <div className="flex items-baseline justify-between p-2">
          <span className="text-sm font-medium">Overall Conversion</span>
          <span className="font-bold text-success">
            {((data[2].value / data[0].value) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}


export function AdmissionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Admission Funnel</CardTitle>
        <CardDescription>
          Identifying bottlenecks in the admission pipeline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="thisMonth">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="thisMonth">This Month</TabsTrigger>
            <TabsTrigger value="lastMonth">Last Month</TabsTrigger>
          </TabsList>
          <TabsContent value="thisMonth" className="pt-4">
             <FunnelChart data={admissionFunnelData.thisMonth} />
          </TabsContent>
          <TabsContent value="lastMonth" className="pt-4">
            <FunnelChart data={admissionFunnelData.lastMonth} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
