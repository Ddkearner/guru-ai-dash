'use client';
import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { meeraAiChat } from '@/ai/flows/meera-ai-chat';
import type { MeeraAiChatOutput } from '@/ai/schemas/meera-ai-chat-schema';
import { todoTasks as allTasks, type Task } from '@/lib/school-data';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';

type Message = {
  id: number;
  sender: 'user' | 'ai';
  content: MeeraAiChatOutput | string;
};

function TodoListComponent({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center text-muted-foreground">
        <span className="text-2xl">🎉</span>
        <p className="mt-2 font-medium">All tasks completed!</p>
        <p className="text-sm">Great job staying on top of things.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-4 p-3 transition-all duration-300 ease-in-out rounded-lg"
        >
          <div className="flex items-center h-5 pt-1">
            <Checkbox id={task.id} disabled aria-label={`Task checkbox`} />
          </div>
          <div className="grid flex-1 gap-0.5 leading-none">
            <Link href={task.href} passHref>
              <label
                htmlFor={task.id}
                className="font-medium cursor-pointer hover:underline"
              >
                {task.title}
              </label>
            </Link>
            <Link href={task.href} passHref>
              <p className="text-sm cursor-pointer text-muted-foreground">
                {task.description}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

const ConfirmAddTaskComponent = ({ task, onConfirm }: { task: Task; onConfirm: () => void }) => {
  return (
    <div className="p-3 rounded-lg border bg-background/50">
        <p className="text-sm font-medium">Ready to add this task?</p>
        <div className="my-2 p-2 border-l-2 border-primary">
            <p className="font-semibold">{task.title}</p>
            <p className="text-xs text-muted-foreground">{task.description}</p>
        </div>
        <Button onClick={onConfirm} size="sm" className="w-full">
            Yes, add task
        </Button>
    </div>
  );
}

const componentMap = {
  'todo-list': TodoListComponent,
  'confirm-add-task': ConfirmAddTaskComponent,
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

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now(), sender: 'user', content: text },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await meeraAiChat({ query: text });
      setMessages([
        ...newMessages,
        { id: Date.now() + 1, sender: 'ai', content: result },
      ]);
    } catch (error) {
      console.error('Meera AI Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get response from Meera AI. Please try again.',
      });
      setMessages(newMessages); // Revert to previous state on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConfirmAddTask = (task: Task) => {
    // This is a placeholder. In a real app, you'd lift this state up.
    console.log("Task confirmed:", task);
    toast({
        title: "Task Added!",
        description: `"${task.title}" has been added to your to-do list.`,
    });
    // Remove the confirmation message and add a confirmation text
    setMessages(prev => [
        ...prev.filter(m => {
            if (typeof m.content !== 'string' && m.content.component === 'confirm-add-task') {
                return false;
            }
            return true;
        }),
        { id: Date.now(), sender: 'ai', content: { component: 'text', props: { text: `Great, I've added "${task.title}" to your to-do list.` } } }
    ]);
  }

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
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Hi there. I'm Meera.</h2>
              <p className="text-muted-foreground mt-1">
                Your personal school operations assistant.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
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
                    {typeof msg.content === 'string' ? (
                       <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    ) : msg.content.component === 'text' ? (
                      <p className="text-sm whitespace-pre-wrap">{msg.content.props.text}</p>
                    ) : (
                      (() => {
                        const Component = componentMap[msg.content.component as keyof typeof componentMap];
                        const props: any = msg.content.props;

                        if (msg.content.component === 'confirm-add-task') {
                            props.onConfirm = () => handleConfirmAddTask(props.task);
                        }

                        return Component ? <Component {...props} /> : null;
                      })()
                    )}
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
