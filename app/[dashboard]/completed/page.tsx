import TaskList from '@/components/TaskList';

export default function CompletedTasksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>
      <TaskList status="COMPLETED" />
    </div>
  );
} 