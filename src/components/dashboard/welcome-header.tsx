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

export function WelcomeHeader() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'EEEE, MMMM do, yyyy'));
  }, []);

  const handleActionClick = (action: string) => {
    // TODO: This is a placeholder. In a real app, you'd trigger
    // the corresponding functionality, e.g., by calling a function
    // passed down via props or using a global state manager.
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
      <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 max-w-lg">
        {/* TODO: Wire these buttons up to their respective functionalities */}
        <ActionButton icon={PlusCircle} label="New Task" onClick={() => handleActionClick("New Task")} />
        <ActionButton icon={CalendarPlus} label="New Event" onClick={() => handleActionClick("New Event")} />
        <ActionButton icon={UserPlus} label="Add Student" onClick={() => handleActionClick("Add Student")} />
        <ActionButton icon={FileText} label="Quick Report" onClick={() => handleActionClick("Quick Report")} />
        <ActionButton icon={CheckSquare} label="Attendance" onClick={() => handleActionClick("Attendance")} />
        <ActionButton icon={BarChart} label="View Reports" onClick={() => handleActionClick("View Reports")} />
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center justify-center h-16 gap-1 p-1 text-white transition-all rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[10px] font-medium text-center">{label}</span>
    </Button>
  );
}
