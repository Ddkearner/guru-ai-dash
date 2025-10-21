'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { MeeraAiPanel } from './meera-ai-panel';
import type { Task } from '@/lib/school-data';


export function MeeraAi({ addTask }: { addTask: (task: Task) => void }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white hover:opacity-90 transition-opacity"
        size="icon"
        onClick={() => setIsPanelOpen(true)}
      >
        <Sparkles className="w-7 h-7" />
        <span className="sr-only">Open Guru AI</span>
      </Button>
      <MeeraAiPanel open={isPanelOpen} onOpenChange={setIsPanelOpen} addTask={addTask} />
    </>
  );
}
