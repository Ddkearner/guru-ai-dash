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
import { Task } from '@/lib/school-data';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { PersonStanding } from 'lucide-react';

export function TodoList({
  tasks,
  setTasks,
  isDialogOpen,
  setIsDialogOpen,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleTaskCompletion = (taskId: string) => {
    const taskElement = document.getElementById(`task-wrapper-${taskId}`);
    if (taskElement) {
      taskElement.classList.add('opacity-0', 'translate-x-full');
    }
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }, 300);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `user-task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDescription,
      icon: PersonStanding,
      href: '#',
      isUserAdded: true,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline">What To Do Today</CardTitle>
              <CardDescription>
                Your smart to-do list for the day.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  id={`task-wrapper-${task.id}`}
                  className={`flex items-start gap-4 p-3 transition-all duration-300 ease-in-out rounded-lg hover:bg-secondary ${
                    task.isUserAdded ? 'bg-primary/5 border-l-4 border-primary/50' : ''
                  }`}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new task</DialogTitle>
            <DialogDescription>
              What do you need to get done?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Call the PTA president"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="col-span-3"
                placeholder="(Optional) Add more details..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
