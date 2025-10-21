'use client';
import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { TodoList } from '@/components/dashboard/todo-list';
import { AiSummary } from '@/components/dashboard/ai-summary';
import { CalendarWidget } from '@/components/dashboard/calendar-widget';
import { GrowthDashboard } from '@/components/dashboard/growth-dashboard';
import { AdmissionFunnel } from '@/components/dashboard/admission-funnel';
import { ClassGeotag } from '@/components/dashboard/class-geotag';
import { ExamHeatmap } from '@/components/dashboard/exam-heatmap';
import { DropoutRadar } from '@/components/dashboard/dropout-radar';
import { TeacherPulse } from '@/components/dashboard/teacher-pulse';
import { todoTasks as initialTodoTasks, Task } from '@/lib/school-data';
import { MeeraAi } from '@/components/meera-ai/meera-ai';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { AiReportGenerator } from '@/components/dashboard/ai-report-generator';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTodoTasks);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportScope, setReportScope] = useState('School');
  const [isNewAppointmentDialogOpen, setIsNewAppointmentDialogOpen] = useState(false);

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };
  
  const handleGenerateReport = (scope: string) => {
    setReportScope(scope);
    setIsReportDialogOpen(true);
  };

  return (
    <SidebarProvider>
    <div className="flex min-h-screen bg-background">
      <Sidebar>
        {/* Sidebar content will go here */}
      </Sidebar>
      <SidebarInset>
        <DashboardHeader openReportDialog={handleGenerateReport} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <WelcomeHeader 
            onNewTask={() => setIsNewTaskDialogOpen(true)}
            onQuickReport={() => handleGenerateReport('School')}
            onNewEvent={() => setIsNewAppointmentDialogOpen(true)}
          />
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-4">
              <SummaryCards />
            </div>

            <div className="lg:col-span-2">
              <TodoList
                tasks={tasks}
                setTasks={setTasks}
                isDialogOpen={isNewTaskDialogOpen}
                setIsDialogOpen={setIsNewTaskDialogOpen}
              />
            </div>

            <div className="lg:col-span-2">
              <AiSummary />
            </div>

            <div className="lg:col-span-2">
              <GrowthDashboard />
            </div>

            <div className="lg:col-span-2">
              <AdmissionFunnel />
            </div>

            <div className="lg:col-span-2">
              <CalendarWidget 
                isNewAppointmentDialogOpen={isNewAppointmentDialogOpen}
                setIsNewAppointmentDialogOpen={setIsNewAppointmentDialogOpen}
              />
            </div>

            <div className="lg:col-span-2">
              <ClassGeotag />
            </div>

            <div className="lg:col-span-4">
              <ExamHeatmap />
            </div>

            <div className="lg:col-span-2">
              <DropoutRadar />
            </div>

            <div className="lg:col-span-2">
              <TeacherPulse />
            </div>
          </div>
        </main>
        <MeeraAi addTask={addTask} />
        <AiReportGenerator open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen} scope={reportScope} />
      </SidebarInset>
    </div>
    </SidebarProvider>
  );
}
