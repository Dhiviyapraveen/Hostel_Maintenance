import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentHome from "./pages/StudentHome";
import ComplaintForm from "./pages/ComplaintForm";
import UserHistory from "./pages/UserHistory";
import UserAbout from "./pages/UserAbout";
import AdminHome from "./pages/AdminHome";
import AdminComplaintView from "./pages/AdminComplaintView";
import AdminAbout from "./pages/AdminAbout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/slogin" element={<StudentLogin />} />
          <Route path="/alogin" element={<AdminLogin />} />
          <Route path="/home" element={<StudentHome />} />
          <Route path="/carpentry" element={<ComplaintForm />} />
          <Route path="/plumbing" element={<ComplaintForm />} />
          <Route path="/electrical" element={<ComplaintForm />} />
          <Route path="/housekeeping" element={<ComplaintForm />} />
          <Route path="/network" element={<ComplaintForm />} />
          <Route path="/userhistory" element={<UserHistory />} />
          <Route path="/userabout" element={<UserAbout />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/complaintcarpentry" element={<AdminComplaintView />} />
          <Route path="/complaintplumbing" element={<AdminComplaintView />} />
          <Route path="/complaintelectrical" element={<AdminComplaintView />} />
          <Route path="/complainthousekeeping" element={<AdminComplaintView />} />
          <Route path="/complaintnetwork" element={<AdminComplaintView />} />
          <Route path="/adminabout" element={<AdminAbout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
