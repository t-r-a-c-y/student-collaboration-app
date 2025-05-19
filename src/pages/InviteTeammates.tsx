
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mail, UserPlus, Users, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';

// Mock data for projects
const myProjects = [
  {
    id: "1",
    title: "Climate Change Awareness App",
    members: 4
  },
  {
    id: "2",
    title: "Student Budget Planner",
    members: 3
  },
  {
    id: "3",
    title: "Campus Event Finder",
    members: 2
  },
];

// Mock data for suggested teammates
const suggestedUsers = [
  {
    id: "1",
    name: "Emma Wilson",
    username: "emma.wilson",
    email: "emma.wilson@university.edu",
    avatar: "https://i.pravatar.cc/300?img=5",
    role: "UX Designer",
    skills: ["UI/UX", "Figma", "Prototyping"]
  },
  {
    id: "2",
    name: "Ryan Martinez",
    username: "ryan.m",
    email: "ryan.martinez@university.edu",
    avatar: "https://i.pravatar.cc/300?img=11",
    role: "Frontend Developer",
    skills: ["React", "JavaScript", "CSS"]
  },
  {
    id: "3",
    name: "Sarah Johnson",
    username: "sjohnson",
    email: "sarah.johnson@university.edu",
    avatar: "https://i.pravatar.cc/300?img=32",
    role: "Backend Developer",
    skills: ["Python", "Node.js", "MongoDB"]
  },
  {
    id: "4",
    name: "Michael Chen",
    username: "mchen",
    email: "michael.chen@university.edu",
    avatar: "https://i.pravatar.cc/300?img=15",
    role: "Data Analyst",
    skills: ["SQL", "R", "Data Visualization"]
  }
];

// Mock data for recent invites
const recentInvites = [
  {
    id: "1",
    name: "David Lee",
    email: "david.lee@university.edu",
    avatar: "https://i.pravatar.cc/300?img=7",
    project: "Climate Change Awareness App",
    status: "pending" as const,
    date: "2025-05-15"
  },
  {
    id: "2",
    name: "Jessica Wong",
    email: "jwong@university.edu",
    avatar: "https://i.pravatar.cc/300?img=23",
    project: "Student Budget Planner",
    status: "accepted" as const,
    date: "2025-05-10"
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.patel@university.edu",
    avatar: "https://i.pravatar.cc/300?img=18",
    project: "Climate Change Awareness App",
    status: "declined" as const,
    date: "2025-05-08"
  }
];

const InviteTeammates = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [emailInvite, setEmailInvite] = useState('');
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter users based on search query
  const filteredUsers = suggestedUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Handle inviting a user
  const handleInviteUser = (userId: string, name: string) => {
    if (!selectedProject) {
      toast({
        title: "Please select a project",
        description: "You need to select a project to invite teammates.",
        variant: "destructive"
      });
      return;
    }
    
    if (invitedUsers.includes(userId)) {
      toast({
        title: "Already invited",
        description: `${name} has already been invited to this project.`
      });
      return;
    }
    
    setInvitedUsers([...invitedUsers, userId]);
    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${name}.`
    });
  };
  
  // Handle sending email invitation
  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProject) {
      toast({
        title: "Please select a project",
        description: "You need to select a project to invite teammates.",
        variant: "destructive"
      });
      return;
    }
    
    if (!emailInvite) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInvite)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${emailInvite}.`
    });
    
    setEmailInvite('');
  };
  
  // Get project name by id
  const getProjectName = (projectId: string) => {
    const project = myProjects.find(p => p.id === projectId);
    return project ? project.title : '';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Invite Teammates</h1>
                <p className="text-gray-600">Find and invite collaborators to your projects</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline" onClick={() => navigate('/projects')}>
                  View My Projects
                </Button>
              </div>
            </div>
            
            {/* Project Selection and Role Filter */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Select Project</h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                    Project
                  </label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {myProjects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Teammate Role
                  </label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="researcher">Researcher</SelectItem>
                      <SelectItem value="project-manager">Project Manager</SelectItem>
                      <SelectItem value="tester">Tester</SelectItem>
                      <SelectItem value="writer">Content Writer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Email Invite Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Invite via Email</h2>
              
              <form onSubmit={handleEmailInvite} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      type="email"
                      placeholder="Enter email address"
                      className="pl-10"
                      value={emailInvite}
                      onChange={(e) => setEmailInvite(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={!selectedProject || !emailInvite}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </form>
            </div>
            
            {/* Teammate Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Find Teammates</h2>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search by name, username, email or skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p>No users found matching your search criteria.</p>
                  </div>
                )}
                
                {filteredUsers.map(user => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between border border-gray-100 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="hidden md:block">
                        <Badge variant="outline" className="mr-1">{user.role}</Badge>
                        {user.skills.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="mr-1">{skill}</Badge>
                        ))}
                        {user.skills.length > 2 && (
                          <Badge variant="secondary">+{user.skills.length - 2}</Badge>
                        )}
                      </div>
                      
                      <Button
                        variant={invitedUsers.includes(user.id) ? "secondary" : "default"}
                        size="sm"
                        onClick={() => handleInviteUser(user.id, user.name)}
                        disabled={invitedUsers.includes(user.id)}
                      >
                        {invitedUsers.includes(user.id) ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Invited
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-1 h-4 w-4" />
                            Invite
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Invitations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Recent Invitations</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvites.map(invite => (
                      <tr key={invite.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                              <img 
                                src={invite.avatar} 
                                alt={invite.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{invite.name}</p>
                              <p className="text-xs text-gray-500">{invite.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{invite.project}</td>
                        <td className="py-3 px-4 text-gray-700">{invite.date}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              invite.status === 'accepted' ? 'success' : 
                              invite.status === 'declined' ? 'destructive' : 
                              'outline'
                            }
                            className={invite.status === 'pending' ? 'text-yellow-600 bg-yellow-50' : ''}
                          >
                            {invite.status === 'accepted' ? 'Accepted' : 
                             invite.status === 'declined' ? 'Declined' : 'Pending'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InviteTeammates;
