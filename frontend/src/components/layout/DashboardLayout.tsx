import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.displayName || 'User'}
        </h1>
        <p className="text-gray-400">Manage your resumes and applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Resumes */}
        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Resumes</h2>
          <div className="space-y-4">
            {/* Placeholder pour les CV récents */}
            <p className="text-gray-400">No resumes yet. Create your first one!</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-left">
              Create New Resume
            </button>
            <button className="w-full p-3 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-left">
              Generate Cover Letter
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Resumes</p>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 