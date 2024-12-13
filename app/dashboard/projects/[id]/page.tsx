import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { taskApi } from '@/lib/api';
import type { CreateTaskData } from '@/lib/api';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      _count: {
        select: { tasks: true },
      },
    },
  });

  if (!project) notFound();
  return project;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        {project.description && (
          <p className="mt-2 text-gray-600">{project.description}</p>
        )}
        <div className="mt-2 text-sm text-gray-500">
          {project._count.tasks} tasks
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add Task to Project</h2>
          <TaskForm 
            projectId={project.id} 
            onSubmit={async (data: CreateTaskData) => {
              try {
                await taskApi.create({ ...data, projectId: project.id });
                // Handle success
              } catch (error) {
                console.error('Error creating task:', error);
              }
            }} 
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>
          <TaskList projectId={project.id} />
        </div>
      </div>
    </div>
  );
} 