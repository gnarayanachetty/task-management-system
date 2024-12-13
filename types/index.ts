import { Task, Project, User } from '@prisma/client';

export interface TaskWithProject extends Task {
  project: Project;
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
  _count: {
    tasks: number;
  };
}

export interface SessionUser extends User {
  email: string;
  name: string | null;
} 