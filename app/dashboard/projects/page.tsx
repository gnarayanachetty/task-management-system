import ProjectForm from '@/components/ProjectForm';
import ProjectList from '@/components/ProjectList';

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <ProjectForm onSubmit={async (data) => {
              try {
                const response = await fetch('/api/projects', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
                if (!response.ok) throw new Error('Failed to create project');
                // Handle success (e.g., show notification, refresh project list)
              } catch (error) {
                console.error('Error creating project:', error);
              }
            }} />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
          <ProjectList />
        </div>
      </div>
    </div>
  );
} 