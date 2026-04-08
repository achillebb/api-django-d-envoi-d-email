import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Formations from "./pages/Formations";
import FormationDetail from "./pages/FormationDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Certifications from "./pages/Certifications";
import Registration from "./pages/Registration";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/formations" element={<Formations />} />
      <Route
        path="/formations/:formationId"
        element={<FormationDetail />}
      />
      <Route path="/cours" element={<Courses />} />
      <Route path="/cours/:courseId" element={<CourseDetail />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/inscription" element={<Registration />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;