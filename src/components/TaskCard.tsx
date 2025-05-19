
import React from 'react';
import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
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

const TaskCard = ({
  title,
  description,
  dueDate,
  priority,
  status,
  assignee
}: TaskCardProps) => {
  const priorityClasses = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };
  
  const statusClasses = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <Badge className={priorityClasses[priority]}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className={statusClasses[status]}>
          {statusLabels[status]}
        </Badge>
        
        {dueDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{dueDate}</span>
          </div>
        )}
      </div>
      
      {assignee && (
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-2">
            {assignee.avatar ? (
              <img 
                src={assignee.avatar} 
                alt={assignee.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="w-full h-full p-1" />
            )}
          </div>
          <span className="text-xs text-gray-600">{assignee.name}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
