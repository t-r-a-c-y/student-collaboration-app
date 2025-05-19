import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { useUserRole } from "@/contexts/UserRoleContext";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileView from "./pages/ProfileView";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import CreateProject from "./pages/CreateProject";
import Notifications from "./pages/Notifications";
import CollaboratorDashboard from "./pages/CollaboratorDashboard";
import InviteTeammates from "./pages/InviteTeammates";

const queryClient = new QueryClient();

// Custom component to handle role-based redirection
const RoleBasedRedirect = () => {
  const { userRole } = useUserRole();
  
  if (userRole === 'collaborator') {
    return <Navigate to="/collaborator" />;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserRoleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:type/:id" element={<ProfileView />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/events" element={<Events />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/redirect" element={<RoleBasedRedirect />} />
              <Route path="/collaborator" element={<CollaboratorDashboard />} />
              <Route path="/invite-teammates" element={<InviteTeammates />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserRoleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
