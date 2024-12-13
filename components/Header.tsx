'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              Task Manager
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/projects" 
              className="text-gray-600 hover:text-gray-900"
            >
              Projects
            </Link>
          </nav>

          <ThemeToggle />

          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <span className="text-gray-700">{session.user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 