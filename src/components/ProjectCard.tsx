
import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  memberCount: number;
  dueDate?: string;
  progress?: number;
  featured?: boolean;
  className?: string; // Added className prop
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  tags,
  memberCount,
  dueDate,
  progress,
  featured = false,
  className = '', // Added className prop with default empty string
}: ProjectCardProps) => {
  return (
    <div className={`rounded-lg overflow-hidden border bg-card shadow-sm card-hover ${featured ? 'border-primary/20' : ''} ${className}`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      
      <div className="p-5">
        {featured && <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">Featured</Badge>}
        
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="bg-gray-50">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full"
                style={{ width: `${progress}%` }}  
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            <span>{memberCount} member{memberCount !== 1 ? 's' : ''}</span>
          </div>
          
          {dueDate && (
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{dueDate}</span>
            </div>
          )}
        </div>
        
        <Link to={`/project/${id}`} className="btn-primary mt-4 block text-center">
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
