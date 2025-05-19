
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, School, GraduationCap, Briefcase, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUserRole } from '@/contexts/UserRoleContext';
import Navbar from '@/components/Navbar';

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUserRole } = useUserRole();
  const [selectedRole, setSelectedRole] = useState<'student' | 'collaborator' | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You must choose between Student or Collaborator to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    // Set the user role in context
    setUserRole(selectedRole);
    
    // Demo signup functionality
    toast({
      title: "Account created successfully!",
      description: `Welcome to StudentSpark as a ${selectedRole === 'student' ? 'Student' : 'Collaborator'}. Redirecting to dashboard...`,
    });
    
    // For now, we'll just redirect to the appropriate dashboard after a delay
    setTimeout(() => {
      if (selectedRole === 'student') {
        navigate('/dashboard');
      } else {
        navigate('/collaborator');
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container flex flex-col items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-lg bg-card">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-card-foreground">Create an account</CardTitle>
            <CardDescription className="text-muted-foreground">Enter your information to get started</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2 mb-4">
                <Label>I am a:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border ${selectedRole === 'student' ? 'border-primary bg-primary/10' : 'border-border'} rounded-md p-4 cursor-pointer transition-colors hover:border-primary`}
                    onClick={() => setSelectedRole('student')}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <GraduationCap size={24} className={selectedRole === 'student' ? 'text-primary' : 'text-muted-foreground'} />
                      {selectedRole === 'student' && <CheckCircle size={16} className="text-primary" />}
                    </div>
                    <h3 className="font-medium">Student</h3>
                    <p className="text-xs text-muted-foreground">Join projects, build your portfolio, connect with peers</p>
                  </div>
                  <div 
                    className={`border ${selectedRole === 'collaborator' ? 'border-primary bg-primary/10' : 'border-border'} rounded-md p-4 cursor-pointer transition-colors hover:border-primary`}
                    onClick={() => setSelectedRole('collaborator')}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <Briefcase size={24} className={selectedRole === 'collaborator' ? 'text-primary' : 'text-muted-foreground'} />
                      {selectedRole === 'collaborator' && <CheckCircle size={16} className="text-primary" />}
                    </div>
                    <h3 className="font-medium">Collaborator</h3>
                    <p className="text-xs text-muted-foreground">Mentor students, create projects, provide guidance</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input id="firstName" placeholder="John" className="pl-10" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input id="email" type="email" placeholder="name@example.com" className="pl-10" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school">
                  {selectedRole === 'collaborator' ? 'Institution/University' : 'School/University'}
                </Label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="school" 
                    placeholder={selectedRole === 'collaborator' ? 'University of California, Berkeley' : 'Berkeley University'} 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" required />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-muted-foreground/25 text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button type="submit" className="w-full font-semibold">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">Google</Button>
              <Button variant="outline" className="w-full">GitHub</Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
