import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import { Toaster } from '../components/ui/Toaster';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative pt-16">
        <BackgroundBeams />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
}; 