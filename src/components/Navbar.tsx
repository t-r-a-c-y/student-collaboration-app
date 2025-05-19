
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from './ThemeToggle';
import { useUserRole } from '@/contexts/UserRoleContext';

const Navbar = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userRole } = useUserRole();
  
  const isCollaborator = userRole === 'collaborator';

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm py-3 transition-colors duration-300">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">StudentSpark</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary font-medium">Home</Link>
          {!isLoggedIn && (
            <Link to="/about" className="text-foreground hover:text-primary font-medium">About</Link>
          )}
          
          {isLoggedIn ? (
            <>
              <Link to="/projects" className="text-foreground hover:text-primary font-medium">Projects</Link>
              <Link to="/community" className="text-foreground hover:text-primary font-medium">Community</Link>
            </>
          ) : null}
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <>
              <Link to="/notifications" className="p-2 rounded-full hover:bg-muted relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 py-1 px-3 rounded-full border hover:bg-muted">
                  <div className="w-8 h-8 bg-muted rounded-full overflow-hidden">
                    <User size={20} className="w-full h-full p-1" />
                  </div>
                  <span className="font-medium text-foreground">{isCollaborator ? "Dr. John" : "John D."}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-md shadow-md py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Profile</Link>
                  <Link to={isCollaborator ? "/collaborator" : "/dashboard"} className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Dashboard</Link>
                  <Link to="/messages" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Messages</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Settings</Link>
                  <div className="border-t border-border my-1"></div>
                  {isCollaborator ? (
                    <div className="block px-4 py-2 text-sm text-primary font-medium">Collaborator View</div>
                  ) : (
                    <Link to="/collaborator" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Collaborator View</Link>
                  )}
                  <div className="border-t border-border my-1"></div>
                  <Link to="/" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">Log Out</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2 rounded-md hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-foreground font-medium py-2 hover:text-primary">Home</Link>
            {!isLoggedIn && (
              <Link to="/about" className="text-foreground font-medium py-2 hover:text-primary">About</Link>
            )}
            
            {isLoggedIn ? (
              <>
                <Link to="/projects" className="text-foreground font-medium py-2 hover:text-primary">Projects</Link>
                <Link to="/community" className="text-foreground font-medium py-2 hover:text-primary">Community</Link>
                <Link to="/notifications" className="text-foreground font-medium py-2 hover:text-primary">
                  Notifications <span className="bg-red-500 text-white rounded-full px-2 text-xs ml-2">3</span>
                </Link>
                <hr className="my-2 border-border" />
                <Link to={isCollaborator ? "/collaborator" : "/dashboard"} className="text-foreground font-medium py-2 hover:text-primary">Dashboard</Link>
                <Link to="/profile" className="text-foreground font-medium py-2 hover:text-primary">Profile</Link>
                <Link to="/messages" className="text-foreground font-medium py-2 hover:text-primary">Messages</Link>
                <Link to="/settings" className="text-foreground font-medium py-2 hover:text-primary">Settings</Link>
                {isCollaborator ? (
                  <div className="text-primary font-medium py-2">Collaborator View</div>
                ) : (
                  <Link to="/collaborator" className="text-foreground font-medium py-2 hover:text-primary">Collaborator View</Link>
                )}
                <button className="text-left text-foreground font-medium py-2 hover:text-primary">Log Out</button>
              </>
            ) : (
              <>
                <hr className="my-2 border-border" />
                <Link to="/login" className="text-primary font-medium py-2">Log In</Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
