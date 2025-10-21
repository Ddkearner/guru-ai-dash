import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dropoutData } from '@/lib/school-data';
import { TrendingDown, ArrowDown, ArrowUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function DropoutRadar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dropout Radar</CardTitle>
        <CardDescription>
          Identifying at-risk students for intervention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dropoutData.map((student) => (
            <Dialog key={student.id}>
              <DialogTrigger asChild>
                <div className="flex items-center gap-4 p-2 transition-colors rounded-lg cursor-pointer hover:bg-secondary">
                  <Avatar>
                    {student.image && (
                      <AvatarImage
                        src={student.image}
                        alt={student.name}
                        data-ai-hint="student portrait"
                      />
                    )}
                    <AvatarFallback>
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Class {student.class} | Roll: {student.roll}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-destructive">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    {student.performanceChange}%
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Student Report: {student.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
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

                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
