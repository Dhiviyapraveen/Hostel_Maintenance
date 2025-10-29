import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Hammer, Wrench, Zap, Sparkles, Wifi } from "lucide-react";

const StudentHome = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const roomNo = localStorage.getItem("roomNo");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "student") {
      navigate("/slogin");
    }
  }, [navigate]);

  const services = [
    {
      title: "Carpentry",
      icon: Hammer,
      path: "/carpentry",
      description: "Furniture repairs, door fixes, and woodwork",
    },
    {
      title: "Plumbing",
      icon: Wrench,
      path: "/plumbing",
      description: "Water leaks, pipe issues, and drainage",
    },
    {
      title: "Electrical",
      icon: Zap,
      path: "/electrical",
      description: "Light fixtures, outlets, and wiring",
    },
    {
      title: "Housekeeping",
      icon: Sparkles,
      path: "/housekeeping",
      description: "Cleaning, sanitation, and maintenance",
    },
    {
      title: "Network",
      icon: Wifi,
      path: "/network",
      description: "Internet connectivity and WiFi issues",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="student" userName={userName || ""} roomNo={roomNo || ""} />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome, {userName}!</h1>
          <p className="text-muted-foreground text-lg">
            Select a service category to submit your maintenance request
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentHome;
