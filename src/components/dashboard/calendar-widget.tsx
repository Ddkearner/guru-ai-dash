'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

const appointments = [
  { time: '10:00 AM', title: 'Meeting with PTA President' },
  { time: '02:00 PM', title: 'Interview for Science Teacher post' },
  { time: '04:30 PM', title: 'Vendor discussion for new benches' },
];

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Calendar & Appointments</CardTitle>
        <CardDescription>
          Schedule and view your important events.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 md:flex-row">
        <div className="flex justify-center">
            <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0 rounded-md"
            />
        </div>
        <div className="flex-1 pt-2 space-y-4">
          <h3 className="text-sm font-medium text-foreground">
            Today's Appointments
          </h3>
          {appointments.map((apt) => (
            <div key={apt.title} className="flex items-center gap-4">
              <Badge variant="secondary" className="font-mono text-primary">
                {apt.time}
              </Badge>
              <p className="text-sm">{apt.title}</p>
            </div>
          ))}
           {appointments.length === 0 && <p className='text-sm text-muted-foreground'>No appointments for today.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
