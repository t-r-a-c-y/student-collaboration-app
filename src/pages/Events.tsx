
import React, { useState } from 'react';
import { PlusCircle, Calendar as CalendarIcon, MapPin, Users, Clock, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CreateEventForm from '@/components/CreateEventForm';

// Mock events data
const initialEventsData = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    type: "meeting",
    date: "2025-05-10",
    time: "10:00 AM - 11:30 AM",
    location: "Room 302, Computer Science Building",
    attendees: ["Alex Johnson", "Sarah Miller", "David Kim", "Emma Wilson"],
    description: "Initial meeting to discuss project goals, timeline, and team roles."
  },
  {
    id: "2",
    title: "Tech Workshop: React Fundamentals",
    type: "workshop",
    date: "2025-05-12",
    time: "2:00 PM - 4:00 PM",
    location: "Innovation Lab",
    attendees: ["Alex Johnson", "Ryan Moore", "Jessica Lee", "+15 others"],
    description: "Hands-on workshop covering React basics, hooks, and component patterns."
  },
  {
    id: "3",
    title: "Design Review",
    type: "meeting",
    date: "2025-05-15",
    time: "1:00 PM - 2:30 PM",
    location: "Virtual (Zoom)",
    attendees: ["Alex Johnson", "Sarah Miller", "Emma Wilson"],
    description: "Review and feedback session for the latest UI designs."
  },
  {
    id: "4",
    title: "Hackathon: Sustainability Solutions",
    type: "hackathon",
    date: "2025-05-18",
    time: "9:00 AM - 6:00 PM",
    location: "Student Center",
    attendees: ["Alex Johnson", "Team Eco-Tech", "+50 others"],
    description: "Full-day hackathon to develop innovative solutions for campus sustainability."
  },
  {
    id: "5",
    title: "Project Progress Check-in",
    type: "meeting",
    date: "2025-05-20",
    time: "11:00 AM - 12:00 PM",
    location: "Study Room 4, Library",
    attendees: ["Alex Johnson", "Sarah Miller", "David Kim", "Emma Wilson"],
    description: "Mid-point check-in to assess progress and address any blockers."
  }
];

const Events = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list");
  const [filterType, setFilterType] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [eventsData, setEventsData] = useState(initialEventsData);
  
  // Filter events based on selected date and type
  const filteredEvents = eventsData.filter(event => {
    const eventDate = new Date(event.date);
    const selectedDate = date || new Date();
    
    const sameDate = 
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear();
      
    const matchesType = filterType === "all" || event.type === filterType;
    
    return sameDate && matchesType;
  });
  
  // Sort events by time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });
  
  // Get current month name and year for calendar header
  const currentDate = date || new Date();
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Function to navigate to prev/next month
  const changeMonth = (direction: 'prev' | 'next') => {
    if (!date) return;
    
    const newDate = new Date(date);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setDate(newDate);
  };
  
  // Handle adding new event
  const handleAddEvent = (newEvent: any) => {
    setEventsData([...eventsData, newEvent]);
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
                <h1 className="text-2xl font-bold dark:text-white">Events</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your calendar and events</p>
              </div>
              
              <Button size="default" onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" /> New Event
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-semibold dark:text-white">{monthYear}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => changeMonth('prev')}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => changeMonth('next')}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2 dark:text-white">Filter by type:</p>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger>
                          <SelectValue placeholder="All events" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All events</SelectItem>
                          <SelectItem value="meeting">Meetings</SelectItem>
                          <SelectItem value="workshop">Workshops</SelectItem>
                          <SelectItem value="hackathon">Hackathons</SelectItem>
                          <SelectItem value="presentation">Presentations</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2 dark:text-white">View:</p>
                      <div className="flex gap-2">
                        <Button 
                          variant={view === "list" ? "default" : "outline"} 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setView("list")}
                        >
                          List
                        </Button>
                        <Button 
                          variant={view === "calendar" ? "default" : "outline"} 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setView("calendar")}
                        >
                          Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Events List */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold dark:text-white">
                      Events for {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    {sortedEvents.length === 0 ? (
                      <div className="text-center py-12">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400">No events for this date</p>
                        <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                          <PlusCircle className="h-4 w-4 mr-2" /> Schedule Event
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sortedEvents.map(event => (
                          <Card key={event.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                      <CalendarIcon className="h-6 w-6" />
                                    </div>
                                    
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold dark:text-white">{event.title}</h4>
                                        <Badge variant="outline" className="capitalize bg-gray-50 dark:bg-gray-700">
                                          {event.type}
                                        </Badge>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                          <Clock className="h-3.5 w-3.5 mr-2" />
                                          {event.time}
                                        </div>
                                        
                                        <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                          <MapPin className="h-3.5 w-3.5 mr-2 mt-1 flex-shrink-0" />
                                          {event.location}
                                        </div>
                                        
                                        <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                          <Users className="h-3.5 w-3.5 mr-2 mt-1 flex-shrink-0" />
                                          {event.attendees[0]}{event.attendees.length > 1 && ` + ${event.attendees.length - 1} others`}
                                        </div>
                                      </div>
                                      
                                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {event.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 md:flex-col">
                                  <Button size="sm" className="flex-1 md:w-full">Join</Button>
                                  <Button variant="outline" size="sm" className="flex-1 md:w-full">Details</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Create Event Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <CreateEventForm 
            onClose={() => setIsCreateDialogOpen(false)} 
            onSubmit={handleAddEvent}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
