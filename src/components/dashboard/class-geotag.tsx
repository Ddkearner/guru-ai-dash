'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { geotagData } from '@/lib/school-data';
import {
  MapPin,
  Loader2,
  Lightbulb,
  Users,
  Briefcase,
  Megaphone,
  Download,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzeGeotagForMarketing } from '@/ai/flows/analyze-geotag-for-marketing';
import type { AnalyzeGeotagForMarketingOutput } from '@/ai/schemas/analyze-geotag-for-marketing-schema';
import { downloadReport } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type GeotagKey = keyof typeof geotagData;

function LocationAnalysis({ locationName }: { locationName: string }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] =
    useState<AnalyzeGeotagForMarketingOutput | null>(null);

  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeGeotagForMarketing({ locationName });
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

  const handleDownload = () => {
    if (!analysis) return;
    const reportContent = `
Marketing Analysis: ${locationName}
================================

QUICK SUMMARY:
${analysis.summaryPoints.map(p => `- ${p}`).join('\n')}

DETAILED ANALYSIS:
${analysis.analysis}

PARTNERSHIP OPPORTUNITIES:
${analysis.partnershipOpportunities.map(p => `- ${p}`).join('\n')}

CAMPAIGN SUGGESTIONS:
${analysis.marketingSuggestions.map(s => `- ${s}`).join('\n')}
    `;
    downloadReport(`marketing-analysis-${locationName.toLowerCase()}.txt`, reportContent);
  };

  return (
    <div className='flex flex-col h-full'>
       <ScrollArea className='flex-1 pr-6 -mr-6'>
          <div className="space-y-4">
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
              Generate Marketing Insights
            </Button>

            {analysis && !isLoading && (
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <Users className="w-4 h-4 text-primary" />
                    Quick Summary
                  </h4>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    {analysis.summaryPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <Users className="w-4 h-4 text-primary" />
                    Detailed Analysis
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {analysis.analysis}
                  </p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Partnership Opportunities
                  </h4>
                  <ul className="mt-2 space-y-2 list-disc list-inside">
                    {analysis.partnershipOpportunities.map((suggestion, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <Megaphone className="w-4 h-4 text-primary" />
                    Campaign Suggestions
                  </h4>
                  <ul className="mt-2 space-y-2 list-disc list-inside">
                    {analysis.marketingSuggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
          </div>
       </ScrollArea>
      {analysis && !isLoading && (
        <DialogFooter className="pt-4 mt-4 border-t">
          <Button onClick={handleDownload} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Analysis
          </Button>
        </DialogFooter>
      )}
    </div>
  );
}

export function ClassGeotag() {
  const [filter, setFilter] = useState<GeotagKey>('school');

  const data = geotagData[filter];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-headline">Class Geotag</CardTitle>
            <CardDescription>
              Click on a location for detailed marketing analysis.
            </CardDescription>
          </div>
          <Select
            defaultValue="school"
            onValueChange={(value) => setFilter(value as GeotagKey)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">School-wide</SelectItem>
              <SelectItem value="class9">Class 9</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {data.map((item) => (
            <Dialog key={item.location}>
              <DialogTrigger asChild>
                <div className="flex items-center p-3 transition-colors rounded-lg cursor-pointer hover:bg-secondary">
                  <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                  <div className="flex-1 text-sm font-medium">
                    {item.location}
                  </div>
                  <div className="text-sm font-bold">
                    {item.students} students
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg h-[70vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Marketing Analysis: {item.location}</DialogTitle>
                  <DialogDescription>
                    AI-powered insights to boost admissions from this area.
                  </DialogDescription>
                </DialogHeader>
                <LocationAnalysis locationName={item.location} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
