'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { todoTasks, Task } from '@/lib/school-data';

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(todoTasks);

  const handleTaskCompletion = (taskId: string) => {
    // Optimistically update UI and remove after a delay
    const taskElement = document.getElementById(`task-wrapper-${taskId}`);
    if (taskElement) {
      taskElement.classList.add('opacity-0', 'translate-x-full');
    }
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }, 300);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">What To Do Today</CardTitle>
        <CardDescription>Your smart to-do list for the day.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                id={`task-wrapper-${task.id}`}
                className="flex items-start gap-4 p-3 transition-all duration-300 ease-in-out rounded-lg hover:bg-secondary"
              >
                <div className="flex items-center h-5 pt-1">
                  <Checkbox
                    id={task.id}
                    onCheckedChange={() => handleTaskCompletion(task.id)}
                    aria-label={`Mark "${task.title}" as complete`}
                  />
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
                <task.icon className="w-5 h-5 ml-auto text-muted-foreground shrink-0" />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <span className="text-4xl">🎉</span>
              <p className="mt-2 font-medium">All tasks completed!</p>
              <p className="text-sm">Great job staying on top of things.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
