import type { Task } from '../tasks/schemas';
import { TaskCard } from '../tasks/components/TaskCard';

type KanbanColumnProps = {
  titulo: string;
  tasks: Task[];
  accentClass: string;
  proximoStatus?: string;
  anteriorStatus?: string;
};

export const KanbanColumn = ({
  titulo,
  tasks,
  accentClass,
  proximoStatus,
  anteriorStatus,
}: KanbanColumnProps) => (
  <div className="min-w-[260px] flex-1">
    <div className={`h-1 rounded-t-md ${accentClass}`} />
    <div className="flex items-center justify-between rounded-b-md border border-t-0 border-hairline bg-surface px-3 py-2">
      <span className="font-mono text-xs uppercase tracking-wide text-ink-muted">
        {titulo}
      </span>
      <span className="font-mono text-xs text-ink-muted">{tasks.length}</span>
    </div>
    <ul className="mt-3 space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          proximoStatus={proximoStatus}
          anteriorStatus={anteriorStatus}
        />
      ))}
    </ul>
  </div>
);
