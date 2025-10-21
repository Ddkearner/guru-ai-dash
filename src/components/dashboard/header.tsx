import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Wand } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { examHeatmapData } from '@/lib/school-data';
import { SidebarTrigger } from '../ui/sidebar';

export function DashboardHeader({ openReportDialog }: { openReportDialog: (scope: string) => void }) {
  const classes = examHeatmapData.map(c => c.class);

  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-xl font-bold md:text-2xl font-headline text-foreground">
          Gurukul AI
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white hover:opacity-90 transition-opacity">
              <Wand className="w-4 h-4 mr-2" />
              AI School Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => openReportDialog('School')}>
              School-wide Report
            </DropdownMenuItem>
            {classes.map(className => (
              <DropdownMenuItem key={className} onSelect={() => openReportDialog(className)}>
                {className} Report
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
