import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, FileText, MessageSquare, Settings, Send, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import TaskManagement from '@/components/TaskManagement';
import FileUpload from '@/components/FileUpload';

// Mock project data (you would normally fetch this based on the projectId)
const projectData = {
  id: "1",
  title: "Climate Change Awareness App",
  description: "Mobile application designed to educate users about climate change impacts and suggest daily actions that can be taken to reduce carbon footprint. The app will include interactive visualizations, personalized recommendations, and community features.",
  tags: ["Mobile", "Educational", "Environment", "React Native"],
  memberCount: 4,
  dueDate: "Aug 15, 2023",
  progress: 65,
  members: [
    { id: "1", name: "Alex Johnson", role: "Project Lead", avatar: "https://i.pravatar.cc/300?img=12" },
    { id: "2", name: "Emma Davis", role: "UX Designer", avatar: "https://i.pravatar.cc/300?img=5" },
    { id: "3", name: "Ryan Smith", role: "Developer", avatar: "https://i.pravatar.cc/300?img=11" },
    { id: "4", name: "Sophia Chen", role: "Content Writer", avatar: "https://i.pravatar.cc/300?img=9" }
  ]
};

// Task completion data for chart
const taskCompletionData = [
  { name: 'Week 1', completed: 5, total: 8 },
  { name: 'Week 2', completed: 7, total: 10 },
  { name: 'Week 3', completed: 4, total: 12 },
  { name: 'Week 4', completed: 9, total: 15 },
];

// Task status distribution for pie chart
const taskStatusData = [
  { name: 'Completed', value: 12, color: '#10b981' },
  { name: 'In Progress', value: 8, color: '#3b82f6' },
  { name: 'To Do', value: 5, color: '#6b7280' },
];

// Define the type for discussion
interface DiscussionAuthor {
  name: string;
  avatar: string;
  role: string;
}

interface DiscussionReply {
  id: string;
  author: DiscussionAuthor;
  content: string;
  timestamp: string;
}

interface Discussion {
  id: string;
  author: DiscussionAuthor;
  content: string;
  timestamp: string;
  replies: DiscussionReply[];
  title?: string; // Make title optional since not all discussions have it
}

// Mock discussions data
const discussionsData: Discussion[] = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/300?img=12",
      role: "Project Lead"
    },
    content: "I've updated the project timeline. We should be able to deliver the first prototype by next week. Any thoughts on the new UI designs?",
    timestamp: "2 days ago",
    replies: [
      {
        id: "1.1",
        author: {
          name: "Emma Davis",
          avatar: "https://i.pravatar.cc/300?img=5",
          role: "UX Designer"
        },
        content: "The designs look good! I've made some minor adjustments to the navigation flow. Will share the updated mockups tomorrow.",
        timestamp: "1 day ago"
      },
      {
        id: "1.2",
        author: {
          name: "Ryan Smith",
          avatar: "https://i.pravatar.cc/300?img=11",
          role: "Developer"
        },
        content: "Great, looking forward to seeing the updates. I'm working on the backend integration and should have something to show by Friday.",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/300?img=9",
      role: "Content Writer"
    },
    content: "I've drafted the content for the onboarding screens. Please review and let me know if any changes are needed. Also, should we include more statistics in the dashboard view?",
    timestamp: "3 days ago",
    replies: []
  }
];

const ProjectPage = () => {
  const { projectId } = useParams();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [discussionsList, setDiscussionsList] = useState<Discussion[]>(discussionsData);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  
  const handleCreateDiscussion = () => {
    if (newDiscussion.trim() === "") return;
    
    // Add the new discussion to the state
    const newDiscussionObj: Discussion = {
      id: String(discussionsList.length + 1),
      author: {
        name: "John D.",
        avatar: "https://i.pravatar.cc/300?img=11",
        role: "Student"
      },
      content: newDiscussion,
      timestamp: "Just now",
      replies: []
    };
    
    setDiscussionsList([newDiscussionObj, ...discussionsList]);
    setNewDiscussion("");
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion.",
    });
  };
  
  const handleCreateNewTopic = () => {
    if (newTopicTitle.trim() === "" || newTopicContent.trim() === "") return;
    
    // Add the new topic to the state
    const newTopicObj: Discussion = {
      id: String(discussionsList.length + 1),
      author: {
        name: "John D.",
        avatar: "https://i.pravatar.cc/300?img=11",
        role: "Student"
      },
      content: newTopicContent,
      title: newTopicTitle,
      timestamp: "Just now",
      replies: []
    };
    
    setDiscussionsList([newTopicObj, ...discussionsList]);
    setNewTopicTitle("");
    setNewTopicContent("");
    setShowNewTopicForm(false);
    
    toast({
      title: "New topic created",
      description: "Your topic has been added to the discussion board.",
    });
  };
  
  const handleReply = (discussionId: string) => {
    if (replyText.trim() === "") return;
    
    // Add the reply to the discussion
    const updatedDiscussions = discussionsList.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          replies: [
            ...discussion.replies,
            {
              id: `${discussionId}.${discussion.replies.length + 1}`,
              author: {
                name: "John D.",
                avatar: "https://i.pravatar.cc/300?img=11",
                role: "Student"
              },
              content: replyText,
              timestamp: "Just now"
            }
          ]
        };
      }
      return discussion;
    });
    
    setDiscussionsList(updatedDiscussions);
    setReplyText("");
    setReplyingTo(null);
    
    toast({
      title: "Reply posted",
      description: "Your reply has been added to the discussion.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Project Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold dark:text-white">{projectData.title}</h1>
                    <Badge className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                      Active
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{projectData.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projectData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>Due {projectData.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>{projectData.memberCount} members</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="flex -space-x-2">
                    {projectData.members.slice(0, 4).map((member) => (
                      <div 
                        key={member.id} 
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                        title={member.name}
                      >
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {projectData.members.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                        +{projectData.members.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
                  <span className="font-medium dark:text-white">{projectData.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${projectData.progress}%` }}  
                  />
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="dashboard" className="rounded-md">
                  <BarChart className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-md">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Tasks</span>
                </TabsTrigger>
                <TabsTrigger value="files" className="rounded-md">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Files</span>
                </TabsTrigger>
                <TabsTrigger value="discussions" className="rounded-md">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Discussions</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-md">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Dashboard Tab Content */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Task Completion Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Task Completion</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={taskCompletionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" fill="#94a3b8" name="Total Tasks" />
                          <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Task Status Pie Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Task Status Distribution</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={taskStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Activity</h3>
                  <div className="space-y-4">
                    {/* Activity items would go here */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm dark:text-white">
                          <span className="font-medium">Alex Johnson</span> completed task <span className="font-medium">Design Login Screen</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm dark:text-white">
                          <span className="font-medium">Emma Davis</span> uploaded <span className="font-medium">mockups.fig</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-green-500 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm dark:text-white">
                          <span className="font-medium">Ryan Smith</span> joined the project
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Tasks Tab Content */}
              <TabsContent value="tasks">
                <TaskManagement />
              </TabsContent>
              
              {/* Files Tab Content */}
              <TabsContent value="files">
                <FileUpload />
              </TabsContent>
              
              {/* Discussions Tab Content */}
              <TabsContent value="discussions">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Project Discussions</h2>
                    <Button onClick={() => setShowNewTopicForm(true)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Topic
                    </Button>
                  </div>
                  
                  {/* Create new topic form */}
                  {showNewTopicForm && (
                    <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <h3 className="text-lg font-semibold mb-4 dark:text-white">Create New Topic</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="topic-title">Topic Title</Label>
                          <Input 
                            id="topic-title" 
                            placeholder="Enter topic title" 
                            value={newTopicTitle}
                            onChange={(e) => setNewTopicTitle(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="topic-content">Topic Content</Label>
                          <Textarea 
                            id="topic-content"
                            placeholder="Enter your topic content..." 
                            value={newTopicContent}
                            onChange={(e) => setNewTopicContent(e.target.value)}
                            className="min-h-[100px] mb-2"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowNewTopicForm(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleCreateNewTopic}
                            disabled={newTopicTitle.trim() === "" || newTopicContent.trim() === ""}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Create Topic
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Create new discussion */}
                  <div className="mb-8">
                    <Textarea 
                      placeholder="Start a new discussion..." 
                      className="mb-2"
                      value={newDiscussion}
                      onChange={(e) => setNewDiscussion(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCreateDiscussion}
                        disabled={newDiscussion.trim() === ""}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                  
                  {/* Discussions list */}
                  <div className="space-y-6">
                    {discussionsList.map(discussion => (
                      <div key={discussion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        {/* Main discussion post */}
                        <div className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="font-medium dark:text-white">{discussion.author.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{discussion.author.role}</span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{discussion.timestamp}</p>
                              {discussion.title && (
                                <h3 className="text-lg font-semibold mb-2 dark:text-white">{discussion.title}</h3>
                              )}
                              <p className="text-gray-700 dark:text-gray-200">{discussion.content}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Discussion replies */}
                        {discussion.replies.length > 0 && (
                          <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
                            <div className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                              {discussion.replies.length} {discussion.replies.length === 1 ? 'reply' : 'replies'}
                            </div>
                            <div className="space-y-4 p-4 pt-0">
                              {discussion.replies.map(reply => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                      <span className="font-medium text-sm dark:text-white">{reply.author.name}</span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">{reply.author.role}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{reply.timestamp}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-200">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Reply form */}
                        {replyingTo === discussion.id ? (
                          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <Textarea 
                              placeholder="Write your reply..." 
                              className="mb-2 text-sm"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText("");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleReply(discussion.id)}
                                disabled={replyText.trim() === ""}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setReplyingTo(discussion.id)}
                            >
                              Reply
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Settings Tab Content */}
              <TabsContent value="settings">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-6 dark:text-white">Project Settings</h2>
                  
                  <div className="space-y-8">
                    {/* General settings */}
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-white">General</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="project-name">Project Name</Label>
                          <Input id="project-name" defaultValue={projectData.title} />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="project-description">Description</Label>
                          <Textarea id="project-description" defaultValue={projectData.description} />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="project-due-date">Due Date</Label>
                          <Input id="project-due-date" type="date" defaultValue="2023-08-15" />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Project Tags</Label>
                          <div className="flex flex-wrap gap-2">
                            {projectData.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-700 flex gap-2">
                                {tag}
                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                  ×
                                </button>
                              </Badge>
                            ))}
                            <Button variant="outline" size="sm">Add Tag</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Team settings */}
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-white">Team</h3>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <Label>Team Members</Label>
                          <div className="space-y-2">
                            {projectData.members.map(member => (
                              <div key={member.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm dark:text-white">{member.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                  </div>
                                </div>
                                <Select defaultValue="member">
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="owner">Owner</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="member">Member</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Member
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Notifications settings */}
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-white">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Email Notifications</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about project activity</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Task Reminders</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get reminders about upcoming deadlines</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Chat Notifications</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications for new messages</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Danger zone */}
                    <div>
                      <h3 className="text-lg font-medium text-red-500 dark:text-red-400 mb-4">Danger Zone</h3>
                      <div className="space-y-4 border border-red-200 dark:border-red-900/50 rounded-lg p-4 bg-red-50 dark:bg-red-900/10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className="font-medium dark:text-white">Archive Project</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Make the project inaccessible to team members</p>
                          </div>
                          <Button variant="outline">Archive</Button>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className="font-medium dark:text-white">Delete Project</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete this project and all its data</p>
                          </div>
                          <Button variant="destructive">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
