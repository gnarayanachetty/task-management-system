'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { projectApi } from '@/lib/api';
import SearchBar from './SearchBar';

interface Project {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count: {
    tasks: number;
  };
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const data = (await projectApi.getAll() as unknown) as Project[];
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (query: string) => {
    const searchResults = projects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(searchResults);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will delete all tasks in this project.')) return;

    try {
      await projectApi.delete(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Project>) => {
    try {
      const updated = await projectApi.update(id, data);
      setProjects(projects.map(project => 
        project.id === id ? { ...project, ...updated } : project
      ));
      setEditingProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="space-y-4">
      <SearchBar 
        onSearch={handleSearch}
        placeholder="Search projects by name or description..."
      />
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No projects found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              {editingProject?.id === project.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      name: e.target.value
                    })}
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <textarea
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })}
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(project.id, editingProject)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="bg-gray-300 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    </Link>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {project.description && (
                    <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{project._count.tasks} tasks</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 