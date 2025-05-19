
import React from 'react';
import { ChevronRight, ArrowRight, Sparkles, Users, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const featuredProjects = [
  {
    id: "1",
    title: "Sustainable Energy App",
    description: "A mobile application that helps users track and reduce their carbon footprint through daily actions and challenges.",
    image: "https://images.unsplash.com/photo-1473308822086-710304d7d30c?q=80&w=2940&auto=format&fit=crop",
    tags: ["Mobile App", "Environment", "UI/UX"],
    memberCount: 5,
    dueDate: "Jun 15",
    progress: 75,
    featured: true
  },
  {
    id: "2",
    title: "Student Mental Health Platform",
    description: "A web platform providing resources, community support, and tools to help students manage stress and anxiety.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2787&auto=format&fit=crop",
    tags: ["Web", "Healthcare", "Community"],
    memberCount: 4,
    dueDate: "Jul 22",
    progress: 40,
    featured: true
  },
  {
    id: "3",
    title: "Community Food Share",
    description: "An app connecting students with excess food to those in need, reducing waste and building community.",
    image: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?q=80&w=2940&auto=format&fit=crop",
    tags: ["Mobile", "Community", "Social Impact"],
    memberCount: 6,
    dueDate: "Aug 10",
    progress: 60,
    featured: true
  }
];

const Homepage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleExploreProjects = () => {
    // Redirect to login page with a message
    toast({
      title: "Login Required",
      description: "Please login to explore projects",
      variant: "default",
    });
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container py-20 md:py-28 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 fade-in">
              Connect. <span className="text-primary">Collaborate.</span> Create.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg fade-in" style={{animationDelay: "0.2s"}}>
              Join students from around the world to work on exciting projects together and build your portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{animationDelay: "0.4s"}}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/signup" className="flex items-center gap-2">
                  Join Now <ChevronRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={handleExploreProjects}>
                <span className="flex items-center gap-2">
                  Explore Projects <ChevronRight size={16} />
                </span>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative h-72 md:h-96 fade-in" style={{animationDelay: "0.4s"}}>
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-2xl shadow-xl border border-gray-100 transform rotate-3 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-10 left-10 w-48 h-48 md:w-64 md:h-64 bg-white rounded-2xl shadow-xl border border-gray-100 transform -rotate-6 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop" 
                alt="Student projects" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">1,200+</p>
              <p className="text-gray-500">Students</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">350+</p>
              <p className="text-gray-500">Projects</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">45+</p>
              <p className="text-gray-500">Schools</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</p>
              <p className="text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Amazing Projects</h2>
              <p className="text-gray-600">Discover what students are building around the world</p>
            </div>
            <Button 
              variant="link" 
              onClick={handleExploreProjects}
              className="flex items-center gap-2 text-primary font-medium mt-4 md:mt-0"
            >
              See More Projects <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} onClick={handleExploreProjects} className="cursor-pointer">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need To Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and resources you need to collaborate effectively and showcase your skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Sparkles className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Project Showcase</h3>
              <p className="text-gray-600">
                Create beautiful project portfolios to showcase your work to peers, teachers, and future employers.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Users className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Connect with peers across different schools and collaborate on exciting projects together.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <Calendar className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Task Management</h3>
              <p className="text-gray-600">
                Keep projects on track with integrated task management, deadlines, and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Hear from students who have used our platform to collaborate and create amazing projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex mb-4 items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/300?img=1" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Jessica K.</h4>
                  <p className="text-sm text-gray-500">Stanford University</p>
                </div>
              </div>
              <p className="text-gray-600">
                "StudentSpark helped me find team members for my climate change project. We've been collaborating for 6 months now!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex mb-4 items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/300?img=11" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-500">MIT</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The platform's tools made managing our app development project so much easier. We actually finished ahead of schedule!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex mb-4 items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/300?img=5" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Aisha J.</h4>
                  <p className="text-sm text-gray-500">UCLA</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've built an amazing portfolio of projects thanks to StudentSpark. It helped me land my dream internship!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Collaborating?</h2>
          <p className="text-primary-foreground max-w-lg mx-auto mb-8">
            Join thousands of students already creating amazing projects together on StudentSpark.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link to="/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Homepage;
