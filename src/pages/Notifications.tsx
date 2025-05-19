
import React, { useState } from 'react';
import { Bell, Check, Trash2, MessageSquare, Users, Calendar, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Mock notification data
const allNotifications = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah Chen",
    content: "I've added some comments on the wireframes you shared.",
    time: "10 minutes ago",
    read: false,
    icon: MessageSquare
  },
  {
    id: "2",
    type: "invite",
    title: "Project invitation",
    content: "Ryan Kim invited you to collaborate on 'Student Budget Planner'",
    time: "2 hours ago",
    read: false,
    icon: Users
  },
  {
    id: "3",
    type: "reminder",
    title: "Task due tomorrow",
    content: "Don't forget to complete the 'Create onboarding screens' task.",
    time: "5 hours ago",
    read: true,
    icon: Calendar
  },
  {
    id: "4",
    type: "update",
    title: "Project update",
    content: "Jessica Park updated the project brief for Climate Change Awareness App.",
    time: "Yesterday",
    read: true,
    icon: FileText
  },
  {
    id: "5",
    type: "message",
    title: "New message from Alex Johnson",
    content: "Great job on the presentation yesterday!",
    time: "2 days ago",
    read: true,
    icon: MessageSquare
  }
];

const Notifications = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState("all");
  
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const readNotifications = notifications.filter(notification => notification.read);
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    });
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };
  
  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    
    toast({
      title: "Notification deleted",
      description: "This notification has been removed.",
    });
  };
  
  // Get notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return unreadNotifications;
      case "read":
        return readNotifications;
      default:
        return notifications;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6 pt-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-gray-600">Stay updated on your projects and messages</p>
              </div>
              
              {unreadNotifications.length > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <Check size={16} className="mr-2" /> Mark All as Read
                </Button>
              )}
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b mb-6">
                <TabsList className="bg-transparent h-auto p-0 w-full flex justify-start gap-4">
                  <TabsTrigger 
                    value="all" 
                    className="py-2 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    All ({notifications.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unread" 
                    className="py-2 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    Unread ({unreadNotifications.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="read" 
                    className="py-2 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    Read ({readNotifications.length})
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value={activeTab} className="mt-0">
                {getFilteredNotifications().length > 0 ? (
                  <div className="space-y-4">
                    {getFilteredNotifications().map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'} mr-4`}>
                            <notification.icon size={20} className={notification.read ? 'text-gray-500' : 'text-blue-500'} />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className={`font-semibold ${notification.read ? '' : 'text-blue-900'}`}>
                              {notification.title}
                            </h3>
                            <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-blue-700'}`}>
                              {notification.content}
                            </p>
                            <p className="text-xs mt-2 text-gray-500">{notification.time}</p>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <Check size={16} />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              title="Delete notification"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No notifications</h3>
                    <p className="text-gray-500">
                      {activeTab === "unread" 
                        ? "You've read all your notifications." 
                        : activeTab === "read" 
                          ? "No read notifications yet."
                          : "You don't have any notifications yet."}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
