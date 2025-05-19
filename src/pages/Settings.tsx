
import React, { useState } from 'react';
import { Bell, Globe, Lock, Mail, Moon, Shield, Save, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Settings = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
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
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <Tabs defaultValue="account">
                <div className="border-b border-gray-200">
                  <TabsList className="flex rounded-none border-b border-0 bg-transparent">
                    <TabsTrigger 
                      value="account" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                    >
                      <User size={16} className="mr-2" /> Account
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                    >
                      <Bell size={16} className="mr-2" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="privacy" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                    >
                      <Lock size={16} className="mr-2" /> Privacy
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  {/* Account Settings */}
                  <TabsContent value="account" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Information</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                              id="email" 
                              defaultValue="alex.johnson@example.com" 
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                              id="username" 
                              defaultValue="alexjohnson" 
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input 
                            id="current-password" 
                            type="password" 
                            placeholder="Enter your current password" 
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer" />
                            <Input 
                              id="new-password" 
                              type="password" 
                              placeholder="Enter new password" 
                              className="pl-10 pr-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            placeholder="Confirm new password" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Appearance</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Moon size={18} />
                          <span>Dark Mode</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Language</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe size={18} />
                          <span>Preferred Language</span>
                        </div>
                        <select className="text-sm border border-gray-200 rounded-md p-2">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Notification Settings */}
                  <TabsContent value="notifications" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Project Updates</p>
                            <p className="text-sm text-gray-500">Get notified when changes are made to projects you're part of.</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Direct Messages</p>
                            <p className="text-sm text-gray-500">Receive email notifications for direct messages.</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Project Invites</p>
                            <p className="text-sm text-gray-500">Get notified when you're invited to join a project.</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Weekly Digest</p>
                            <p className="text-sm text-gray-500">Receive a weekly summary of your project activity.</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">In-App Notifications</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Task Assignments</p>
                            <p className="text-sm text-gray-500">Get notified when you're assigned a new task.</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Task Comments</p>
                            <p className="text-sm text-gray-500">Get notified when someone comments on your tasks.</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Task Deadlines</p>
                            <p className="text-sm text-gray-500">Get reminders for upcoming task deadlines.</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Privacy Settings */}
                  <TabsContent value="privacy" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Privacy</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Visibility</p>
                            <p className="text-sm text-gray-500">Control who can see your profile information.</p>
                          </div>
                          <select className="text-sm border border-gray-200 rounded-md p-2">
                            <option>Everyone</option>
                            <option>Students Only</option>
                            <option>My Projects</option>
                            <option>Only Me</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Contact Information</p>
                            <p className="text-sm text-gray-500">Control who can see your contact details.</p>
                          </div>
                          <select className="text-sm border border-gray-200 rounded-md p-2">
                            <option>My Projects</option>
                            <option>Everyone</option>
                            <option>Only Me</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Security</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Shield size={16} className="mr-2" /> Setup
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Active Sessions</p>
                            <p className="text-sm text-gray-500">Manage your active login sessions.</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Export</p>
                            <p className="text-sm text-gray-500">Download a copy of your data.</p>
                          </div>
                          <Button variant="outline" size="sm">Export</Button>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <Button variant="destructive" size="sm">Delete My Account</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                </div>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
