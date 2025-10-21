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
import { BrainCircuit, Loader2, ChevronDown, X } from 'lucide-react';
import {
  assessTeacherMorale,
} from '@/ai/flows/assess-teacher-morale';
import type { AssessTeacherMoraleOutput } from '@/ai/schemas/assess-teacher-morale-schema';
import { useToast } from '@/hooks/use-toast';
import { teachers } from '@/lib/school-data';
import { cn } from '@/lib/utils';

type TeacherPulseState = AssessTeacherMoraleOutput & { 
  isLoading: boolean;
  isExpanded: boolean;
};

export function TeacherPulse() {
  const [pulseData, setPulseData] = useState<Record<string, TeacherPulseState>>(
    {}
  );
  const { toast } = useToast();

  const getPulseColorClass = (level?: string) => {
    switch (level) {
      case 'High':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Low':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const handleAssess = async (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (!teacher) return;

    setPulseData((prev) => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], isLoading: true, detailedAnalysis: '', suggestedAction: '', moraleLevel: '', isExpanded: false },
    }));

    try {
      const result = await assessTeacherMorale({
        teacherName: teacher.name,
        ...teacher.metrics,
      });
      setPulseData((prev) => ({
        ...prev,
        [teacherId]: { ...result, isLoading: false, isExpanded: false },
      }));
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error assessing morale',
        description:
          'Could not connect to the AI service. Please try again later.',
      });
      setPulseData((prev) => ({
        ...prev,
        [teacherId]: { ...prev[teacherId], isLoading: false },
      }));
    }
  };

  const toggleExpand = (teacherId: string) => {
    setPulseData(prev => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], isExpanded: !prev[teacherId].isExpanded }
    }));
  };

  const closeAnalysis = (teacherId: string) => {
    const { [teacherId]: _, ...rest } = pulseData;
    setPulseData(rest);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Teacher Pulse Board</CardTitle>
        <CardDescription>AI-driven morale assessment of staff.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teachers.map((teacher) => {
          const currentPulse = pulseData[teacher.id];

          return (
            <div key={teacher.id} className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-between">
                <div className="font-medium">{teacher.name}</div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAssess(teacher.id)}
                  disabled={currentPulse?.isLoading}
                >
                  {currentPulse?.isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BrainCircuit className="w-4 h-4" />
                  )}
                  <span className="hidden ml-2 sm:inline">Assess</span>
                </Button>
              </div>
              {currentPulse && !currentPulse.isLoading && currentPulse.moraleLevel && (
                <div className="p-3 mt-2 space-y-3 border rounded-md bg-background relative">
                  <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => closeAnalysis(teacher.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getPulseColorClass(currentPulse.moraleLevel)}`}
                    ></div>
                    <span className="text-sm font-semibold pr-6">
                      {currentPulse.moraleLevel} Morale
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Analysis Summary</h4>
                    <p className={cn("mt-1 text-sm text-muted-foreground", !currentPulse.isExpanded && "line-clamp-2")}>
                      {currentPulse.detailedAnalysis}
                    </p>
                  </div>
                  <div className={cn('transition-all duration-300', currentPulse.isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden')}>
                    <h4 className="text-sm font-semibold">Suggested Action</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {currentPulse.suggestedAction}
                    </p>
                  </div>
                   <Button
                    variant="link"
                    onClick={() => toggleExpand(teacher.id)}
                    className="p-0 h-auto text-sm"
                  >
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 mr-1 transition-transform',
                        currentPulse.isExpanded && 'rotate-180'
                      )}
                    />
                    {currentPulse.isExpanded ? 'Show Less' : 'Show More'}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

    