
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Users, 
  Calendar, 
  Settings,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const Sidebar = ({ isOpen, onClose, userName = "User" }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [displayName, setDisplayName] = useState(userName);

  useEffect(() => {
    // Update displayName when userName prop changes
    setDisplayName(userName);
  }, [userName]);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Projects", path: "/projects", icon: FolderOpen },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Community", path: "/community", icon: Users },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Invite Teammates", path: "/invite-teammates", icon: UserPlus },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:sticky top-0 md:top-16 left-0 z-40 md:z-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/300?img=12" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{displayName}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Berkeley University</p>
              </div>
            </div>
            <Link 
              to="/profile" 
              className="text-xs text-primary mt-2 flex items-center justify-end"
            >
              Edit Profile <ChevronRight size={12} className="ml-1" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon size={18} className="mr-3" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Link to="/invite-teammates">
              <button className="w-full px-3 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium flex items-center justify-center">
                <UserPlus size={16} className="mr-2" /> Invite Teammates
              </button>
            </Link>
            <button className="w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm flex items-center justify-center">
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;