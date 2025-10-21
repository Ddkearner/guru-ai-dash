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
import { examHeatmapData } from '@/lib/school-data';
import { ArrowUp, ArrowDown, User, Book } from 'lucide-react';
import { Badge } from '../ui/badge';

export function ExamHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Exam Heatmap</CardTitle>
        <CardDescription>
          Class-wise performance and subject analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {examHeatmapData.map((item) => (
            <AccordionItem value={item.class} key={item.class}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span>{item.class}</span>
                  <div className="flex items-center gap-4 text-sm">
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
              <AccordionContent className="p-2 space-y-4 bg-secondary/50 rounded-md">
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
                           <User className='w-4 h-4 mt-1 text-muted-foreground' />
                           <div>
                             <p className='text-sm text-muted-foreground'>Toppers</p>
                             <div className="flex flex-wrap gap-2 mt-1">
                                {item.toppers.map(name => <Badge variant='outline' key={name}>{name}</Badge>)}
                             </div>
                           </div>
                        </div>
                         <div className='flex gap-2 items-start mt-3'>
                           <User className='w-4 h-4 mt-1 text-muted-foreground' />
                           <div>
                             <p className='text-sm text-muted-foreground'>Weakest Students</p>
                             <div className="flex flex-wrap gap-2 mt-1">
                                {item.weakest.map(name => <Badge variant='destructive' key={name}>{name}</Badge>)}
                             </div>
                           </div>
                        </div>
                         <div className='flex gap-2 items-start mt-3'>
                           <Book className='w-4 h-4 mt-1 text-muted-foreground' />
                           <div>
                             <p className='text-sm text-muted-foreground'>Most Failed Subject</p>
                             <Badge variant='secondary' className='mt-1'>{item.mostFailedSubject}</Badge>
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
