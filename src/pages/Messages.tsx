import React, { useState, useRef, useEffect } from 'react';
import { Search, Edit, PlusCircle, Send, Phone, Video, MoreVertical, Paperclip, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ChatMessage from '@/components/ChatMessage';
import { Badge } from '@/components/ui/badge';

// Mock data for conversations
const conversations = [
  {
    id: "1",
    name: "Sarah Miller",
    avatar: "https://i.pravatar.cc/300?img=1",
    lastMessage: "Can you share your notes from the last meeting?",
    timestamp: "10:45 AM",
    unread: 2,
    online: true
  },
  {
    id: "2",
    name: "Project Team",
    members: ["Ryan", "Mia", "James", "+2"],
    lastMessage: "Ryan: I'll work on the wireframes today",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    isGroup: true
  },
  {
    id: "3",
    name: "David Kim",
    avatar: "https://i.pravatar.cc/300?img=3",
    lastMessage: "Thanks for the recommendation!",
    timestamp: "Yesterday",
    unread: 0,
    online: true
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/300?img=5",
    lastMessage: "Can we schedule a call tomorrow?",
    timestamp: "Monday",
    unread: 0,
    online: false
  }
];

// Mock chat messages for the active conversation
const mockMessages = [
  {
    id: "1",
    message: "Hi Sarah, hope you're doing well!",
    sender: {
      name: "You",
      avatar: "https://i.pravatar.cc/300?img=12"
    },
    timestamp: "10:30 AM",
    isCurrentUser: true
  },
  {
    id: "2",
    message: "Hey Alex! I'm good, just working on our project presentation.",
    sender: {
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/300?img=1"
    },
    timestamp: "10:32 AM",
    isCurrentUser: false
  },
  {
    id: "3",
    message: "Do you have the notes from yesterday's team meeting? I missed some parts while taking notes.",
    sender: {
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/300?img=1"
    },
    timestamp: "10:33 AM",
    isCurrentUser: false
  },
  {
    id: "4",
    message: "Yes, I have them! I'll send them to you right away.",
    sender: {
      name: "You",
      avatar: "https://i.pravatar.cc/300?img=12"
    },
    timestamp: "10:35 AM",
    isCurrentUser: true
  },
  {
    id: "5",
    message: "I've added some additional research findings that might be useful for our presentation.",
    sender: {
      name: "You",
      avatar: "https://i.pravatar.cc/300?img=12"
    },
    timestamp: "10:36 AM",
    isCurrentUser: true
  },
  {
    id: "6",
    message: "That's perfect! Thank you so much. Can you share your notes from the last meeting as well?",
    sender: {
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/300?img=1"
    },
    timestamp: "10:45 AM",
    isCurrentUser: false
  }
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  
  // Reference to the messages container for scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg = {
      id: (messages.length + 1).toString(),
      message: newMessage,
      sender: {
        name: "You",
        avatar: "https://i.pravatar.cc/300?img=12"
      },
      timestamp: "Just now",
      isCurrentUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isLoggedIn={true} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 flex flex-col">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Conversation List */}
            <div className="w-80 border-r border-border bg-card hidden md:flex md:flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Messages</h2>
                  <Button variant="ghost" size="icon">
                    <Edit size={18} />
                  </Button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search messages" className="pl-9" />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {conversations.map(conversation => (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation)}
                    className={`w-full p-3 flex items-start gap-3 hover:bg-accent/10 border-b border-border ${
                      activeConversation.id === conversation.id ? 'bg-accent/10' : ''
                    }`}
                  >
                    <div className="relative">
                      {conversation.avatar ? (
                        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                          <img 
                            src={conversation.avatar} 
                            alt={conversation.name} 
                            className="w-full h-full object-cover dark:opacity-90"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                          {conversation.name.charAt(0)}
                        </div>
                      )}
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium truncate">{conversation.name}</span>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="rounded-full min-w-[1.25rem] h-5 px-1.5">
                        {conversation.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="p-3 border-t border-border">
                <Button className="w-full" size="sm">
                  <PlusCircle size={16} className="mr-2" /> New Message
                </Button>
              </div>
            </div>
            
            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="bg-card p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center">
                  {activeConversation.avatar ? (
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden mr-3">
                      <img 
                        src={activeConversation.avatar} 
                        alt={activeConversation.name} 
                        className="w-full h-full object-cover dark:opacity-90"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium mr-3">
                      {activeConversation.name.charAt(0)}
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConversation.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Chat Messages - Make this section scrollable */}
              <div className="flex-1 overflow-y-auto bg-background p-4">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <ChatMessage key={msg.id} {...msg} />
                  ))}
                  <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
                </div>
              </div>
              
              {/* Message Input */}
              <div className="bg-card p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="min-h-[80px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image size={18} />
                    </Button>
                    <Button onClick={handleSendMessage}>
                      <Send size={16} className="mr-2" /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;