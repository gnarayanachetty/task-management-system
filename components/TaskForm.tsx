'use client';

import { useState } from 'react';
import { Priority, Status } from '@prisma/client';
import { taskApi } from '@/lib/api';
import { CreateTaskData } from '@/lib/api';

interface TaskFormProps {
  projectId: string;
  onSuccess?: () => void;
  onSubmit?: (data: CreateTaskData) => Promise<void>;
}

export default function TaskForm({ projectId, onSuccess, onSubmit }: TaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: CreateTaskData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      priority: formData.get('priority') as Priority,
      dueDate: formData.get('dueDate') as string,
      status: Status.TODO,
      projectId
    };

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        await taskApi.create(data);
      }
      e.currentTarget.reset();
      onSuccess?.();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          name="title"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          name="description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            name="priority"
          >
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            name="dueDate"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
} 