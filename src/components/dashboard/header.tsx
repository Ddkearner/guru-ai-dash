import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons/logo';
import { AiReportGenerator } from './ai-report-generator';
import { Button } from '../ui/button';
import { Wand } from 'lucide-react';

export function DashboardHeader({ openReportDialog }: { openReportDialog: () => void }) {
  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <div className="p-1 rounded-lg bg-primary/10">
          <Logo className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold md:text-2xl font-headline text-foreground">
          Gurukul AI
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={openReportDialog}>
            <Wand className="w-4 h-4 mr-2" />
            AI School Report
        </Button>
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
