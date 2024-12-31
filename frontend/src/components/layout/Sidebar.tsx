import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Files, 
  Settings, 
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Job Hub', path: '/dashboard' },
    { icon: <FileText />, label: 'Resume', path: '/resume' },
    { icon: <Files />, label: 'Cover Letters', path: '/cover-letters' },
    { icon: <MessageSquare />, label: 'Support', path: '/support' },
    { icon: <Settings />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-4 text-white">
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold">AICareer</Link>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? 'bg-indigo-600'
                    : 'hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={logout}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 mt-auto absolute bottom-4 w-52"
      >
        <LogOut />
        <span>Sign Out</span>
      </button>
    </div>
  );
}