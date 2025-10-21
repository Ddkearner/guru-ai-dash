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
import { BrainCircuit, Loader2 } from 'lucide-react';
import {
  assessTeacherMorale,
  type AssessTeacherMoraleOutput,
} from '@/ai/flows/assess-teacher-morale';
import { useToast } from '@/hooks/use-toast';
import { teachers } from '@/lib/school-data';

type TeacherPulseState = AssessTeacherMoraleOutput & { isLoading: boolean };

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
      [teacherId]: { ...prev[teacherId], isLoading: true },
    }));

    try {
      const result = await assessTeacherMorale({
        teacherName: teacher.name,
        ...teacher.metrics,
      });
      setPulseData((prev) => ({
        ...prev,
        [teacherId]: { ...result, isLoading: false },
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Teacher Pulse Board</CardTitle>
        <CardDescription>AI-driven morale assessment of staff.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between">
              <div className="font-medium">{teacher.name}</div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAssess(teacher.id)}
                disabled={pulseData[teacher.id]?.isLoading}
              >
                {pulseData[teacher.id]?.isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <BrainCircuit className="w-4 h-4" />
                )}
                <span className="hidden ml-2 sm:inline">Assess</span>
              </Button>
            </div>
            {pulseData[teacher.id] && !pulseData[teacher.id].isLoading && (
              <div className="p-3 mt-2 border rounded-md bg-background">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getPulseColorClass(pulseData[teacher.id].moraleLevel)}`}
                  ></div>
                  <span className="text-sm font-semibold">
                    {pulseData[teacher.id].moraleLevel} Morale
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pulseData[teacher.id].suggestedAction}
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
