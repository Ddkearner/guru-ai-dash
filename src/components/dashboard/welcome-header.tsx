'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  CalendarPlus,
  UserPlus,
  FileText,
  CheckSquare,
  BarChart,
} from 'lucide-react';

type WelcomeHeaderProps = {
  onNewTask: () => void;
  onQuickReport: () => void;
  onNewEvent: () => void;
};

export function WelcomeHeader({ onNewTask, onQuickReport, onNewEvent }: WelcomeHeaderProps) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'EEEE, MMMM do, yyyy'));
  }, []);

  const handleActionClick = (action: string) => {
    // This is a placeholder for actions that are not yet implemented.
    alert(`Action clicked: ${action}`);
  };

  return (
    <div className="p-6 rounded-lg border shadow-sm bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <h2 className="text-2xl font-bold text-white font-headline">
        Welcome back, Principal!
      </h2>
      <p className="mt-1 text-blue-200">
        Here's your overview for {currentDate}. Let's make it a great day.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ActionButton icon={PlusCircle} label="New Task" onClick={onNewTask} />
        <ActionButton icon={CalendarPlus} label="New Event" onClick={onNewEvent} />
        <ActionButton icon={UserPlus} label="Add Student" onClick={() => handleActionClick("Add Student")} />
        <ActionButton icon={FileText} label="Quick Report" onClick={onQuickReport} />
        <ActionButton icon={CheckSquare} label="Attendance" onClick={() => handleActionClick("Attendance")} />
        <ActionButton icon={BarChart} label="View Reports" onClick={onQuickReport} />
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      className="flex-row items-center justify-start h-8 px-2 py-1 text-white transition-all rounded-md bg-white/5 hover:bg-white/10 border border-white/10"
      onClick={onClick}
    >
      <Icon className="w-3.5 h-3.5 mr-1.5" />
      <span className="text-[11px] font-medium text-center whitespace-nowrap">{label}</span>
    </Button>
  );
}
