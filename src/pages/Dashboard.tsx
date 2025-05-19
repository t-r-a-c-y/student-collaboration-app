
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Bell, 
  Search, 
  Menu, 
  Check,
  ChevronRight,
  PlusSquare,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const myProjects = [
  {
    id: "1",
    title: "Climate Change Awareness App",
    description: "Mobile app to educate users about climate change impacts and suggest daily actions.",
    tags: ["Mobile", "Educational", "Environment"],
    memberCount: 4,
    dueDate: "Aug 15",
    progress: 65,
  },
  {
    id: "2",
    title: "Student Budget Planner",
    description: "Web application helping students track expenses and plan budgets effectively.",
    tags: ["Web", "Finance", "React"],
    memberCount: 3,
    dueDate: "Jul 20",
    progress: 40,
  }
];

const tasks = [
  {
    id: "1",
    title: "Design login screen",
    description: "Create wireframes and high-fidelity mockups for user login flow",
    dueDate: "May 12",
    priority: "high" as const,
    status: "in-progress" as const,
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  },
  {
    id: "2",
    title: "Implement API integration",
    description: "Connect front-end to backend data sources",
    dueDate: "May 15",
    priority: "medium" as const,
    status: "todo" as const,
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  },
  {
    id: "3",
    title: "Write user documentation",
    dueDate: "May 18",
    priority: "low" as const,
    status: "todo" as const,
    assignee: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12"
    }
  }
];

const notifications = [
  {
    id: "1",
    title: "New message from Sarah",
    time: "10 minutes ago",
    read: false
  },
  {
    id: "2",
    title: "Project deadline reminder: Climate App",
    time: "2 hours ago",
    read: false
  },
  {
    id: "3",
    title: "Ryan accepted your invitation",
    time: "1 day ago",
    read: true
  },
  {
    id: "4",
    title: "Team meeting scheduled for tomorrow",
    time: "2 days ago",
    read: true
  }
];

const invitations = [
  {
    id: "1",
    projectName: "AI Study Assistant",
    from: "Emma Wilson",
    avatar: "https://i.pravatar.cc/300?img=5"
  },
  {
    id: "2",
    projectName: "AR Campus Tour",
    from: "Jason Miller",
    avatar: "https://i.pravatar.cc/300?img=11"
  }
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [acceptedInvitations, setAcceptedInvitations] = useState<string[]>([]);
  const [declinedInvitations, setDeclinedInvitations] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle invitation actions
  const handleAcceptInvitation = (id: string, projectName: string) => {
    setAcceptedInvitations([...acceptedInvitations, id]);
    toast({
      title: "Invitation accepted",
      description: `You've joined the ${projectName} project.`,
    });
  };
  
  const handleDeclineInvitation = (id: string) => {
    setDeclinedInvitations([...declinedInvitations, id]);
    toast({
      title: "Invitation declined",
      description: "The invitation has been declined.",
    });
  };
  
  // Filter invitations to show only those that haven't been accepted or declined
  const pendingInvitations = invitations.filter(
    inv => !acceptedInvitations.includes(inv.id) && !declinedInvitations.includes(inv.id)
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between mb-6">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/300?img=12" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome back, Alex!</h1>
              <p className="text-gray-600">Here's what's happening with your projects today.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/300?img=12" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Alex Johnson</h2>
                      <p className="text-gray-500 text-sm">Computer Science • Berkeley</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Link to="/profile">Edit</Link>
                  </Button>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">UX Design</Badge>
                    <Badge variant="secondary">API Integration</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">+3</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold mb-2">Stats</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-gray-50 rounded-md">
                      <p className="font-semibold text-primary">7</p>
                      <p className="text-xs text-gray-500">Projects</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <p className="font-semibold text-primary">12</p>
                      <p className="text-xs text-gray-500">Tasks</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md">
                      <p className="font-semibold text-primary">5</p>
                      <p className="text-xs text-gray-500">Teams</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Current Projects (Col span 2 on large screens) */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Projects</h2>
                  <Button onClick={() => navigate('/create-project')}>
                    <PlusCircle size={16} className="mr-2" /> New Project
                  </Button>
                </div>
                
                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myProjects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
                
                <Link 
                  to="/projects" 
                  className="mt-4 flex items-center justify-center text-primary hover:text-primary/80 text-sm font-medium pt-4 border-t border-gray-100"
                >
                  View All Projects <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tasks Section */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Tasks</h2>
                  <Button variant="outline" size="sm">
                    <PlusSquare size={16} className="mr-2" /> Add Task
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                  ))}
                </div>
                
                <Link 
                  to="/tasks" 
                  className="mt-4 flex items-center justify-center text-primary hover:text-primary/80 text-sm font-medium pt-4 border-t border-gray-100"
                >
                  View All Tasks <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
              
              {/* Notifications and Invitations */}
              <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Notifications</h2>
                  
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start gap-3 p-2 rounded-md ${
                          !notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-2 h-2 mt-2 rounded-full ${!notification.read ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Check size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to="/notifications" 
                    className="mt-4 flex items-center justify-center text-primary hover:text-primary/80 text-sm font-medium pt-4 border-t border-gray-100"
                  >
                    View All <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
                
                {/* Invitations */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Invitations</h2>
                  
                  {pendingInvitations.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <p>No pending invitations</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingInvitations.map(invitation => (
                        <div key={invitation.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                              <img 
                                src={invitation.avatar} 
                                alt={invitation.from} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{invitation.projectName}</p>
                              <p className="text-sm text-gray-500">From {invitation.from}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleAcceptInvitation(invitation.id, invitation.projectName)}
                            >
                              Accept
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleDeclineInvitation(invitation.id)}
                            >
                              <X size={16} className="mr-1" /> Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
