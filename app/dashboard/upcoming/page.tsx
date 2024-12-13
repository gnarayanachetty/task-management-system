import TaskList from '@/components/TaskList';

export default function UpcomingTasksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Tasks</h1>
      <TaskList upcoming={true} />
    </div>
  );
} 