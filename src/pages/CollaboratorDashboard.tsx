import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Clock, Users, FileText, Star, BarChart, PieChart, LineChart, 
  Briefcase, GraduationCap, Plus, Calendar, MessageSquare, Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ProjectCard from '@/components/ProjectCard';
import { useToast } from '@/hooks/use-toast';

// Mock data
const recentProjects = [
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

const upcomingEvents = [
  { id: '1', title: 'Team Call: Campus Navigation AR', date: 'Today, 3:00 PM' },
  { id: '2', title: 'Mentor Session: Project Planning', date: 'Tomorrow, 2:30 PM' },
  { id: '3', title: 'Workshop: Frontend Development', date: 'July 15, 10:00 AM' },
];

const studentStats = [
  { id: '1', name: 'Total Students', value: '2,457', change: '+12%', icon: Users },
  { id: '2', name: 'Active Projects', value: '76', change: '+5%', icon: Briefcase },
  { id: '3', name: 'Universities', value: '32', change: '+3%', icon: GraduationCap },
  { id: '4', name: 'Completed Projects', value: '124', change: '+18%', icon: Award },
];

const CollaboratorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handler for creating a new project
  const handleCreateProject = () => {
    navigate('/create-project');
  };
  
  // Handler for exporting a report
  const handleExportReport = () => {
    toast({
      title: "Report Export Started",
      description: "Your report is being generated and will download shortly.",
    });
    
    // Simulate a download after a short delay
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: "Your report has been successfully downloaded.",
      });
    }, 2000);
  };

  // Handler for viewing all projects
  const handleViewAllProjects = () => {
    navigate('/projects');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6 pt-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">Collaborator Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's an overview of student projects and activities.</p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleExportReport}>
                  <FileText size={16} className="mr-2" /> Export Report
                </Button>
                <Button onClick={handleCreateProject}>
                  <Plus size={16} className="mr-2" /> New Project
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {studentStats.map((stat) => (
                <Card key={stat.id}>
                  <CardContent className="p-6 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <div className="flex items-baseline mt-1">
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-md">
                      <stat.icon size={20} className="text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Larger Cards Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Projects Overview */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-xl">Projects Overview</CardTitle>
                      <CardDescription>Ongoing student project status</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Weekly
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-gray-100">
                        Monthly
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300 mb-4">
                      <div className="text-center p-6">
                        <BarChart size={48} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Project completion chart would appear here</p>
                        <p className="text-sm text-gray-400 mt-2">(Visualization implemented with chart library)</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2">
                        <div className="text-2xl font-bold text-blue-600">42</div>
                        <div className="text-xs text-gray-500">In Progress</div>
                      </div>
                      <div className="p-2">
                        <div className="text-2xl font-bold text-amber-600">18</div>
                        <div className="text-xs text-gray-500">Needs Review</div>
                      </div>
                      <div className="p-2">
                        <div className="text-2xl font-bold text-green-600">16</div>
                        <div className="text-xs text-gray-500">Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Active Students */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-xl">Active Students</CardTitle>
                      <CardDescription>Student engagement this month</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-2" /> Full Report
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                      <div className="text-center p-6">
                        <LineChart size={48} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Student engagement chart would appear here</p>
                        <p className="text-sm text-gray-400 mt-2">(Visualization implemented with chart library)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Projects */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Projects</h2>
                    <Button 
                      variant="link" 
                      onClick={handleViewAllProjects}
                      className="text-primary text-sm hover:underline p-0"
                    >
                      View all projects
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentProjects.map(project => (
                      <ProjectCard 
                        key={project.id} 
                        {...project} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar Content */}
              <div className="space-y-8">
                {/* School Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">School Distribution</CardTitle>
                    <CardDescription>Top 5 participating schools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300 mb-4">
                      <div className="text-center p-4">
                        <PieChart size={40} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">School distribution chart</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">West Valley High School</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Eastside Academy</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Northridge Tech</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Upcoming Events */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Upcoming Events</CardTitle>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex gap-4 items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar size={16} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <p className="text-xs text-gray-500">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3">
                    <Link to="/events" className="text-primary text-sm hover:underline">
                      View all events
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Recent Messages */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Recent Messages</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => navigate('/messages')}
                      >
                        <MessageSquare size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <img src="https://i.pravatar.cc/300?img=1" alt="Sarah" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">Sarah Chen</h4>
                            <span className="text-xs text-gray-500">10m</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1">I've added some notes on the project brief...</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <img src="https://i.pravatar.cc/300?img=3" alt="David" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">David Kim</h4>
                            <span className="text-xs text-gray-500">1h</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1">When is our next team meeting scheduled?</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <img src="https://i.pravatar.cc/300?img=5" alt="Emma" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">Emma Wilson</h4>
                            <span className="text-xs text-gray-500">3h</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1">I've submitted my part of the project report...</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <Link to="/messages" className="text-primary text-sm hover:underline">
                      View all messages
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;
