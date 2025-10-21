'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Sparkles,
  Send,
  Loader2,
  Plus,
  Mic,
  ChevronDown,
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

  const quickResponses = [
    'Create a summary of this page',
    'Expand on this topic',
  ];

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
        className="meera-ai-panel-dark w-[440px] sm:w-[540px] bg-background text-foreground p-0 border-l border-border"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              Meera AI
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 space-y-6">
            {messages.length === 0 ? (
              <div className="text-center pt-16">
                <h2 className="text-2xl font-semibold">
                  Hi there. What should we dive into today?
                </h2>
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
          <div className="p-6 bg-background">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickResponses.map((text) => (
                <Button
                  key={text}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto"
                  onClick={() => handleSendMessage(text)}
                >
                  {text}
                </Button>
              ))}
            </div>
            <div className="relative">
              <Input
                placeholder="Message Meera or @mention a tab"
                className="pr-10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => handleSendMessage()}
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Quick response
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
