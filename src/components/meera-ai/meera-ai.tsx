'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { MeeraAiPanel } from './meera-ai-panel';

export function MeeraAi() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
        onClick={() => setIsPanelOpen(true)}
      >
        <Sparkles className="w-7 h-7" />
        <span className="sr-only">Open Meera AI</span>
      </Button>
      <MeeraAiPanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
    </>
  );
}
