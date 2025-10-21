'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Sparkles,
  Send,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { meeraAiChat } from '@/ai/flows/meera-ai-chat';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export function MeeraAiPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const newMessages: Message[] = [...messages, { text, sender: 'user' }];
    setMessages(newMessages);
setInput('');
    setIsLoading(true);

    try {
      const result = await meeraAiChat({ query: text });
      setMessages([
        ...newMessages,
        { text: result.response, sender: 'ai' },
      ]);
    } catch (error) {
      console.error('Meera AI Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get response from Meera AI. Please try again.',
      });
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[440px] sm:w-[540px] bg-background text-foreground p-0 flex flex-col"
      >
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            Meera AI
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="text-center flex flex-col items-center justify-center h-full">
               <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                <Sparkles className="w-8 h-8 text-primary" />
               </div>
              <h2 className="text-xl font-semibold">
                Hi there. I'm Meera.
              </h2>
              <p className="text-muted-foreground mt-1">
                Your personal school operations assistant.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-sm p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
           {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-secondary">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-background border-t">
          <div className="relative">
            <Input
              placeholder="Ask me anything about your school..."
              className="pr-12 h-12"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
