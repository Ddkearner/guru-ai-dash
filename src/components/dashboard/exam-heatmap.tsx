'use client';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { examHeatmapData, dropoutData, Student } from '@/lib/school-data';
import {
  ArrowUp,
  ArrowDown,
  User,
  Book,
  BrainCircuit,
  Loader2,
  TrendingDown,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateStudentImprovementPlan } from '@/ai/flows/generate-student-improvement-plan';
import type { GenerateStudentImprovementPlanOutput } from '@/ai/schemas/generate-student-improvement-plan-schema';
import { ScrollArea } from '../ui/scroll-area';


function StudentReportDialog({ student, isWeakStudent }: { student: Student, isWeakStudent: boolean }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<GenerateStudentImprovementPlanOutput | null>(null);

  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await generateStudentImprovementPlan({
        studentName: student.name,
        studentClass: student.class,
        attendance: student.attendance,
        performanceChange: student.performanceChange,
        grades: student.grades,
      });
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error generating plan',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <DialogContent className="max-w-md h-[90vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>Student Report: {student.name}</DialogTitle>
      </DialogHeader>
      <ScrollArea className='flex-1 pr-6 -mr-6'>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
              {student.image && <AvatarImage src={student.image} alt={student.name} data-ai-hint="student portrait" />}
              <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p><strong>Class:</strong> {student.class}</p>
              <p><strong>Roll No:</strong> {student.roll}</p>
              <Badge variant={student.attendance < 80 ? 'destructive' : 'secondary'} className='mt-2'>
                Attendance: {student.attendance}%
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 font-semibold">Overall Performance</h4>
            <div className="flex items-center gap-2">
                <Progress value={Math.max(0, 100 + student.performanceChange)} className="h-2" />
                <span className={`font-bold flex items-center ${student.performanceChange < 0 ? 'text-destructive' : 'text-success'}`}>
                  {student.performanceChange < 0 ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                  {student.performanceChange}%
                </span>
            </div>
              <p className='text-xs text-muted-foreground mt-1'>Change in last quarter.</p>
          </div>

          <div>
              <h4 className="mb-2 font-semibold">Subject-wise Grades</h4>
              <div className='grid grid-cols-2 gap-2 sm:gap-4'>
                {student.grades.map(grade => (
                  <div key={grade.subject} className='p-3 rounded-md bg-secondary/50'>
                    <p className='text-sm font-medium'>{grade.subject}</p>
                    <p className={`text-lg font-bold ${grade.score < 50 ? 'text-destructive' : 'text-foreground'}`}>{grade.score}%</p>
                  </div>
                ))}
              </div>
          </div>
          
          <div>
            <h4 className="font-semibold">Fee Status</h4>
            <p className={`text-sm font-medium ${student.feeStatus === 'Paid' ? 'text-success' : 'text-destructive'}`}>{student.feeStatus}</p>
          </div>

          {isWeakStudent && (
            <div className="p-4 border-t">
              <h4 className="mb-3 text-lg font-semibold font-headline">
                AI Improvement Plan
              </h4>
              <Button
                onClick={handleGenerateAnalysis}
                disabled={isLoading}
                className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <BrainCircuit className="w-4 h-4 mr-2" />
                )}
                Generate Personalized Plan
              </Button>

              {analysis && !isLoading && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h5 className="font-semibold">Key Focus Area</h5>
                    <p className="mt-1 text-sm text-muted-foreground">{analysis.keyFocusArea}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold">Actionable Steps</h5>
                     <ul className="mt-2 space-y-2 list-disc list-inside">
                      {analysis.actionableSteps.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}


function StudentBadge({ studentName, isWeak }: { studentName: string; isWeak: boolean }) {
  const student = dropoutData.find((s) => s.name === studentName);

  if (!student) {
    return <Badge variant={isWeak ? 'destructive' : 'outline'}>{studentName}</Badge>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge
          variant={isWeak ? 'destructive' : 'outline'}
          className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-shadow"
        >
          {studentName}
        </Badge>
      </DialogTrigger>
      <StudentReportDialog student={student} isWeakStudent={isWeak} />
    </Dialog>
  );
}


export function ExamHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Exam Heatmap</CardTitle>
        <CardDescription>
          Class-wise performance. Click on a student to see their report.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue={examHeatmapData[0].class}>
          {examHeatmapData.map((item) => (
            <AccordionItem value={item.class} key={item.class}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full pr-4 gap-2 sm:gap-4">
                  <span className='whitespace-nowrap'>{item.class}</span>
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span className="text-success">{item.passed} Passed</span>
                    <span className="text-destructive">{item.failed} Failed</span>
                    <div
                      className={`flex items-center ${item.change >= 0 ? 'text-success' : 'text-destructive'}`}
                    >
                      {item.change >= 0 ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-2 sm:p-4 space-y-4 bg-secondary/50 rounded-md">
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h4 className="mb-2 font-semibold">Subject Performance</h4>
                        <div className="space-y-3">
                            {item.subjects.map(subject => (
                                <div key={subject.name}>
                                    <div className="flex justify-between mb-1 text-sm">
                                        <span>{subject.name}</span>
                                        <span className='font-medium'>{subject.passRate}% Pass</span>
                                    </div>
                                    <Progress value={subject.passRate} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold">Student Lists</h4>
                        <div className='flex gap-2 items-start'>
                           <User className='w-4 h-4 mt-1 text-muted-foreground shrink-0' />
                           <div>
                             <p className='text-sm text-muted-foreground'>Toppers</p>
                             <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                                {item.toppers.map(name => <StudentBadge key={name} studentName={name} isWeak={false} />)}
                             </div>
                           </div>
                        </div>
                         <div className='flex gap-2 items-start mt-3'>
                           <User className='w-4 h-4 mt-1 text-muted-foreground shrink-0' />
                           <div>
                             <p className='text-sm text-muted-foreground'>Weakest Students</p>
                             <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                                {item.weakest.map(name => <StudentBadge key={name} studentName={name} isWeak={true} />)}
                             </div>
                           </div>
                        </div>
                         <div className='flex gap-2 items-start mt-3'>
                           <Book className='w-4 h-4 mt-1 text-muted-foreground shrink-0' />
                           <div>
                             <p className='text-sm text-muted-foreground'>Most Failed Subject</p>
                             <Badge variant='secondary' className='mt-1 text-xs sm:text-sm'>{item.mostFailedSubject}</Badge>
                           </div>
                        </div>
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
