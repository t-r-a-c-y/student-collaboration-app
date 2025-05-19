
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, School, MessageSquare, UserPlus, Link as LinkIcon, Github, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const usersData = [
  {
    id: "1",
    name: "Sarah Miller",
    avatar: "https://i.pravatar.cc/300?img=1",
    school: "Stanford University",
    major: "Computer Science",
    location: "Palo Alto, CA",
    skills: ["React", "UX Design", "Python"],
    mutuals: 3,
    projects: 5,
    bio: "CS student passionate about UX design and web development. Currently working on AI-powered educational tools.",
    email: "sarah.miller@example.com",
    github: "sarahmiller",
    website: "sarahmiller.dev",
    recentProjects: [
      { id: "p1", name: "AI Study Assistant", role: "Lead Developer" },
      { id: "p2", name: "Campus Navigation App", role: "UX Designer" },
    ],
    education: [
      { school: "Stanford University", degree: "BS Computer Science", year: "2022 - Present" },
      { school: "Lincoln High School", degree: "High School Diploma", year: "2018 - 2022" }
    ]
  },
  {
    id: "2",
    name: "David Kim",
    avatar: "https://i.pravatar.cc/300?img=3",
    school: "UC Berkeley",
    major: "Data Science",
    location: "Berkeley, CA",
    skills: ["Data Analysis", "Machine Learning", "Visualization"],
    mutuals: 2,
    projects: 4,
    bio: "Data science enthusiast with experience in machine learning and statistical analysis. Looking to collaborate on data-driven projects.",
    email: "david.kim@example.com",
    github: "davidkim",
    website: "davidkim.io",
    recentProjects: [
      { id: "p3", name: "Pandemic Data Visualizer", role: "Data Scientist" },
      { id: "p4", name: "Predictive Learning Model", role: "ML Engineer" },
    ],
    education: [
      { school: "UC Berkeley", degree: "BS Data Science", year: "2021 - Present" },
      { school: "Oakland Technical High School", degree: "High School Diploma", year: "2017 - 2021" }
    ]
  }
];

const schoolsData = [
  {
    id: "1",
    name: "UC Berkeley",
    students: 213,
    projects: 57,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png",
    description: "A public research university in Berkeley, California known for its academic excellence in computer science and engineering.",
    location: "Berkeley, California",
    website: "berkeley.edu",
    foundedYear: 1868,
    programs: ["Computer Science", "Engineering", "Business", "Law", "Data Science"],
    notableFaculty: ["John Doe", "Jane Smith", "Robert Johnson"],
    facilities: ["Computer Labs", "Research Centers", "Libraries", "Student Union"]
  },
  {
    id: "2",
    name: "Stanford University",
    students: 185,
    projects: 64,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
    description: "A private research university in Stanford, California with strong programs in computer science, engineering, and entrepreneurship.",
    location: "Stanford, California",
    website: "stanford.edu",
    foundedYear: 1885,
    programs: ["Computer Science", "Engineering", "Business", "Medicine", "Law"],
    notableFaculty: ["John Smith", "Mary Johnson", "Robert Williams"],
    facilities: ["Research Labs", "Innovation Hub", "Libraries", "Recreation Center"]
  }
];

const ProfileView = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine if we're viewing a user or school profile
  const isSchoolProfile = type === 'school';
  
  // Find the relevant data based on type and id
  const profileData = isSchoolProfile
    ? schoolsData.find(school => school.id === id)
    : usersData.find(user => user.id === id);
  
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar isLoggedIn={true} />
        <div className="p-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold dark:text-white">Profile Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">The profile you're looking for doesn't exist.</p>
            <Button className="mt-4" onClick={() => navigate('/community')}>
              Back to Community
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render different content based on profile type
  const renderContent = () => {
    if (isSchoolProfile) {
      // School profile
      const school = profileData as (typeof schoolsData)[0];
      
      return (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-full md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-white rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center mb-4">
                  <img 
                    src={school.logo} 
                    alt={school.name} 
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold text-center dark:text-white mb-1">{school.name}</h1>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {school.location}
                </div>
                <Button variant="default" className="w-full mb-2">
                  <UserPlus className="h-4 w-4 mr-2" /> Connect
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" /> Message
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Founded</h2>
                  <p className="dark:text-white">{school.foundedYear}</p>
                </div>
                
                <div>
                  <h2 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Website</h2>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    <a 
                      href={`https://${school.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
                    >
                      {school.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-2 dark:text-white">About</h2>
                  <p className="text-gray-700 dark:text-gray-300">{school.description}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold dark:text-white">{school.students}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Students</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold dark:text-white">{school.projects}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Projects</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold dark:text-white">{school.programs.length}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Programs</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="programs">
                    <TabsList className="mb-4">
                      <TabsTrigger value="programs">Programs</TabsTrigger>
                      <TabsTrigger value="faculty">Faculty</TabsTrigger>
                      <TabsTrigger value="facilities">Facilities</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="programs">
                      <div className="flex flex-wrap gap-2">
                        {school.programs.map((program, index) => (
                          <Badge key={index} variant="secondary">{program}</Badge>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="faculty">
                      <ul className="space-y-2">
                        {school.notableFaculty.map((faculty, index) => (
                          <li key={index} className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="dark:text-white">{faculty}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="facilities">
                      <ul className="space-y-2">
                        {school.facilities.map((facility, index) => (
                          <li key={index} className="flex items-center">
                            <School className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="dark:text-white">{facility}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      );
    } else {
      // User profile
      const user = profileData as (typeof usersData)[0];
      
      return (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-full md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-bold text-center dark:text-white mb-1">{user.name}</h1>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <School className="h-4 w-4 mr-1" />
                  {user.school}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </div>
                <Button variant="default" className="w-full mb-2">
                  <UserPlus className="h-4 w-4 mr-2" /> Connect
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" /> Message
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Contact</h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a 
                        href={`mailto:${user.email}`}
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
                      >
                        {user.email}
                      </a>
                    </div>
                    
                    {user.github && (
                      <div className="flex items-center">
                        <Github className="h-4 w-4 mr-2 text-gray-500" />
                        <a 
                          href={`https://github.com/${user.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
                        >
                          {user.github}
                        </a>
                      </div>
                    )}
                    
                    {user.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <a 
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
                        >
                          {user.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-2 dark:text-white">About</h2>
                  <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold dark:text-white">{user.projects}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Projects</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold dark:text-white">{user.mutuals}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Mutual Connections</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4 dark:text-white">Education</h2>
                    <div className="space-y-4">
                      {user.education.map((edu, index) => (
                        <div key={index}>
                          <h3 className="font-medium dark:text-white">{edu.school}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree}</p>
                          <p className="text-xs text-gray-500">{edu.year}</p>
                          {index < user.education.length - 1 && <Separator className="my-3" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4 dark:text-white">Recent Projects</h2>
                    <div className="space-y-4">
                      {user.recentProjects.map((project, index) => (
                        <div key={project.id}>
                          <h3 className="font-medium dark:text-white">{project.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{project.role}</p>
                          {index < user.recentProjects.length - 1 && <Separator className="my-3" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => navigate('/community')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Community
            </Button>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileView;
