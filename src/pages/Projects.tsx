
import React, { useState } from 'react';
import { PlusCircle, Search, Filter, ArrowDownAZ, Clock, Grid3X3, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Mock project data
const projectsData = [
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
  },
  {
    id: "3",
    title: "Campus Navigation AR",
    description: "Augmented reality application to help new students navigate campus buildings and facilities.",
    tags: ["AR", "Mobile", "UX Design"],
    memberCount: 5,
    dueDate: "Sep 5",
    progress: 25,
  },
  {
    id: "4",
    title: "Study Group Matcher",
    description: "Platform to help students find study partners based on courses, schedules, and learning preferences.",
    tags: ["Web", "Education", "Algorithm"],
    memberCount: 3,
    dueDate: "Jul 30",
    progress: 80,
  },
  {
    id: "5",
    title: "Research Paper Assistant",
    description: "AI-powered tool that helps students organize research materials and generate citations.",
    tags: ["AI", "Research", "Web"],
    memberCount: 2,
    dueDate: "Aug 25",
    progress: 15,
  },
  {
    id: "6",
    title: "Campus Events App",
    description: "Mobile application to discover, filter, and bookmark campus events and activities.",
    tags: ["Mobile", "UX Design", "Social"],
    memberCount: 4,
    dueDate: "Sep 10",
    progress: 50,
  }
];

const Projects = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('all'); // 'all', 'in-progress', 'completed', 'archived'
  const [sortOrder, setSortOrder] = useState('name-asc'); // 'name-asc', 'name-desc', 'recent', 'due-date', 'progress'
  
  // Filter projects by search query and filter type
  const filteredProjects = projectsData.filter(project => {
    // Search filter
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    let matchesType = true;
    if (filterType === 'in-progress') {
      matchesType = project.progress > 0 && project.progress < 100;
    } else if (filterType === 'completed') {
      matchesType = project.progress === 100;
    } else if (filterType === 'archived') {
      matchesType = false; // No archived projects in our mock data
    }
    
    return matchesSearch && matchesType;
  });
  
  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOrder) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'recent':
        // Using IDs as proxy for recency in this mock
        return parseInt(b.id) - parseInt(a.id);
      case 'due-date':
        // Simplified due date comparison for this mock
        return a.dueDate.localeCompare(b.dueDate);
      case 'progress':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  // Handle filter selection
  const handleFilterSelect = (type: string) => {
    setFilterType(type);
    toast({
      title: "Projects filtered",
      description: `Showing ${type} projects`,
    });
  };
  
  // Handle sort selection
  const handleSortSelect = (order: string) => {
    setSortOrder(order);
    toast({
      title: "Projects sorted",
      description: `Sorted by ${order.replace('-', ' ')}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold dark:text-white">My Projects</h1>
                <p className="text-gray-600 dark:text-gray-300">View and manage all your projects</p>
              </div>
              
              <Button size="default" onClick={() => navigate('/create-project')}>
                <PlusCircle size={16} className="mr-2" /> New Project
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="w-full md:w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input 
                    placeholder="Search projects..." 
                    className="pl-9 bg-white dark:bg-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter size={16} className="mr-2" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => handleFilterSelect('all')}>
                        All Projects
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterSelect('in-progress')}>
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterSelect('completed')}>
                        Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterSelect('archived')}>
                        Archived
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Created by me</DropdownMenuItem>
                      <DropdownMenuItem>Shared with me</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <ArrowDownAZ size={16} className="mr-2" /> Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleSortSelect('name-asc')}>
                      Name (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortSelect('name-desc')}>
                      Name (Z-A)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortSelect('recent')}>
                      <Clock size={16} className="mr-2" /> Recently Updated
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortSelect('due-date')}>
                      Due Date (Earliest)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortSelect('progress')}>
                      Progress (Highest)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex items-center border rounded-md overflow-hidden dark:border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}
                  >
                    <Grid3X3 size={16} className="dark:text-white" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}
                  >
                    <List size={16} className="dark:text-white" />
                  </button>
                </div>
              </div>
            </div>
            
            {sortedProjects.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-2">No projects found matching your search.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                }}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {sortedProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    {...project} 
                    className={viewMode === 'list' ? 'flex flex-col md:flex-row md:items-center' : ''}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
