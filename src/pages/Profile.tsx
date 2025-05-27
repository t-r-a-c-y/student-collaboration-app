
import React, { useState } from 'react';
import { User, Mail, School, Briefcase, MapPin, Link as LinkIcon, Save, PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Profile = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Demo user data
  const [userData, setUserData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    school: 'Adventist University of Central Africa ',
    major: 'Computer Science',
    location: 'Kigali, Rwanda',
    bio: 'Computer Science student interested in web development, AI, and collaborative projects.',
    website: 'alexjohnson.dev',
    skills: ['React', 'UX Design', 'API Integration', 'Python', 'Node.js', 'Data Analysis']
  });
  
  const [newSkill, setNewSkill] = useState('');
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !userData.skills.includes(newSkill.trim())) {
      setUserData({
        ...userData,
        skills: [...userData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter(s => s !== skill)
    });
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated successfully",
      description: "Your profile changes have been saved.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-primary to-blue-600 h-32 relative">
                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/300?img=12" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-4 right-6">
                  <Button size="sm" variant="secondary">
                    Change Cover
                  </Button>
                </div>
              </div>
              
              {/* Profile Form */}
              <div className="pt-16 px-6 pb-6">
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="firstName" 
                          value={userData.firstName} 
                          onChange={e => setUserData({...userData, firstName: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={userData.lastName} 
                        onChange={e => setUserData({...userData, lastName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="email" 
                          type="email" 
                          value={userData.email} 
                          onChange={e => setUserData({...userData, email: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school">School/University</Label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="school" 
                          value={userData.school} 
                          onChange={e => setUserData({...userData, school: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="major">Major/Field of Study</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="major" 
                          value={userData.major} 
                          onChange={e => setUserData({...userData, major: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="location" 
                          value={userData.location} 
                          onChange={e => setUserData({...userData, location: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="website" 
                          value={userData.website} 
                          onChange={e => setUserData({...userData, website: e.target.value})}
                          className="pl-10"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={userData.bio} 
                        onChange={e => setUserData({...userData, bio: e.target.value})}
                        rows={4}
                        placeholder="Tell us a bit about yourself"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {userData.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="px-3 py-1">
                            {skill}
                            <button 
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X size={14} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input 
                          value={newSkill}
                          onChange={e => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        />
                        <Button type="button" onClick={handleAddSkill}>
                          <PlusCircle size={16} className="mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveProfile}>
                      <Save size={16} className="mr-2" /> Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
