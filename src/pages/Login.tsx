
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useUserRole } from '@/contexts/UserRoleContext';
import Navbar from '@/components/Navbar';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUserRole } = useUserRole();
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login functionality - in a real app, we'd check credentials with a backend
    // For demo purposes, simulate role based on email
    let role: 'student' | 'collaborator';
    
    if (email.includes('collaborator') || email.includes('mentor') || email.includes('teacher')) {
      role = 'collaborator';
    } else {
      role = 'student';
    }
    
    // Set user role
    setUserRole(role);
    
    toast({
      title: "Login successful",
      description: `Welcome back! Redirecting to your ${role === 'collaborator' ? 'collaborator' : 'student'} dashboard...`,
    });
    
    // Redirect based on role
    setTimeout(() => {
      if (role === 'collaborator') {
        navigate('/collaborator');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container flex flex-col items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-lg bg-card">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-card-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Demo: Use any email with "collaborator", "teacher", or "mentor" to log in as a collaborator
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>
              
              <Button type="submit" className="w-full font-semibold">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
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
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
