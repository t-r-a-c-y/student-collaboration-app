
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface CreateEventFormProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('meeting');
  const [attendee, setAttendee] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);
  
  const handleAddAttendee = () => {
    if (!attendee.trim()) return;
    setAttendees([...attendees, attendee.trim()]);
    setAttendee('');
  };
  
  const handleRemoveAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !startTime || !endTime || !location) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newEvent = {
      id: Date.now().toString(),
      title,
      type: eventType,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      time: `${startTime} - ${endTime}`,
      location,
      attendees: attendees.length > 0 ? attendees : ['You'],
      description,
    };
    
    onSubmit(newEvent);
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    });
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Create New Event</h2>
        <Button variant="ghost" size="icon" onClick={onClose} type="button">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Event Title *</Label>
          <Input 
            id="title" 
            placeholder="Enter event title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="event-type">Event Type *</Label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger id="event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="presentation">Presentation</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="start-time">Start Time *</Label>
            <Input 
              id="start-time" 
              type="time" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="end-time">End Time *</Label>
            <Input 
              id="end-time" 
              type="time" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Location *</Label>
          <Input 
            id="location" 
            placeholder="Enter location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label>Attendees</Label>
          <div className="flex gap-2">
            <Input 
              placeholder="Add attendee" 
              value={attendee} 
              onChange={(e) => setAttendee(e.target.value)}
            />
            <Button type="button" onClick={handleAddAttendee}>Add</Button>
          </div>
          
          {attendees.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attendees.map((person, index) => (
                <Badge key={index} variant="secondary" className="flex gap-1 items-center">
                  {person}
                  <button 
                    type="button"
                    onClick={() => handleRemoveAttendee(index)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Enter event description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Create Event
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
