
import React, { useState } from 'react';
import { PlusSquare, X, Check, Clock, Flag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskCard from '@/components/TaskCard';
import { useToast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  assignee?: {
    name: string;
    avatar?: string;
  };
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design login screen",
    description: "Create wireframes and high-fidelity mockups for user login flow",
    dueDate: "May 12",
    priority: "high",
    status: "in-progress",
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  },
  {
    id: "2",
    title: "Implement API integration",
    description: "Connect front-end to backend data sources",
    dueDate: "May 15",
    priority: "medium",
    status: "todo",
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  },
  {
    id: "3",
    title: "Write user documentation",
    dueDate: "May 18",
    priority: "low",
    status: "todo",
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  }
];

const TaskManagement = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  });
  
  // Function to add a new task
  const handleAddTask = () => {
    if (!newTask.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive"
      });
      return;
    }
    
    const task: Task = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: (newTask.priority || 'medium') as 'low' | 'medium' | 'high',
      status: (newTask.status || 'todo') as 'todo' | 'in-progress' | 'completed',
      assignee: newTask.assignee
    };
    
    setTasks([...tasks, task]);
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      assignee: {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/300?img=12"
      }
    });
    
    toast({
      title: "Task added",
      description: "New task has been added successfully"
    });
  };
  
  // Handle task status change
  const handleTaskStatusChange = (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task updated",
      description: `Task status changed to ${newStatus.replace('-', ' ')}`
    });
  };
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white">Tasks</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusSquare size={16} className="mr-2" /> Add Task
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task for this project
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the task"
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value: 'low' | 'medium' | 'high') => 
                      setNewTask({...newTask, priority: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newTask.status} 
                    onValueChange={(value: 'todo' | 'in-progress' | 'completed') => 
                      setNewTask({...newTask, status: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="dueDate"
                    type="date"
                    className="pl-10"
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleAddTask} disabled={!newTask.title}>
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
            <Clock size={16} />
            <span className="font-medium">To Do</span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
              {todoTasks.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {todoTasks.map(task => (
              <div key={task.id} className="relative group">
                <TaskCard {...task} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-2 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="text-xs"
                    onClick={() => handleTaskStatusChange(task.id, 'in-progress')}
                  >
                    Start Task
                  </Button>
                </div>
              </div>
            ))}
            
            {todoTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No tasks to do yet
              </div>
            )}
          </div>
        </div>
        
        {/* In Progress Column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <ChevronDown size={16} />
            <span className="font-medium">In Progress</span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
              {inProgressTasks.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {inProgressTasks.map(task => (
              <div key={task.id} className="relative group">
                <TaskCard {...task} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-2 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="text-xs"
                    onClick={() => handleTaskStatusChange(task.id, 'todo')}
                  >
                    Move Back
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="text-xs bg-green-600 hover:bg-green-700"
                    onClick={() => handleTaskStatusChange(task.id, 'completed')}
                  >
                    Complete
                  </Button>
                </div>
              </div>
            ))}
            
            {inProgressTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No tasks in progress
              </div>
            )}
          </div>
        </div>
        
        {/* Completed Column */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-400">
            <Check size={16} />
            <span className="font-medium">Completed</span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {completedTasks.map(task => (
              <div key={task.id} className="relative group">
                <TaskCard {...task} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => handleTaskStatusChange(task.id, 'in-progress')}
                  >
                    Reopen Task
                  </Button>
                </div>
              </div>
            ))}
            
            {completedTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No completed tasks yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
