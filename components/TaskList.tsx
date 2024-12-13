'use client';

import { useState, useEffect } from 'react';
import { Task, Priority, Status } from '@prisma/client';
import { taskApi } from '@/lib/api';
import SearchBar from './SearchBar';

interface TaskListProps {
  projectId?: string;
  status?: Status;
  upcoming?: boolean;
}

export default function TaskList({ projectId, status, upcoming }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await taskApi.getAll() as Task[];
      const filteredData = filterTasks(data);
      setTasks(filteredData);
      setFilteredTasks(filteredData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = (tasksToFilter: Task[]) => {
    return tasksToFilter.filter(task => {
      if (status && task.status !== status) return false;
      if (upcoming && !isUpcoming(task.dueDate)) return false;
      if (projectId && task.projectId !== projectId) return false;
      return true;
    });
  };

  const isUpcoming = (dueDate: Date | null) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId, status, upcoming]);

  const handleSearch = (query: string) => {
    const searchResults = tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(searchResults);
  };

  const handleStatusChange = async (taskId: string, status: Status) => {
    try {
      await taskApi.update(taskId, { status });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskApi.delete(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="space-y-4">
      <SearchBar 
        onSearch={handleSearch}
        placeholder="Search tasks by title or description..."
      />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{task.title}</h3>
              <div className="flex space-x-2">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value as Status)}
                  className="text-sm border rounded-md px-2 py-1"
                >
                  {Object.values(Status).map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            
            {task.description && (
              <p className="mt-2 text-gray-600 dark:text-gray-200">{task.description}</p>
            )}
            
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              {task.dueDate && (
                <span className="text-gray-500 dark:text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
} 