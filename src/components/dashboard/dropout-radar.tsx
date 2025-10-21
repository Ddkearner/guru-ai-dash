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
import { TrendingDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
                    <p className="text-sm text-muted-foreground">
                      Class {student.class} | Roll No: {student.roll}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-destructive">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    {student.performanceChange}%
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Student Report: {student.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-2">
                  <p><strong>Class:</strong> {student.class}</p>
                  <p><strong>Roll No:</strong> {student.roll}</p>
                  <p><strong>Performance Change:</strong> <span className="font-bold text-destructive">{student.performanceChange}%</span></p>
                  <p className='mt-4 text-muted-foreground text-sm'>Full student report would be displayed here, including attendance, fee status, and discipline records.</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
