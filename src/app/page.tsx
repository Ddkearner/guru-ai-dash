import { DashboardHeader } from '@/components/dashboard/header';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { TodoList } from '@/components/dashboard/todo-list';
import { AiSummary } from '@/components/dashboard/ai-summary';
import { CalendarWidget } from '@/components/dashboard/calendar-widget';
import { GrowthRadar } from '@/components/dashboard/growth-radar';
import { AdmissionFunnel } from '@/components/dashboard/admission-funnel';
import { ClassGeotag } from '@/components/dashboard/class-geotag';
import { ExamHeatmap } from '@/components/dashboard/exam-heatmap';
import { DropoutRadar } from '@/components/dashboard/dropout-radar';
import { TeacherPulse } from '@/components/dashboard/teacher-pulse';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-4">
            <SummaryCards />
          </div>

          <div className="lg:col-span-2">
            <TodoList />
          </div>

          <div className="lg:col-span-2">
            <AiSummary />
          </div>

          <div className="lg:col-span-2">
            <GrowthRadar />
          </div>

          <div className="lg:col-span-2">
            <AdmissionFunnel />
          </div>

          <div className="lg:col-span-2">
            <CalendarWidget />
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
    </div>
  );
}
