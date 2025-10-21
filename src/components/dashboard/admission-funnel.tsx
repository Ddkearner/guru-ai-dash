'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { admissionFunnelData } from '@/lib/school-data';
import { TrendingDown, Users, FileText, CheckCircle } from 'lucide-react';

type FunnelStage = {
  stage: string;
  value: number;
};

function FunnelChart({ data }: { data: FunnelStage[] }) {
  const getConversionRate = (from: number, to: number) => {
    if (from === 0) return 0;
    return ((to / from) * 100).toFixed(1);
  };

  const totalConversion =
    data.length > 0
      ? ((data[data.length - 1].value / data[0].value) * 100).toFixed(1)
      : 0;

  const stageIcons = {
    Enquiries: <Users className="w-5 h-5 text-blue-500" />,
    'Forms Filled': <FileText className="w-5 h-5 text-orange-500" />,
    Joined: <CheckCircle className="w-5 h-5 text-green-500" />,
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
                  {stageIcons[item.stage as keyof typeof stageIcons] || <Users className="w-5 h-5 text-gray-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.stage}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                {!isLastStage && (
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-full flex items-center gap-2 p-2 rounded-full bg-background border shadow-sm">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-semibold text-destructive">{100 - parseFloat(conversion)}%</span>
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
          Overall Conversion Rate
        </p>
        <p className="text-3xl font-bold text-success">{totalConversion}%</p>
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
