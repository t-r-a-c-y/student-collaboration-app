
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, UserPlus, MessageSquare, School, Briefcase, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

// Mock community data
const usersData = [
  {
    id: "1",
    name: "Sarah Miller",
    avatar: "https://i.pravatar.cc/300?img=1",
    school: "Adventist University of Central Africa ",
    major: "Computer Science",
    location: "Kigali, Rwanda",
    skills: ["React", "UX Design", "Python"],
    mutuals: 3,
    projects: 5,
    bio: "CS student passionate about UX design and web development. Currently working on AI-powered educational tools."
  },
  {
    id: "2",
    name: "David Kim",
    avatar: "https://i.pravatar.cc/300?img=3",
    school: "African Leadership University",
    major: "Data Science",
    location: "Kigali, Rwanda",
    skills: ["Data Analysis", "Machine Learning", "Visualization"],
    mutuals: 2,
    projects: 4,
    bio: "Data science enthusiast with experience in machine learning and statistical analysis. Looking to collaborate on data-driven projects."
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/300?img=5",
    school: "",
    major: "Computer Engineering",
    location: "Cambridge, MA",
    skills: ["IoT", "Embedded Systems", "C++"],
    mutuals: 0,
    projects: 3,
    bio: "Computer engineering student specializing in IoT and embedded systems. Currently developing smart home automation solutions."
  },
  {
    id: "4",
    name: "Ryan Moore",
    avatar: "https://i.pravatar.cc/300?img=8",
    school: "UCLA",
    major: "Design & Media Arts",
    location: "Los Angeles, CA",
    skills: ["UI Design", "Illustration", "Prototyping"],
    mutuals: 1,
    projects: 6,
    bio: "Designer passionate about creating engaging and accessible user interfaces. Looking for technical collaborators for creative projects."
  },
  {
    id: "5",
    name: "Mia Chen",
    avatar: "https://i.pravatar.cc/300?img=10",
    school: "Harvard University",
    major: "Computer Science & Business",
    location: "Boston, MA",
    skills: ["Project Management", "Full-stack", "Entrepreneurship"],
    mutuals: 2,
    projects: 8,
    bio: "Studying CS and business with a focus on building tech startups. Experienced in managing cross-functional project teams."
  },
  {
    id: "6",
    name: "James Thompson",
    avatar: "https://i.pravatar.cc/300?img=11",
    school: "UC San Diego",
    major: "Cognitive Science",
    location: "San Diego, CA",
    skills: ["UX Research", "Accessibility", "Prototyping"],
    mutuals: 4,
    projects: 3,
    bio: "Cognitive science student focusing on human-computer interaction and accessible design. Love collaborating on projects that improve user experience."
  }
];

const schoolsData = [
  {
    id: "1",
    name: "UC Berkeley",
    students: 213,
    projects: 57,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png",
    description: "A public research university in Berkeley, California known for its academic excellence in computer science and engineering."
  },
  {
    id: "2",
    name: "Stanford University",
    students: 185,
    projects: 64,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
    description: "A private research university in Stanford, California with strong programs in computer science, engineering, and entrepreneurship."
  },
  {
    id: "3",
    name: "MIT",
    students: 142,
    projects: 78,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png",
    description: "A private research university in Cambridge, Massachusetts focused on scientific, engineering, and technological education and research."
  },
  {
    id: "4",
    name: "Harvard University",
    students: 128,
    projects: 41,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Harvard_Crimson_logo.svg/1200px-Harvard_Crimson_logo.svg.png",
    description: "A private Ivy League research university in Cambridge, Massachusetts with a diverse range of programs and research opportunities."
  }
];

const Community = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Filter users based on search query
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.school.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Filter schools based on search query
  const filteredSchools = schoolsData.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle click on user card
  const handleUserClick = (userId: string) => {
    navigate(`/profile/user/${userId}`);
  };
  
  // Handle click on school card
  const handleSchoolClick = (schoolId: string) => {
    navigate(`/profile/school/${schoolId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold dark:text-white">Community</h1>
              <p className="text-gray-600 dark:text-gray-300">Connect with students and explore schools</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="w-full md:w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search students, schools, skills..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline">
                  <Filter size={16} className="mr-2" /> Filter
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="students">
              <TabsList className="mb-6">
                <TabsTrigger value="students">
                  <Users size={16} className="mr-2" /> Students
                </TabsTrigger>
                <TabsTrigger value="schools">
                  <School size={16} className="mr-2" /> Schools
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="students">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 mb-2">No students found matching your search.</p>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map(user => (
                      <Card 
                        key={user.id} 
                        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                                <img 
                                  src={user.avatar} 
                                  alt={user.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg dark:text-white">{user.name}</h3>
                                
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  <School size={14} className="mr-1" />
                                  {user.school} • {user.major}
                                </div>
                                
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  <MapPin size={14} className="mr-1" />
                                  {user.location}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {user.bio}
                              </p>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-xs font-medium mb-2 dark:text-gray-400">Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {user.skills.map(skill => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <div>
                                <span className="font-medium text-gray-900 dark:text-gray-200">{user.projects}</span> Projects
                              </div>
                              <div>
                                {user.mutuals > 0 ? (
                                  <span><span className="font-medium text-gray-900 dark:text-gray-200">{user.mutuals}</span> mutual connections</span>
                                ) : (
                                  <span>No mutual connections</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                            <Button size="sm" className="flex-1">
                              <UserPlus size={16} className="mr-2" /> Connect
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageSquare size={16} className="mr-2" /> Message
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="schools">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                  {filteredSchools.map(school => (
                    <Card 
                      key={school.id} 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleSchoolClick(school.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
                            <img 
                              src={school.logo} 
                              alt={school.name} 
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg dark:text-white">{school.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {school.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                            <p className="text-2xl font-semibold dark:text-white">{school.students}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Students</p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                            <p className="text-2xl font-semibold dark:text-white">{school.projects}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Projects</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button size="sm">
                            View School Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;
