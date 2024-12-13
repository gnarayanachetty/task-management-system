'use client';

import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
                <TaskForm projectId="default" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
                <TaskList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}