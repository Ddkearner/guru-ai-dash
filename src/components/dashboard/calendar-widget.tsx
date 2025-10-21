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
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Appointment = {
    time: string;
    title: string;
};

const initialAppointments: Appointment[] = [
  { time: '10:00 AM', title: 'Meeting with PTA President' },
  { time: '02:00 PM', title: 'Interview for Science Teacher post' },
  { time: '04:30 PM', title: 'Vendor discussion for new benches' },
];

export function CalendarWidget({
    isNewAppointmentDialogOpen,
    setIsNewAppointmentDialogOpen,
}: {
    isNewAppointmentDialogOpen: boolean;
    setIsNewAppointmentDialogOpen: (open: boolean) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState(initialAppointments);
  const [newAptTitle, setNewAptTitle] = useState('');
  const [newAptTime, setNewAptTime] = useState('');


  const handleAddAppointment = () => {
    if (!newAptTitle.trim() || !newAptTime.trim()) return;
    const newAppointment: Appointment = {
      title: newAptTitle,
      time: newAptTime,
    };
    // sort appointments by time
    const sortedAppointments = [...appointments, newAppointment].sort((a, b) => {
        const aTime = new Date(`1970-01-01 ${a.time}`);
        const bTime = new Date(`1970-01-01 ${b.time}`);
        return aTime.getTime() - bTime.getTime();
    });

    setAppointments(sortedAppointments);
    setNewAptTitle('');
    setNewAptTime('');
    setIsNewAppointmentDialogOpen(false);
  };


  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Calendar & Appointments</CardTitle>
                <CardDescription>
                Schedule and view your important events.
                </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsNewAppointmentDialogOpen(true)}>
                <Plus className='w-4 h-4 mr-2' />
                New Appointment
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 lg:flex-row">
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
              <Badge variant="secondary" className="font-mono text-primary text-xs">
                {apt.time}
              </Badge>
              <p className="text-sm">{apt.title}</p>
            </div>
          ))}
           {appointments.length === 0 && <p className='text-sm text-muted-foreground'>No appointments for today.</p>}
        </div>
      </CardContent>
    </Card>
     <Dialog open={isNewAppointmentDialogOpen} onOpenChange={setIsNewAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a New Appointment</DialogTitle>
            <DialogDescription>
              Schedule your next event for today.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apt-title" className="text-right">
                Title
              </Label>
              <Input
                id="apt-title"
                value={newAptTitle}
                onChange={(e) => setNewAptTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Board Meeting"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apt-time" className="text-right">
                Time
              </Label>
              <Input
                id="apt-time"
                type="time"
                value={newAptTime}
                onChange={(e) => setNewAptTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAppointment}>Add Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
