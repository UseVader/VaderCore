
import { Link } from 'react-router-dom';
import { FileCog, Clock } from 'lucide-react';
import { Project } from '@/types/Project';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <div className="glass-card hover-card p-6 h-full">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-foreground truncate">{project.name}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {project.description || 'No description provided.'}
        </p>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <FileCog size={16} className="text-primary" />
            <span className="text-xs">{project.scriptsCount} scripts</span>
          </div>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock size={14} className="text-primary/80" />
            <span className="text-xs">
              {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
