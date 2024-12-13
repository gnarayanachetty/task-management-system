import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { taskApi } from '@/lib/api';
import type { CreateTaskData } from '@/lib/api';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
          <TaskForm projectId="default" onSubmit={async (data: CreateTaskData) => {
            try {
              await taskApi.create(data);
              // Handle success (e.g., show notification, refresh task list)
            } catch (error) {
              console.error('Error creating task:', error);
            }
          }} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
} 