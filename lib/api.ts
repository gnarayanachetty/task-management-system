import { Project, Task, Priority, Status } from '@prisma/client';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export async function fetchApi<T>(
  endpoint: string,
  method: RequestMethod = 'GET',
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'An error occurred');
  }

  return response.json();
}

// Task API functions
export type CreateTaskData = {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
  projectId: string;
};

export const taskApi = {
  create: (data: CreateTaskData) => fetchApi<Task>('/api/tasks', 'POST', data),
  update: (id: string, data: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => 
    fetchApi<Task>(`/api/tasks/${id}`, 'PATCH', data),
  delete: (id: string) => fetchApi<Task>(`/api/tasks/${id}`, 'DELETE'),
  get: (id: string) => fetchApi<Task>(`/api/tasks/${id}`),
  getAll: () => fetchApi<Task[]>('/api/tasks'),
};

// Project API functions
export const projectApi = {
  create: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Project>('/api/projects', 'POST', data),
  update: (id: string, data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) => 
    fetchApi<Project>(`/api/projects/${id}`, 'PATCH', data),
  delete: (id: string) => fetchApi<Project>(`/api/projects/${id}`, 'DELETE'),
  get: (id: string) => fetchApi<Project>(`/api/projects/${id}`),
  getAll: () => fetchApi<Project[]>('/api/projects'),
}; 