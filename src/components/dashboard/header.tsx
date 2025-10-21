import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpenCheck } from 'lucide-react';
import { AiReportGenerator } from './ai-report-generator';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpenCheck className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold md:text-2xl font-headline text-foreground">
          Veritas AI
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <AiReportGenerator />
        <Avatar>
          <AvatarImage
            src="https://picsum.photos/seed/principal/100/100"
            alt="Principal"
            data-ai-hint="person"
          />
          <AvatarFallback>PA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
