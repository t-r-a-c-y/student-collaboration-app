
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Paperclip, Plus, Tags, Users, X, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const CreateProject = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  // Handle adding a new tag
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo project creation
    toast({
      title: "Project created successfully!",
      description: "Your new project has been created.",
    });
    
    // In a real app, you would submit to an API here
    setTimeout(() => {
      navigate('/projects');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6 pt-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Create New Project</h1>
            <p className="text-gray-600 mb-8">Fill in the details below to start your new project.</p>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title <span className="text-red-500">*</span></Label>
                  <Input 
                    id="title"
                    placeholder="Enter a descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                {/* Project Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe your project in detail"
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                {/* Project Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="arts">Arts & Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="social">Social Impact</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Project Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (max 5)</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tags className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        id="tags"
                        placeholder="Add a tag (e.g., mobile, AI, design)"
                        className="pl-10"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddTag}
                      disabled={tags.length >= 5}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  {/* Display tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-gray-100">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(tag)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Expected Completion Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="dueDate"
                      type="date"
                      className="pl-10"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Project Visibility */}
                <div className="space-y-2">
                  <Label>Project Visibility</Label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${
                          isPublic ? 'border-primary bg-primary/10' : 'border-gray-300'
                        }`}
                        onClick={() => setIsPublic(true)}
                      >
                        {isPublic && <CheckCircle2 size={14} className="text-primary" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Public</h4>
                        <p className="text-sm text-gray-500">
                          Anyone on StudentSpark can see this project and request to join.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div 
                        className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${
                          !isPublic ? 'border-primary bg-primary/10' : 'border-gray-300'
                        }`}
                        onClick={() => setIsPublic(false)}
                      >
                        {!isPublic && <CheckCircle2 size={14} className="text-primary" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Private</h4>
                        <p className="text-sm text-gray-500">
                          Only people you invite can see and collaborate on this project.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Team Members - Just a button to invite in this view */}
                <div className="pt-4">
                  <Button type="button" variant="outline" className="w-full">
                    <Users size={16} className="mr-2" />
                    Invite Team Members
                  </Button>
                </div>
                
                {/* Files - Just a button to attach in this view */}
                <div>
                  <Button type="button" variant="outline" className="w-full">
                    <Paperclip size={16} className="mr-2" />
                    Attach Files or Resources
                  </Button>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4 flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/projects')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!title || !description || !category}>
                    Create Project
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProject;
