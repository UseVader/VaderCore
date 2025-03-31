import { Link } from "react-router-dom";
import { Terminal, Clock, Tag } from "lucide-react";
import { Script } from "@/types/Script";
import { formatDistanceToNow } from "date-fns";

interface ScriptCardProps {
  script: Script;
  projectId: string;
}

const ScriptCard = ({ script, projectId }: ScriptCardProps) => {
  return (
    <Link to={`/projects/${projectId}/scripts/${script.id}`}>
      <div className="glass-card hover-card p-6 h-full">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg truncate">{script.name}</h3>
          <div className="flex items-center justify-center w-7 h-7 bg-secondary rounded-full">
            <Terminal size={14} />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {script.description || "No description provided."}
        </p>

        {script.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {script.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center space-x-1 text-xs px-2 py-1 bg-secondary rounded-full"
              >
                <Tag size={10} />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Terminal size={16} />
            <span className="text-xs">{script.commands.length} commands</span>
          </div>

          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock size={14} />
            <span className="text-xs">
              {formatDistanceToNow(new Date(script.updatedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScriptCard;
