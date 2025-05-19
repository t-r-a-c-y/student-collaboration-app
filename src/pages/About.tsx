
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BadgeInfo, Users, BookOpen, Globe, Sparkles, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-12 px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <BadgeInfo className="text-primary h-6 w-6" />
            <h2 className="text-sm uppercase tracking-wider text-primary font-medium">About Us</h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Student Collaboration</h1>
          <p className="text-xl text-gray-600 mb-12">
            StudentSpark helps students connect, collaborate, and create amazing projects together.
          </p>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                We believe in the power of student collaboration across schools, backgrounds, and disciplines. 
                Our mission is to create a platform that breaks down barriers and enables students to work 
                together on projects that matter.
              </p>
              <p className="text-gray-600">
                By connecting students with diverse perspectives and skills, we're building a community 
                that fosters innovation, creativity, and meaningful learning experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <span>Connect with students across different schools and regions</span>
                </li>
                <li className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-primary mt-1" />
                  <span>Learn new skills through hands-on collaborative projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-1" />
                  <span>Build a portfolio of work to showcase to future employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-1" />
                  <span>Gain experience working in diverse teams</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Vision</h2>
            <p className="text-lg text-center max-w-3xl mx-auto">
              "To create a world where every student has the opportunity to collaborate, 
              innovate, and develop their skills through meaningful project-based learning."
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600">
                  Create an account and complete your student profile with your skills and interests.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Connect</h3>
                <p className="text-gray-600">
                  Browse projects and connect with other students who share your interests.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
                <p className="text-gray-600">
                  Join existing projects or create your own and invite collaborators.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of students already collaborating on StudentSpark!
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="font-medium">
                  <Rocket className="mr-2 h-4 w-4" /> Sign Up Now
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
